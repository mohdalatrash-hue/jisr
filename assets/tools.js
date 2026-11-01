/* Jisr free diagnostic tools:
   - LanguageTool public API (grammar/spelling with error categories) — https://languagetool.org
   - CEFR-J vocabulary profile (Tono, TUFS) — word level of a learner's text, computed on the device */
(function () {
  const J = window.JISR;
  const CAT = { GRAMMAR: "Grammar", TYPOS: "Spelling & capitals", PUNCTUATION: "Punctuation", CASING: "Capital letters", CONFUSED_WORDS: "Confused words",
    STYLE: "Style", REDUNDANCY: "Repeated words", COLLOQUIALISMS: "Informal words", SEMANTICS: "Meaning", TYPOGRAPHY: "Typing", MISC: "Other" };

  async function languageTool(text) {
    try {
      const r = await fetch("https://api.languagetool.org/v2/check", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ text, language: "en-US", level: "picky" }) });
      if (!r.ok) return null;
      const d = await r.json();
      return d.matches.map(m => ({ cat: m.rule.category.id, label: CAT[m.rule.category.id] || m.rule.category.name, rule: m.rule.id, msg: m.message,
        bad: m.context.text.substr(m.context.offset, m.context.length), fix: (m.replacements[0] || {}).value || "" }));
    } catch (e) { return null; }
  }

  let lex = null;
  function loadLex() {
    if (lex) return Promise.resolve(lex);
    return new Promise(res => {
      const done = () => { lex = {}; Object.entries(window.JISR_CEFR || {}).forEach(([L, s]) => s.split(" ").forEach(w => lex[w] = Number(L))); res(lex); };
      if (window.JISR_CEFR) return done();
      const s = document.createElement("script"); s.src = "data/cefrj-words.js"; s.onload = done; s.onerror = () => { lex = {}; res(lex); }; document.head.appendChild(s);
    });
  }
  function levelOf(w) {
    if (lex[w]) return lex[w];
    const tries = [w.replace(/'s$/, ""), w.replace(/ies$/, "y"), w.replace(/es$/, ""), w.replace(/s$/, ""), w.replace(/ied$/, "y"), w.replace(/ed$/, ""), w.replace(/ed$/, "e"), w.replace(/ing$/, ""), w.replace(/ing$/, "e"), w.replace(/(.)\1ing$/, "$1"), w.replace(/(.)\1ed$/, "$1"), w.replace(/ly$/, ""), w.replace(/er$/, ""), w.replace(/est$/, "")];
    for (const t of tries) if (t !== w && lex[t]) return lex[t];
    return 0;
  }
  async function vocabProfile(text) {
    await loadLex();
    const ws = J.words(text).filter(w => /[a-z]/.test(w));
    const uniq = [...new Set(ws)], N = ["", "A1", "A2", "B1", "B2", "C1", "C2"], count = { A1: 0, A2: 0, B1: 0, B2: 0, C: 0, other: 0 }, above = [];
    uniq.forEach(w => { const L = levelOf(w); if (!L) count.other++; else if (L >= 5) { count.C++; above.push(w); } else { count[N[L]]++; if (L >= 3) above.push(w); } });
    const known = uniq.length - count.other || 1;
    const b1plus = count.B1 + count.B2 + count.C, reach = count.B2 + count.C >= 3 ? "B2" : b1plus >= 3 ? "B1" : count.A2 >= 3 ? "A2" : "A1";
    return { total: ws.length, unique: uniq.length, count, pct: Object.fromEntries(Object.entries(count).map(([k, v]) => [k, Math.round(100 * v / known)])), reach, above: above.slice(0, 12) };
  }

  function renderLT(list) {
    if (list === null) return `<p class="muted" style="font-size:.85rem">Grammar check unavailable right now.</p>`;
    if (!list.length) return `<p>✅ No spelling or grammar problems found by the checker.</p>`;
    const by = {}; list.forEach(m => (by[m.label] = by[m.label] || []).push(m));
    return `<p><b>${list.length} thing${list.length > 1 ? "s" : ""} to fix</b> — ${Object.entries(by).map(([k, v]) => `${J.esc(k)} ×${v.length}`).join(" · ")}</p>
      <ul class="list">${list.slice(0, 10).map(m => `<li>${m.bad ? `<s>${J.esc(m.bad)}</s> → <b>${J.esc(m.fix || "?")}</b> ` : ""}<span class="muted">${J.esc(m.msg)}</span></li>`).join("")}</ul>`;
  }
  function renderVocab(v) {
    const bar = (k, c) => `<div style="flex:${Math.max(v.pct[k], 1)};background:${c};height:10px" title="${k} ${v.pct[k]}%"></div>`;
    return `<p style="margin-bottom:6px"><b>Your words reach ${v.reach}</b> <span class="muted">· ${v.unique} different words</span></p>
      <div style="display:flex;border-radius:6px;overflow:hidden;gap:2px">${bar("A1", "#c7d7f0")}${bar("A2", "#8fb3e6")}${bar("B1", "#3f86d9")}${bar("B2", "#0b5cad")}${bar("C", "#062f5c")}</div>
      <p class="muted" style="font-size:.82rem;margin-top:4px">A1 ${v.pct.A1}% · A2 ${v.pct.A2}% · B1 ${v.pct.B1}% · B2 ${v.pct.B2}% · C ${v.pct.C}%${v.above.length ? ` — strong words: ${v.above.map(J.esc).join(", ")}` : ""}</p>`;
  }
  const credit = `<p class="muted" style="font-size:.75rem;margin-top:8px">Grammar check by <a href="https://languagetool.org" target="_blank">LanguageTool</a> · word levels from the CEFR-J Wordlist (Tono, TUFS)</p>`;


  /* ---------- capabilities of the backend (AI feedback / Azure pronunciation) ---------- */
  let capsP = null;
  function caps() {
    if (!J.online) return Promise.resolve({ ai: false, pron: false });
    if (!capsP) { const c = sessionStorage.getItem("jisr.caps"); capsP = c ? Promise.resolve(JSON.parse(c)) : J.api("caps").then(r => { const v = { ai: !!r.ai, pron: !!r.pron }; sessionStorage.setItem("jisr.caps", JSON.stringify(v)); return v; }).catch(() => ({ ai: false, pron: false })); }
    return capsP;
  }
  /* ---------- convert any recording to 16 kHz mono 16-bit WAV (what Azure needs) ---------- */
  async function toWav16k(blob) {
    const buf = await blob.arrayBuffer();
    const AC = window.AudioContext || window.webkitAudioContext, ac = new AC();
    const dec = await new Promise((res, rej) => ac.decodeAudioData(buf, res, rej)); ac.close && ac.close();
    const len = Math.ceil(dec.duration * 16000), off = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, len, 16000);
    const src = off.createBufferSource(); src.buffer = dec; src.connect(off.destination); src.start(0);
    const out = await off.startRendering(), f = out.getChannelData(0), b = new ArrayBuffer(44 + f.length * 2), v = new DataView(b);
    const W = (o, t) => { for (let i = 0; i < t.length; i++) v.setUint8(o + i, t.charCodeAt(i)); };
    W(0, "RIFF"); v.setUint32(4, 36 + f.length * 2, true); W(8, "WAVE"); W(12, "fmt "); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
    v.setUint32(24, 16000, true); v.setUint32(28, 32000, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); W(36, "data"); v.setUint32(40, f.length * 2, true);
    for (let i = 0; i < f.length; i++) { const x = Math.max(-1, Math.min(1, f[i])); v.setInt16(44 + i * 2, x < 0 ? x * 0x8000 : x * 0x7FFF, true); }
    let bin = ""; const u8 = new Uint8Array(b); for (let i = 0; i < u8.length; i += 0x8000) bin += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
    return { base64: btoa(bin), seconds: Math.round(dec.duration * 10) / 10 };
  }
  // friendly names for Azure (SAPI) phoneme symbols
  const PH = { p: "/p/ (park)", b: "/b/ (bark)", f: "/f/ (fan)", v: "/v/ (van)", th: "/θ/ (think)", dh: "/ð/ (this)", s: "/s/", z: "/z/", sh: "/ʃ/ (ship)", zh: "/ʒ/ (usually)", ch: "/tʃ/ (chair)", jh: "/dʒ/ (job)",
    r: "/r/ (red)", l: "/l/", w: "/w/ (west)", y: "/j/ (yes)", ng: "/ŋ/ (sing)", h: "/h/", k: "/k/", g: "/g/", t: "/t/", d: "/d/", m: "/m/", n: "/n/",
    iy: "ee (seat)", ih: "i (sit)", ey: "ay (day)", eh: "e (bed)", ae: "a (cat)", aa: "a (car)", ao: "aw (law)", ow: "oh (go)", uh: "oo (book)", uw: "oo (food)", ah: "u (cup)", ax: "ə (about)", er: "er (work)", ay: "eye (time)", aw: "ow (now)", oy: "oy (boy)" };
  function renderPron(r) {
    const col = x => x >= 80 ? "var(--ok)" : x >= 60 ? "var(--warn)" : "var(--bad)";
    const bar = (l, x) => `<div style="flex:1;min-width:110px"><div class="row" style="justify-content:space-between;font-size:.82rem"><span>${l}</span><b style="color:${col(x)}">${x}</b></div><div class="meter" style="background:var(--alt)"><i style="width:${x}%;background:${col(x)}"></i></div></div>`;
    const weak = []; r.words.forEach(w => w.ph.forEach(p => { if (p[1] < 60) weak.push([p[0], w.w, p[1]]); }));
    weak.sort((a, b) => a[2] - b[2]);
    return `<div class="fb"><h4>Pronunciation report · <span class="ar">تقرير النطق</span></h4>
      <div class="row" style="gap:14px;margin:8px 0">${bar("Overall", r.scores.pron)}${bar("Accuracy", r.scores.acc)}${bar("Fluency", r.scores.flu)}${bar("Completeness", r.scores.comp)}</div>
      <p style="font-size:1.08rem;line-height:1.9">${r.words.map(w => `<span title="${w.acc}" style="padding:1px 4px;border-radius:5px;background:color-mix(in srgb,${col(w.acc)} 14%,transparent);color:${col(w.acc)};${w.err === "Omission" ? "text-decoration:line-through;" : ""}">${J.esc(w.w)}</span>`).join(" ")}</p>
      ${weak.length ? `<p style="margin-bottom:4px"><b>Sounds to practise</b></p><ul class="list">${weak.slice(0, 5).map(x => `<li>${J.esc(PH[x[0]] || "/" + x[0] + "/")} in “${J.esc(x[1])}” — ${x[2]}/100 <a href="https://youglish.com/pronounce/${encodeURIComponent(x[1])}/english" target="_blank" rel="noopener">hear it</a></li>`).join("")}</ul>` : `<p>✅ Every sound above 60. Excellent.</p>`}
      <p class="muted" style="font-size:.75rem;margin:6px 0 0">Scored by Microsoft Azure Pronunciation Assessment</p></div>`;
  }
  function renderAI(f, kind) {
    const crit = f.criteria || {}, names = { pronunciation: "Pronunciation", fluency: "Fluency", grammar: "Grammar", vocabulary: "Vocabulary", task: "Task", organisation: "Organisation", mechanics: "Spelling & punctuation" };
    const dots = x => "●".repeat(Math.max(0, Math.min(5, Math.round(x)))) + "○".repeat(5 - Math.max(0, Math.min(5, Math.round(x))));
    return `<div class="fb"><div class="row" style="justify-content:space-between"><h4 style="margin:0">AI teacher feedback · <span class="ar">تقييم المعلم الآلي</span></h4><span>${f.cefr ? `<span class="chip">Level ${J.esc(f.cefr)}</span> ` : ""}<b>${J.esc(f.score)}/10</b></span></div>
      ${Object.keys(crit).length ? `<div class="grid g2" style="gap:4px 18px;margin:10px 0">${Object.entries(crit).map(([k, v]) => `<div class="row" style="justify-content:space-between;font-size:.9rem"><span>${J.esc(names[k] || k)}</span><span style="color:var(--blue);letter-spacing:2px">${dots(Number(v) || 0)}</span></div>`).join("")}</div>` : ""}
      ${f.heard ? `<p class="muted">Heard: “${J.esc(f.heard)}”</p>` : ""}<p>${J.esc(f.summary || "")}</p>
      ${(f.corrections || []).length ? `<p style="margin-bottom:4px"><b>Corrections</b></p><ul class="list">${f.corrections.map(c => `<li><s>${J.esc(c.wrong)}</s> → <b>${J.esc(c.right)}</b> ${c.type ? `<span class="chip" style="font-size:.7rem">${J.esc(c.type)}</span>` : ""} <span class="muted">${J.esc(c.why || "")}</span></li>`).join("")}</ul>` : ""}
      ${(f.pronunciation || []).length ? `<p style="margin-bottom:4px"><b>Pronunciation</b></p><ul class="list">${f.pronunciation.map(p => typeof p === "string" ? `<li>${J.esc(p)}</li>` : `<li><b>${J.esc(p.sound || "")}</b>${p.word ? ` in “${J.esc(p.word)}”` : ""} — ${J.esc(p.tip || "")}</li>`).join("")}</ul>` : ""}
      ${f.better ? `<p style="margin-bottom:4px"><b>A better version</b></p><p class="script">${J.esc(f.better)}</p>` : ""}
      ${f.arabic ? `<p class="ar">${J.esc(f.arabic)}</p>` : ""}<p class="muted" style="font-size:.75rem;margin:6px 0 0">Feedback by Google Gemini AI — check with your teacher if unsure.</p></div>`;
  }

  window.JISR_TOOLS = { languageTool, vocabProfile, renderLT, renderVocab, credit, caps, toWav16k, renderPron, renderAI };
})();
