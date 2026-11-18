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
  selectedAppCardId: null,
  storageKey: 'bvdkg_microbiology_clean_v33',
  authStorageKey: 'bvdkg_microbiology_auth_user_v1',
  currentUser: null,
  supabaseClient: null,
  supabaseStatus: 'connecting',
  activeAdminTab: 'apps',
  currentViewingApp: null,
  departmentReports: [],
  reportYears: ["2024", "2025", "2026"],
  reportSearchQuery: '',
  otherLinks: [],
  otherLinkSearchQuery: ''
};

// SVG Icons chuẩn y tế và chuyên môn vi sinh
const SVG_ICONS = {
  Home: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  FileText: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  ListChecks: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg>`,
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
  initAuth();
});

/**
 * ==================== HỆ THỐNG XÁC THỰC CÁN BỘ & PHÂN QUYỀN (RBAC) ====================
 */

function initAuth() {
  populateQuickStaffSelect();

  // Kiểm tra phiên đăng nhập đã lưu trong localStorage (tài khoản cán bộ hoặc tài khoản khách)
  const savedSession = localStorage.getItem(AppState.authStorageKey);
  if (savedSession) {
    try {
      const user = JSON.parse(savedSession);
      if (user && (user.email || user.isGuest)) {
        AppState.currentUser = user;
        hideAuthModal();
        updateAuthHeaderUI();
        initData();
        setupEventListeners();
        renderAll();
        initSupabase();
        return;
      }
    } catch (e) {
      console.warn('Lỗi đọc phiên đăng nhập:', e);
    }
  }

  // Nếu chưa có phiên đăng nhập: Hiện Auth Modal
  showAuthModal();
}

/**
 * Kiểm tra xem người dùng hiện tại có phải là Tài khoản khách hay không
 */
function isGuestUser() {
  return Boolean(AppState.currentUser && AppState.currentUser.isGuest);
}

/**
 * Hiển thị thông báo giới hạn quyền cho Tài khoản khách và chuyển về form Đăng nhập
 */
function notifyGuestRestricted(featureName = 'nội dung này') {
  alert(`⚠️ THÔNG BÁO TÀI KHOẢN KHÁCH:\n\nTài khoản khách chỉ được xem giao diện và phần giới thiệu trang chủ chứ không thể truy cập vào xem ${featureName}.\n\nVui lòng đăng nhập bằng tài khoản Cán bộ nhân viên hoặc Admin để sử dụng đầy đủ các tính năng!`);
  showAuthModal();
}

/**
 * ĐĂNG NHẬP BẰNG TÀI KHOẢN KHÁCH (CHỈ XEM GIAO DIỆN & GIỚI THIỆU TRANG CHỦ)
 */
window.loginAsGuest = function() {
  const guestUser = {
    id: 'guest',
    name: 'Khách',
    title: '',
    roleText: 'Khách xem',
    email: '',
    isAdmin: false,
    isGuest: true
  };

  AppState.currentUser = guestUser;
  localStorage.setItem(AppState.authStorageKey, JSON.stringify(guestUser));

  hideAuthModal();
  updateAuthHeaderUI();
  initData();
  setupEventListeners();
  renderAll();
  initSupabase();

  showToast('Đang xem dưới tư cách Tài khoản khách (Chỉ xem giao diện Trang chủ)');
};

function populateQuickStaffSelect() {
  const selectEl = document.getElementById('quickStaffSelect');
  if (!selectEl) return;
  if (!window.STAFF_AUTH_CONFIG || !window.STAFF_AUTH_CONFIG.staffList) return;

  // Lấy toàn bộ 12 cán bộ nhân viên kể cả Admin theo yêu cầu
  const quickStaff = window.STAFF_AUTH_CONFIG.staffList;

  selectEl.innerHTML = `
    <option value="">-- Bấm vào đây để chọn nhanh cán bộ (${quickStaff.length} cán bộ) --</option>
    ${quickStaff.map((s, idx) => `
      <option value="${escapeHtml(s.email)}">${idx + 1}. ${escapeHtml(s.title)} ${escapeHtml(s.name)} – ${escapeHtml(s.roleText)}${s.isAdmin ? ' (Admin)' : ''}</option>
    `).join('')}
  `;
}

window.onQuickStaffSelect = function(email) {
  const feedbackEl = document.getElementById('quickSelectFeedback');
  const errorEl = document.getElementById('authErrorMessage');
  const emailInput = document.getElementById('authEmail');
  const pwdInput = document.getElementById('authPassword');

  if (errorEl) errorEl.style.display = 'none';

  if (!email) {
    if (feedbackEl) feedbackEl.style.display = 'none';
    if (emailInput) emailInput.value = '';
    if (pwdInput) pwdInput.value = '';
    return;
  }

  if (!window.STAFF_AUTH_CONFIG || !window.STAFF_AUTH_CONFIG.staffList) return;
  const staff = window.STAFF_AUTH_CONFIG.staffList.find(s => s.email === email);
  if (!staff) return;

  // 1. Chỉ giúp link nhập nhanh Tên đăng nhập (Gmail)
  if (emailInput) emailInput.value = staff.email;

  // 2. Mật khẩu bắt buộc người dùng tự nhập tay, xóa trống và focus để nhập an toàn
  if (pwdInput) {
    pwdInput.value = '';
    pwdInput.focus();
  }

  // 3. Thông báo xác nhận chọn cán bộ an toàn (tuyệt đối không hiển thị gợi ý mật khẩu tránh bị lộ)
  if (feedbackEl) {
    feedbackEl.innerHTML = `✓ Đã chọn: <strong>${escapeHtml(staff.title)} ${escapeHtml(staff.name)}</strong> (${escapeHtml(staff.roleText)}). Vui lòng <strong>tự nhập mật khẩu</strong> bên dưới để đăng nhập.`;
    feedbackEl.style.display = 'block';
  }
};

window.handleAuthLoginSubmit = function(event) {
  if (event) event.preventDefault();

  const emailInput = document.getElementById('authEmail');
  const pwdInput = document.getElementById('authPassword');
  const errorEl = document.getElementById('authErrorMessage');

  if (errorEl) errorEl.style.display = 'none';

  const emailVal = emailInput ? emailInput.value.trim() : '';
  const pwdVal = pwdInput ? pwdInput.value.trim() : '';

  if (!emailVal) {
    showAuthError('Vui lòng nhập Tên đăng nhập (Gmail)!');
    if (emailInput) emailInput.focus();
    return;
  }

  if (!pwdVal) {
    showAuthError('Vui lòng nhập Mật khẩu (Cột chức năng: VD UserH)!');
    if (pwdInput) pwdInput.focus();
    return;
  }

  if (!window.STAFF_AUTH_CONFIG || !window.STAFF_AUTH_CONFIG.staffList) {
    showAuthError('Hệ thống dữ liệu nhân sự chưa sẵn sàng. Vui lòng tải lại trang.');
    return;
  }

  // Chuẩn hóa tìm kiếm cán bộ theo Gmail
  const emailLower = emailVal.toLowerCase();
  const staff = window.STAFF_AUTH_CONFIG.staffList.find(s => {
    if (s.email.toLowerCase() === emailLower) return true;
    if (s.aliases && s.aliases.some(a => a.toLowerCase() === emailLower)) return true;
    return false;
  });

  if (!staff) {
    showAuthError('❌ Tên đăng nhập không chính xác! Vui lòng nhập đúng Gmail trong Danh sách nhân viên 2024.');
    return;
  }

  // Kiểm tra mật khẩu (Chức năng: VD UserH)
  const isPasswordMatch = checkStaffPassword(pwdVal, staff.passwords);
  if (!isPasswordMatch) {
    showAuthError('❌ Mật khẩu không chính xác! Mật khẩu là tên trong cột "chức năng" (VD: UserH) trong Danh sách nhân viên 2024.');
    return;
  }

  // Đăng nhập thành công!
  const authenticatedUser = {
    id: staff.id,
    name: staff.name,
    title: staff.title,
    roleText: staff.roleText,
    email: staff.email,
    isAdmin: Boolean(staff.isAdmin)
  };

  AppState.currentUser = authenticatedUser;
  localStorage.setItem(AppState.authStorageKey, JSON.stringify(authenticatedUser));

  hideAuthModal();
  updateAuthHeaderUI();
  initData();
  setupEventListeners();
  renderAll();
  initSupabase();

  const welcomeRole = staff.isAdmin ? 'Trưởng khoa' : staff.roleText;
  showToast(`Xin chào ${escapeHtml(staff.title)} ${escapeHtml(staff.name)} (${escapeHtml(welcomeRole)})!`);
};

function checkStaffPassword(input, validList) {
  if (!input || !validList || !validList.length) return false;
  const clean = str => str.toLowerCase().replace(/[\s\.\-_,]/g, '');
  const cleanInput = clean(input);
  return validList.some(v => clean(v) === cleanInput);
}

function showAuthError(msg) {
  const errorEl = document.getElementById('authErrorMessage');
  if (errorEl) {
    errorEl.innerHTML = msg;
    errorEl.style.display = 'block';
  }
}

function showAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function hideAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

window.toggleAuthPasswordVisibility = function() {
  const pwdInput = document.getElementById('authPassword');
  const btn = document.getElementById('btnTogglePwd');
  if (!pwdInput) return;
  if (pwdInput.type === 'password') {
    pwdInput.type = 'text';
    if (btn) btn.textContent = '🙈';
  } else {
    pwdInput.type = 'password';
    if (btn) btn.textContent = '👁️';
  }
};

function updateAuthHeaderUI() {
  const userAuthProfile = document.getElementById('userAuthProfile');
  const userDisplayName = document.getElementById('userDisplayName');
  const userRoleBadge = document.getElementById('userRoleBadge');
  const userAvatarBadge = document.getElementById('userAvatarBadge');
  const btnOpenAdmin = document.getElementById('btnOpenAdmin');
  const btnLogout = document.getElementById('btnLogout');
  const guestBanner = document.getElementById('guestNoticeBanner');

  if (!AppState.currentUser) {
    if (userAuthProfile) userAuthProfile.style.display = 'none';
    if (btnOpenAdmin) btnOpenAdmin.style.display = 'none';
    if (guestBanner) guestBanner.style.display = 'none';
    return;
  }

  const user = AppState.currentUser;
  if (userAuthProfile) userAuthProfile.style.display = 'flex';

  // 1. TRƯỜNG HỢP: TÀI KHOẢN KHÁCH (CHỈ XEM GIAO DIỆN TRANG CHỦ)
  if (user.isGuest) {
    if (userDisplayName) {
      userDisplayName.textContent = 'Tài khoản khách';
      userDisplayName.title = 'Tài khoản khách (Chỉ xem giao diện và giới thiệu trang chủ)';
    }
    if (userRoleBadge) {
      userRoleBadge.textContent = '👁️ Khách xem';
      userRoleBadge.className = 'user-role-badge role-guest';
    }
    if (userAvatarBadge) {
      userAvatarBadge.textContent = '👤';
      userAvatarBadge.className = 'user-avatar-badge guest-avatar';
    }
    if (btnOpenAdmin) {
      btnOpenAdmin.style.display = 'none';
    }
    if (btnLogout) {
      btnLogout.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
          <polyline points="10 17 15 12 10 7"/>
          <line x1="15" y1="12" x2="3" y2="12"/>
        </svg>
        <span>Đăng nhập</span>
      `;
      btnLogout.title = 'Bấm để đăng nhập bằng tài khoản Cán bộ nhân viên hoặc Admin';
    }
    if (guestBanner) {
      guestBanner.style.display = 'flex';
    }
    return;
  }

  // Ẩn banner tài khoản khách khi đăng nhập tài khoản thực
  if (guestBanner) guestBanner.style.display = 'none';

  if (btnLogout) {
    btnLogout.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
      <span>Đăng xuất</span>
    `;
    btnLogout.title = 'Đăng xuất khỏi hệ thống';
  }

  if (userDisplayName) {
    userDisplayName.textContent = `${user.title || ''} ${user.name}`.trim();
    userDisplayName.title = `${user.title || ''} ${user.name} (${user.email || ''})`.trim();
  }

  // 2. TRƯỜNG HỢP: TÀI KHOẢN ADMIN (BS.CKII. ĐÀO QUANG TRUNG)
  if (user.isAdmin) {
    if (userRoleBadge) {
      userRoleBadge.textContent = '👑 Quản trị viên (Admin)';
      userRoleBadge.className = 'user-role-badge role-admin';
    }
    if (userAvatarBadge) {
      userAvatarBadge.textContent = '👨‍⚕️';
      userAvatarBadge.className = 'user-avatar-badge admin-avatar';
    }
    // Admin: Xem và dùng nút Quản trị
    if (btnOpenAdmin) {
      btnOpenAdmin.style.display = 'flex';
    }
  } else {
    // 3. TRƯỜNG HỢP: CÁN BỘ NHÂN VIÊN THƯỜNG
    if (userRoleBadge) {
      userRoleBadge.textContent = user.roleText;
      userRoleBadge.className = 'user-role-badge';
    }
    if (userAvatarBadge) {
      userAvatarBadge.textContent = '👤';
      userAvatarBadge.className = 'user-avatar-badge';
    }
    // Nhân viên: Ẩn hoàn toàn nút Quản trị khỏi Header
    if (btnOpenAdmin) {
      btnOpenAdmin.style.display = 'none';
    }
  }
}

window.logout = function() {
  const isGuest = AppState.currentUser && AppState.currentUser.isGuest;
  if (isGuest) {
    // Nếu đang là khách, bấm Đăng nhập thì mở ngay form đăng nhập
    showAuthModal();
    return;
  }

  if (confirm('Bạn có chắc chắn muốn đăng xuất khỏi Cổng thông tin Vi sinh?')) {
    localStorage.removeItem(AppState.authStorageKey);
    AppState.currentUser = null;
    updateAuthHeaderUI();
    showAuthModal();
    const selectEl = document.getElementById('quickStaffSelect');
    const emailInput = document.getElementById('authEmail');
    const pwdInput = document.getElementById('authPassword');
    const feedbackEl = document.getElementById('quickSelectFeedback');
    const errorEl = document.getElementById('authErrorMessage');
    if (selectEl) selectEl.value = '';
    if (emailInput) emailInput.value = '';
    if (pwdInput) pwdInput.value = '';
    if (feedbackEl) feedbackEl.style.display = 'none';
    if (errorEl) errorEl.style.display = 'none';
    showToast('Đã đăng xuất thành công.');
    renderAll();
  }
};

/**
 * Nạp dữ liệu cấu hình ban đầu kèm phân quyền truy cập (RBAC)
 */
function initData() {
  const defaultApps = (window.PORTAL_CONFIG && window.PORTAL_CONFIG.applications) ? [...window.PORTAL_CONFIG.applications] : [];
  
  // 1. Phân quyền RBAC: Nếu không phải Admin, lọc bỏ hoàn toàn 4 ứng dụng hạn chế
  const restricted = (window.STAFF_AUTH_CONFIG && window.STAFF_AUTH_CONFIG.restrictedAppIds) 
    ? window.STAFF_AUTH_CONFIG.restrictedAppIds 
    : ['nhat-ky-cong-viec', 'quan-ly-tien-do-cong-viec', 'thong-ke-hoa-chat', 'quan-ly-kho'];

  let allowedApps = defaultApps;
  if (!AppState.currentUser || !AppState.currentUser.isAdmin) {
    allowedApps = defaultApps.filter(app => !restricted.includes(app.id));
  }

  // Nạp từ bộ nhớ đã lưu (nếu có tùy chỉnh đường dẫn từ admin)
  const savedData = localStorage.getItem(AppState.storageKey);
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      AppState.apps = allowedApps.map(def => {
        const found = parsed.find(p => p.id === def.id);
        return found ? { ...def, url: found.url || def.url } : def;
      });
    } catch (e) {
      AppState.apps = allowedApps;
    }
  } else {
    AppState.apps = allowedApps;
  }

  AppState.categories = (window.PORTAL_CONFIG && window.PORTAL_CONFIG.categories) ? [...window.PORTAL_CONFIG.categories] : [];

  // Nạp dữ liệu Báo Cáo Khoa Vi Sinh & Liên Kết Khác
  initReportsData();
  initOtherLinksData();
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

  // Hỗ trợ phím ESC đóng mọi modal & menu (tối ưu bàn phím Laptop / MacBook)
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
  renderDepartmentReportsTable();
  renderOtherLinksTable();
}

/**
 * 1. RENDER THANH CÔNG CỤ TRÁI (SIDEBAR)
 * Mục đầu tiên: "Báo cáo khoa Vi sinh" (Nổi bật đặc biệt)
 * Tiếp theo là danh mục các Webapp chuyên ngành
 */
function renderSidebarApps() {
  const container = document.getElementById('sidebarAppsList');
  if (!container) return;

  const drawerTitle = document.getElementById('sidebarDrawerTitle');
  if (drawerTitle) {
    drawerTitle.textContent = `DANH MỤC ${AppState.apps.length} ỨNG DỤNG`;
  }
  const bnavAppsCountLabel = document.getElementById('bnavAppsCountLabel');
  if (bnavAppsCountLabel) {
    bnavAppsCountLabel.textContent = `${AppState.apps.length} Ứng dụng`;
  }

  const sortedApps = [...AppState.apps].sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));

  // MỤC Ở NGAY ĐẦU TIÊN: "Báo cáo khoa Vi sinh" (Đổi tên và làm nổi bật theo yêu cầu)
  const isReportsActive = AppState.activeSidebarId === 'dept-reports';
  const reportItemHtml = `
    <button type="button" 
            class="sidebar-app-btn sidebar-dept-reports-special ${isReportsActive ? 'active' : ''}" 
            id="sidebar-item-dept-reports"
            onclick="navigateToDepartmentReports(event)"
            title="Báo cáo khoa Vi sinh – Bảng tổng hợp liên kết link báo cáo theo năm & liên kết khác">
      <div class="sidebar-app-icon sidebar-special-report-icon" aria-hidden="true">
        ${SVG_ICONS.FileText}
      </div>
      <div class="sidebar-app-meta">
        <span class="sidebar-app-title sidebar-special-report-title">Báo cáo khoa Vi sinh</span>
        <span class="sidebar-app-category sidebar-special-report-sub">Tổng hợp báo cáo</span>
      </div>
      <span class="sidebar-special-badge">NỔI BẬT</span>
      <div class="sidebar-app-arrow">
        ${SVG_ICONS.ChevronRight}
      </div>
    </button>
  `;

  // Danh mục các ứng dụng chuyên ngành
  const appsHtml = sortedApps.map((app) => {
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
          <span class="sidebar-app-title">${escapeHtml(app.name)}</span>
          <span class="sidebar-app-category">${escapeHtml(app.badge || app.category)}</span>
        </div>
        <div class="sidebar-app-arrow">
          ${SVG_ICONS.ChevronRight}
        </div>
      </button>
    `;
  }).join('');

  container.innerHTML = reportItemHtml + appsHtml;
}

