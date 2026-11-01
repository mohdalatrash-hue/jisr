/* Shared rendering for free external resources */
(function () {
  const J = window.JISR, R = window.JISR_RES || { items: {}, weeks: {} };
  const SK = { listen: ["🎧", "Listening", "استماع"], read: ["📖", "Reading", "قراءة"], grammar: ["🧩", "Grammar", "قواعد"], write: ["✍️", "Writing", "كتابة"],
    vocab: ["🔤", "Vocabulary", "مفردات"], pron: ["🗣", "Pronunciation", "نطق"], video: ["🎬", "Video lessons", "دروس فيديو"], test: ["🎯", "Level tests", "اختبارات المستوى"] };
  function card(id, x, n) {
    const s = SK[x.s] || ["🔗", x.s, ""];
    return `<a class="tile res" href="${J.esc(x.u)}" target="_blank" rel="noopener" data-res="${J.esc(id)}" data-n="${n || 0}" style="padding:16px">
      <div class="row" style="justify-content:space-between;gap:6px"><span class="muted" style="font-size:.78rem">${s[0]} ${s[1]} · ${J.esc(x.l)}</span><span class="muted" style="font-size:.75rem">${J.esc(x.src)} ↗</span></div>
      <div style="font-weight:600;margin-top:6px;line-height:1.3">${J.esc(x.t)}</div>${x.n ? `<div class="muted" style="font-size:.85rem;margin-top:4px">${J.esc(x.n)}</div>` : ""}</a>`;
  }
  function bindClicks(root) {
    root.querySelectorAll("[data-res]").forEach(a => a.addEventListener("click", () => {
      const x = R.items[a.dataset.res]; if (x) J.saveScore(Number(a.dataset.n) || 0, "open:" + x.s + ":" + x.t, 1, 1);
    }));
  }
  function week(w) { return (R.weeks[w] || []).filter(id => R.items[id]); }
  function youglish(word) { return "https://youglish.com/pronounce/" + encodeURIComponent(String(word).split(/[\/(]/)[0].trim()) + "/english"; }
  window.JISR_RESOURCES = { R, SK, card, bindClicks, week, youglish };
})();
