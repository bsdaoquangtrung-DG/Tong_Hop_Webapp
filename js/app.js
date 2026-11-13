/**
 * LOGIC ĐIỀU HÀNH CỔNG THÔNG TIN CHUYỂN ĐỔI SỐ (PHIÊN BẢN 3.3.0)
 * KHOA VI SINH – BỆNH VIỆN ĐA KHOA ĐỨC GIANG
 * 
 * Bố cục Sidebar bên trái (Trang chủ + 9 Ứng dụng liên kết)
 * Nền xanh da trời y tế – Giới thiệu hệ sinh thái xét nghiệm vi sinh trực quan
 */

const AppState = {
  apps: [],
  categories: [],
  activeCategory: 'all',
  searchQuery: '',
  activeSidebarId: 'home',
  storageKey: 'bvdkg_microbiology_clean_v33',
  supabaseClient: null,
  supabaseStatus: 'connecting',
  activeAdminTab: 'apps',
  currentViewingApp: null
};

// SVG Icons chuẩn y tế và chuyên môn vi sinh
const SVG_ICONS = {
  Home: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  ClipboardList: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>`,
  CalendarDays: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>`,
  Files: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7h-3a2 2 0 0 1-2-2V2"/><path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z"/><path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h11"/></svg>`,
  UserCheck: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`,
  FlaskConical: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>`,
  Package: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
  GraduationCap: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>`,
  Microscope: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>`,
  BookOpen: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  Eye: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  ExternalLink: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>`,
  QrCode: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>`,
  ChevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`
};

document.addEventListener('DOMContentLoaded', () => {
  initData();
  setupEventListeners();
  renderAll();
  initSupabase();
});

/**
 * Nạp dữ liệu cấu hình ban đầu
 */
function initData() {
  const defaultApps = (window.PORTAL_CONFIG && window.PORTAL_CONFIG.applications) ? [...window.PORTAL_CONFIG.applications] : [];
  
  // Nạp từ bộ nhớ đã lưu (nếu có tùy chỉnh đường dẫn từ admin)
  const savedData = localStorage.getItem(AppState.storageKey);
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      AppState.apps = defaultApps.map(def => {
        const found = parsed.find(p => p.id === def.id);
        return found ? { ...def, url: found.url || def.url } : def;
      });
    } catch (e) {
      AppState.apps = defaultApps;
    }
  } else {
    AppState.apps = defaultApps;
  }

  AppState.categories = (window.PORTAL_CONFIG && window.PORTAL_CONFIG.categories) ? [...window.PORTAL_CONFIG.categories] : [];
}

/**
 * Thiết lập các sự kiện tương tác
 */
function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  const btnClearSearch = document.getElementById('btnClearSearch');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value.trim().toLowerCase();
      if (btnClearSearch) {
        btnClearSearch.style.display = AppState.searchQuery ? 'block' : 'none';
      }
      renderAppsGrid();
    });
  }

  if (btnClearSearch) {
    btnClearSearch.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      AppState.searchQuery = '';
      btnClearSearch.style.display = 'none';
      renderAppsGrid();
    });
  }

  const btnOpenAdmin = document.getElementById('btnOpenAdmin');
  if (btnOpenAdmin) {
    btnOpenAdmin.addEventListener('click', () => openAdminModal('apps'));
  }

  // Đóng modal khi bấm ra ngoài backdrop
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeAllModals();
    });
  });

  // Phím ESC đóng khung xem
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAppViewer();
      closeAllModals();
      toggleSidebar(false);
    }
  });
}

/**
 * Render toàn bộ giao diện: Sidebar trái + Tabs + Lưới thẻ
 */
function renderAll() {
  renderSidebarApps();
  updateMetrics();
  renderCategoryTabs();
  renderAppsGrid();
}

/**
 * 1. RENDER 9 ỨNG DỤNG LIÊN KẾT BÊN THANH CÔNG CỤ TRÁI (SIDEBAR)
 */
function renderSidebarApps() {
  const container = document.getElementById('sidebarAppsList');
  if (!container) return;

  const sortedApps = [...AppState.apps].sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));

  container.innerHTML = sortedApps.map((app, index) => {
    const iconSvg = SVG_ICONS[app.icon] || SVG_ICONS['Microscope'];
    const isActive = AppState.activeSidebarId === app.id;

    return `
      <button type="button" 
              class="sidebar-app-btn ${isActive ? 'active' : ''}" 
              id="sidebar-item-${app.id}"
              onclick="onSidebarAppClick('${app.id}')"
              title="${escapeHtml(app.name)} – ${escapeHtml(app.category)}">
        <div class="sidebar-app-icon" aria-hidden="true">
          ${iconSvg}
        </div>
        <div class="sidebar-app-meta">
          <span class="sidebar-app-title">${index + 1}. ${escapeHtml(app.name)}</span>
          <span class="sidebar-app-category">${escapeHtml(app.badge || app.category)}</span>
        </div>
        <div class="sidebar-app-arrow">
          ${SVG_ICONS.ChevronRight}
        </div>
      </button>
    `;
  }).join('');
}

/**
 * Xử lý khi nhấn vào 1 ứng dụng trên Sidebar
 */
window.onSidebarAppClick = function(appId) {
  AppState.activeSidebarId = appId;
  
  // Bỏ active của nút Trang chủ
  const navItemHome = document.getElementById('navItemHome');
  if (navItemHome) navItemHome.classList.remove('active');

  // Đánh dấu active cho app trong sidebar
  document.querySelectorAll('.sidebar-app-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const currentBtn = document.getElementById(`sidebar-item-${appId}`);
  if (currentBtn) currentBtn.classList.add('active');

  // Đóng sidebar drawer trên mobile/tablet
  toggleSidebar(false);

  // Hiển thị tất cả thẻ để đảm bảo thẻ đích tồn tại trên DOM
  if (AppState.activeCategory !== 'all' || AppState.searchQuery) {
    AppState.activeCategory = 'all';
    AppState.searchQuery = '';
    const searchInput = document.getElementById('searchInput');
    const btnClearSearch = document.getElementById('btnClearSearch');
    if (searchInput) searchInput.value = '';
    if (btnClearSearch) btnClearSearch.style.display = 'none';
    renderCategoryTabs();
    renderAppsGrid();
  }

  // Cuộn mượt đến thẻ ứng dụng trên giao diện chính và tạo hiệu ứng phát sáng
  setTimeout(() => {
    const targetCard = document.getElementById(`card-${appId}`);
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetCard.classList.remove('highlight-card');
      void targetCard.offsetWidth; // Trigger reflow
      targetCard.classList.add('highlight-card');
      setTimeout(() => targetCard.classList.remove('highlight-card'), 2200);
    }
  }, 100);
};

/**
 * Xử lý khi nhấn vào "TRANG CHỦ" trên Sidebar hoặc Logo
 */
window.navigateToHome = function(event) {
  if (event) event.preventDefault();
  
  AppState.activeSidebarId = 'home';

  // Kích hoạt nút Trang chủ trên sidebar
  const navItemHome = document.getElementById('navItemHome');
  if (navItemHome) navItemHome.classList.add('active');

  // Xóa active của các app trong sidebar
  document.querySelectorAll('.sidebar-app-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Đóng drawer trên thiết bị nhỏ
  toggleSidebar(false);

  // Đưa về bộ lọc ban đầu
  resetSearchAndFilters();

  // Cuộn mượt lên phần giới thiệu hệ sinh thái
  const homeSection = document.getElementById('homeOverview');
  if (homeSection) {
    homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

/**
 * Bật/tắt thanh sidebar bên trái trên Tablet & Smartphone
 */
window.toggleSidebar = function(forceState) {
  const sidebar = document.getElementById('sidebarLeft');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (!sidebar) return;

  const isOpen = sidebar.classList.contains('open');
  const shouldOpen = (forceState !== undefined) ? forceState : !isOpen;

  if (shouldOpen) {
    sidebar.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = (window.innerWidth <= 1024) ? 'hidden' : '';
  } else {
    sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
};

/**
 * Cập nhật số liệu KPI thực tế
 */
function updateMetrics() {
  const elTotalApps = document.getElementById('metricTotalApps');
  if (elTotalApps) elTotalApps.textContent = AppState.apps.length;
}

/**
 * Render thanh Tabs 5 nhóm nghiệp vụ
 */
function renderCategoryTabs() {
  const container = document.getElementById('categoryTabsContainer');
  if (!container) return;

  let tabsHtml = `
    <button class="btn-filter-tab ${AppState.activeCategory === 'all' ? 'active' : ''}" onclick="setCategoryFilter('all')">
      <span>Tất cả 9 ứng dụng</span>
      <span class="tab-count">${AppState.apps.length}</span>
    </button>
  `;

  AppState.categories.forEach(cat => {
    const count = AppState.apps.filter(app => app.category === cat.name).length;
    if (count > 0) {
      const isActive = AppState.activeCategory === cat.name;
      tabsHtml += `
        <button class="btn-filter-tab ${isActive ? 'active' : ''}" onclick="setCategoryFilter('${cat.name}')">
          <span>${cat.name}</span>
          <span class="tab-count">${count}</span>
        </button>
      `;
    }
  });

  container.innerHTML = tabsHtml;
}

window.setCategoryFilter = function(categoryName) {
  AppState.activeCategory = categoryName;
  renderCategoryTabs();
  renderAppsGrid();
};

/**
 * Reset tìm kiếm và bộ lọc về mặc định
 */
window.resetSearchAndFilters = function() {
  AppState.activeCategory = 'all';
  AppState.searchQuery = '';
  const searchInput = document.getElementById('searchInput');
  const btnClearSearch = document.getElementById('btnClearSearch');
  if (searchInput) searchInput.value = '';
  if (btnClearSearch) btnClearSearch.style.display = 'none';
  renderCategoryTabs();
  renderAppsGrid();
};

/**
 * Render danh mục 9 thẻ ứng dụng trên giao diện chính
 */
function renderAppsGrid() {
  const container = document.getElementById('mainAppsGrid');
  const emptyState = document.getElementById('emptySearchState');
  if (!container) return;

  let filtered = [...AppState.apps];

  // Lọc theo nhóm
  if (AppState.activeCategory !== 'all') {
    filtered = filtered.filter(app => app.category === AppState.activeCategory);
  }

  // Lọc theo từ khóa tìm kiếm
  if (AppState.searchQuery) {
    const q = AppState.searchQuery;
    filtered = filtered.filter(app => {
      return (app.name && app.name.toLowerCase().includes(q)) ||
             (app.description && app.description.toLowerCase().includes(q)) ||
             (app.category && app.category.toLowerCase().includes(q)) ||
             (app.badge && app.badge.toLowerCase().includes(q)) ||
             (app.platform && app.platform.toLowerCase().includes(q));
    });
  }

  // Sắp xếp theo sortOrder
  filtered.sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));

  if (filtered.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
  } else {
    if (emptyState) emptyState.style.display = 'none';
    container.innerHTML = filtered.map(app => createAppCardHtml(app)).join('');
  }
}

/**
 * Tạo HTML thẻ ứng dụng
 */
function createAppCardHtml(app) {
  const iconSvg = SVG_ICONS[app.icon] || SVG_ICONS['Microscope'];
  
  // Xác định class nền tảng
  let platformClass = 'gas';
  if (app.platform.includes('Vercel')) platformClass = 'vercel';
  else if (app.platform.includes('Notebook')) platformClass = 'notebook';

  return `
    <article class="app-card" id="card-${app.id}">
      <div class="app-card-top">
        <div class="app-icon-wrap" aria-hidden="true">
          ${iconSvg}
        </div>
        <div class="app-meta-badges">
          <span class="status-online"><span class="dot"></span> Trực tuyến</span>
          <span class="badge-platform ${platformClass}">${escapeHtml(app.platform)}</span>
        </div>
      </div>

      <div class="app-card-body">
        <div class="app-category-label">${escapeHtml(app.category)}</div>
        <h3 class="app-title">${escapeHtml(app.name)}</h3>
        <p class="app-description">${escapeHtml(app.description)}</p>
      </div>

      <div class="app-card-footer">
        <!-- Nút Xem trực tiếp -->
        <button type="button" class="btn-card-action btn-card-view" onclick="openAppViewer('${app.id}')" title="Xem trực tiếp trên trang">
          ${SVG_ICONS.Eye}
          <span>Xem trực tiếp</span>
        </button>

        <!-- Nút Mở Tab Mới -->
        <a href="${escapeHtml(app.url)}" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-card-open" title="Mở trong tab riêng biệt">
          ${SVG_ICONS.ExternalLink}
          <span>Mở Tab</span>
        </a>

        <!-- Nút QR -->
        <button type="button" class="btn-card-qr" onclick="showQrModal('${escapeHtml(app.url)}', '${escapeHtml(app.name)}')" title="Quét mã QR trên điện thoại/tablet">
          ${SVG_ICONS.QrCode}
        </button>
      </div>
    </article>
  `;
}

/**
 * Bộ xem trực tiếp ứng dụng (In-Portal Viewer)
 */
window.openAppViewer = function(appId) {
  const app = AppState.apps.find(a => a.id === appId);
  if (!app) return;

  AppState.currentViewingApp = app;

  const modal = document.getElementById('appViewerModal');
  const nameEl = document.getElementById('viewerAppName');
  const platformEl = document.getElementById('viewerAppPlatform');
  const iconWrap = document.getElementById('viewerIconWrap');
  const btnExternal = document.getElementById('btnViewerExternal');
  const iframe = document.getElementById('viewerIframe');
  const loading = document.getElementById('viewerLoadingState');

  if (!modal || !iframe) return;

  if (nameEl) nameEl.textContent = app.name;
  if (platformEl) platformEl.textContent = app.platform;
  if (iconWrap) iconWrap.innerHTML = SVG_ICONS[app.icon] || SVG_ICONS['ClipboardList'];
  if (btnExternal) btnExternal.href = app.url;

  if (loading) loading.style.display = 'flex';

  iframe.onload = () => {
    if (loading) loading.style.display = 'none';
  };

  iframe.src = app.url;
  modal.classList.add('open');
};

window.closeAppViewer = function() {
  const modal = document.getElementById('appViewerModal');
  const iframe = document.getElementById('viewerIframe');
  if (modal) modal.classList.remove('open');
  if (iframe) iframe.src = 'about:blank';
  AppState.currentViewingApp = null;
};

window.reloadViewerIframe = function() {
  const iframe = document.getElementById('viewerIframe');
  const loading = document.getElementById('viewerLoadingState');
  if (iframe && AppState.currentViewingApp) {
    if (loading) loading.style.display = 'flex';
    iframe.src = AppState.currentViewingApp.url;
  }
};

/**
 * Quét mã QR
 */
window.showQrModal = function(url, appName) {
  const modal = document.getElementById('qrModal');
  const modalTitle = document.getElementById('qrModalTitle');
  const qrImageWrap = document.getElementById('qrImageWrap');
  const qrUrlText = document.getElementById('qrUrlText');
  if (!modal || !qrImageWrap) return;

  if (modalTitle) modalTitle.textContent = `Quét mã QR – ${appName}`;
  if (qrUrlText) qrUrlText.textContent = url;

  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}`;
  qrImageWrap.innerHTML = `<img src="${qrApiUrl}" alt="QR Code" style="width:200px; height:200px; border-radius:8px; border:1px solid #BAE6FD; padding:6px; background:white;" />`;

  modal.classList.add('open');
};