/**
 * Xử lý khi nhấn vào 1 ứng dụng trên Sidebar
 */
window.onSidebarAppClick = function(appId) {
  if (isGuestUser()) {
    notifyGuestRestricted('ứng dụng này');
    return;
  }

  const restricted = (window.STAFF_AUTH_CONFIG && window.STAFF_AUTH_CONFIG.restrictedAppIds) 
    ? window.STAFF_AUTH_CONFIG.restrictedAppIds 
    : ['nhat-ky-cong-viec', 'quan-ly-tien-do-cong-viec', 'thong-ke-hoa-chat', 'quan-ly-kho'];

  if ((!AppState.currentUser || !AppState.currentUser.isAdmin) && restricted.includes(appId)) {
    alert('⚠️ QUYỀN TRUY CẬP BỊ TỪ CHỐI!\n\nỨng dụng này chỉ dành cho Lãnh đạo khoa / Quản trị viên.');
    return;
  }

  AppState.activeSidebarId = appId;
  AppState.selectedAppCardId = appId;
  
  // Hiển thị lại các section Webapp, ẩn Bảng Báo Cáo
  const homeOverview = document.getElementById('homeOverview');
  const catalogSection = document.getElementById('appsCatalogSection');
  const appsGridSection = document.querySelector('.apps-display-section');
  const reportsSection = document.getElementById('departmentReportsSection');

  if (homeOverview) homeOverview.style.display = 'block';
  if (catalogSection) catalogSection.style.display = 'block';
  if (appsGridSection) appsGridSection.style.display = 'block';
  if (reportsSection) reportsSection.style.display = 'none';

  // Bỏ active của nút Trang chủ & Báo cáo khoa
  const navItemHome = document.getElementById('navItemHome');
  if (navItemHome) navItemHome.classList.remove('active');
  const reportBtn = document.getElementById('sidebar-item-dept-reports');
  if (reportBtn) reportBtn.classList.remove('active');

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

  // Cập nhật trạng thái thẻ được chọn (nền xanh nổi bật) trên giao diện chính
  document.querySelectorAll('.app-card').forEach(card => {
    card.classList.remove('is-selected-card');
  });

  const targetCard = document.getElementById(`card-${appId}`);
  if (targetCard) {
    targetCard.classList.add('is-selected-card');
    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    targetCard.classList.remove('highlight-card');
    void targetCard.offsetWidth; // Trigger reflow
    targetCard.classList.add('highlight-card');
  }
};

