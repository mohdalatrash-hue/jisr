/* Jisr activity widgets: quiz, listening, reading, vocabulary, role-play, speaking, writing, AI partner */
(function () {
  const J = window.JISR, esc = J.esc;

  /* ---------- QUIZ (mcq | tf | gap | match) ---------- */
  function quiz(container, questions, opts) {
    const id = "q" + Math.random().toString(36).slice(2, 7);
    const box = J.el(`<div class="quiz"></div>`);
    questions.forEach((q, i) => {
      let body = "";
      if (q.t === "mcq") body = `<div class="opts">${q.o.map((o, k) => `<label><input type="radio" name="${id}-${i}" value="${k}"> <span>${esc(o)}</span></label>`).join("")}</div>`;
      else if (q.t === "tf") body = `<div class="opts" style="grid-template-columns:1fr 1fr">${["True", "False"].map((o, k) => `<label><input type="radio" name="${id}-${i}" value="${k === 0}"> ${o} <span class="ar muted">${k === 0 ? "صح" : "خطأ"}</span></label>`).join("")}</div>`;
      else if (q.t === "gap") body = `<div style="margin-top:6px"><input class="gap" name="${id}-${i}" autocomplete="off" placeholder="type here…"></div>`;
      else if (q.t === "match") body = `<div class="opts">${q.pairs.map((p, k) => `<label style="justify-content:space-between"><span>${esc(p[0])}</span><select name="${id}-${i}-${k}" style="max-width:55%"><option value="">—</option>${shuffle(q.pairs.map(x => x[1])).map(x => `<option>${esc(x)}</option>`).join("")}</select></label>`).join("")}</div>`;
      const qtext = q.t === "gap" ? esc(q.q).replace(/_{2,}/, "<b>_____</b>") : esc(q.q);
      box.appendChild(J.el(`<div class="q" data-i="${i}"><div class="qt"><b>${i + 1}.</b> ${qtext} ${q.t === "tf" ? '<span class="badge">T / F</span>' : ""}</div>${body}<div class="why"></div></div>`));
    });
    const foot = J.el(`<div class="row" style="margin-top:10px"><button class="btn">Check answers · <span class="ar">تحقّق</span></button><button class="btn ghost sm" data-r>Try again</button><span class="score"></span></div>`);
    box.appendChild(foot); container.appendChild(box);
    foot.querySelector("[data-r]").onclick = () => { box.querySelectorAll("input[type=radio]").forEach(r => r.checked = false); box.querySelectorAll("input.gap").forEach(r => r.value = ""); box.querySelectorAll("select").forEach(s => s.value = ""); box.querySelectorAll(".q").forEach(q => q.classList.remove("right", "wrong")); foot.querySelector(".score").textContent = ""; };
    foot.querySelector(".btn").onclick = () => {
      let right = 0, max = 0;
      questions.forEach((q, i) => {
        const node = box.querySelector(`.q[data-i="${i}"]`); let ok = false, ans = "";
        if (q.t === "mcq") { const s = box.querySelector(`input[name="${id}-${i}"]:checked`); ok = s && Number(s.value) === q.a; ans = q.o[q.a]; }
        else if (q.t === "tf") { const s = box.querySelector(`input[name="${id}-${i}"]:checked`); ok = s && (s.value === "true") === q.a; ans = q.a ? "True" : "False"; }
        else if (q.t === "gap") { const v = J.norm(box.querySelector(`input[name="${id}-${i}"]`).value); const acc = [].concat(q.a); ok = acc.some(a => J.norm(a) === v); ans = acc[0]; }
        else if (q.t === "match") { ok = q.pairs.every((p, k) => box.querySelector(`select[name="${id}-${i}-${k}"]`).value === p[1]); ans = q.pairs.map(p => p[0] + " → " + p[1]).join("; "); }
        max++; if (ok) right++;
        node.classList.toggle("right", !!ok); node.classList.toggle("wrong", !ok);
        node.querySelector(".why").innerHTML = (ok ? "Correct. " : `Answer: <b>${esc(ans)}</b>. `) + esc(q.why || "");
      });
      foot.querySelector(".score").textContent = `${right} / ${max}`;
      opts && opts.onScore && opts.onScore(right, max);
    };
  }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  /* ---------- VOCABULARY ---------- */
  function vocab(container, list) {
    const box = J.el(`<div><div class="row no-print" style="margin-bottom:10px"><button class="btn alt sm" data-h>Hide Arabic (self-test)</button><button class="btn alt sm" data-p>▶ Hear all</button></div><div class="vocab"></div></div>`);
    const g = box.querySelector(".vocab");
    list.forEach(v => {
      const c = J.el(`<div class="vcard" title="Tap to hear"><div class="en">${esc(v[0])} <span aria-hidden="true">🔊</span></div><div class="ar">${esc(v[1])}</div><div class="ex">${esc(v[2] || "")}</div></div>`);
      c.onclick = () => { c.classList.remove("hide"); J.speak(v[0]).then(() => v[2] && J.speak(v[2])); };
      g.appendChild(c);
    });
    box.querySelector("[data-h]").onclick = () => g.querySelectorAll(".vcard").forEach(c => c.classList.toggle("hide"));
    box.querySelector("[data-p]").onclick = async () => { for (const v of list) { await J.speak(v[0]); } };
    container.appendChild(box);
  }

  /* ---------- LISTENING (browser voices read the script) ---------- */
  function listening(container, L, n) {
    const slots = {}; Object.keys(L.speakers || {}).forEach((k, i) => slots[k] = ["A", "B", "C", "D"][i]);
    const box = J.el(`<div class="card act"><span class="eyebrow">Listening · استماع</span><h3>🎧 ${esc(L.title)}</h3><p class="muted">${esc(L.intro || "")}</p>
      <div class="row no-print"><button class="btn" data-play>▶ Play</button><button class="btn ghost sm" data-stop>■ Stop</button>
      <label class="row" style="font-weight:500">Speed <select data-rate style="width:auto"><option value="0.7">Slow</option><option value="0.9">Normal</option><option value="1.05">Fast</option></select></label>
      <span class="muted" data-count>Plays: 0</span></div>
      <h4 style="margin-top:14px">Questions</h4><div data-q></div>
      <details style="margin-top:10px"><summary>Show transcript · <span class="ar">النص</span> (after you answer)</summary><div class="script">${L.lines.map((l, i) => `<p class="line" data-l="${i}"><b>${esc(L.speakers[l[0]] || l[0])}:</b> ${esc(l[1])}</p>`).join("")}</div></details></div>`);
    let plays = 0, stop = false;
    const rs = box.querySelector("[data-rate]"); rs.value = String(J.rate());
    rs.onchange = () => J.LS.set("rate", Number(rs.value));
    box.querySelector("[data-play]").onclick = async () => {
      stop = false; J.stopSpeaking(); plays++; box.querySelector("[data-count]").textContent = "Plays: " + plays;
      for (let i = 0; i < L.lines.length && !stop; i++) { await J.speak(L.lines[i][1], slots[L.lines[i][0]]); await new Promise(r => setTimeout(r, 250)); }
    };
    box.querySelector("[data-stop]").onclick = () => { stop = true; J.stopSpeaking(); };
    quiz(box.querySelector("[data-q]"), L.questions, { onScore: (r, m) => J.saveScore(n, "listening:" + L.title, r, m) });
    container.appendChild(box);
  }

  /* ---------- READING ---------- */
  function reading(container, R, n) {
    let html = R.text.map(p => `<p>${esc(p)}</p>`).join("");
    (R.glossary || []).forEach(g => { html = html.replace(new RegExp("\\b(" + g[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")\\b", "i"), `<mark title="${esc(g[1])}">$1</mark>`); });
    const box = J.el(`<div class="card act"><span class="eyebrow">Reading · قراءة</span><h3>📖 ${esc(R.title)}</h3>${R.intro ? `<p class="muted">${esc(R.intro)}</p>` : ""}
      <div class="row no-print"><button class="btn alt sm" data-read>🔊 Listen while you read</button><span class="muted" style="font-size:.85rem">Highlighted words: hover/tap for Arabic.</span></div>
      <div class="reading">${html}</div><h4>Questions</h4><div data-q></div></div>`);
    box.querySelectorAll("mark").forEach(m => m.onclick = () => J.toast(m.title));
    box.querySelector("[data-read]").onclick = async () => { J.stopSpeaking(); for (const p of R.text) await J.speak(p, "A"); };
    quiz(box.querySelector("[data-q]"), R.questions, { onScore: (r, m) => J.saveScore(n, "reading:" + R.title, r, m) });
    container.appendChild(box);
  }

  /* ---------- GUIDED ROLE-PLAY ---------- */
  function roleplay(container, P, n) {
    const box = J.el(`<div class="card act"><span class="eyebrow">Role-play · تمثيل أدوار</span><h3>🎭 ${esc(P.title)}</h3>
      <p>${esc(P.scene)}</p><p class="muted"><b>You are:</b> ${esc(P.you)} · <b>Partner:</b> ${esc(P.npc)}</p>
      <div class="chat" data-chat></div>
      <div class="row no-print" style="margin-top:10px" data-ctl><button class="btn" data-start>▶ Start</button></div>
      <div data-ai></div></div>`);
    const chat = box.querySelector("[data-chat]"), ctl = box.querySelector("[data-ctl]");
    const add = (cls, html) => { const b = J.el(`<div class="bubble ${cls}">${html}</div>`); chat.appendChild(b); chat.scrollTop = chat.scrollHeight; return b; };
    let step = 0, good = 0;
    async function next() {
      if (step >= P.steps.length) {
        add("tip", `🎉 Done! You matched <b>${good}/${P.steps.length}</b> key phrases. Now swap roles with a classmate, or try the free AI conversation below.`);
        J.saveScore(n, "roleplay:" + P.title, good, P.steps.length);
        ctl.innerHTML = `<button class="btn alt" data-again>↻ Again</button>`; ctl.querySelector("[data-again]").onclick = () => { chat.innerHTML = ""; step = 0; good = 0; next(); };
        return;
      }
      const s = P.steps[step];
      add("npc", `<b>${esc(P.npc)}:</b> ${esc(s.npc)}`); await J.speak(s.npc, "B");
      add("tip", `💡 ${esc(s.hint)}`);
      ctl.innerHTML = `${J.canListen() ? `<button class="btn rec" data-mic>🎤 Speak</button>` : ""}<input data-txt placeholder="…or type your answer" style="flex:1;min-width:180px"><button class="btn alt" data-send>Send</button><button class="btn ghost sm" data-model>Show model</button>`;
      const send = (t) => {
        if (!t.trim()) return;
        add("you", esc(t));
        const said = J.norm(t), ok = (s.keys || []).length === 0 || s.keys.some(k => [].concat(k).every(w => said.includes(J.norm(w))));
        if (ok) { good++; add("tip", `✅ Good. Model: “${esc(s.model)}”`); } else add("tip", `↪ Try to include: <b>${esc([].concat(s.keys[0]).join(" … "))}</b>. Model: “${esc(s.model)}”`);
        step++; setTimeout(next, 600);
      };
      ctl.querySelector("[data-send]").onclick = () => send(ctl.querySelector("[data-txt]").value);
      ctl.querySelector("[data-txt]").onkeydown = e => { if (e.key === "Enter") send(e.target.value); };
      ctl.querySelector("[data-model]").onclick = () => J.speak(s.model, "A").then(() => J.toast(s.model));
      const mic = ctl.querySelector("[data-mic]");
      if (mic) mic.onclick = async () => { mic.classList.add("live"); mic.textContent = "Listening…"; try { const t = await J.listen({ onInterim: x => ctl.querySelector("[data-txt]").value = x }); mic.classList.remove("live"); send(t || ctl.querySelector("[data-txt]").value); } catch (e) { mic.classList.remove("live"); mic.textContent = "🎤 Speak"; J.toast("Microphone: " + e.message); } };
    }
    box.querySelector("[data-start]").onclick = next;
    if (P.ai) aiPartner(box.querySelector("[data-ai]"), { scenario: P.ai, title: P.title, n });
    container.appendChild(box);
  }

  /* ---------- FREE AI CONVERSATION PARTNER ---------- */
  function aiPartner(container, cfg) {
    const box = J.el(`<details class="no-print" style="margin-top:12px"><summary><b>🤖 Free conversation with the AI partner</b> <span class="ar muted">محادثة حرّة مع الذكاء الاصطناعي</span></summary>
      <p class="muted" style="font-size:.9rem">${esc(cfg.scenario)}</p><div class="chat" data-c style="min-height:80px"></div>
      <div class="row" style="margin-top:8px">${J.canListen() ? `<button class="btn rec sm" data-mic>🎤</button>` : ""}<input data-t placeholder="Say or type…" style="flex:1"><button class="btn sm" data-s>Send</button></div></details>`);
    const c = box.querySelector("[data-c]"), hist = [];
    const add = (cls, h) => { const b = J.el(`<div class="bubble ${cls}">${h}</div>`); c.appendChild(b); c.scrollTop = c.scrollHeight; };
    async function send(t) {
      if (!t.trim()) return; box.querySelector("[data-t]").value = ""; add("you", esc(t)); hist.push({ role: "user", text: t });
      if (!J.online) { add("tip", "The AI partner is switched on once the program backend is connected. For now, practise this scene with a classmate. · سيتم تفعيل الشريك الذكي قريبًا"); return; }
      add("tip", "…");
      const u = J.me() || {}, r = await J.api("chat", { traineeId: u.id, name: u.name, scenario: cfg.scenario, history: hist.slice(-12) });
      c.lastChild.remove();
      if (!r.ok) { add("tip", "⚠ " + esc(r.error || "No reply")); return; }
      hist.push({ role: "model", text: r.reply });
      add("npc", esc(r.reply)); if (r.tip) add("tip", "✍ " + esc(r.tip));
      J.speak(r.reply, "B");
      if (hist.length >= 10) J.saveScore(cfg.n || 0, "ai-chat:" + cfg.title, 1, 1);
    }
    box.querySelector("[data-s]").onclick = () => send(box.querySelector("[data-t]").value);
    box.querySelector("[data-t]").onkeydown = e => { if (e.key === "Enter") send(e.target.value); };
    const mic = box.querySelector("[data-mic]");
    if (mic) mic.onclick = async () => { mic.classList.add("live"); try { const t = await J.listen({ onInterim: x => box.querySelector("[data-t]").value = x }); send(t); } catch (e) { J.toast(e.message); } mic.classList.remove("live"); };
    container.appendChild(box);
  }

  /* ---------- SPEAKING: read-aloud + timed free answer with AI feedback ---------- */
  function readAloud(container, sentences, n) {
    const box = J.el(`<div class="card act"><span class="eyebrow">Pronunciation · النطق</span><h3>🗣 Read aloud</h3>
      <p class="muted">Listen to the model, then press 🎤 and read the sentence. Green words were recognised; red words need practice.${J.canListen() ? "" : " <b>Speech recognition needs Chrome, Edge or Safari.</b>"}</p><div data-list></div></div>`);
    const list = box.querySelector("[data-list]"), scores = {};
    sentences.forEach((s, i) => {
      const r = J.el(`<div class="q"><div class="qt" style="font-size:1.08rem">${esc(s)}</div><div class="row no-print" style="margin-top:6px"><button class="btn alt sm" data-m>🔊 Model</button><button class="btn rec sm" data-r ${J.canListen() ? "" : "disabled"}>🎤 Read</button><span data-s class="score"></span></div><div class="diff" data-d style="margin-top:6px"></div></div>`);
      r.querySelector("[data-m]").onclick = () => J.speak(s, "A");
      const b = r.querySelector("[data-r]");
      const T = window.JISR_TOOLS;
      if (T) T.caps().then(c => { if (c.pron) { b.disabled = false; b.dataset.azure = "1"; b.textContent = "🎤 Read"; } });
      b.addEventListener("click", async ev => {
        if (b.dataset.azure !== "1") return;
        ev.stopImmediatePropagation();
        if (b._rec) { const rec = b._rec; b._rec = null; clearTimeout(b._t); b.classList.remove("live"); b.textContent = "⏳ Scoring…"; b.disabled = true;
          try { const a = await rec.stop(), wav = await T.toWav16k(a.blob), u = J.me() || {};
            const res = await J.api("pron", { traineeId: u.id, text: s, audio: wav.base64, seconds: wav.seconds, session: n });
            if (res.ok) { r.querySelector("[data-d]").innerHTML = T.renderPron(res); r.querySelector("[data-s]").textContent = res.scores.pron + "%"; scores[i] = res.scores.pron;
              const vals = Object.values(scores); J.saveScore(n, "read-aloud", Math.round(vals.reduce((x, y) => x + y, 0) / vals.length), 100); }
            else r.querySelector("[data-d]").innerHTML = `<p class="muted">⚠ ${J.esc(res.error || "Try again")}</p>`;
          } catch (e) { r.querySelector("[data-d]").innerHTML = `<p class="muted">⚠ ${J.esc(e.message)}</p>`; }
          b.disabled = false; b.textContent = "🎤 Read again"; return; }
        try { b._rec = await J.startRecording(); } catch (e) { return J.toast("Microphone: " + e.message); }
        b.classList.add("live"); b.textContent = "■ Stop"; b._t = setTimeout(() => b._rec && b.click(), 20000);
      }, true);
      b.onclick = async () => {
        b.classList.add("live"); b.textContent = "Listening…";
        try {
          const t0 = Date.now(), said = await J.listen(); const d = J.wordDiff(s, said), secs = (Date.now() - t0) / 1000;
          r.querySelector("[data-d]").innerHTML = d.parts.map(p => `<span class="${p.ok ? "ok" : "miss"}">${esc(p.w)}</span>`).join(" ") + `<div class="muted" style="font-size:.82rem">I heard: “${esc(said)}”</div>`;
          r.querySelector("[data-s]").textContent = d.score + "%"; scores[i] = d.score;
          const vals = Object.values(scores); J.saveScore(n, "read-aloud", Math.round(vals.reduce((a, b) => a + b, 0) / vals.length), 100);
        } catch (e) { J.toast("Microphone: " + e.message); }
        b.classList.remove("live"); b.textContent = "🎤 Read";
      };
      list.appendChild(r);
    });
    container.appendChild(box);
  }

  function speakTask(container, P, n) {
    const box = J.el(`<div class="card act"><span class="eyebrow">Speaking · محادثة</span><h3>🎙 ${esc(P.q)}</h3>
      ${P.tips ? `<ul class="list">${P.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
      <div class="row no-print"><button class="btn rec" data-r>🎤 Record (${P.time || 45}s)</button><span data-tm class="muted"></span></div>
      <p class="muted" data-live style="min-height:1.4em"></p><audio controls style="display:none;width:100%" data-a></audio><div data-fb></div></div>`);
    const btn = box.querySelector("[data-r]"); let active = null;
    btn.onclick = async () => {
      if (active) return active.finish();
      let rec, ctrl = {}, transcriptP;
      try { rec = await J.startRecording(); } catch (e) { return J.toast("Microphone blocked: " + e.message); }
      if (J.canListen()) transcriptP = J.listen({ continuous: true, controller: ctrl, onInterim: t => box.querySelector("[data-live]").textContent = t }).catch(() => "");
      btn.classList.add("live"); btn.textContent = "■ Stop"; const t0 = Date.now(), lim = (P.time || 45) * 1000;
      const iv = setInterval(() => { const s = Math.round((Date.now() - t0) / 1000); box.querySelector("[data-tm]").textContent = s + "s"; if (Date.now() - t0 > lim) active.finish(); }, 500);
      active = {
        finish: async () => {
          clearInterval(iv); active = null; btn.classList.remove("live"); btn.textContent = "🎤 Record again";
          ctrl.stop && ctrl.stop(); const audio = await rec.stop(); const transcript = transcriptP ? (await transcriptP) || box.querySelector("[data-live]").textContent : "";
          const secs = (Date.now() - t0) / 1000, a = box.querySelector("[data-a]"); a.src = audio.url; a.style.display = "block";
          feedback(box.querySelector("[data-fb]"), { kind: "speaking", prompt: P.q, transcript, audio, secs, level: P.level, n });
        }
      };
    };
    container.appendChild(box);
  }

  /* ---------- WRITING ---------- */
  function writing(container, W, n) {
    const key = "draft." + n + "." + W.title;
    const box = J.el(`<div class="card act"><span class="eyebrow">Writing · كتابة</span><h3>✍ ${esc(W.title)}</h3><p>${esc(W.task)}</p>
      ${W.checklist ? `<p class="muted" style="margin-bottom:4px"><b>Checklist</b></p><ul class="list">${W.checklist.map(c => `<li>${esc(c)}</li>`).join("")}</ul>` : ""}
      <textarea data-t placeholder="Write here… (${W.min || 50}–${W.max || 120} words)"></textarea>
      <div class="row no-print" style="margin-top:8px"><span data-wc class="muted">0 words</span><button class="btn" data-c>Get feedback · <span class="ar">التقييم</span></button><button class="btn ghost sm" data-m>Show model answer</button></div>
      <div data-model style="display:none" class="script"><b>Model answer</b><p>${esc(W.model || "").replace(/\n/g, "<br>")}</p></div><div data-fb></div></div>`);
    const t = box.querySelector("[data-t]"); t.value = J.LS.get(key, "");
    const wc = () => { const c = J.words(t.value).length; box.querySelector("[data-wc]").textContent = c + " words"; return c; }; wc();
    t.oninput = () => { wc(); J.LS.set(key, t.value); };
    box.querySelector("[data-m]").onclick = () => { const m = box.querySelector("[data-model]"); m.style.display = m.style.display === "none" ? "block" : "none"; };
    box.querySelector("[data-c]").onclick = () => {
      if (wc() < Math.min(15, W.min || 15)) return J.toast("Write a little more first.");
      feedback(box.querySelector("[data-fb]"), { kind: "writing", prompt: W.task, text: t.value, min: W.min, max: W.max, checklist: W.checklist, level: W.level, n, title: W.title });
    };
    container.appendChild(box);
  }

  /* ---------- FEEDBACK: AI (Gemini, when switched on) + free checkers (LanguageTool, CEFR-J word levels) ---------- */
  async function feedback(target, req) {
    target.innerHTML = `<div class="fb">⏳ Checking…</div>`;
    const u = J.me() || {}, T = window.JISR_TOOLS;
    const text = (req.kind === "speaking" ? req.transcript : req.text) || "";
    let aiP = Promise.resolve(null);
    if (J.online) {
      const payload = { traineeId: u.id, kind: req.kind, prompt: req.prompt, level: req.level || "A2-B1", session: req.n };
      if (req.kind === "speaking") { payload.transcript = req.transcript; payload.seconds = Math.round(req.secs); if (req.audio && req.audio.base64.length < 2.5e6) { payload.audio = req.audio.base64; payload.mime = req.audio.mime; } }
      else { payload.text = req.text; payload.checklist = req.checklist; }
      aiP = J.api("feedback", payload);
    }
    const ltP = T && req.kind === "writing" ? T.languageTool(text) : Promise.resolve(undefined);
    const vpP = T && text ? T.vocabProfile(text) : Promise.resolve(null);
    const [r, lt, vp] = await Promise.all([aiP, ltP, vpP]);
    const cats = {}; (lt || []).forEach(m => cats[m.cat] = (cats[m.cat] || 0) + 1);
    const tag = (Object.keys(cats).length ? " [" + Object.entries(cats).map(([k, v]) => k + "×" + v).join(",") + "]" : "") + (vp ? " {" + vp.reach + "}" : "");
    const actName = req.kind + (req.title ? ":" + req.title : ":" + String(req.prompt).slice(0, 30)) + tag;
    const checker = (lt !== undefined || vp) ? `<div class="fb"><h4>Checker · <span class="ar">التدقيق</span></h4>${lt !== undefined ? T.renderLT(lt) : ""}${vp ? T.renderVocab(vp) : ""}${T.credit}</div>` : "";
    if (r && r.ok && r.feedback) {
      target.innerHTML = T.renderAI(r.feedback, req.kind) + checker;
      J.saveScore(req.n, actName + (r.feedback.cefr ? " <" + r.feedback.cefr + ">" : ""), Number(r.feedback.score) || 0, 10);
      return;
    }
    // rule-based quick check (no AI)
    const w = J.words(text), n = w.length, uniq = new Set(w).size, sentences = (text.match(/[.!?]/g) || []).length, notes = [];
    if (req.kind === "speaking") {
      const wpm = req.secs ? Math.round(n / (req.secs / 60)) : 0;
      notes.push(`You spoke ${n} words in ${Math.round(req.secs)} s (≈${wpm} words/min). Aim for 70–110 at this level.`);
      if (!text) notes.push("No speech was recognised. Speak closer to the microphone, in Chrome or Safari.");
    } else {
      if (req.min && n < req.min) notes.push(`Too short: ${n} words (target ${req.min}–${req.max}).`);
      if (req.max && n > req.max * 1.3) notes.push(`A little long: ${n} words (target ${req.min}–${req.max}).`);
      if (sentences < 2) notes.push("Use full sentences that end with a full stop (.)");
    }
    const issues = notes.length - (req.kind === "speaking" ? 1 : 0) + Math.min(4, Math.ceil((lt || []).length / 2));
    const lvlBonus = vp ? ({ A1: 0, A2: 0, B1: 1, B2: 1 }[vp.reach] || 0) : 0;
    const sc = Math.max(1, Math.min(10, Math.round((Math.min(n, (req.min || 40)) / (req.min || 40)) * 6 + Math.min(uniq / Math.max(n, 1), .8) * 5) - issues + lvlBonus));
    target.innerHTML = `<div class="fb"><h4>Score — ${sc}/10</h4>${notes.length ? `<ul class="list">${notes.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}</div>${checker}`;
    J.saveScore(req.n, actName, sc, 10);
  }

  window.JISR_ACT = { quiz, vocab, listening, reading, roleplay, aiPartner, readAloud, speakTask, writing, feedback };
})();
