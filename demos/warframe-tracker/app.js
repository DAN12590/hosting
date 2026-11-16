// Warframe Prime Tracker - Application Logic

// ============================================
// State Management
// ============================================
const STORAGE_KEY = 'warframe_prime_tracker';

let state = {
    activeTab: 'warframes',
    statusFilter: 'all',
    categoryFilter: 'all',
    searchQuery: '',
    progress: {} // { itemId: { "componentIndex": true/false } }
};

// ============================================
// LocalStorage Functions
// ============================================
function loadProgress() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            state.progress = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Error loading progress:', e);
        state.progress = {};
    }
}

function saveProgress() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
    } catch (e) {
        console.error('Error saving progress:', e);
    }
}

// ============================================
// Progress Calculations
// ============================================
function getItemProgress(item) {
    const itemProgress = state.progress[item.id] || {};
    // Count owned components by index
    let owned = 0;
    item.components.forEach((_, index) => {
        if (itemProgress[index] === true) owned++;
    });
    const total = item.components.length;
    const percent = Math.round((owned / total) * 100);
    const isComplete = owned === total;

    return { owned, total, percent, isComplete };
}

function getAllItems() {
    return [
        ...PRIME_DATA.warframes,
        ...PRIME_DATA.weapons,
        ...PRIME_DATA.sentinels,
        ...(PRIME_DATA.sentinelWeapons || []),
        ...(PRIME_DATA.archwings || [])
    ];
}

function getGlobalStats() {
    const allItems = getAllItems();

    let totalComponents = 0;
    let ownedComponents = 0;
    let completeItems = 0;
    let incompleteItems = 0;

    allItems.forEach(item => {
        const progress = getItemProgress(item);
        totalComponents += progress.total;
        ownedComponents += progress.owned;
        if (progress.isComplete) {
            completeItems++;
        } else {
            incompleteItems++;
        }
    });

    const totalPercent = totalComponents > 0
        ? Math.round((ownedComponents / totalComponents) * 100)
        : 0;

    return {
        totalComplete: completeItems,
        totalIncomplete: incompleteItems,
        totalProgress: totalPercent
    };
}

// ============================================
// Component Toggle
// ============================================
function toggleComponent(itemId, componentIndex) {
    if (!state.progress[itemId]) {
        state.progress[itemId] = {};
    }

    const current = state.progress[itemId][componentIndex] === true;
    state.progress[itemId][componentIndex] = !current;

    saveProgress();
    updateUI();

    // Get component name for toast
    const item = findItemById(itemId);
    const componentName = item ? item.components[componentIndex] : 'Componente';

    const message = !current
        ? `✅ ${componentName} obtenido!`
        : `❌ ${componentName} desmarcado`;
    showToast(message, !current ? 'success' : 'info');
}

function markAllComponents(itemId, owned) {
    const item = findItemById(itemId);
    if (!item) return;

    state.progress[itemId] = {};
    item.components.forEach((_, index) => {
        state.progress[itemId][index] = owned;
    });

    saveProgress();
    updateUI();
    //hola
    const message = owned
        ? `✅ ${item.name} completado!`
        : `🔄 ${item.name} reiniciado`;
    showToast(message, owned ? 'success' : 'info');
}

function findItemById(itemId) {
    return PRIME_DATA.warframes.find(i => i.id === itemId)
        || PRIME_DATA.weapons.find(i => i.id === itemId)
        || PRIME_DATA.sentinels.find(i => i.id === itemId)
        || (PRIME_DATA.sentinelWeapons || []).find(i => i.id === itemId)
        || (PRIME_DATA.archwings || []).find(i => i.id === itemId);
}

