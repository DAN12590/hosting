// Warframe Prime Tracker
// PRIME_DATA viene de data.js, que se carga antes que este archivo.

const STORAGE_KEY = 'warframe_prime_tracker';
const SEARCH_DELAY_MS = 200;
const TOAST_DURATION_MS = 2000;

// Qué objetos salen en cada pestaña (la clave es el data-tab del HTML)
const ITEMS_BY_TAB = {
    warframes: PRIME_DATA.warframes,
    weapons: PRIME_DATA.weapons,
    sentinels: [...PRIME_DATA.sentinels, ...PRIME_DATA.sentinelWeapons],
    archwings: PRIME_DATA.archwings
};

const ALL_ITEMS = Object.values(ITEMS_BY_TAB).flat();

const state = {
    activeTab: 'warframes',
    statusFilter: 'all',
    categoryFilter: 'all',
    searchQuery: '',
    // { idObjeto: { indiceComponente: true/false } }
    // Va por índice y no por nombre porque hay piezas repetidas (dos "Blade", por ejemplo)
    progress: {}
};


// Guardado en localStorage

function loadProgress() {
    try {
        state.progress = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (error) {
        // JSON roto o localStorage bloqueado: se empieza de cero
        console.error('No se pudo cargar el progreso', error);
        state.progress = {};
    }
}

function saveProgress() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
    } catch (error) {
        console.error('No se pudo guardar el progreso', error);
    }
}


// Cálculos de progreso

function findItem(itemId) {
    return ALL_ITEMS.find((item) => item.id === itemId);
}

function isOwned(itemId, componentIndex) {
    return state.progress[itemId]?.[componentIndex] === true;
}

function getItemProgress(item) {
    const total = item.components.length;
    const owned = item.components.filter((_, index) => isOwned(item.id, index)).length;

    return {
        owned,
        total,
        percent: Math.round((owned / total) * 100),
        isComplete: owned === total
    };
}

function getGlobalStats() {
    let ownedComponents = 0;
    let totalComponents = 0;
    let completeItems = 0;

    ALL_ITEMS.forEach((item) => {
        const progress = getItemProgress(item);
        ownedComponents += progress.owned;
        totalComponents += progress.total;
        if (progress.isComplete) completeItems++;
    });

    return {
        complete: completeItems,
        incomplete: ALL_ITEMS.length - completeItems,
        percent: Math.round((ownedComponents / totalComponents) * 100)
    };
}


// Marcar y desmarcar

function toggleComponent(itemId, componentIndex) {
    const item = findItem(itemId);
    const nowOwned = !isOwned(itemId, componentIndex);

    state.progress[itemId] = state.progress[itemId] || {};
    state.progress[itemId][componentIndex] = nowOwned;

    saveProgress();
    render();

    const componentName = item.components[componentIndex];
    if (nowOwned) {
        showToast(`${componentName} de ${item.name} conseguido`, 'success');
    } else {
        showToast(`${componentName} de ${item.name} desmarcado`);
    }
}

function setAllComponents(itemId, owned) {
    const item = findItem(itemId);

    state.progress[itemId] = {};
    item.components.forEach((_, index) => {
        state.progress[itemId][index] = owned;
    });

    saveProgress();
    render();

    if (owned) {
        showToast(`${item.name} completado`, 'success');
    } else {
        showToast(`${item.name} reiniciado`);
    }
}


// Filtros

function matchesStatusFilter(item) {
    const progress = getItemProgress(item);

    switch (state.statusFilter) {
        case 'complete':
            return progress.isComplete;
        case 'in-progress':
            return progress.owned > 0 && !progress.isComplete;
        case 'missing':
            return progress.owned === 0;
        default:
            return true;
    }
}

