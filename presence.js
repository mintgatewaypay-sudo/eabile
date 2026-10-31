(function () {
  if (window.__presenceActive) return;
  window.__presenceActive = true;

  var SB_URL = "https://rfmbqnfjfaheiyfmaszu.supabase.co/rest/v1";
  var SB_KEY = "sb_publishable_Pncr0c7uPG8FNqH5qWz7cQ_kA-0uKIA";
  var SID_KEY = "eabile_sid";

  function getSid() {
    try {
      var s = sessionStorage.getItem(SID_KEY);
      if (s) return s;
    } catch (e) {}
    var s = "v_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 10);
    try { sessionStorage.setItem(SID_KEY, s); } catch (e) {}
    return s;
  }

  function getPage() {
    var p = location.pathname.replace(/^\/+/, "").replace(/\.html$/, "");
    return p || "home";
  }

  var sid = getSid();
  var hdrs = {
    "apikey": SB_KEY,
    "Authorization": "Bearer " + SB_KEY,
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
  };

  function beat() {
    try {
      fetch(SB_URL + "/site_visitors?visitor_id=eq." + encodeURIComponent(sid), {
        method: "DELETE",
        headers: hdrs
      }).then(function () {
        return fetch(SB_URL + "/site_visitors", {
          method: "POST",
          headers: hdrs,
          body: JSON.stringify({ visitor_id: sid })
        });
      }).catch(function () {});
    } catch (e) {}
  }

  beat();
  setInterval(beat, 10000);
})();