// ============================================
// Filtering
// ============================================
function getFilteredItems() {
    let items = [];

    switch (state.activeTab) {
        case 'warframes':
            items = PRIME_DATA.warframes;
            break;
        case 'weapons':
            items = PRIME_DATA.weapons;
            break;
        case 'sentinels':
            items = [
                ...PRIME_DATA.sentinels,
                ...(PRIME_DATA.sentinelWeapons || [])
            ];
            break;
        case 'archwings':
            items = PRIME_DATA.archwings || [];
            break;
    }

    // Category filter (for weapons)
    if (state.categoryFilter !== 'all' && state.activeTab === 'weapons') {
        items = items.filter(item => item.category === state.categoryFilter);
    }

    // Status filter
    if (state.statusFilter !== 'all') {
        items = items.filter(item => {
            const progress = getItemProgress(item);

            switch (state.statusFilter) {
                case 'complete':
                    return progress.isComplete;
                case 'incomplete':
                    return !progress.isComplete && progress.owned > 0;
                case 'missing':
                    return progress.owned === 0;
                default:
                    return true;
            }
        });
    }

    // Search filter
    if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase();
        items = items.filter(item =>
            item.name.toLowerCase().includes(query)
        );
    }

    // Sort alphabetically
    items.sort((a, b) => a.name.localeCompare(b.name));

    return items;
}

// ============================================
// Rendering
// ============================================
function renderItems() {
    const grid = document.getElementById('itemsGrid');
    const items = getFilteredItems();

    if (items.length === 0) {
        grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3 class="empty-state-title">No se encontraron items</h3>
        <p class="empty-state-text">Intenta cambiar los filtros o la búsqueda</p>
      </div>
    `;
        return;
    }

    grid.innerHTML = items.map(item => renderItemCard(item)).join('');

    // Add event listeners
    grid.querySelectorAll('.component-item').forEach(el => {
        el.addEventListener('click', () => {
            const itemId = el.dataset.itemId;
            const componentIndex = parseInt(el.dataset.componentIndex);
            toggleComponent(itemId, componentIndex);
        });
    });

    grid.querySelectorAll('.action-btn.mark-all').forEach(el => {
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            markAllComponents(el.dataset.itemId, true);
        });
    });

    grid.querySelectorAll('.action-btn.clear-all').forEach(el => {
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            markAllComponents(el.dataset.itemId, false);
        });
    });
}

function renderItemCard(item) {
    const progress = getItemProgress(item);
    const itemProgress = state.progress[item.id] || {};

    // Determine category label
    let categoryLabel = 'Warframe Prime';
    if (item.category) {
        categoryLabel = `${item.category}${item.subtype ? ' • ' + item.subtype : ''}`;
    } else if (item.type === 'sentinel') {
        categoryLabel = 'Centinela Prime';
    } else if (item.type === 'archwing') {
        categoryLabel = 'Archwing Prime';
    }

    const statusBadge = progress.isComplete
        ? '<span class="status-badge complete">Completo</span>'
        : `<span class="status-badge incomplete">${progress.owned}/${progress.total}</span>`;

    // Render components with index for duplicate handling
    const componentsHtml = item.components.map((comp, index) => {
        const owned = itemProgress[index] === true;
        // Add number suffix for duplicate components
        const componentCounts = {};
        item.components.forEach((c, i) => {
            if (i <= index) {
                componentCounts[c] = (componentCounts[c] || 0) + 1;
            }
        });
        const count = componentCounts[comp];
        const totalOfType = item.components.filter(c => c === comp).length;
        const displayName = totalOfType > 1 ? `${comp} #${count}` : comp;

        return `
      <div class="component-item ${owned ? 'owned' : ''}" 
           data-item-id="${item.id}" 
           data-component-index="${index}">
        <div class="component-checkbox">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="component-name">${displayName}</span>
      </div>
    `;
    }).join('');

    return `
    <article class="item-card ${progress.isComplete ? 'complete' : ''}">
      <header class="card-header">
        <div>
          <h3 class="item-name">${item.name}</h3>
          <span class="item-category">${categoryLabel}</span>
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
      
      <div class="components-list">
        ${componentsHtml}
      </div>
      
      <div class="card-actions">
        <button class="action-btn mark-all" data-item-id="${item.id}">
          ✅ Marcar todo
        </button>
        <button class="action-btn clear-all" data-item-id="${item.id}">
          🔄 Reiniciar
        </button>
      </div>
    </article>
  `;
}