function getVisibleItems() {
    const query = state.searchQuery.trim().toLowerCase();

    // filter() devuelve un array nuevo, así el sort no desordena PRIME_DATA
    return ITEMS_BY_TAB[state.activeTab]
        .filter((item) => state.categoryFilter === 'all' || item.category === state.categoryFilter)
        .filter(matchesStatusFilter)
        .filter((item) => item.name.toLowerCase().includes(query))
        .sort((a, b) => a.name.localeCompare(b.name));
}


// Pintar la página

function getCategoryLabel(item) {
    if (item.category) {
        return item.subtype ? `${item.category} • ${item.subtype}` : item.category;
    }
    if (item.type === 'sentinel') return 'Centinela Prime';
    if (item.type === 'archwing') return 'Archwing Prime';
    return 'Warframe Prime';
}

// Si una pieza está repetida se numera para distinguirlas: Blade #1, Blade #2
function getComponentLabels(components) {
    const timesSeen = {};

    return components.map((name) => {
        const total = components.filter((other) => other === name).length;
        if (total === 1) return name;

        timesSeen[name] = (timesSeen[name] || 0) + 1;
        return `${name} #${timesSeen[name]}`;
    });
}

// Uso plantillas con innerHTML porque los datos son míos (data.js),
// no vienen del usuario ni de una API
function renderComponent(item, label, index) {
    const owned = isOwned(item.id, index);

    return `
        <button type="button" class="component-item ${owned ? 'owned' : ''}"
                data-item-id="${item.id}" data-index="${index}" aria-pressed="${owned}">
            <span class="component-checkbox">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </span>
            <span class="component-name">${label}</span>
        </button>
    `;
}

function renderItemCard(item) {
    const progress = getItemProgress(item);
    const componentsHtml = getComponentLabels(item.components)
        .map((label, index) => renderComponent(item, label, index))
        .join('');

    const statusBadge = progress.isComplete
        ? '<span class="status-badge complete">Completo</span>'
        : `<span class="status-badge incomplete">${progress.owned}/${progress.total}</span>`;

    return `
        <article class="item-card ${progress.isComplete ? 'complete' : ''}">
            <header class="card-header">
                <div>
                    <h3 class="item-name">${item.name}</h3>
                    <span class="item-category">${getCategoryLabel(item)}</span>
                </div>
                ${statusBadge}
            </header>

            <div class="progress-container">
                <div class="progress-info">
                    <span class="progress-text">Progreso</span>
                    <span class="progress-percent">${progress.percent}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress.percent}%"></div>
                </div>
            </div>

            <div class="components-list">${componentsHtml}</div>

            <div class="card-actions">
                <button type="button" class="action-btn mark-all" data-item-id="${item.id}">✅ Marcar todo</button>
                <button type="button" class="action-btn clear-all" data-item-id="${item.id}">🔄 Reiniciar</button>
            </div>
        </article>
    `;
}

