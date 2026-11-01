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

  window.JISR_TOOLS = { languageTool, vocabProfile, renderLT, renderVocab, credit };
})();
