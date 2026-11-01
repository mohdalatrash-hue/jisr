/* Jisr core: config, identity, API, progress, speech (TTS + STT), recording, helpers */
(function () {
  const C = window.JISR_CONFIG || {};
  const S = window.JISR_SESSIONS || [];
  const LS = {
    get(k, d) { try { const v = localStorage.getItem("jisr." + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("jisr." + k, JSON.stringify(v)); } catch (e) {} }
  };

  /* ---------- dates ---------- */
  function todayISO() {
    return new Intl.DateTimeFormat("en-CA", { timeZone: C.timeZone || "Asia/Riyadh", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  }
  function fmtDate(iso, lang) {
    const [y, m, d] = iso.split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d, 12));
    return dt.toLocaleDateString(lang === "ar" ? "ar-SA-u-ca-gregory" : "en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
  }
  function sessionByDate(iso) { return S.find(s => s.date === iso) || null; }
  function sessionByN(n) { return S.find(s => s.n === Number(n)) || null; }
  function nextSession(iso) { iso = iso || todayISO(); return S.find(s => s.date >= iso) || null; }
  function pastSessions(iso) { iso = iso || todayISO(); return S.filter(s => s.date <= iso); }

  /* ---------- identity & device ---------- */
  function me() { return LS.get("me", null); }
  function setMe(v) { LS.set("me", v); }
  function deviceId() {
    let id = LS.get("device", null);
    if (!id) { id = "d" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36); LS.set("device", id); }
    return id;
  }

  /* ---------- backend ---------- */
  const online = !!(C.apiUrl && /^https:\/\//.test(C.apiUrl));
  async function api(action, payload) {
    if (!online) return { ok: false, demo: true, error: "demo" };
    try {
      const r = await fetch(C.apiUrl, { method: "POST", body: JSON.stringify(Object.assign({ action, device: deviceId() }, payload || {})) });
      return await r.json();
    } catch (e) { return { ok: false, error: "network: " + e.message }; }
  }

  /* ---------- progress ---------- */
  function progress() { return LS.get("progress", {}); }
  function saveScore(sessionN, activity, score, max) {
    const p = progress(); p[sessionN] = p[sessionN] || {};
    const prev = p[sessionN][activity];
    if (!prev || score >= prev.score) p[sessionN][activity] = { score, max, ts: Date.now() };
    LS.set("progress", p);
    const u = me();
    if (u) api("score", { traineeId: u.id, name: u.name, session: sessionN, activity, score, max });
    document.dispatchEvent(new CustomEvent("jisr:progress"));
  }
  function stats() {
    const p = progress(); let done = 0, pts = 0, max = 0;
    Object.values(p).forEach(s => Object.values(s).forEach(a => { done++; pts += a.score; max += a.max; }));
    return { done, pts, max, pct: max ? Math.round(100 * pts / max) : 0 };
  }

  /* ---------- text-to-speech ---------- */
  let voices = [];
  function loadVoices() { voices = (window.speechSynthesis && speechSynthesis.getVoices()) || []; }
  if (window.speechSynthesis) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  // Male voices only (the programme is taught mainly to men).
  const MALE = /\b(male|daniel|alex|fred|aaron|arthur|guy|ryan|andrew|christopher|eric|davis|tom|thomas|oliver|george|rishi|brian|roger|steffan|william|james|liam|jason|tony|brandon|reed|gordon|ralph|junior|david|mark|richard|prabhat|connor|mitchell|ethan|noah|elliot)\b/i;
  const FEMALE = /\b(female|samantha|victoria|karen|moira|tessa|fiona|serena|susan|zira|aria|jenny|libby|sonia|kate|allison|ava|nicky|martha|emma|olivia|jane|hazel|catherine|natasha|michelle|nancy|sara|ana|clara|emily|amy|joanna|salli|kimberly|ivy|kendra|heera|veena|isha|neerja|zoe|shelley|sandy|flo|grandma)\b/i;
  function maleVoices() {
    const en = voices.filter(v => /^en[-_]/i.test(v.lang));
    const m = en.filter(v => MALE.test(v.name) && !FEMALE.test(v.name));
    const rank = v => (/natural|neural|enhanced|premium|google/i.test(v.name) ? 0 : 1) + (/en[-_](US|GB)/i.test(v.lang) ? 0 : 1);
    return m.sort((a, b) => rank(a) - rank(b));
  }
  function pickVoice(slot) {
    const en = voices.filter(v => /^en[-_]/i.test(v.lang));
    if (!en.length) return null;
    const pref = LS.get("voices", {});
    if (pref[slot]) { const f = en.find(v => v.name === pref[slot]); if (f) return f; }
    const m = maleVoices();
    const pool = m.length ? m : en.filter(v => !FEMALE.test(v.name));
    if (!pool.length) return null;
    const idx = { A: 0, B: 1, C: 2, D: 3 }[slot] || 0;
    return pool[idx % pool.length];
  }
  function rate() { return LS.get("rate", 0.9); }
  function speak(text, slot) {
    return new Promise(res => {
      if (!window.speechSynthesis) return res();
      const u = new SpeechSynthesisUtterance(text);
      const v = pickVoice(slot || "A"); if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "en-US";
      // when only one male voice exists, make the second speaker sound different
      const m = maleVoices(); if (m.length < 2 && slot && slot !== "A") u.pitch = slot === "B" ? 0.8 : 1.15; else u.pitch = v && MALE.test(v.name) ? 1 : 0.7;
      u.rate = rate(); u.onend = res; u.onerror = res;
      speechSynthesis.speak(u);
    });
  }
  function stopSpeaking() { if (window.speechSynthesis) speechSynthesis.cancel(); }

  /* ---------- speech-to-text (browser, free) ---------- */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function canListen() { return !!SR; }
  function listen(opts) {
    opts = opts || {};
    return new Promise((resolve, reject) => {
      if (!SR) return reject(new Error("no-stt"));
      const r = new SR(); r.lang = "en-US"; r.interimResults = !!opts.onInterim; r.continuous = !!opts.continuous; r.maxAlternatives = 1;
      let finalText = "";
      r.onresult = e => {
        let interim = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          if (e.results[i].isFinal) finalText += e.results[i][0].transcript + " ";
          else interim += e.results[i][0].transcript;
        }
        opts.onInterim && opts.onInterim((finalText + interim).trim());
      };
      r.onerror = e => { if (e.error === "no-speech") resolve(""); else reject(new Error(e.error)); };
      r.onend = () => resolve(finalText.trim());
      r.start();
      if (opts.controller) opts.controller.stop = () => r.stop();
    });
  }

  /* ---------- audio recording (for AI pronunciation feedback / self-review) ---------- */
  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mime = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"].find(m => window.MediaRecorder && MediaRecorder.isTypeSupported(m)) || "";
    const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
    const chunks = []; rec.ondataavailable = e => e.data.size && chunks.push(e.data);
    rec.start();
    return {
      stop: () => new Promise(res => {
        rec.onstop = async () => {
          stream.getTracks().forEach(t => t.stop());
          const blob = new Blob(chunks, { type: rec.mimeType || "audio/webm" });
          const b64 = await new Promise(r2 => { const fr = new FileReader(); fr.onload = () => r2(String(fr.result).split(",")[1]); fr.readAsDataURL(blob); });
          res({ blob, url: URL.createObjectURL(blob), base64: b64, mime: (rec.mimeType || "audio/webm").split(";")[0] });
        };
        rec.stop();
      })
    };
  }

  /* ---------- helpers ---------- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
  function norm(s) { return String(s || "").toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim(); }
  function words(s) { return norm(s).split(" ").filter(Boolean); }
  // word-level alignment (LCS) between target and spoken text
  function wordDiff(target, said) {
    const T = String(target).split(/\s+/).filter(Boolean), tn = T.map(w => norm(w)), sn = words(said);
    const n = tn.length, m = sn.length, L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = tn[i] === sn[j] ? 1 + L[i + 1][j + 1] : Math.max(L[i + 1][j], L[i][j + 1]);
    const out = []; let i = 0, j = 0;
    while (i < n) { if (j < m && tn[i] === sn[j]) { out.push({ w: T[i], ok: true }); i++; j++; } else if (j < m && L[i][j + 1] >= L[i + 1][j]) j++; else { out.push({ w: T[i], ok: false }); i++; } }
    const hit = out.filter(o => o.ok).length;
    return { parts: out, score: n ? Math.round(100 * hit / n) : 0 };
  }
  function el(html) { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  function toast(msg) {
    let t = document.getElementById("toast"); if (!t) { t = el('<div id="toast" role="status"></div>'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show"); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2600);
  }
  function qs(k) { return new URLSearchParams(location.search).get(k); }

  window.JISR = { C, S, LS, online, api, todayISO, fmtDate, sessionByDate, sessionByN, nextSession, pastSessions, me, setMe, deviceId,
    progress, saveScore, stats, speak, stopSpeaking, rate, voices: () => voices.filter(v => /^en[-_]/i.test(v.lang)), canListen, listen,
    startRecording, esc, norm, words, wordDiff, el, toast, qs };
})();

/* ---------- shared header + identity strip ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const J = window.JISR, h = document.getElementById("site-header");
  if (h) {
    const here = location.pathname.split("/").pop() || "index.html";
    const nav = [["checkin.html", "Check in"], ["schedule.html", "Lessons"], ["speak.html", "Speaking Lab"], ["me.html", "Me"]];
    h.innerHTML = `<a class="brand" href="index.html"><span class="mark" aria-hidden="true"><svg viewBox="0 0 40 24"><path d="M2 20 Q20 -4 38 20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M2 21h36" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg></span>${J.esc(J.C.programEn)} <span class="ar">${J.esc(J.C.programAr)}</span></a>
      <nav>${nav.map(n => `<a href="${n[0]}" class="${here === n[0] ? "on" : ""}">${n[1]}</a>`).join("")}</nav>
      <div class="who">${J.me() ? J.esc(J.me().name.split(" ")[0]) : ""}</div>`;
  }
});