/**
 * Đóng tất cả modal
 */
window.closeAllModals = function() {
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.classList.remove('open');
  });
};

/**
 * Bảng quản trị liên kết 9 webapp & cấu hình Supabase Cloud
 */
window.openAdminModal = function(tab = 'apps') {
  AppState.activeAdminTab = tab;
  const modal = document.getElementById('adminModal');
  const container = document.getElementById('adminAppList');
  if (!modal || !container) return;

  const isAppsTab = (tab === 'apps');
  const isSupabaseTab = (tab === 'supabase');

  let html = `
    <!-- Thanh chuyển tab trong modal -->
    <div style="display:flex; gap:0.5rem; margin-bottom:1rem; border-bottom:1px solid #E2E8F0; padding-bottom:0.65rem;">
      <button type="button" 
              onclick="openAdminModal('apps')" 
              style="padding:0.45rem 1rem; border-radius:6px; font-weight:700; font-size:0.85rem; cursor:pointer; border:1px solid ${isAppsTab ? '#0284C7' : '#E2E8F0'}; background:${isAppsTab ? '#0284C7' : '#F8FAFC'}; color:${isAppsTab ? '#fff' : '#475569'}; transition:all 0.2s;">
        📱 9 Liên Kết Webapp
      </button>
      <button type="button" 
              onclick="openAdminModal('supabase')" 
              style="padding:0.45rem 1rem; border-radius:6px; font-weight:700; font-size:0.85rem; cursor:pointer; border:1px solid ${isSupabaseTab ? '#0D9488' : '#E2E8F0'}; background:${isSupabaseTab ? '#0D9488' : '#F8FAFC'}; color:${isSupabaseTab ? '#fff' : '#475569'}; transition:all 0.2s;">
        ⚡ Kết Nối Supabase Cloud
      </button>
    </div>
  `;

  if (isAppsTab) {
    html += `
      <div style="font-size:0.85rem; color:#0369A1; background:#E0F2FE; padding:0.75rem 1rem; border-radius:8px; margin-bottom:1rem; border:1px solid #BAE6FD;">
        💡 Danh sách 9 liên kết webapp thực tế của Khoa Vi sinh – BV Đa khoa Đức Giang. Bạn có thể chỉnh sửa link trực tiếp bên dưới và bấm <strong>"Lưu cấu hình"</strong>.
      </div>
      <div style="display:flex; flex-direction:column; gap:0.85rem; max-height:55vh; overflow-y:auto; padding-right:0.3rem;">
    `;

    AppState.apps.forEach((app, idx) => {
      html += `
        <div style="border:1px solid var(--border-light); border-radius:8px; padding:0.85rem; background:#fff;">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
            <strong style="color:var(--primary-dark); font-size:0.9rem;">#${idx + 1}. ${escapeHtml(app.name)}</strong>
            <span style="font-size:0.75rem; color:var(--text-light);">${escapeHtml(app.platform)}</span>
          </div>
          <input type="url" id="admin-url-${app.id}" class="form-control" value="${escapeHtml(app.url)}" placeholder="https://..." />
        </div>
      `;
    });

    html += `</div>`;
  } else {
    // TAB SUPABASE CLOUD
    const supaUrl = (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.url) || 'https://kqbdrnumjiynpxvuosxl.supabase.co';
    const supaKey = (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.publishableKey) || 'sb_publishable_Do7UXTysSfavGQvaCv605g_Lsytm81n';
    const schemaSql = (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.schemaSql) || '';

    html += `
      <div style="background:#F0FDFA; border:1px solid #99F6E4; border-radius:8px; padding:1rem; margin-bottom:1rem;">
        <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem;">
          <span style="width:10px; height:10px; border-radius:50%; background:#10B981; display:inline-block; box-shadow:0 0 8px #10B981;"></span>
          <strong style="color:#0F766E; font-size:0.92rem;">Thông Tin Kết Nối Supabase Thực Tế</strong>
        </div>
        <p style="font-size:0.82rem; color:#134E4A; margin-bottom:0.85rem; line-height:1.5;">
          Hệ thống đã được thiết lập kết nối trực tiếp đến dự án Supabase Cloud của Bệnh viện Đa khoa Đức Giang:
        </p>
        
        <div style="display:flex; flex-direction:column; gap:0.6rem; font-size:0.82rem;">
          <div>
            <label style="font-weight:700; color:#0F766E; display:block; margin-bottom:2px;">Project URL:</label>
            <input type="text" class="form-control" readonly value="${escapeHtml(supaUrl)}" style="background:#fff; font-family:monospace; color:#0369A1;" />
          </div>
          <div>
            <label style="font-weight:700; color:#0F766E; display:block; margin-bottom:2px;">Publishable Key:</label>
            <input type="text" class="form-control" readonly value="${escapeHtml(supaKey)}" style="background:#fff; font-family:monospace; color:#475569;" />
          </div>
        </div>

        <div style="margin-top:1rem; display:flex; gap:0.6rem; align-items:center;">
          <button type="button" class="btn-card-action btn-card-view" style="padding:0.4rem 1rem; font-size:0.8rem;" onclick="testSupabaseConnection()">
            ⚡ Kiểm Tra Kết Nối Trực Tiếp
          </button>
          <button type="button" class="btn-card-action btn-card-open" style="padding:0.4rem 1rem; font-size:0.8rem;" onclick="copySupabaseSql()">
            📋 Sao Chép SQL Tạo Bảng
          </button>
        </div>
        
        <div id="supabaseTestResult" style="margin-top:0.75rem; font-size:0.82rem;"></div>
      </div>

      <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:0.85rem;">
        <div style="font-weight:700; font-size:0.82rem; color:#334155; margin-bottom:0.4rem;">
          Mã SQL Tạo Bảng <code>applications</code> trên Supabase SQL Editor:
        </div>
        <textarea readonly style="width:100%; height:110px; font-family:monospace; font-size:0.75rem; border:1px solid #CBD5E1; border-radius:6px; padding:0.5rem; background:#fff; color:#334155; resize:none;">${escapeHtml(schemaSql)}</textarea>
      </div>
    `;
  }

  container.innerHTML = html;
  modal.classList.add('open');
};

