/**
 * CẤU HÌNH DỮ LIỆU TÀI KHOẢN & PHÂN QUYỀN TRUY CẬP (RBAC)
 * KHOA VI SINH – BỆNH VIỆN ĐA KHOA ĐỨC GIANG
 * Cập nhật chuẩn theo file: "Danh sách nhân viên 2024" (Update: 25/10/2024)
 * 
 * QUY TẮC MẬT KHẨU CẬP NHẬT THEO YÊU CẦU:
 * 1. Tên đăng nhập: Cột Gmail của cán bộ.
 * 2. Mật khẩu: Tên trong cột "chức năng" (User + Chữ cái đầu tên gọi: VD huyenct1992@gmail.com -> UserH).
 * 3. Chức năng "Hoặc chọn nhanh cán bộ": Cho phép chọn nhanh cả 12 cán bộ (kể cả Admin).
 *    -> Chỉ giúp nhập nhanh Tên đăng nhập (Gmail), còn Mật khẩu bắt buộc người dùng tự nhập tay (không hiển thị gợi ý để tránh lộ mật khẩu).
 * 4. Phân quyền (RBAC):
 *    - Tài khoản Admin (BS.CKII. Đào Quang Trung): Mật khẩu Admintrung, xem đủ 10 webapps và toàn quyền Quản trị.
 *    - Các tài khoản khác: KHÔNG ĐƯỢC XEM 4 webapps sau:
 *      + "2. Nhật ký công việc" (nhat-ky-cong-viec)
 *      + "3. Quản lý tiến độ công việc" (quan-ly-tien-do-cong-viec)
 *      + "6. Thống kê hoá chất" (thong-ke-hoa-chat)
 *      + "7. Quản lý kho" (quan-ly-kho)
 *      + KHÔNG được phép vào xem hoặc chỉnh sửa phần Quản trị.
 */