function renderItems() {
    const grid = document.getElementById('itemsGrid');
    const items = getVisibleItems();

    if (items.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <h3 class="empty-state-title">No se encontraron objetos</h3>
                <p class="empty-state-text">Prueba a cambiar los filtros o la búsqueda</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = items.map(renderItemCard).join('');
}

function renderStats() {
    const stats = getGlobalStats();
    document.getElementById('totalComplete').textContent = stats.complete;
    document.getElementById('totalIncomplete').textContent = stats.incomplete;
    document.getElementById('totalProgress').textContent = `${stats.percent}%`;
}

function render() {
    renderItems();
    renderStats();
}

// El número de cada pestaña no cambia, se pone una vez al arrancar
function renderTabCounts() {
    document.querySelectorAll('.nav-tab').forEach((tab) => {
        tab.querySelector('.tab-count').textContent = ITEMS_BY_TAB[tab.dataset.tab].length;
    });
}

function fillCategoryFilter() {
    const select = document.getElementById('categoryFilter');
    const categories = [...new Set(PRIME_DATA.weapons.map((weapon) => weapon.category))];

    categories.forEach((category) => {
        select.add(new Option(category, category));
    });
}


// Notificaciones

function showToast(message, type = 'info') {
    const icon = document.createElement('span');
    icon.className = 'toast-icon';
    icon.textContent = type === 'success' ? '✅' : 'ℹ️';

    const text = document.createElement('span');
    text.className = 'toast-message';
    text.textContent = message;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.append(icon, text);
    document.getElementById('toastContainer').append(toast);

    setTimeout(() => {
        toast.classList.add('hiding'); // animación de salida, dura 300ms
        setTimeout(() => toast.remove(), 300);
    }, TOAST_DURATION_MS);
}


// Exportar e importar

function exportData() {
    const json = JSON.stringify(state.progress, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const today = new Date().toISOString().slice(0, 10);

    // Truco para descargar un archivo: un enlace temporal con "download" y click()
    const link = document.createElement('a');
    link.href = url;
    link.download = `warframe-prime-data-${today}.json`;
    link.click();
    URL.revokeObjectURL(url);

    showToast('Datos exportados', 'success');
}

function isValidProgress(data) {
    return data !== null && typeof data === 'object' && !Array.isArray(data);
}

async function importData(event) {
    const input = event.target;
    const file = input.files[0];
    if (!file) return;

    try {
        const data = JSON.parse(await file.text());
        if (!isValidProgress(data)) {
            throw new Error('El archivo no tiene el formato esperado');
        }

        if (confirm('Se va a sobrescribir tu progreso actual. ¿Continuar?')) {
            state.progress = data;
            saveProgress();
            render();
            showToast('Datos importados', 'success');
        }
    } catch (error) {
        console.error(error);
        showToast('No se pudo importar el archivo');
    }

    // Si no se vacía, al elegir el mismo archivo otra vez no salta el evento change
    input.value = '';
}


// Eventos

function setActiveButton(buttons, activeButton) {
    buttons.forEach((button) => button.classList.toggle('active', button === activeButton));
}

function setupEventListeners() {
    const tabs = document.querySelectorAll('.nav-tab');
    const statusButtons = document.querySelectorAll('#statusFilter .filter-btn');
    const categorySelect = document.getElementById('categoryFilter');
    const grid = document.getElementById('itemsGrid');

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            setActiveButton(tabs, tab);
            state.activeTab = tab.dataset.tab;

            // El filtro de categoría solo tiene sentido en armas
            state.categoryFilter = 'all';
            categorySelect.value = 'all';
            categorySelect.hidden = state.activeTab !== 'weapons';

            render();
        });
    });

    statusButtons.forEach((button) => {
        button.addEventListener('click', () => {
            setActiveButton(statusButtons, button);
            state.statusFilter = button.dataset.filter;
            render();
        });
    });

    categorySelect.addEventListener('change', () => {
        state.categoryFilter = categorySelect.value;
        render();
    });

    // Espera a que se deje de escribir un momento para no repintar en cada tecla
    let searchTimeout;
    document.getElementById('searchInput').addEventListener('input', (event) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            state.searchQuery = event.target.value;
            render();
        }, SEARCH_DELAY_MS);
    });

    // Un solo listener para toda la rejilla en vez de uno por botón,
    // porque las tarjetas se vuelven a crear cada vez que se pinta
    grid.addEventListener('click', (event) => {
        const component = event.target.closest('.component-item');
        if (component) {
            toggleComponent(component.dataset.itemId, Number(component.dataset.index));
            return;
        }

        const actionButton = event.target.closest('.mark-all, .clear-all');
        if (actionButton) {
            const markAll = actionButton.classList.contains('mark-all');
            setAllComponents(actionButton.dataset.itemId, markAll);
        }
    });

    const importInput = document.getElementById('importFile');
    document.getElementById('exportBtn').addEventListener('click', exportData);
    document.getElementById('importBtn').addEventListener('click', () => importInput.click());
    importInput.addEventListener('change', importData);
}


function init() {
    loadProgress();
    fillCategoryFilter();
    renderTabCounts();
    setupEventListeners();
    render();
}

document.addEventListener('DOMContentLoaded', init);
