// Todo va dentro de una función que se ejecuta sola para no dejar variables globales.
// El script se carga con defer, así que el HTML ya está listo cuando llega aquí.
(function () {
  'use strict';

  const GITHUB_USER = 'DAN12590';
  const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=30`;
  const MAX_REPOS_SHOWN = 6;
  const FETCH_TIMEOUT_MS = 6000;
  const COPY_FEEDBACK_MS = 2200;

  // El repo del README del perfil y el de esta web no tiene sentido enseñarlos
  const HIDDEN_REPOS = ['DAN12590', 'hosting'];

  const LANGUAGE_CSS_CLASS = { Java: 'java', Python: 'py', JavaScript: 'js', HTML: 'html' };

  // GitHub detecta los .psc de PSeInt como "Papyrus"
  const LANGUAGE_OVERRIDES = { PSeInt: 'PSeInt' };

  // Para los repos que no tienen descripción en GitHub
  const REPO_DESCRIPTIONS = {
    'Tablero_Clases': 'Tablero 10×10 con movimiento del jugador y funciones reutilizables.',
    'Cleopatra-num-mas-cercano-': 'Reto de algoritmia: cálculo de distancias entre años a. C. y d. C.',
    'Java-practicas': 'Prácticas que fui haciendo cuando estuve empezando a aprender Java.',
    'GS': 'Retos y ejercicios de clase: sopa de letras, tesoro, hackatón.',
    'PDF-photo-viewer': 'Visor de PDFs en cuadrícula con React.',
    'Python-1': 'Prácticas, trabajos y exámenes de Python a lo largo del año.',
    'java-mision-03-rescate-David-Hernaez': 'Misión de rescate en un tablero 10×10 con obstáculos aleatorios y movimiento WASD.',
    'PSeInt': 'Primeros algoritmos en pseudocódigo con PSeInt.',
    'Warframe-Primes-checker': 'Tracker de colección con búsqueda, filtros y guardado en el navegador.'
  };

  const DEFAULT_DESCRIPTION = 'Ejercicios y prácticas de programación.';

  // Si la API falla (sin conexión o límite de 60 peticiones/hora) se enseñan estos.
  // Tienen el mismo formato que devuelve toRepoCard().
  const FALLBACK_REPOS = [
    { name: 'Tablero_Clases', language: 'Java' },
    { name: 'Cleopatra-num-mas-cercano-', language: 'Java' },
    { name: 'Java-practicas', language: 'Java' },
    { name: 'GS', language: 'Java' },
    { name: 'PDF-photo-viewer', language: 'JavaScript' },
    { name: 'Python-1', language: 'Python' }
  ].map((repo) => ({
    ...repo,
    description: REPO_DESCRIPTIONS[repo.name],
    url: `https://github.com/${GITHUB_USER}/${repo.name}`,
    updatedAt: null
  }));


  function showCurrentYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  function setupMobileMenu() {
    const menuButton = document.querySelector('.menu-btn');
    const menu = document.getElementById('menu');
    if (!menuButton || !menu) return;

    // aria-expanded es para lectores de pantalla, y el CSS lo usa para pintar la X
    function setMenuOpen(isOpen) {
      menu.classList.toggle('open', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
    }

    menuButton.addEventListener('click', () => {
      setMenuOpen(!menu.classList.contains('open'));
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });
  }

  // Añade .visible a cada sección cuando aparece en pantalla y el CSS hace la animación.
  // Con IntersectionObserver no hace falta escuchar el scroll todo el rato.
  function setupScrollReveal() {
    const sections = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // solo se anima la primera vez
        }
      });
    }, { threshold: 0.08 });

    sections.forEach((section) => observer.observe(section));
  }

  // Marca en el menú la sección que se está viendo. El rootMargin deja solo una
  // franja en el centro de la pantalla, así no hay dos secciones activas a la vez.
  function setupActiveNavLink() {
    if (!('IntersectionObserver' in window)) return;

    const navLinks = document.querySelectorAll('.menu-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const activeHref = '#' + entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === activeHref);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
  }

  // navigator.clipboard solo funciona en https, si falla tiro del método antiguo
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
  }

  function setupCopyEmail() {
    const button = document.getElementById('copy-email');
    if (!button) return;

    const hint = button.querySelector('.copy-email-hint');

    button.addEventListener('click', async () => {
      await copyToClipboard(button.dataset.email);

      button.classList.add('copied');
      hint.textContent = '¡copiado!';

      setTimeout(() => {
        button.classList.remove('copied');
        hint.textContent = 'copiar';
      }, COPY_FEEDBACK_MS);
    });
  }

  // "actualizado hace 3 días", "hace 2 meses"...
  function formatLastUpdate(isoDate) {
    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    const days = Math.floor((Date.now() - new Date(isoDate).getTime()) / MS_PER_DAY);

    if (days < 1) return 'actualizado hoy';
    if (days === 1) return 'actualizado ayer';
    if (days < 30) return `actualizado hace ${days} días`;

    const months = Math.floor(days / 30);
    if (months < 12) return `actualizado hace ${months} ${months === 1 ? 'mes' : 'meses'}`;

    const years = Math.floor(months / 12);
    return `actualizado hace ${years} ${years === 1 ? 'año' : 'años'}`;
  }

  // De todo lo que devuelve la API me quedo solo con lo que uso
  function toRepoCard(apiRepo) {
    return {
      name: apiRepo.name,
      description: apiRepo.description || REPO_DESCRIPTIONS[apiRepo.name],
      language: LANGUAGE_OVERRIDES[apiRepo.name] || apiRepo.language,
      url: apiRepo.html_url,
      updatedAt: apiRepo.pushed_at
    };
  }

  async function fetchRecentRepos() {
    // Si GitHub tarda demasiado se cancela la petición y salta al catch
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
      const response = await fetch(GITHUB_API_URL, { signal: controller.signal });
      if (!response.ok) {
        throw new Error(`GitHub respondió con el estado ${response.status}`);
      }

      const repos = await response.json();
      return repos
        .filter((repo) => !repo.fork && !HIDDEN_REPOS.includes(repo.name))
        .map(toRepoCard);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // Uso textContent en vez de innerHTML porque los datos vienen de fuera
  // y así no se puede colar HTML en la página
  function createRepoItem(repo) {
    const name = document.createElement('div');
    name.className = 'repo-name';
    name.textContent = repo.name;

    const description = document.createElement('div');
    description.className = 'repo-desc';
    description.textContent = repo.description || DEFAULT_DESCRIPTION;

    const languageDot = document.createElement('span');
    languageDot.className = 'lang-dot ' + (LANGUAGE_CSS_CLASS[repo.language] || '');

    const languageName = document.createElement('span');
    languageName.textContent = repo.language || '—';

    const meta = document.createElement('div');
    meta.className = 'repo-meta';
    meta.append(languageDot, languageName);

    if (repo.updatedAt) {
      const lastUpdate = document.createElement('span');
      lastUpdate.textContent = '· ' + formatLastUpdate(repo.updatedAt);
      meta.append(lastUpdate);
    }

    const link = document.createElement('a');
    link.className = 'repo-link';
    link.href = repo.url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.append(name, description, meta);

    const item = document.createElement('li');
    item.append(link);
    return item;
  }

  async function showGitHubRepos() {
    const list = document.getElementById('repo-list');
    if (!list) return;

    let repos = [];
    try {
      repos = await fetchRecentRepos();
    } catch (error) {
      console.warn('No se pudieron cargar los repos de GitHub', error);
    }

    if (repos.length === 0) {
      repos = FALLBACK_REPOS;
    }

    // Quita los skeleton de carga y mete los repos
    list.replaceChildren(...repos.slice(0, MAX_REPOS_SHOWN).map(createRepoItem));
  }


  function init() {
    document.documentElement.classList.remove('no-js');

    showCurrentYear();
    setupMobileMenu();
    setupScrollReveal();
    setupActiveNavLink();
    setupCopyEmail();
    showGitHubRepos();
  }

  init();
})();
