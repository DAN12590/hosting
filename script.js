// Portfolio · David Hernáez Castejón
(function () {
  'use strict';

  const GITHUB_USER = 'DAN12590';
  const HIDDEN_REPOS = ['DAN12590', 'hosting'];
  const LANG_CLASS = { Java: 'java', Python: 'py', JavaScript: 'js', HTML: 'html' };

  // Repos que se muestran si la API de GitHub no responde (sin conexión o límite de peticiones)
  const FALLBACK_REPOS = [
    { name: 'Tablero_Clases', language: 'Java', description: 'Tablero 10×10 con movimiento del jugador y funciones reutilizables.', html_url: 'https://github.com/DAN12590/Tablero_Clases' },
    { name: 'Cleopatra-num-mas-cercano-', language: 'Java', description: 'Reto de algoritmia: cálculo de distancias entre años a. C. y d. C.', html_url: 'https://github.com/DAN12590/Cleopatra-num-mas-cercano-' },
    { name: 'Java-practicas', language: 'Java', description: 'Prácticas que fui haciendo cuando estuve empezando a aprender Java.', html_url: 'https://github.com/DAN12590/Java-practicas' },
    { name: 'GS', language: 'Java', description: 'Retos y ejercicios de clase: sopa de letras, tesoro, hackatón.', html_url: 'https://github.com/DAN12590/GS' },
    { name: 'PDF-photo-viewer', language: 'JavaScript', description: 'Visor de PDFs en cuadrícula con React.', html_url: 'https://github.com/DAN12590/PDF-photo-viewer' },
    { name: 'Python-1', language: 'Python', description: 'Prácticas, trabajos y exámenes de Python a lo largo del año.', html_url: 'https://github.com/DAN12590/Python-1' }
  ];

  // Descripciones en español para repos que no tienen descripción en GitHub
  const DESCRIPTIONS = {};
  FALLBACK_REPOS.forEach((r) => { DESCRIPTIONS[r.name] = r.description; });
  Object.assign(DESCRIPTIONS, {
    'java-mision-03-rescate-David-Hernaez': 'Misión de rescate en un tablero 10×10 con obstáculos aleatorios y movimiento WASD.',
    'PSeInt': 'Primeros algoritmos en pseudocódigo con PSeInt.',
    'Warframe-Primes-checker': 'Tracker de colección con búsqueda, filtros y guardado en el navegador.'
  });
  // GitHub detecta mal algunos lenguajes (los .psc de PSeInt salen como "Papyrus")
  const LANG_OVERRIDE = { PSeInt: 'PSeInt' };

  document.documentElement.classList.remove('no-js');

  // ---------- Año del footer ----------
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // ---------- Menú móvil ----------
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.getElementById('menu');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // ---------- Animación al hacer scroll + enlace activo ----------
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));

    const navLinks = document.querySelectorAll('.menu > a[href^="#"]');
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  // ---------- Copiar email ----------
  const copyBtn = document.getElementById('copy-email');
  if (copyBtn) {
    const label = copyBtn.querySelector('small');
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.dataset.email;
      try {
        await navigator.clipboard.writeText(email);
      } catch (err) {
        const tmp = document.createElement('textarea');
        tmp.value = email;
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand('copy');
        tmp.remove();
      }
      copyBtn.classList.add('copied');
      label.textContent = '¡copiado!';
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        label.textContent = 'copiar';
      }, 2200);
    });
  }

  // ---------- Repos en vivo desde la API de GitHub ----------
  const list = document.getElementById('repo-list');

  function timeAgo(iso) {
    if (!iso) return '';
    const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
    if (days < 1) return 'actualizado hoy';
    if (days === 1) return 'actualizado ayer';
    if (days < 30) return `actualizado hace ${days} días`;
    const months = Math.floor(days / 30);
    if (months < 12) return `actualizado hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
    const years = Math.floor(months / 12);
    return `actualizado hace ${years} ${years === 1 ? 'año' : 'años'}`;
  }

  function renderRepos(repos) {
    list.innerHTML = '';
    repos.slice(0, 6).forEach((r) => {
      const li = document.createElement('li');
      li.className = 'repo';
      const a = document.createElement('a');
      a.href = r.html_url;
      a.target = '_blank';
      a.rel = 'noopener';

      const name = document.createElement('div');
      name.className = 'r-name';
      name.textContent = r.name;

      const desc = document.createElement('div');
      desc.className = 'r-desc';
      desc.textContent = r.description || DESCRIPTIONS[r.name] || 'Ejercicios y prácticas de programación.';

      const meta = document.createElement('div');
      meta.className = 'r-meta';
      const dot = document.createElement('span');
      const language = LANG_OVERRIDE[r.name] || r.language;
      dot.className = 'lang-dot ' + (LANG_CLASS[language] || 'other');
      const lang = document.createElement('span');
      lang.textContent = language || '—';
      meta.append(dot, lang);
      if (r.pushed_at) {
        const sep = document.createElement('span');
        sep.textContent = '· ' + timeAgo(r.pushed_at);
        meta.append(sep);
      }

      a.append(name, desc, meta);
      li.append(a);
      list.append(li);
    });
  }

  if (list) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 6000);
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=30`, { signal: ctrl.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((repos) => {
        const visible = repos.filter((r) => !r.fork && !HIDDEN_REPOS.includes(r.name));
        renderRepos(visible.length ? visible : FALLBACK_REPOS);
      })
      .catch(() => renderRepos(FALLBACK_REPOS))
      .finally(() => clearTimeout(timer));
  }
})();
