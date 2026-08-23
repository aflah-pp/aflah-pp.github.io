(function () {
  var root = document.documentElement;
  var page = document.getElementById("page");

  function fit() {
    root.style.setProperty("--scale", "1");
    var stageH = window.innerHeight;
    var stageW = window.innerWidth;

    page.style.transform = "scale(1)";
    var needH = page.scrollHeight;
    var needW = page.scrollWidth;
    var s = Math.min(stageH / needH, stageW / needW, 1);
    s = Math.max(s, 0.45);
    root.style.setProperty("--scale", s.toFixed(3));
  }

  window.addEventListener("load", fit);
  window.addEventListener("resize", fit);
  window.addEventListener("orientationchange", fit);
  fit();
})();