/**
 * Xử lý khi nhấn vào "TRANG CHỦ" trên Sidebar hoặc Logo
 */
window.navigateToHome = function(event) {
  if (event) event.preventDefault();
  
  AppState.activeSidebarId = 'home';
  AppState.selectedAppCardId = null;

  // Hiển thị lại các section Webapp, ẩn Bảng Báo Cáo
  const homeOverview = document.getElementById('homeOverview');
  const catalogSection = document.getElementById('appsCatalogSection');
  const appsGridSection = document.querySelector('.apps-display-section');
  const reportsSection = document.getElementById('departmentReportsSection');

  if (homeOverview) homeOverview.style.display = 'block';
  if (catalogSection) catalogSection.style.display = 'block';
  if (appsGridSection) appsGridSection.style.display = 'block';
  if (reportsSection) reportsSection.style.display = 'none';

  // Kích hoạt nút Trang chủ trên sidebar
  const navItemHome = document.getElementById('navItemHome');
  if (navItemHome) navItemHome.classList.add('active');

  // Xóa active của nút Báo cáo và các app trong sidebar
  const reportBtn = document.getElementById('sidebar-item-dept-reports');
  if (reportBtn) reportBtn.classList.remove('active');

  document.querySelectorAll('.sidebar-app-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Bỏ chọn tất cả các thẻ webapp trên giao diện chính
  document.querySelectorAll('.app-card').forEach(card => {
    card.classList.remove('is-selected-card');
  });

  // Cập nhật trạng thái bottom nav di động
  updateBottomNavActive('bnavHome');

  // Đóng drawer trên thiết bị nhỏ
  toggleSidebar(false);

  // Đưa về bộ lọc ban đầu
  resetSearchAndFilters();

  // Cuộn mượt lên đỉnh trang
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Xử lý khi nhấn vào "BÁO CÁO KHOA VI SINH" trên Sidebar
 * Hiển thị bảng "Tổng Hợp Báo Cáo Khoa Vi Sinh"
 */
window.navigateToDepartmentReports = function(event) {
  if (event) event.preventDefault();

  if (isGuestUser()) {
    notifyGuestRestricted('Báo cáo khoa Vi sinh');
    return;
  }

  AppState.activeSidebarId = 'dept-reports';
  AppState.selectedAppCardId = null;

  // 1. Sidebar Active State: Chuyển màu xanh nổi bật như Trang chủ
  const navItemHome = document.getElementById('navItemHome');
  if (navItemHome) navItemHome.classList.remove('active');

  document.querySelectorAll('.sidebar-app-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const reportBtn = document.getElementById('sidebar-item-dept-reports');
  if (reportBtn) reportBtn.classList.add('active');

  // 2. Chuyển đổi màn hình chính: Ẩn Trang chủ & Webapps, Hiện Bảng Báo Cáo
  const homeOverview = document.getElementById('homeOverview');
  const catalogSection = document.getElementById('appsCatalogSection');
  const appsGridSection = document.querySelector('.apps-display-section');
  const reportsSection = document.getElementById('departmentReportsSection');

  if (homeOverview) homeOverview.style.display = 'none';
  if (catalogSection) catalogSection.style.display = 'none';
  if (appsGridSection) appsGridSection.style.display = 'none';
  if (reportsSection) reportsSection.style.display = 'block';

  // 3. Đóng drawer mobile nếu đang mở
  toggleSidebar(false);

  // 4. Render Bảng Báo Cáo & Bảng Link Liên Kết Khác
  renderDepartmentReportsTable();
  renderOtherLinksTable();

  // 5. Cuộn mượt lên đầu bảng
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Điều hướng nhanh & Tiện ích di động (Mobile Bottom Nav)
 */
window.focusSearchInput = function() {
  const searchSection = document.getElementById('appsCatalogSection');
  const searchInput = document.getElementById('searchInput');
  if (searchSection) {
    searchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  if (searchInput) {
    setTimeout(() => searchInput.focus(), 350);
  }
  updateBottomNavActive('bnavSearch');
};

window.scrollToTop = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateBottomNavActive('bnavHome');
};

function updateBottomNavActive(activeId) {
  document.querySelectorAll('.bottom-nav-item').forEach(item => item.classList.remove('active'));
  const activeEl = document.getElementById(activeId);
  if (activeEl) activeEl.classList.add('active');
}

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
      <span>Tất cả ứng dụng</span>
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
  const isSelected = AppState.selectedAppCardId === app.id;
  
  // Xác định class nền tảng
  let platformClass = 'gas';
  if (app.platform.includes('Vercel')) platformClass = 'vercel';
  else if (app.platform.includes('Notebook')) platformClass = 'notebook';

  return `
    <article class="app-card ${isSelected ? 'is-selected-card' : ''}" id="card-${app.id}" onclick="onCardClick(event, '${app.id}')">
      <div class="selected-app-indicator">
        <span class="indicator-pulse-dot"></span>
        <span>ĐANG CHỌN XEM • HƯỚNG DẪN TRUY CẬP WEBAPP</span>
      </div>

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
        <button type="button" class="btn-card-action btn-card-view" onclick="event.stopPropagation(); openAppViewer('${app.id}')" title="Xem trực tiếp trên trang">
          ${SVG_ICONS.Eye}
          <span>Xem trực tiếp</span>
        </button>

        <!-- Nút Mở Tab Mới -->
        <a href="${escapeHtml(app.url)}" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-card-open" onclick="handleCardExternalOpen(event, '${escapeHtml(app.url)}')" title="Mở trong tab riêng biệt">
          ${SVG_ICONS.ExternalLink}
          <span>Mở Tab</span>
        </a>

        <!-- Nút QR -->
        <button type="button" class="btn-card-qr" onclick="event.stopPropagation(); showQrModal('${escapeHtml(app.url)}', '${escapeHtml(app.name)}')" title="Quét mã QR trên điện thoại/tablet">
          ${SVG_ICONS.QrCode}
        </button>
      </div>
    </article>
  `;
}

/**
 * Xử lý khi bấm nút Mở Tab trên thẻ (chặn tài khoản khách)
 */
window.handleCardExternalOpen = function(event, url) {
  event.stopPropagation();
  if (isGuestUser()) {
    event.preventDefault();
    notifyGuestRestricted('đường link ứng dụng');
    return false;
  }
  return true;
};

/**
 * Click vào bất kỳ vị trí trên thẻ ứng dụng để chọn và làm nổi bật
 */
window.onCardClick = function(event, appId) {
  if (event.target.closest('.btn-card-action') || event.target.closest('.btn-card-qr')) return;
  if (isGuestUser()) {
    notifyGuestRestricted('ứng dụng này');
    return;
  }
  onSidebarAppClick(appId);
};

/**
 * Bộ xem trực tiếp ứng dụng (In-Portal Viewer)
 */
window.openAppViewer = function(appId) {
  if (isGuestUser()) {
    notifyGuestRestricted('ứng dụng này');
    return;
  }

  const restricted = (window.STAFF_AUTH_CONFIG && window.STAFF_AUTH_CONFIG.restrictedAppIds) 
    ? window.STAFF_AUTH_CONFIG.restrictedAppIds 
    : ['nhat-ky-cong-viec', 'quan-ly-tien-do-cong-viec', 'thong-ke-hoa-chat', 'quan-ly-kho'];

  if ((!AppState.currentUser || !AppState.currentUser.isAdmin) && restricted.includes(appId)) {
    alert('⚠️ QUYỀN TRUY CẬP BỊ TỪ CHỐI!\n\nỨng dụng này chỉ dành cho Lãnh đạo khoa / Quản trị viên.');
    return;
  }

  const app = AppState.apps.find(a => a.id === appId);
  if (!app) return;

  AppState.currentViewingApp = app;
  AppState.activeSidebarId = appId;
  AppState.selectedAppCardId = appId;

  // Cập nhật trạng thái thẻ được chọn trên giao diện chính
  document.querySelectorAll('.app-card').forEach(card => card.classList.remove('is-selected-card'));
  const currentCard = document.getElementById(`card-${appId}`);
  if (currentCard) currentCard.classList.add('is-selected-card');

  // Cập nhật trạng thái active trên sidebar chuyển màu xanh
  const navItemHome = document.getElementById('navItemHome');
  if (navItemHome) navItemHome.classList.remove('active');
  document.querySelectorAll('.sidebar-app-btn').forEach(btn => btn.classList.remove('active'));
  const currentBtn = document.getElementById(`sidebar-item-${appId}`);
  if (currentBtn) currentBtn.classList.add('active');

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
  document.body.classList.add('viewer-open');
};

window.closeAppViewer = function() {
  const modal = document.getElementById('appViewerModal');
  const container = document.querySelector('.viewer-modal-container');
  const iframe = document.getElementById('viewerIframe');
  const btnText = document.getElementById('fullscreenBtnText');
  if (modal) modal.classList.remove('open');
  if (container) container.classList.remove('is-fullscreen');
  if (btnText) btnText.textContent = 'Phóng to';
  if (iframe) iframe.src = 'about:blank';
  document.body.classList.remove('viewer-open');
  AppState.currentViewingApp = null;
};

window.toggleViewerFullscreen = function() {
  const container = document.querySelector('.viewer-modal-container');
  const btnText = document.getElementById('fullscreenBtnText');
  if (!container) return;
  const isFull = container.classList.toggle('is-fullscreen');
  if (btnText) {
    btnText.textContent = isFull ? 'Thu nhỏ' : 'Phóng to';
  }
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
  if (isGuestUser()) {
    notifyGuestRestricted('mã QR ứng dụng');
    return;
  }

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
    if (modal.id === 'authModal' && !AppState.currentUser) return;
    modal.classList.remove('open');
    modal.style.display = 'none';
  });
};

/**
 * Bảng quản trị liên kết 9 webapp & cấu hình Supabase Cloud
 */
window.openAdminModal = function(tab = 'apps') {
  if (!AppState.currentUser || !AppState.currentUser.isAdmin) {
    alert('⚠️ QUYỀN TRUY CẬP BỊ TỪ CHỐI!\n\nMục Quản trị hệ thống chỉ dành cho Admin (BS.CKII. Đào Quang Trung). Bạn không có quyền xem hoặc chỉnh sửa.');
    return;
  }

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
        📱 10 Liên Kết Webapp
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
        💡 Danh sách 10 liên kết webapp thực tế của Khoa Vi sinh – BV Đa khoa Đức Giang. Bạn có thể chỉnh sửa link trực tiếp bên dưới và bấm <strong>"Lưu cấu hình"</strong>.
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
  if (!AppState.currentUser || !AppState.currentUser.isAdmin) {
    alert('⚠️ Bạn không có quyền thực hiện thao tác này!');
    return;
  }
  AppState.apps.forEach(app => {
    const input = document.getElementById(`admin-url-${app.id}`);
    if (input) app.url = input.value.trim();
  });

  localStorage.setItem(AppState.storageKey, JSON.stringify(AppState.apps));
  closeAllModals();
  renderAll();
  showToast('Đã lưu cấu hình 10 đường dẫn webapp thành công!');
};

window.resetToDefaultConfig = function() {
  if (!AppState.currentUser || !AppState.currentUser.isAdmin) {
    alert('⚠️ Bạn không có quyền thực hiện thao tác này!');
    return;
  }
  if (confirm('Khôi phục về 10 liên kết webapp thực tế ban đầu?')) {
    localStorage.removeItem(AppState.storageKey);
    initData();
    closeAllModals();
    renderAll();
    showToast('Đã khôi phục 10 liên kết thực tế!');
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

/**
 * ==========================================================================
 * MODULE: TỔNG HỢP BÁO CÁO KHOA VI SINH – BỆNH VIỆN ĐA KHOA ĐỨC GIANG
 * 
 * Quản lý & liên kết các link báo cáo theo từng năm
 * Phân quyền (RBAC):
 * - Mọi tài khoản nhân viên & admin đều vào xem được
 * - Chỉ tài khoản Admin mới có quyền: Thêm mới, Thêm năm, Sửa, Xóa và nhập cột Lưu ý
 * - Hỏi xác nhận trước khi Sửa và Xóa
 * ==========================================================================
 */

function initReportsData() {
  const defaultCfg = window.REPORTS_CONFIG || {};
  const defaultYears = defaultCfg.defaultYears || ["2024", "2025", "2026"];
  const defaultReports = defaultCfg.defaultReports || [];

  // 1. Nạp danh sách các năm
  const savedYears = localStorage.getItem(defaultCfg.yearsStorageKey || 'bvdkg_department_reports_years_v1');
  if (savedYears) {
    try {
      const parsedYears = JSON.parse(savedYears);
      if (Array.isArray(parsedYears) && parsedYears.length > 0) {
        AppState.reportYears = parsedYears;
      } else {
        AppState.reportYears = [...defaultYears];
      }
    } catch (e) {
      AppState.reportYears = [...defaultYears];
    }
  } else {
    AppState.reportYears = [...defaultYears];
  }

  // 2. Nạp danh sách các báo cáo
  const savedReports = localStorage.getItem(defaultCfg.storageKey || 'bvdkg_department_reports_v1');
  if (savedReports) {
    try {
      const parsedReports = JSON.parse(savedReports);
      if (Array.isArray(parsedReports) && parsedReports.length > 0) {
        AppState.departmentReports = parsedReports;
      } else {
        AppState.departmentReports = [...defaultReports];
      }
    } catch (e) {
      AppState.departmentReports = [...defaultReports];
    }
  } else {
    AppState.departmentReports = [...defaultReports];
  }
}

function saveDepartmentReportsToStorage() {
  const defaultCfg = window.REPORTS_CONFIG || {};
  try {
    localStorage.setItem(defaultCfg.storageKey || 'bvdkg_department_reports_v1', JSON.stringify(AppState.departmentReports));
    localStorage.setItem(defaultCfg.yearsStorageKey || 'bvdkg_department_reports_years_v1', JSON.stringify(AppState.reportYears));
  } catch (e) {
    console.error('Lỗi lưu báo cáo vào localStorage:', e);
  }
}

/**
 * RENDER BẢNG TỔNG HỢP BÁO CÁO KHOA VI SINH
 */
function renderDepartmentReportsTable() {
  const table = document.getElementById('reportsDataTable');
  if (!table) return;

  const isAdmin = AppState.currentUser && AppState.currentUser.isAdmin;
  const years = AppState.reportYears || ["2024", "2025", "2026"];
  const query = (AppState.reportSearchQuery || '').toLowerCase().trim();

  // 1. Ẩn/Hiện các nút chức năng theo quyền
  const btnAddReport = document.getElementById('btnAdminAddReport');
  const btnAddYear = document.getElementById('btnAdminAddYear');
  const btnDeleteYear = document.getElementById('btnAdminDeleteYear');
  if (btnAddReport) btnAddReport.style.display = isAdmin ? 'inline-flex' : 'none';
  if (btnAddYear) btnAddYear.style.display = isAdmin ? 'inline-flex' : 'none';
  if (btnDeleteYear) btnDeleteYear.style.display = isAdmin ? 'inline-flex' : 'none';

  // 2. Lọc dữ liệu theo tìm kiếm
  const filtered = AppState.departmentReports.filter(rep => {
    if (!query) return true;
    const matchContent = (rep.content || '').toLowerCase().includes(query);
    const matchResp = (rep.responsible || '').toLowerCase().includes(query);
    const matchNotes = (rep.notes || '').toLowerCase().includes(query);
    return matchContent || matchResp || matchNotes;
  });

  // 3. Header Bảng: 2 hàng header (Cột 4 là Đường Link chia thành các cột năm nhỏ hơn)
  const theadHtml = `
    <thead>
      <tr class="header-main-row">
        <th class="th-stt" rowspan="2">STT</th>
        <th class="th-content" rowspan="2">Nội dung báo cáo</th>
        <th class="th-responsible" rowspan="2">Người phụ trách</th>
        <th class="th-links-group" colspan="${years.length}">
          <div class="links-group-header">
            <span>Đường Link Báo Cáo</span>
            ${isAdmin ? `
              <div class="links-header-btns">
                <button type="button" class="btn-th-add-year" onclick="promptAddNewReportYear()" title="Bổ sung thêm cột năm mới">+ Thêm năm</button>
                <button type="button" class="btn-th-del-year" onclick="promptDeleteReportYear()" title="Xóa bớt cột năm">- Xóa năm</button>
              </div>
            ` : ''}
          </div>
        </th>
        <th class="th-notes" rowspan="2">
          <span>Lưu ý</span>
          <span class="th-note-tag" title="Chỉ Admin mới có quyền thêm/sửa nội dung cột này">Admin</span>
        </th>
        ${isAdmin ? `<th class="th-actions" rowspan="2">Thao tác & Vị trí</th>` : ''}
      </tr>
      <tr class="header-years-row">
        ${years.map(yr => `
          <th class="th-year">
            <div class="th-year-inner">
              <span>Năm ${yr}</span>
              ${isAdmin ? `
                <button type="button" 
                        class="btn-del-year-col" 
                        onclick="onAdminDeleteReportYear('${yr}')" 
                        title="Xóa cột Năm ${yr} (Cần xác nhận)">✕</button>
              ` : ''}
            </div>
          </th>
        `).join('')}
      </tr>
    </thead>
  `;

  // 4. Body Bảng
  let tbodyHtml = '';
  if (filtered.length === 0) {
    const totalCols = 4 + years.length + (isAdmin ? 1 : 0);
    tbodyHtml = `
      <tbody>
        <tr>
          <td colspan="${totalCols}" class="empty-table-cell">
            <div class="empty-table-state">
              <span class="empty-table-icon">📄</span>
              <p>Không tìm thấy báo cáo nào phù hợp với yêu cầu tìm kiếm.</p>
              ${isAdmin ? `<button type="button" class="btn-report-primary" onclick="openAddReportModal()">➕ Thêm mới báo cáo ngay</button>` : ''}
            </div>
          </td>
        </tr>
      </tbody>
    `;
  } else {
    tbodyHtml = `
      <tbody>
        ${filtered.map((rep, idx) => {
          const isFirst = (idx === 0);
          const isLast = (idx === filtered.length - 1);

          return `
            <tr class="report-row" id="report-row-${rep.id}">
              <td class="td-stt text-center font-bold">${idx + 1}</td>
              <td class="td-content">
                <div class="report-content-box">
                  <span class="report-doc-icon">📑</span>
                  <span class="report-content-title">${escapeHtml(rep.content)}</span>
                </div>
              </td>
              <td class="td-responsible">
                <div class="resp-pill">
                  <span class="resp-avatar-icon">👤</span>
                  <span class="resp-text">${escapeHtml(rep.responsible || 'Chưa cập nhật')}</span>
                </div>
              </td>
              ${years.map(yr => {
                const link = (rep.links && rep.links[yr]) ? rep.links[yr].trim() : '';
                if (link) {
                  return `
                    <td class="td-link text-center">
                      <a href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer" class="tbl-report-link" title="Mở link báo cáo năm ${yr} trong tab mới">
                        <span class="link-label">Năm ${yr}</span>
                        <span class="link-icon">↗</span>
                      </a>
                    </td>
                  `;
                } else {
                  return `
                    <td class="td-link text-center">
                      <span class="tbl-no-link" title="Chưa cập nhật link cho năm ${yr}">—</span>
                    </td>
                  `;
                }
              }).join('')}
              <td class="td-notes">
                ${rep.notes ? `
                  <div class="report-note-bubble">
                    <span class="note-pin">📌</span>
                    <span>${escapeHtml(rep.notes)}</span>
                  </div>
                ` : `<span class="tbl-no-link">—</span>`}
              </td>
              ${isAdmin ? `
                <td class="td-actions text-center">
                  <div class="table-actions-cluster">
                    <!-- Cụm nút di chuyển hàng lên / xuống -->
                    <div class="table-reorder-group" title="Admin: Chuyển vị trí hàng">
                      <button type="button" 
                              class="btn-row-order ${isFirst ? 'disabled' : ''}" 
                              onclick="moveReportUp('${rep.id}')" 
                              ${isFirst ? 'disabled' : ''} 
                              title="${isFirst ? 'Đã ở vị trí đầu tiên' : 'Chuyển hàng lên trên'}">
                        ▲
                      </button>
                      <button type="button" 
                              class="btn-row-order ${isLast ? 'disabled' : ''}" 
                              onclick="moveReportDown('${rep.id}')" 
                              ${isLast ? 'disabled' : ''} 
                              title="${isLast ? 'Đã ở vị trí cuối cùng' : 'Chuyển hàng xuống dưới'}">
                        ▼
                      </button>
                    </div>
                    <button type="button" class="btn-action-edit" onclick="onAdminEditReportClick('${rep.id}')" title="Sửa báo cáo (Cần xác nhận)">
                      ✏️ Sửa
                    </button>
                    <button type="button" class="btn-action-del" onclick="onAdminDeleteReportClick('${rep.id}')" title="Xóa báo cáo (Cần xác nhận)">
                      🗑️ Xóa
                    </button>
                  </div>
                </td>
              ` : ''}
            </tr>
          `;
        }).join('')}
      </tbody>
    `;
  }

  table.innerHTML = theadHtml + tbodyHtml;
}

/**
 * THÊM MỚI BÁO CÁO (CHỈ ADMIN ĐƯỢC PHÉP DÙNG)
 */
window.openAddReportModal = function() {
  if (!AppState.currentUser || !AppState.currentUser.isAdmin) {
    alert('⚠️ QUYỀN TRUY CẬP BỊ TỪ CHỐI!\n\nChỉ tài khoản Admin mới có quyền sử dụng chức năng Thêm mới báo cáo.');
    return;
  }

  const modal = document.getElementById('reportModal');
  const titleEl = document.getElementById('reportModalTitle');
  const editIdInput = document.getElementById('reportEditId');
  const contentInput = document.getElementById('reportContentInput');
  const respInput = document.getElementById('reportResponsibleInput');
  const notesInput = document.getElementById('reportNotesInput');

  if (!modal) return;

  if (titleEl) titleEl.textContent = '➕ Thêm Mới Báo Cáo Khoa Vi Sinh';
  if (editIdInput) editIdInput.value = '';
  if (contentInput) contentInput.value = '';
  if (respInput) respInput.value = '';
  if (notesInput) {
    notesInput.value = '';
    notesInput.removeAttribute('disabled');
  }

  populateQuickResponsibleDropdown();
  renderReportModalYearInputs({});

  modal.style.display = 'flex';
};

/**
 * SỬA BÁO CÁO (CHỈ ADMIN + HỎI XÁC NHẬN TRƯỚC KHI SỬA)
 */
window.onAdminEditReportClick = function(reportId) {
  if (!AppState.currentUser || !AppState.currentUser.isAdmin) {
    alert('⚠️ QUYỀN TRUY CẬP BỊ TỪ CHỐI!\n\nChỉ tài khoản Admin mới có quyền Sửa nội dung báo cáo.');
    return;
  }

  const report = AppState.departmentReports.find(r => r.id === reportId);
  if (!report) return;

  const isConfirmed = confirm(`XÁC NHẬN CHỈNH SỬA BÁO CÁO:\n\nBạn có chắc chắn muốn chỉnh sửa báo cáo:\n"${report.content}" không?`);
  if (!isConfirmed) return;

  openEditReportModal(report);
};

window.openEditReportModal = function(report) {
  const modal = document.getElementById('reportModal');
  const titleEl = document.getElementById('reportModalTitle');
  const editIdInput = document.getElementById('reportEditId');
  const contentInput = document.getElementById('reportContentInput');
  const respInput = document.getElementById('reportResponsibleInput');
  const notesInput = document.getElementById('reportNotesInput');

  if (!modal) return;

  if (titleEl) titleEl.textContent = '✏️ Chỉnh Sửa Báo Cáo Khoa Vi Sinh';
  if (editIdInput) editIdInput.value = report.id;
  if (contentInput) contentInput.value = report.content || '';
  if (respInput) respInput.value = report.responsible || '';
  if (notesInput) {
    notesInput.value = report.notes || '';
    notesInput.removeAttribute('disabled');
  }

  populateQuickResponsibleDropdown();
  renderReportModalYearInputs(report.links || {});

  modal.style.display = 'flex';
};

/**
 * XÓA BÁO CÁO (CHỈ ADMIN + HỎI XÁC NHẬN TRƯỚC KHI XÓA)
 */
window.onAdminDeleteReportClick = function(reportId) {
  if (!AppState.currentUser || !AppState.currentUser.isAdmin) {
    alert('⚠️ QUYỀN TRUY CẬP BỊ TỪ CHỐI!\n\nChỉ tài khoản Admin mới có quyền Xóa nội dung báo cáo.');
    return;
  }

  const report = AppState.departmentReports.find(r => r.id === reportId);
  if (!report) return;

  const isConfirmed = confirm(`⚠️ CẢNH BÁO QUẢN TRỊ VIÊN:\n\nBạn có chắc chắn muốn XÓA VĨNH VIỄN báo cáo:\n"${report.content}" không?\n\nThao tác này không thể hoàn tác!`);
  if (!isConfirmed) return;

  AppState.departmentReports = AppState.departmentReports.filter(r => r.id !== reportId);
  saveDepartmentReportsToStorage();
  renderDepartmentReportsTable();
  alert(`✓ Đã xóa thành công báo cáo: "${report.content}"`);
};

window.closeReportModal = function() {
  const modal = document.getElementById('reportModal');
  if (modal) modal.style.display = 'none';
};

/**
 * XỬ LÝ LƯU BÁO CÁO (THÊM MỚI HOẶC CẬP NHẬT)
 */
window.handleReportFormSubmit = function(event) {
  event.preventDefault();

  if (!AppState.currentUser || !AppState.currentUser.isAdmin) {
    alert('⚠️ QUYỀN TRUY CẬP BỊ TỪ CHỐI!\n\nChỉ tài khoản Admin mới có quyền lưu báo cáo!');
    return;
  }

  const editId = document.getElementById('reportEditId').value.trim();
  const content = document.getElementById('reportContentInput').value.trim();
  const responsible = document.getElementById('reportResponsibleInput').value.trim();
  const notes = document.getElementById('reportNotesInput').value.trim();

  if (!content) {
    alert('Vui lòng nhập nội dung báo cáo!');
    return;
  }

  // Thu thập các link theo từng năm
  const links = {};
  AppState.reportYears.forEach(yr => {
    const input = document.getElementById(`modalReportLink_${yr}`);
    if (input) {
      links[yr] = input.value.trim();
    }
  });

  if (editId) {
    // Cập nhật báo cáo đã có
    const index = AppState.departmentReports.findIndex(r => r.id === editId);
    if (index !== -1) {
      AppState.departmentReports[index] = {
        ...AppState.departmentReports[index],
        content,
        responsible: responsible || 'Chưa cập nhật',
        links,
        notes // Cột lưu ý chỉ Admin mới có quyền cập nhật
      };
      alert('✓ Đã cập nhật thành công nội dung báo cáo!');
    }
  } else {
    // Thêm mới báo cáo
    const newReport = {
      id: 'rep_' + Date.now(),
      content,
      responsible: responsible || (AppState.currentUser ? AppState.currentUser.name : 'BS.CKII. Đào Quang Trung'),
      links,
      notes // Cột lưu ý chỉ Admin mới có quyền thêm nội dung
    };
    AppState.departmentReports.push(newReport);
    alert('✓ Đã thêm mới thành công báo cáo vào hệ thống!');
  }

  saveDepartmentReportsToStorage();
  closeReportModal();
  renderDepartmentReportsTable();
};

/**
 * Render các ô input link năm trong modal
 */
function renderReportModalYearInputs(currentLinks) {
  const container = document.getElementById('reportYearInputsContainer');
  if (!container) return;

  container.innerHTML = AppState.reportYears.map(yr => {
    const val = currentLinks[yr] || '';
    return `
      <div class="modal-year-link-field">
        <label for="modalReportLink_${yr}" class="modal-year-label">
          <span>📅 Đường link Năm ${yr}:</span>
        </label>
        <input type="url" 
               id="modalReportLink_${yr}" 
               class="auth-input-field modal-year-input" 
               placeholder="Dán URL báo cáo năm ${yr} (https://...)" 
               value="${escapeHtml(val)}">
      </div>
    `;
  }).join('');
}

/**
 * Gợi ý danh sách 12 cán bộ nhân viên để chọn nhanh người phụ trách
 */
function populateQuickResponsibleDropdown() {
  const select = document.getElementById('quickResponsibleSelect');
  if (!select) return;
  if (!window.STAFF_AUTH_CONFIG || !window.STAFF_AUTH_CONFIG.staffList) return;

  select.innerHTML = `
    <option value="">-- ⚡ Hoặc chọn nhanh cán bộ --</option>
    ${window.STAFF_AUTH_CONFIG.staffList.map(s => `
      <option value="${escapeHtml(s.title + ' ' + s.name)}">${escapeHtml(s.title)} ${escapeHtml(s.name)} (${escapeHtml(s.roleText)})</option>
    `).join('')}
  `;
}

window.onSelectQuickResponsible = function(name) {
  const input = document.getElementById('reportResponsibleInput');
  if (input && name) {
    input.value = name;
  }
};

/**
 * THÊM CỘT NĂM MỚI VÀO BẢNG BÁO CÁO (CHỈ ADMIN ĐƯỢC PHÉP DÙNG)
 */
window.promptAddNewReportYear = function() {
  if (!AppState.currentUser || !AppState.currentUser.isAdmin) {
    alert('⚠️ QUYỀN TRUY CẬP BỊ TỪ CHỐI!\n\nChỉ tài khoản Admin mới có quyền thêm năm vào bảng báo cáo!');
    return;
  }

  const currentMaxYear = AppState.reportYears.reduce((max, y) => Math.max(max, parseInt(y, 10) || 0), 2026);
  const suggestedYear = (currentMaxYear + 1).toString();

  const inputYear = prompt(`Nhập năm mới cần bổ sung vào bảng báo cáo (Ví dụ: ${suggestedYear}):`, suggestedYear);
  if (!inputYear) return;

  const cleanYear = inputYear.trim();
  if (!/^\d{4}$/.test(cleanYear)) {
    alert('⚠️ Năm không hợp lệ! Vui lòng nhập năm gồm 4 chữ số (Ví dụ: 2027).');
    return;
  }
  if (AppState.reportYears.includes(cleanYear)) {
    alert(`⚠️ Năm ${cleanYear} đã tồn tại trong bảng báo cáo!`);
    return;
  }

  AppState.reportYears.push(cleanYear);
  AppState.reportYears.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  saveDepartmentReportsToStorage();

  // Nếu modal đang mở thì cập nhật lại input năm trong modal
  const modal = document.getElementById('reportModal');
  if (modal && modal.style.display !== 'none') {
    const editId = document.getElementById('reportEditId').value.trim();
    const currentRep = editId ? AppState.departmentReports.find(r => r.id === editId) : null;
    renderReportModalYearInputs(currentRep ? (currentRep.links || {}) : {});
  }

  renderDepartmentReportsTable();
  alert(`✓ Đã bổ sung thành công cột "Năm ${cleanYear}" vào Bảng Tổng hợp Báo cáo!`);
};

/**
 * TÌM KIẾM BÁO CÁO
 */
window.onReportSearchInput = function(val) {
  AppState.reportSearchQuery = (val || '').trim();
  const clearBtn = document.getElementById('btnClearReportSearch');
  if (clearBtn) {
    clearBtn.style.display = AppState.reportSearchQuery ? 'flex' : 'none';
  }
  renderDepartmentReportsTable();
};

window.clearReportSearch = function() {
  const input = document.getElementById('reportSearchInput');
  const clearBtn = document.getElementById('btnClearReportSearch');
  if (input) input.value = '';
  if (clearBtn) clearBtn.style.display = 'none';
  AppState.reportSearchQuery = '';
  renderDepartmentReportsTable();
};

/**
 * XÓA CỘT NĂM TRONG BẢNG BÁO CÁO (CHỈ ADMIN + HỎI XÁC NHẬN)
 */
window.onAdminDeleteReportYear = function(year) {
  if (!AppState.currentUser || !AppState.currentUser.isAdmin) {
    alert('⚠️ QUYỀN TRUY CẬP BỊ TỪ CHỐI!\n\nChỉ tài khoản Admin mới có quyền xóa năm trong bảng báo cáo.');
    return;
  }

  if (!AppState.reportYears.includes(year)) {
    alert(`⚠️ Năm ${year} không tồn tại trong danh sách!`);
    return;
  }

  if (AppState.reportYears.length <= 1) {
    alert('⚠️ Không thể xóa! Bảng báo cáo phải có tối thiểu 1 cột năm.');
    return;
  }

  const isConfirmed = confirm(`⚠️ CẢNH BÁO QUẢN TRỊ VIÊN:\n\nBạn có chắc chắn muốn XÓA CỘT "Năm ${year}" khỏi Bảng Báo Cáo?\n\nToàn bộ đường link liên kết của năm ${year} trong các báo cáo sẽ bị gỡ bỏ! Thao tác này không thể hoàn tác.`);
  if (!isConfirmed) return;

  // Xóa năm khỏi mảng năm
  AppState.reportYears = AppState.reportYears.filter(y => y !== year);

  // Xóa link của năm này trong từng báo cáo
  AppState.departmentReports.forEach(rep => {
    if (rep.links && rep.links[year] !== undefined) {
      delete rep.links[year];
    }
  });

  saveDepartmentReportsToStorage();

  // Cập nhật lại modal nếu đang mở
  const modal = document.getElementById('reportModal');
  if (modal && modal.style.display !== 'none') {
    const editId = document.getElementById('reportEditId').value.trim();
    const currentRep = editId ? AppState.departmentReports.find(r => r.id === editId) : null;
    renderReportModalYearInputs(currentRep ? (currentRep.links || {}) : {});
  }

  renderDepartmentReportsTable();
  alert(`✓ Đã xóa thành công cột "Năm ${year}" khỏi Bảng Báo Cáo!`);
};

window.promptDeleteReportYear = function() {
  if (!AppState.currentUser || !AppState.currentUser.isAdmin) {
    alert('⚠️ QUYỀN TRUY CẬP BỊ TỪ CHỐI!\n\nChỉ tài khoản Admin mới có quyền xóa năm.');
    return;
  }

  if (AppState.reportYears.length <= 1) {
    alert('⚠️ Không thể xóa! Bảng báo cáo phải có ít nhất 1 cột năm.');
    return;
  }

  const yearsList = AppState.reportYears.join(', ');
  const defaultSelected = AppState.reportYears[AppState.reportYears.length - 1];
  const inputYear = prompt(`Nhập năm cần xóa khỏi bảng báo cáo (${yearsList}):`, defaultSelected);
  if (!inputYear) return;

  const cleanYear = inputYear.trim();
  if (!AppState.reportYears.includes(cleanYear)) {
    alert(`⚠️ Năm "${cleanYear}" không tồn tại trong bảng báo cáo! Các năm hiện có: ${yearsList}`);
    return;
  }

  window.onAdminDeleteReportYear(cleanYear);
};

/**
 * THAY ĐỔI VỊ TRÍ HÀNG: CHUYỂN LÊN TRÊN (CHỈ ADMIN)
 */
window.moveReportUp = function(reportId) {
  if (!AppState.currentUser || !AppState.currentUser.isAdmin) {
    alert('⚠️ QUYỀN TRUY CẬP BỊ TỪ CHỐI!\n\nChỉ tài khoản Admin mới có quyền sắp xếp thứ tự hàng.');
    return;
  }

  const idx = AppState.departmentReports.findIndex(r => r.id === reportId);
  if (idx <= 0) return; // Đã ở đầu danh sách

  // Hoán đổi với phần tử phía trước
  const temp = AppState.departmentReports[idx];
  AppState.departmentReports[idx] = AppState.departmentReports[idx - 1];
  AppState.departmentReports[idx - 1] = temp;

  saveDepartmentReportsToStorage();
  renderDepartmentReportsTable();
};

/**
 * THAY ĐỔI VỊ TRÍ HÀNG: CHUYỂN XUỐNG DƯỚI (CHỈ ADMIN)
 */
window.moveReportDown = function(reportId) {
  if (!AppState.currentUser || !AppState.currentUser.isAdmin) {
    alert('⚠️ QUYỀN TRUY CẬP BỊ TỪ CHỐI!\n\nChỉ tài khoản Admin mới có quyền sắp xếp thứ tự hàng.');
    return;
  }

  const idx = AppState.departmentReports.findIndex(r => r.id === reportId);
  if (idx === -1 || idx >= AppState.departmentReports.length - 1) return; // Đã ở cuối danh sách

  // Hoán đổi với phần tử phía sau
  const temp = AppState.departmentReports[idx];
  AppState.departmentReports[idx] = AppState.departmentReports[idx + 1];
  AppState.departmentReports[idx + 1] = temp;

  saveDepartmentReportsToStorage();
  renderDepartmentReportsTable();
};

/* ==========================================================================
   BẢNG THỨ HAI: BẢNG TỔNG HỢP LINK LIÊN KẾT KHÁC
   Khoa Vi sinh – Bệnh viện Đa khoa Đức Giang
   - Hiển thị các liên kết tra cứu, tài liệu, quy chuẩn chuyên ngành
   - Cột: STT, Nội dung, Đường Link ("Mở Link"), Lưu ý (chữ đỏ nghiêng nhỏ)
   - Phân quyền: Mọi người đều xem được; Chỉ Admin được Thêm, Sửa, Xóa (có xác nhận), Sắp xếp vị trí hàng
   ========================================================================== */

/**
 * Khởi tạo dữ liệu Bảng Link Liên Kết Khác
 */
function initOtherLinksData() {
  const defaultCfg = window.REPORTS_CONFIG || {};
  const defaultOtherLinks = defaultCfg.defaultOtherLinks || [];
  const storageKey = defaultCfg.otherLinksStorageKey || 'bvdkg_other_links_v1';

  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        AppState.otherLinks = parsed;
      } else {
        AppState.otherLinks = [...defaultOtherLinks];
      }
    } catch (e) {
      AppState.otherLinks = [...defaultOtherLinks];
    }
  } else {
    AppState.otherLinks = [...defaultOtherLinks];
  }
}

