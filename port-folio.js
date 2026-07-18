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


  var projectData = {
    'n-drive': {
      title: 'N-Drive',
      stack: 'React · Django REST · TailwindCSS · SQLite · JWT · AI API',
      desc: 'Cloud-style file manager for uploading, organizing and sharing files and folders, with an integrated AI chat assistant, on-demand image generation, JWT-based auth and mock subscription plans. Screenshots below cover the dashboard, file explorer and AI assistant panel.',
      code: 'https://github.com/aflah-pp/N-Drive',
      demo: 'https://n-drive-app.netlify.app/',
      images: [
      'assets/projects/ndrive-1.png',
      'assets/projects/ndrive-2.jpeg',
      'assets/projects/ndrive-3.jpeg'
    ]
    },
    'cartify': {
      title: 'Cartify',
      stack: 'React · Django REST · SQLite · TailwindCSS · Cloudinary',
      desc: 'Full-stack e-commerce platform covering product listings, cart management and order processing, with product media handled through Cloudinary uploads. Screenshots below cover the storefront, cart flow and admin product view.',
      code: 'https://github.com/aflah-pp/Cartify',
      demo: 'https://app-cartify.netlify.app/',
      images: [
      'assets/projects/cartify-1.png',
      'assets/projects/cartify-2.png',
      'assets/projects/cartify-3.png'
    ]
    }
  };

  var overlay = document.getElementById('galleryOverlay');
  var galleryTitle = document.getElementById('galleryTitle');
  var galleryStack = document.getElementById('galleryStack');
  var galleryDesc = document.getElementById('galleryDesc');
  var galleryImgs = document.getElementById('galleryImgs');
  var galleryCode = document.getElementById('galleryCode');
  var galleryDemo = document.getElementById('galleryDemo');

  var placeholderIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>';

  function openGallery(key){
    var p = projectData[key];
    if(!p || !overlay) return;
    galleryTitle.textContent = p.title;
    galleryStack.textContent = p.stack;
    galleryDesc.textContent = p.desc;
    galleryCode.href = p.code;
    galleryDemo.href = p.demo;
    galleryImgs.innerHTML = '';
    for (var i = 0; i < p.images.length; i++) {
    var box = document.createElement('div');
    box.className = 'gallery-img';
    var img = document.createElement('img');
    img.src = p.images[i];
    img.alt = p.title + ' Screenshot ' + (i + 1);
    box.appendChild(img);
    galleryImgs.appendChild(box);
}
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeGallery(){
    if(!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-gallery]').forEach(function(btn){
    btn.addEventListener('click', function(){ openGallery(btn.getAttribute('data-gallery')); });
  });
  var galleryCloseBtn = document.getElementById('galleryClose');
  if (galleryCloseBtn) galleryCloseBtn.addEventListener('click', closeGallery);
  if (overlay) {
    overlay.addEventListener('click', function(e){ if (e.target === overlay) closeGallery(); });
  }
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeGallery(); });