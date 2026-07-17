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
    var icon = isDark ? 'â˜¾' : 'â˜€';
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

  // ---------- Project Inspector ----------
  var projectData = {
    ndrive: {
      file: 'n-drive.md',
      title: 'N-Drive',
      img: './assets/projects/ndrive-preview.png',
      overview: 'A cloud-based file management platform for securely uploading, organizing, sharing and downloading files and folders, built with an integrated AI chat assistant and image generation.',
      features: [
        'Upload, organize, share and download files and folders',
        'JWT-based authentication and session handling',
        'Integrated AI chat assistant for in-app help',
        'AI image generation tool built into the workspace',
        'Subscription plan simulation for tiered access'
      ],
      stack: ['React', 'Django REST Framework', 'Tailwind CSS', 'SQLite Database', 'JWT', 'AI API'],
      architecture: 'React SPA frontend consuming a Django REST Framework API. JWT handles auth and protected routes, SQLite stores file metadata and user records, and an AI API layer powers the in-app assistant and image generation features.',
      challenges: 'Keeping file operations (upload, move, share) consistent and fast on a relational schema, and wiring the AI assistant into the UI without blocking the main file-browsing experience.',
      github: 'https://github.com/aflah-pp/N-Drive',
      demo: 'https://n-drive-app.netlify.app/'
    },
    cartify: {
      file: 'cartify.md',
      title: 'Cartify',
      img: './assets/projects/cartify-preview.png',
      overview: 'A full-stack e-commerce platform covering product listing, cart management and order processing, with product media managed through Cloudinary.',
      features: [
        'Product catalog with listing and detail views',
        'Cart management with persistent state',
        'End-to-end order processing flow',
        'Cloudinary-powered product media uploads',
        'Responsive layout across devices'
      ],
      stack: ['React', 'Django REST Framework', 'SQLite Database', 'Tailwind CSS', 'Cloudinary'],
      architecture: 'React frontend backed by a Django REST Framework API and SQLite database. Product images are uploaded and served via Cloudinary, keeping media out of the application server.',
      challenges: 'Keeping cart state accurate across sessions and page reloads, and structuring the order pipeline so product, cart and checkout stay in sync without race conditions.',
      github: 'https://github.com/aflah-pp/Cartify',
      demo: 'https://app-cartify.netlify.app/'
    }
  };

  var overlay = document.getElementById('inspOverlay');
  var inspector = document.getElementById('inspector');
  var inspClose = document.getElementById('inspClose');
  var inspImg = document.getElementById('inspImg');
  var lastTrigger = null;
  var isTouch = window.matchMedia('(hover: none)').matches;
  var hoverTimer = null;

  function fillInspector(key){
    var d = projectData[key];
    if(!d) return;
    document.getElementById('inspFileName').textContent = d.file;
    document.getElementById('inspTitle').textContent = d.title;
    document.getElementById('inspOverview').textContent = d.overview;

    var featuresEl = document.getElementById('inspFeatures');
    featuresEl.innerHTML = '';
    d.features.forEach(function(f){
      var li = document.createElement('li');
      li.innerHTML = '<span class="chk">âœ“</span><span>' + f + '</span>';
      featuresEl.appendChild(li);
    });

    var tagsEl = document.getElementById('inspTags');
    tagsEl.innerHTML = '';
    d.stack.forEach(function(t){
      var span = document.createElement('span');
      span.className = 'tag';
      span.textContent = t;
      tagsEl.appendChild(span);
    });

    document.getElementById('inspArch').textContent = d.architecture;
    document.getElementById('inspChallenges').textContent = d.challenges;

    document.getElementById('inspGithub').href = d.github;
    document.getElementById('inspDemo').href = d.demo;

    inspImg.classList.remove('loaded');
    inspImg.alt = d.title + ' project screenshot';
    var img = new Image();
    img.onload = function(){ inspImg.src = d.img; inspImg.classList.add('loaded'); };
    img.onerror = function(){ inspImg.src = d.img; inspImg.classList.add('loaded'); };
    img.src = d.img;
  }

  function positionInspector(triggerEl){
    if(window.matchMedia('(max-width: 860px)').matches){
      inspector.classList.remove('centered');
      inspector.style.left = '';
      inspector.style.top = '';
      return;
    }
    var card = triggerEl.closest('.proj-card');
    var cardRect = card.getBoundingClientRect();
    var inspW = 400;
    var inspH = Math.min(600, window.innerHeight - 32);
    var gap = 14;
    var spaceRight = window.innerWidth - cardRect.right;
    var left, top;

    if(spaceRight >= inspW + gap + 16){
      left = cardRect.right + gap;
      top = Math.min(cardRect.top, window.innerHeight - inspH - 16);
      inspector.classList.remove('centered');
    } else if(cardRect.left >= inspW + gap + 16){
      left = cardRect.left - inspW - gap;
      top = Math.min(cardRect.top, window.innerHeight - inspH - 16);
      inspector.classList.remove('centered');
    } else {
      left = (window.innerWidth - inspW) / 2;
      top = (window.innerHeight - inspH) / 2;
      inspector.classList.add('centered');
    }
    top = Math.max(16, top);
    left = Math.max(16, left);
    inspector.style.left = left + 'px';
    inspector.style.top = top + 'px';
  }

  function openInspector(key, triggerEl){
    fillInspector(key);
    positionInspector(triggerEl);
    overlay.classList.add('open');
    inspector.classList.add('open');
    document.body.classList.add('inspector-lock');
    lastTrigger = triggerEl;
    triggerEl.setAttribute('aria-expanded', 'true');
    inspClose.focus();
  }

  function closeInspector(){
    overlay.classList.remove('open');
    inspector.classList.remove('open');
    document.body.classList.remove('inspector-lock');
    if(lastTrigger){
      lastTrigger.setAttribute('aria-expanded', 'false');
      lastTrigger.focus();
      lastTrigger = null;
    }
  }

  function isInspectorOpen(){
    return inspector.classList.contains('open');
  }

  document.querySelectorAll('[data-project-trigger]').forEach(function(btn){
    var key = btn.getAttribute('data-project-trigger');

    btn.addEventListener('click', function(e){
      e.stopPropagation();
      if(isInspectorOpen() && lastTrigger === btn){
        closeInspector();
      } else {
        openInspector(key, btn);
      }
    });

    if(!isTouch){
      btn.addEventListener('mouseenter', function(){
        clearTimeout(hoverTimer);
        openInspector(key, btn);
      });
      btn.addEventListener('mouseleave', function(){
        hoverTimer = setTimeout(function(){
          if(!inspector.matches(':hover')) closeInspector();
        }, 180);
      });
    }
  });

  if(!isTouch){
    inspector.addEventListener('mouseleave', function(){
      hoverTimer = setTimeout(closeInspector, 180);
    });
    inspector.addEventListener('mouseenter', function(){
      clearTimeout(hoverTimer);
    });
  }

  overlay.addEventListener('click', closeInspector);
  inspClose.addEventListener('click', closeInspector);
  inspClose.addEventListener('keydown', function(e){
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); closeInspector(); }
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && isInspectorOpen()) closeInspector();
  });

  document.addEventListener('click', function(e){
    if(!isInspectorOpen()) return;
    if(inspector.contains(e.target)) return;
    if(e.target.closest('[data-project-trigger]')) return;
    closeInspector();
  });

  window.addEventListener('resize', function(){
    if(isInspectorOpen() && lastTrigger) positionInspector(lastTrigger);
  });