/**
 * Lưu danh sách Link Liên Kết Khác vào LocalStorage
 */
function saveOtherLinksToStorage() {
  const defaultCfg = window.REPORTS_CONFIG || {};
  const storageKey = defaultCfg.otherLinksStorageKey || 'bvdkg_other_links_v1';
  try {
    localStorage.setItem(storageKey, JSON.stringify(AppState.otherLinks));
  } catch (e) {
    console.error('Lỗi lưu liên kết khác vào localStorage:', e);
  }
}

/**
 * RENDER BẢNG TỔNG HỢP LINK LIÊN KẾT KHÁC
 */
function renderOtherLinksTable() {
  const table = document.getElementById('otherLinksDataTable');
  if (!table) return;

  const isAdmin = AppState.currentUser && AppState.currentUser.isAdmin;
  const query = (AppState.otherLinkSearchQuery || '').toLowerCase().trim();

  // 1. Nút Thêm mới: Chỉ hiển thị cho Admin
  const btnAdd = document.getElementById('btnAdminAddOtherLink');
  if (btnAdd) {
    btnAdd.style.display = isAdmin ? 'inline-flex' : 'none';
  }

  // 2. Lọc dữ liệu theo ô tìm kiếm
  const filtered = AppState.otherLinks.filter(item => {
    if (!query) return true;
    const matchContent = (item.content || '').toLowerCase().includes(query);
    const matchNotes = (item.notes || '').toLowerCase().includes(query);
    const matchUrl = (item.url || '').toLowerCase().includes(query);
    return matchContent || matchNotes || matchUrl;
  });

  // 3. Render Header bảng
  // Cột 1: STT
  // Cột 2: Nội dung
  // Cột 3: Đường Link (Giao diện hiển thị nút "Mở Link")
  // Cột 4: Lưu ý (Chỉ Admin mới có quyền thêm/sửa nội dung)
  // Cột 5: Thao tác & Vị trí (Dành riêng cho Admin)
  const theadHtml = `
    <thead>
      <tr class="header-main-row">
        <th class="th-stt" style="width: 55px;">STT</th>
        <th class="th-content" style="min-width: 280px;">Nội dung</th>
        <th class="th-link text-center" style="width: 140px;">Đường Link</th>
        <th class="th-notes" style="min-width: 240px;">
          <span>Lưu ý</span>
          <span class="th-note-tag" title="Chỉ Admin mới có quyền thêm/sửa nội dung cột này">Admin</span>
        </th>
        ${isAdmin ? `<th class="th-actions text-center" style="width: 170px;">Thao tác & Vị trí</th>` : ''}
      </tr>
    </thead>
  `;

  // 4. Render Body bảng
  let tbodyHtml = '';
  if (filtered.length === 0) {
    const totalCols = isAdmin ? 5 : 4;
    tbodyHtml = `
      <tbody>
        <tr>
          <td colspan="${totalCols}" class="empty-table-cell">
            <div class="empty-table-state">
              <span class="empty-table-icon">🔗</span>
              <p>Không tìm thấy liên kết nào phù hợp với yêu cầu tìm kiếm.</p>
              ${isAdmin ? `<button type="button" class="btn-report-primary" onclick="openAddOtherLinkModal()">➕ Thêm mới liên kết ngay</button>` : ''}
            </div>
          </td>
        </tr>
      </tbody>
    `;
  } else {
    tbodyHtml = `
      <tbody>
        ${filtered.map((item, idx) => {
          const isFirst = (idx === 0);
          const isLast = (idx === filtered.length - 1);
          const link = (item.url || '').trim();

          return `
            <tr class="report-row" id="other-link-row-${item.id}">
              <td class="td-stt text-center font-bold">${idx + 1}</td>
              <td class="td-content">
                <div class="report-content-box">
                  <span class="report-doc-icon">🌐</span>
                  <span class="report-content-title">${escapeHtml(item.content)}</span>
                </div>
              </td>
              <td class="td-link text-center">
                ${link ? `
                  <a href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer" class="tbl-report-link tbl-open-link-btn" title="Mở liên kết trong tab mới">
                    <span class="link-label">Mở Link</span>
                    <span class="link-icon">↗</span>
                  </a>
                ` : `<span class="tbl-no-link" title="Chưa cập nhật đường link">—</span>`}
              </td>
              <td class="td-notes">
                ${item.notes ? `
                  <div class="report-note-bubble">
                    <span class="note-pin">📌</span>
                    <span>${escapeHtml(item.notes)}</span>
                  </div>
                ` : `<span class="tbl-no-link">—</span>`}
              </td>
              ${isAdmin ? `
                <td class="td-actions text-center">
                  <div class="table-actions-cluster">
                    <!-- Cụm nút di chuyển thứ tự hàng lên / xuống -->
                    <div class="table-reorder-group" title="Admin: Chuyển vị trí hàng">
                      <button type="button" 
                              class="btn-row-order ${isFirst ? 'disabled' : ''}" 
                              onclick="moveOtherLinkUp('${item.id}')" 
                              ${isFirst ? 'disabled' : ''} 
                              title="${isFirst ? 'Đã ở vị trí đầu tiên' : 'Chuyển hàng lên trên'}">
                        ▲
                      </button>
                      <button type="button" 
                              class="btn-row-order ${isLast ? 'disabled' : ''}" 
                              onclick="moveOtherLinkDown('${item.id}')" 
                              ${isLast ? 'disabled' : ''} 
                              title="${isLast ? 'Đã ở vị trí cuối cùng' : 'Chuyển hàng xuống dưới'}">
                        ▼
                      </button>
                    </div>
                    <button type="button" class="btn-action-edit" onclick="onAdminEditOtherLinkClick('${item.id}')" title="Sửa liên kết (Cần xác nhận)">
                      ✏️ Sửa
                    </button>
                    <button type="button" class="btn-action-del" onclick="onAdminDeleteOtherLinkClick('${item.id}')" title="Xóa liên kết (Cần xác nhận)">
                      🗑️ Xóa
                    </button>
                  </div>
                </td>
              ` : ''}
            </tr>
          `;
        }).join('')}
      </tbody>
    `;
  }

  table.innerHTML = theadHtml + tbodyHtml;
}

