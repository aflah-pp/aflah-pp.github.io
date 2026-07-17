 var navItems = document.querySelectorAll('.nav-item');
  var panels = document.querySelectorAll('.panel');
  var pathTab = document.getElementById('pathTab');
  navItems.forEach(function(item){
    item.addEventListener('click', function(){
      var tab = item.getAttribute('data-tab');
      navItems.forEach(function(n){ n.classList.remove('active'); });
      panels.forEach(function(p){ p.classList.remove('active'); });
      item.classList.add('active');
      document.querySelector('.panel[data-panel="'+tab+'"]').classList.add('active');
      pathTab.textContent = tab;
    });
  });

  var isDark = true;
  function applyTheme(){
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    var label = isDark ? 'DARK' : 'LIGHT';
    var icon = isDark ? '☾' : '☀';
    document.getElementById('toggleLabel').textContent = label;
    document.getElementById('toggleKnob').textContent = icon;
    document.getElementById('toggleLabelM').textContent = label;
    document.getElementById('toggleKnobM').textContent = icon;
    document.getElementById('statusTheme').textContent = isDark ? 'dark-mode' : 'light-mode';
  }
  function toggleTheme(){ isDark = !isDark; applyTheme(); }
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.getElementById('themeToggleM').addEventListener('click', toggleTheme);
  applyTheme();