const STAFF_AUTH_CONFIG = {
  // Danh sách 4 ứng dụng bị hạn chế đối với nhân viên thường
  restrictedAppIds: [
    'nhat-ky-cong-viec',         // 2. Nhật ký công việc
    'quan-ly-tien-do-cong-viec', // 3. Quản lý tiến độ công việc
    'thong-ke-hoa-chat',         // 6. Thống kê hoá chất
    'quan-ly-kho'                // 7. Quản lý kho
  ],

  // Danh sách 12 tài khoản cán bộ nhân viên
  staffList: [
    // 1. ADMIN - TRƯỞNG KHOA
    {
      id: 'admin_trung',
      name: 'Đào Quang Trung',
      shortName: 'BS. Trung',
      title: 'BS.CK2',
      roleText: 'Trưởng khoa',
      email: 'bsdaoquangtrung@gmail.com',
      avatar: 'assets/avatars/bsdaoquangtrung@gmail.com.jpg',
      aliases: ['bsdaoquangtrung'],
      authPassword: 'Admintrung',
      passwords: ['Admintrung', 'admintrung', 'ADMINTRUNG', ' Admintrung', 'Admintrung ', 'Trưởng khoa', 'Trưởng Khoa', 'truong khoa', 'daoquangtrung'],
      isAdmin: true,
      canQuickSelect: true
    },

    // 2. KTV. TRƯỞNG - VŨ THỊ THU TRANG
    {
      id: 'staff_trang',
      name: 'Vũ Thị Thu Trang',
      shortName: 'ThS. Trang',
      title: 'Thạc sỹ',
      roleText: 'KTV.Trưởng',
      email: 'vutrangbvdg@gmail.com',
      avatar: 'assets/avatars/vutrangbvdg@gmail.com.jpg',
      aliases: ['vutrangbvdg'],
      authPassword: 'UserT',
      passwords: ['UserT', 'usert', 'USERT', 'UserTrang', 'usertrang', 'KTV.Trưởng', 'ktv.trưởng', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    },

    // 3. PHỤ TRÁCH NUÔI CẤY - CHU THỊ HUYỀN
    {
      id: 'staff_huyen',
      name: 'Chu Thị Huyền',
      shortName: 'BS. Huyền',
      title: 'BS.CKI',
      roleText: 'Phụ trách. Nuôi cấy',
      email: 'huyenct1992@gmail.com',
      avatar: 'assets/avatars/huyenct1992@gmail.com.jpg',
      aliases: ['huyenct1992'],
      authPassword: 'UserH',
      passwords: ['UserH', 'userh', 'USERH', 'UserHuyen', 'userhuyen', 'Phụ trách. Nuôi cấy', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    },

    // 4. PHỤ TRÁCH MIỄN DỊCH - NGUYỄN NGỌC LINH
    {
      id: 'staff_linh',
      name: 'Nguyễn Ngọc Linh',
      shortName: 'CN. Linh',
      title: 'CN.XN',
      roleText: 'Phụ trách. Miễn dịch',
      email: 'linh30011987@gmail.com',
      avatar: 'assets/avatars/linh30011987@gmail.com.jpg',
      aliases: ['linh30011987'],
      authPassword: 'UserL',
      passwords: ['UserL', 'userl', 'USERL', 'UserLinh', 'userlinh', 'Phụ trách. Miễn dịch', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    },

    // 5. PHỤ TRÁCH SINH HỌC PHÂN TỬ - TRẦN THỊ QUY
    {
      id: 'staff_quy',
      name: 'Trần Thị Quy',
      shortName: 'ThS. Quy',
      title: 'Thạc Sỹ',
      roleText: 'Phụ trách. Sinh học phân tử',
      email: 'quycnsh@gmail.com',
      avatar: 'assets/avatars/quycnsh@gmail.com.jpg',
      aliases: ['quycnsh'],
      authPassword: 'UserQ',
      passwords: ['UserQ', 'userq', 'USERQ', 'UserQuy', 'userquy', 'Phụ trách. Sinh học phân tử', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    },

    // 6. PHỤ TRÁCH NHUỘM SOI - TRẦN THÚY LIÊN
    {
      id: 'staff_lien',
      name: 'Trần Thúy Liên',
      shortName: 'ThS. Liên',
      title: 'Thạc Sỹ',
      roleText: 'Phụ trách. Nhuộm soi',
      email: 'tranthuyliench22@gmail.com',
      avatar: 'assets/avatars/tranthuyliench22@gmail.com.jpg',
      aliases: ['tranthuyliench22', 'thuyliench22@gmail.com', 'thuyliench22'],
      authPassword: 'UserL',
      passwords: ['UserL', 'userl', 'USERL', 'UserLien', 'userlien', 'Phụ trách. Nhuộm soi', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    },

    // 7. HÀNH CHÍNH - NGUYỄN THỊ KIM LOAN
    {
      id: 'staff_loan',
      name: 'Nguyễn Thị Kim Loan',
      shortName: 'KTV. Loan',
      title: 'KTV – CĐ',
      roleText: 'Hành chính',
      email: 'Kimloannguyen18977@gmail.com',
      avatar: 'assets/avatars/Kimloannguyen18977@gmail.com.jpg',
      aliases: ['kimloannguyen18977', 'loannguyen18977@gmail.com', 'loannguyen18977'],
      authPassword: 'UserL',
      passwords: ['UserL', 'userl', 'USERL', 'UserLoan', 'userloan', 'Hành chính', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    },

    // 8. QUẢN LÝ CHẤT LƯỢNG CHUNG - ĐỖ QUỐC HƯNG
    {
      id: 'staff_hung',
      name: 'Đỗ Quốc Hưng',
      shortName: 'CN. Hưng',
      title: 'CN.XN',
      roleText: 'Quản lý chất lượng chung',
      email: 'batqua3@gmail.com',
      avatar: 'assets/avatars/batqua3@gmail.com.jpg',
      aliases: ['batqua3'],
      authPassword: 'UserH',
      passwords: ['UserH', 'userh', 'USERH', 'UserHung', 'userhung', 'Quản lý chất lượng chung', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    },

    // 9. THỦ QUỸ KHOA - NGHIÊM THỊ LÀN
    {
      id: 'staff_lan_nq',
      name: 'Nghiêm Thị Làn',
      shortName: 'KTV. Làn',
      title: 'KTV – CĐ',
      roleText: 'Thủ quỹ khoa',
      email: 'chilanhn82@gmail.com',
      avatar: 'assets/avatars/chilanhn82@gmail.com.jpg',
      aliases: ['chilanhn82'],
      authPassword: 'UserL',
      passwords: ['UserL', 'userl', 'USERL', 'UserLan', 'userlan', 'Thủ quỹ khoa', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    },

    // 10. PHỤ TRÁCH NHUỘM SOI AFB - TRẦN THANH BÌNH
    {
      id: 'staff_binh',
      name: 'Trần Thanh Bình',
      shortName: 'KTV. Bình',
      title: 'KTV – CĐ',
      roleText: 'Phụ trách. Nhuộm soi AFB',
      email: 'T.bjnho2@gmail.com',
      avatar: 'assets/avatars/T.bjnho2@gmail.com.jpg',
      aliases: ['t.bjnho2', 'tbjnho2@gmail.com', 'tbjnho2'],
      authPassword: 'UserB',
      passwords: ['UserB', 'userb', 'USERB', 'UserBinh', 'userbinh', 'Phụ trách. Nhuộm soi AFB', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    },

    // 11. PHỤ TRÁCH KỸ THUẬT - NGUYỄN DUY DŨNG
    {
      id: 'staff_dung',
      name: 'Nguyễn Duy Dũng',
      shortName: 'KTV. Dũng',
      title: 'KTV – CĐ',
      roleText: 'Phụ trách. Kỹ thuật',
      email: 'nguyendungyk87@gmail.com',
      avatar: 'assets/avatars/nguyendungyk87@gmail.com.jpg',
      aliases: ['nguyendungyk87', 'duyendungyk87@gmail.com', 'duyendungyk87'],
      authPassword: 'UserD',
      passwords: ['UserD', 'userd', 'USERD', 'UserDung', 'userdung', 'Phụ trách. Kỹ thuật', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    },

    // 12. HỘ LÝ - NGUYỄN THỊ LAN
    {
      id: 'staff_lan_hl',
      name: 'Nguyễn Thị Lan',
      shortName: 'HL. Lan',
      title: 'Hộ Lý',
      roleText: 'Hộ lý',
      email: 'nhim01011983@gmail.com',
      avatar: 'assets/avatars/nhim01011983@gmail.com.jpg',
      aliases: ['nhim01011983'],
      authPassword: 'UserL',
      passwords: ['UserL', 'userl', 'USERL', 'UserLan', 'userlan', 'Hộ lý', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    }
  ]
};

// Đăng ký toàn cục
if (typeof window !== 'undefined') {
  window.STAFF_AUTH_CONFIG = STAFF_AUTH_CONFIG;
}