/**
 * THÊM MỚI LIÊN KẾT KHÁC (CHỈ ADMIN ĐƯỢC DÙNG)
 */
window.openAddOtherLinkModal = function() {
  if (!AppState.currentUser || !AppState.currentUser.isAdmin) {
    alert('⚠️ QUYỀN TRUY CẬP BỊ TỪ CHỐI!\n\nChỉ tài khoản Admin mới có quyền sử dụng chức năng Thêm mới liên kết.');
    return;
  }

  const modal = document.getElementById('otherLinkModal');
  const titleEl = document.getElementById('otherLinkModalTitle');
  const editIdInput = document.getElementById('otherLinkEditId');
  const contentInput = document.getElementById('otherLinkContentInput');
  const urlInput = document.getElementById('otherLinkUrlInput');
  const notesInput = document.getElementById('otherLinkNotesInput');

  if (!modal) return;

  if (titleEl) titleEl.textContent = '➕ Thêm Mới Link Liên Kết Khác';
  if (editIdInput) editIdInput.value = '';
  if (contentInput) contentInput.value = '';
  if (urlInput) urlInput.value = '';
  if (notesInput) {
    notesInput.value = '';
    notesInput.removeAttribute('disabled');
  }

  modal.style.display = 'flex';
};

/**
 * SỬA LIÊN KẾT KHÁC (CHỈ ADMIN + HỎI XÁC NHẬN TRƯỚC KHI SỬA)
 */