window.testSupabaseConnection = async function() {
  const resultEl = document.getElementById('supabaseTestResult');
  if (!resultEl) return;
  resultEl.innerHTML = '<span style="color:#0284C7;">⏳ Đang gửi yêu cầu xác thực tới Supabase...</span>';
  
  if (!AppState.supabaseClient) {
    initSupabase();
  }
  
  if (!AppState.supabaseClient) {
    resultEl.innerHTML = '<span style="color:#EF4444;">❌ Không thể kết nối. Vui lòng kiểm tra kết nối mạng.</span>';
    return;
  }
  
  try {
    const { data, error } = await AppState.supabaseClient
      .from('applications')
      .select('*')
      .limit(1);
      
    if (error) {
      if (error.code === 'PGRST205' || (error.message && error.message.includes('Could not find the table'))) {
        resultEl.innerHTML = '<div style="color:#10B981; font-weight:700; background:#ECFDF5; padding:0.5rem; border-radius:6px; border:1px solid #A7F3D0;">✅ Đã xác thực kết nối Supabase thành công 100%! (Project URL & Publishable Key hợp lệ). Bảng applications chưa được tạo trong database.</div>';
      } else {
        resultEl.innerHTML = `<span style="color:#F59E0B; background:#FFFBEB; padding:0.5rem; border-radius:6px; display:block; border:1px solid #FDE68A;">⚠️ Server Supabase phản hồi: ${escapeHtml(error.message || error.code)}</span>`;
      }
    } else {
      resultEl.innerHTML = '<div style="color:#10B981; font-weight:700; background:#ECFDF5; padding:0.5rem; border-radius:6px; border:1px solid #A7F3D0;">✅ Kết nối Supabase và bảng applications hoạt động hoàn hảo!</div>';
    }
  } catch (err) {
    resultEl.innerHTML = `<span style="color:#EF4444;">❌ Lỗi kết nối: ${escapeHtml(err.message)}</span>`;
  }
};