function updateStats() {
    const stats = getGlobalStats();
    document.getElementById('totalComplete').textContent = stats.totalComplete;
    document.getElementById('totalIncomplete').textContent = stats.totalIncomplete;
    document.getElementById('totalProgress').textContent = stats.totalProgress + '%';

    // Update tab counts
    document.getElementById('warframeCount').textContent = PRIME_DATA.warframes.length;
    document.getElementById('weaponCount').textContent = PRIME_DATA.weapons.length;

    const sentinelTotal = PRIME_DATA.sentinels.length + (PRIME_DATA.sentinelWeapons || []).length;
    document.getElementById('sentinelCount').textContent = sentinelTotal;

    // Update archwing count if tab exists
    const archwingCountEl = document.getElementById('archwingCount');
    if (archwingCountEl) {
        archwingCountEl.textContent = (PRIME_DATA.archwings || []).length;
    }
}

function updateCategoryFilter() {
    const select = document.getElementById('categoryFilter');

    if (state.activeTab === 'weapons') {
        const categories = [...new Set(PRIME_DATA.weapons.map(w => w.category))];
        select.innerHTML = `
      <option value="all">Todas las categorías</option>
      ${categories.map(c => `<option value="${c}">${c}</option>`).join('')}
    `;
        select.style.display = 'block';
    } else {
        select.style.display = 'none';
    }
}

function updateUI() {
    renderItems();
    updateStats();
}

// ============================================
// Toast Notifications
// ============================================
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
    <span class="toast-icon">${type === 'success' ? '✅' : 'ℹ️'}</span>
    <span class="toast-message">${message}</span>
  `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// ============================================
// Event Listeners
// ============================================
function setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            state.activeTab = tab.dataset.tab;
            state.categoryFilter = 'all';
            updateCategoryFilter();
            updateUI();
        });
    });

    // Status filter
    document.querySelectorAll('#statusFilter .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#statusFilter .filter-btn').forEach(b =>
                b.classList.remove('active')
            );
            btn.classList.add('active');
            state.statusFilter = btn.dataset.filter;
            updateUI();
        });
    });

    // Category filter
    document.getElementById('categoryFilter').addEventListener('change', (e) => {
        state.categoryFilter = e.target.value;
        updateUI();
    });

    // Search
    let searchTimeout;
    document.getElementById('searchInput').addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            state.searchQuery = e.target.value;
            updateUI();
        }, 200);
    });

    // Data Management
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) exportBtn.addEventListener('click', exportData);

    const importBtn = document.getElementById('importBtn');
    if (importBtn) importBtn.addEventListener('click', triggerImport);

    const importFile = document.getElementById('importFile');
    if (importFile) importFile.addEventListener('change', importData);
}

// ============================================
// Data Management
// ============================================
function exportData() {
    const dataStr = JSON.stringify(state.progress, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `warframe-prime-data-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Datos exportados correctamente', 'success');
}

function triggerImport() {
    document.getElementById('importFile').click();
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);

            // Basic validation
            if (typeof data !== 'object') {
                throw new Error('Formato inválido');
            }

            // Confirm with user
            if (confirm('¿Estás seguro de que quieres importar estos datos? Se sobrescribirá tu progreso actual.')) {
                state.progress = data;
                saveProgress();
                updateUI();
                showToast('Datos importados correctamente', 'success');
            }
        } catch (error) {
            console.error('Error importing data:', error);
            showToast('Error al importar el archivo', 'info');
        }
        // Reset input so duplicate imports work
        event.target.value = '';
    };
    reader.readAsText(file);
}

// ============================================
// Initialization
// ============================================
function init() {
    loadProgress();
    setupEventListeners();
    updateCategoryFilter();
    updateUI();

    const totalItems = getAllItems().length;
    console.log('🎮 Warframe Prime Tracker initialized!');
    console.log(`📊 Total: ${totalItems} items Prime`);
    console.log(`   └─ ${PRIME_DATA.warframes.length} Warframes`);
    console.log(`   └─ ${PRIME_DATA.weapons.length} Armas`);
    console.log(`   └─ ${PRIME_DATA.sentinels.length} Centinelas`);
    console.log(`   └─ ${(PRIME_DATA.sentinelWeapons || []).length} Armas de Centinela`);
    console.log(`   └─ ${(PRIME_DATA.archwings || []).length} Archwings`);
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