window.onAdminEditOtherLinkClick = function(linkId) {
  if (!AppState.currentUser || !AppState.currentUser.isAdmin) {
    alert('⚠️ QUYỀN TRUY CẬP BỊ TỪ CHỐI!\n\nChỉ tài khoản Admin mới có quyền Sửa nội dung liên kết.');
    return;
  }

  const item = AppState.otherLinks.find(l => l.id === linkId);
  if (!item) return;

  const isConfirmed = confirm(`XÁC NHẬN CHỈNH SỬA LIÊN KẾT:\n\nBạn có chắc chắn muốn chỉnh sửa liên kết:\n"${item.content}" không?`);
  if (!isConfirmed) return;

  openEditOtherLinkModal(item);
};

window.openEditOtherLinkModal = function(item) {
  const modal = document.getElementById('otherLinkModal');
  const titleEl = document.getElementById('otherLinkModalTitle');
  const editIdInput = document.getElementById('otherLinkEditId');
  const contentInput = document.getElementById('otherLinkContentInput');
  const urlInput = document.getElementById('otherLinkUrlInput');
  const notesInput = document.getElementById('otherLinkNotesInput');

  if (!modal) return;

  if (titleEl) titleEl.textContent = '✏️ Chỉnh Sửa Link Liên Kết Khác';
  if (editIdInput) editIdInput.value = item.id;
  if (contentInput) contentInput.value = item.content || '';
  if (urlInput) urlInput.value = item.url || '';
  if (notesInput) {
    notesInput.value = item.notes || '';
    notesInput.removeAttribute('disabled');
  }

  modal.style.display = 'flex';
};