window.copySupabaseSql = function() {
  if (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.schemaSql) {
    navigator.clipboard.writeText(window.SUPABASE_CONFIG.schemaSql).then(() => {
      showToast('Đã sao chép mã SQL Supabase vào clipboard!');
    }).catch(() => {
      showToast('Hãy copy thủ công từ ô hiển thị.');
    });
  }
};

window.saveAdminChanges = function() {
  AppState.apps.forEach(app => {
    const input = document.getElementById(`admin-url-${app.id}`);
    if (input) app.url = input.value.trim();
  });

  localStorage.setItem(AppState.storageKey, JSON.stringify(AppState.apps));
  closeAllModals();
  renderAll();
  showToast('Đã lưu cấu hình 9 đường dẫn webapp thành công!');
};

window.resetToDefaultConfig = function() {
  if (confirm('Khôi phục về 9 liên kết webapp thực tế ban đầu?')) {
    localStorage.removeItem(AppState.storageKey);
    AppState.apps = (window.PORTAL_CONFIG && window.PORTAL_CONFIG.applications) ? JSON.parse(JSON.stringify(window.PORTAL_CONFIG.applications)) : [];
    closeAllModals();
    renderAll();
    showToast('Đã khôi phục 9 liên kết thực tế!');
  }
};

/**
 * Khởi tạo kết nối Supabase Cloud trực tiếp
 */
