/* One check-in component, used on the Today page and on checkin.html */
(function () {
  const J = window.JISR;
  function mount(B, opts) {
    opts = opts || {};
    const t = J.todayISO(), s = J.sessionByDate(t);
    if (!s) { // no class today: show when check-in opens, and let a new trainee save his name in advance
      const nx = J.nextSession(t), u0 = J.me();
      B.innerHTML = `<p style="margin:0"><b>No class today.</b> <span class="ar muted">لا توجد جلسة اليوم</span></p>
        ${nx ? `<p class="muted" style="margin:4px 0 0">Check-in opens <b>${J.fmtDate(nx.date)}, 3:00–7:30 pm</b> · <span class="ar">يفتح التسجيل يوم الحصة</span></p>` : ""}
        ${u0 ? `<p style="margin:12px 0 0">✓ Ready: <b>${J.esc(u0.name)}</b> <a href="#" data-chg class="muted" style="font-size:.85rem">· not you?</a><br><span class="muted" style="font-size:.88rem">On class day you will only type the code.</span></p>`
             : `<p class="muted" style="margin:12px 0 0;font-size:.92rem">Save your name now, so on class day you only type the code.</p>
                <label>Your name <span class="ar muted">اسمك</span></label><input data-nm autocomplete="name"><label>Employee number <span class="ar muted">الرقم الوظيفي</span></label><input data-eid inputmode="numeric">
                <button class="btn" data-save style="width:100%;margin-top:14px">Save my name · حفظ</button><p data-msg class="center" style="color:var(--bad);margin:8px 0 0"></p>`}`;
      const c0 = B.querySelector("[data-chg]"); if (c0) c0.onclick = e => { e.preventDefault(); J.setMe(null); location.reload(); };
      const sv = B.querySelector("[data-save]");
      if (sv) sv.onclick = () => { const name = B.querySelector("[data-nm]").value.trim(), id = B.querySelector("[data-eid]").value.trim();
        if (!name || !id) return B.querySelector("[data-msg]").textContent = "Write your name and number."; J.setMe({ id, name }); location.reload(); };
      return; }
    const done = J.LS.get("checkins", {});
    const success = (name, demo) => {
      B.innerHTML = `<div class="row" style="justify-content:center;gap:12px"><span style="font-size:2rem;line-height:1">✓</span><div><b>You're checked in, ${J.esc(name.split(" ")[0])}.</b><div class="muted" style="font-size:.9rem">Session ${s.n} · ${J.fmtDate(t)}</div></div></div>${demo ? '<p class="notice center">Demo mode: saved on this phone only.</p>' : ""}`;
      opts.onDone && opts.onDone();
    };
    let u = J.me();
    if (done[t] && u) return success(u.name);
    const who = u ? `<p class="center" style="margin:0 0 4px">${J.esc(u.name)} <a href="#" data-chg class="muted" style="font-size:.85rem">· not you?</a></p>`
      : `<label>Your name <span class="ar muted">اسمك</span></label><input data-nm autocomplete="name"><label>Employee number <span class="ar muted">الرقم الوظيفي</span></label><input data-eid inputmode="numeric">`;
    B.innerHTML = `${opts.compact ? `<p class="eyebrow center" style="margin:0 0 8px">Step 1 · Check in · سجّل حضورك</p>` : ""}${who}
      <label>Code on the screen <span class="ar muted">الرمز المعروض</span></label>
      <input data-code inputmode="numeric" maxlength="4" autocomplete="one-time-code" style="font-size:2.2rem;font-weight:700;letter-spacing:.4em;text-align:center">
      <button class="btn big" data-go style="width:100%;margin-top:16px">I'm here · حاضر</button><p data-msg class="center" style="color:var(--bad);margin:8px 0 0"></p>`;
    const chg = B.querySelector("[data-chg]"); if (chg) chg.onclick = e => { e.preventDefault(); J.setMe(null); location.reload(); };
    B.querySelector("[data-go]").onclick = async () => {
      const msg = B.querySelector("[data-msg]"), code = B.querySelector("[data-code]").value.trim(); msg.textContent = "";
      let user = u;
      if (!user) { const name = B.querySelector("[data-nm]").value.trim(), id = B.querySelector("[data-eid]").value.trim(); if (!name || !id) return msg.textContent = "Write your name and number."; user = { id, name }; }
      if (!/^\d{4}$/.test(code)) return msg.textContent = "Type the 4-digit code.";
      const b = B.querySelector("[data-go]"); b.disabled = true;
      let r = await J.api("checkin", { traineeId: user.id, name: user.name, date: t, session: s.n, code });
      if (r.demo) r = { ok: true, demo: true };
      if (r.ok) { J.setMe(user); done[t] = Date.now(); J.LS.set("checkins", done); success(user.name, r.demo); }
      else { b.disabled = false; msg.textContent = r.error || "Try again."; }
    };
  }
  window.JISR_CHECKIN = { mount };
})();