/**
 * ĐÓNG MODAL LIÊN KẾT KHÁC
 */
window.closeOtherLinkModal = function() {
  const modal = document.getElementById('otherLinkModal');
  if (modal) modal.style.display = 'none';
};

/**
 * XỬ LÝ LƯU LIÊN KẾT KHÁC (THÊM MỚI HOẶC CẬP NHẬT)
 */
window.handleOtherLinkFormSubmit = function(event) {
  event.preventDefault();

  if (!AppState.currentUser || !AppState.currentUser.isAdmin) {
    alert('⚠️ QUYỀN TRUY CẬP BỊ TỪ CHỐI!\n\nChỉ tài khoản Admin mới có quyền lưu thông tin liên kết!');
    return;
  }

  const editId = document.getElementById('otherLinkEditId').value.trim();
  const content = document.getElementById('otherLinkContentInput').value.trim();
  const url = document.getElementById('otherLinkUrlInput').value.trim();
  const notes = document.getElementById('otherLinkNotesInput').value.trim();

  if (!content) {
    alert('Vui lòng nhập nội dung liên kết!');
    return;
  }
  if (!url) {
    alert('Vui lòng nhập đường link liên kết!');
    return;
  }

  if (editId) {
    // Cập nhật liên kết đã có
    const index = AppState.otherLinks.findIndex(l => l.id === editId);
    if (index !== -1) {
      AppState.otherLinks[index] = {
        ...AppState.otherLinks[index],
        content,
        url,
        notes // Cột lưu ý chỉ Admin mới có quyền cập nhật
      };
      alert('✓ Đã cập nhật thành công thông tin liên kết!');
    }
  } else {
    // Thêm mới liên kết
    const newLink = {
      id: 'other_link_' + Date.now(),
      content,
      url,
      notes // Cột lưu ý chỉ Admin mới có quyền thêm nội dung
    };
    AppState.otherLinks.push(newLink);
    alert('✓ Đã thêm mới thành công liên kết vào hệ thống!');
  }

  saveOtherLinksToStorage();
  closeOtherLinkModal();
  renderOtherLinksTable();
};