async function initSupabase() {
  if (!window.SUPABASE_CONFIG || !window.SUPABASE_CONFIG.url) return;
  const { url, publishableKey, tableName } = window.SUPABASE_CONFIG;
  const textEl = document.getElementById('supabaseStatusText');
  
  if (window.supabase && typeof window.supabase.createClient === 'function') {
    try {
      AppState.supabaseClient = window.supabase.createClient(url, publishableKey);
      AppState.supabaseStatus = 'connected';
      if (textEl) textEl.textContent = 'Supabase Cloud';
      
      // Thử đồng bộ dữ liệu từ Supabase Cloud nếu bảng applications đã có dữ liệu
      try {
        const { data, error } = await AppState.supabaseClient
          .from(tableName || 'applications')
          .select('*');
          
        if (!error && data && data.length > 0) {
          console.log("Supabase Cloud synced apps:", data);
          data.forEach(remoteApp => {
            const localApp = AppState.apps.find(a => a.id === remoteApp.id);
            if (localApp && remoteApp.url) {
              localApp.url = remoteApp.url;
            }
          });
          renderAll();
        }
      } catch (queryErr) {
        // Bảng chưa có hoặc chưa tạo policy, tiếp tục dùng danh mục chuẩn
      }
    } catch (e) {
      console.warn("Supabase init error:", e);
      AppState.supabaseStatus = 'error';
      if (textEl) textEl.textContent = 'Supabase (Offline)';
    }
  }
}

/**
 * Toast thông báo
 */
function showToast(msg) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✓</span><span>${escapeHtml(msg)}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