/**
 * XÓA LIÊN KẾT KHÁC (CHỈ ADMIN + HỎI XÁC NHẬN TRƯỚC KHI XÓA)
 */
window.onAdminDeleteOtherLinkClick = function(linkId) {
  if (!AppState.currentUser || !AppState.currentUser.isAdmin) {
    alert('⚠️ QUYỀN TRUY CẬP BỊ TỪ CHỐI!\n\nChỉ tài khoản Admin mới có quyền Xóa liên kết.');
    return;
  }

  const item = AppState.otherLinks.find(l => l.id === linkId);
  if (!item) return;

  const isConfirmed = confirm(`⚠️ CẢNH BÁO QUẢN TRỊ VIÊN:\n\nBạn có chắc chắn muốn XÓA VĨNH VIỄN liên kết:\n"${item.content}" không?\n\nThao tác này không thể hoàn tác!`);
  if (!isConfirmed) return;

  AppState.otherLinks = AppState.otherLinks.filter(l => l.id !== linkId);
  saveOtherLinksToStorage();
  renderOtherLinksTable();
  alert(`✓ Đã xóa thành công liên kết: "${item.content}"`);
};

/**
 * THAY ĐỔI VỊ TRÍ HÀNG LIÊN KẾT KHÁC: CHUYỂN LÊN TRÊN (CHỈ ADMIN)
 */
window.moveOtherLinkUp = function(linkId) {
  if (!AppState.currentUser || !AppState.currentUser.isAdmin) {
    alert('⚠️ QUYỀN TRUY CẬP BỊ TỪ CHỐI!\n\nChỉ tài khoản Admin mới có quyền sắp xếp thứ tự hàng.');
    return;
  }

  const idx = AppState.otherLinks.findIndex(l => l.id === linkId);
  if (idx <= 0) return; // Đã ở đầu danh sách

  const temp = AppState.otherLinks[idx];
  AppState.otherLinks[idx] = AppState.otherLinks[idx - 1];
  AppState.otherLinks[idx - 1] = temp;

  saveOtherLinksToStorage();
  renderOtherLinksTable();
};

/**
 * THAY ĐỔI VỊ TRÍ HÀNG LIÊN KẾT KHÁC: CHUYỂN XUỐNG DƯỚI (CHỈ ADMIN)
 */
window.moveOtherLinkDown = function(linkId) {
  if (!AppState.currentUser || !AppState.currentUser.isAdmin) {
    alert('⚠️ QUYỀN TRUY CẬP BỊ TỪ CHỐI!\n\nChỉ tài khoản Admin mới có quyền sắp xếp thứ tự hàng.');
    return;
  }

  const idx = AppState.otherLinks.findIndex(l => l.id === linkId);
  if (idx === -1 || idx >= AppState.otherLinks.length - 1) return; // Đã ở cuối danh sách

  const temp = AppState.otherLinks[idx];
  AppState.otherLinks[idx] = AppState.otherLinks[idx + 1];
  AppState.otherLinks[idx + 1] = temp;

  saveOtherLinksToStorage();
  renderOtherLinksTable();
};

/**
 * TÌM KIẾM LIÊN KẾT KHÁC
 */
window.onOtherLinkSearchInput = function(val) {
  AppState.otherLinkSearchQuery = (val || '').trim();
  const clearBtn = document.getElementById('btnClearOtherLinkSearch');
  if (clearBtn) {
    clearBtn.style.display = AppState.otherLinkSearchQuery ? 'flex' : 'none';
  }
  renderOtherLinksTable();
};

window.clearOtherLinkSearch = function() {
  const input = document.getElementById('otherLinkSearchInput');
  const clearBtn = document.getElementById('btnClearOtherLinkSearch');
  if (input) input.value = '';
  if (clearBtn) clearBtn.style.display = 'none';
  AppState.otherLinkSearchQuery = '';
  renderOtherLinksTable();
};
