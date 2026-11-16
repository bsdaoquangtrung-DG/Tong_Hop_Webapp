/**
 * CẤU HÌNH DỮ LIỆU TÀI KHOẢN & PHÂN QUYỀN TRUY CẬP (RBAC)
 * KHOA VI SINH – BỆNH VIỆN ĐA KHOA ĐỨC GIANG
 * Cập nhật chuẩn theo file: "Danh sách nhân viên 2024" (Update: 25/10/2024)
 * 
 * QUY TẮC MẬT KHẨU CẬP NHẬT THEO YÊU CẦU:
 * 1. Tên đăng nhập: Cột Gmail của cán bộ.
 * 2. Mật khẩu: Tên trong cột "chức năng" (User + Chữ cái đầu tên gọi: VD huyenct1992@gmail.com -> UserH).
 * 3. Chức năng "Hoặc chọn nhanh cán bộ": CHỈ gợi ý 11 nhân viên thường (tự động điền Gmail và Mật khẩu User*).
 *    -> TUYỆT ĐỐI KHÔNG gợi ý Admin (BS.CKII. Đào Quang Trung). Admin phải tự nhớ và nhập tay.
 * 4. Phân quyền (RBAC):
 *    - Tài khoản Admin (BS.CKII. Đào Quang Trung): Xem đủ 10 webapps và toàn quyền Quản trị.
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
    // 1. ADMIN - TRƯỞNG KHOA (TUYỆT ĐỐI KHÔNG GỢI Ý CHỌN NHANH, PHẢI TỰ NHẬP TAY)
    {
      id: 'admin_trung',
      name: 'Đào Quang Trung',
      title: 'BS.CK2',
      roleText: 'Trưởng khoa',
      email: 'bsdaoquangtrung@gmail.com',
      aliases: ['bsdaoquangtrung'],
      authPassword: 'Admin',
      passwords: ['Admin', 'admin', 'ADMIN', 'Trưởng khoa', 'Trưởng Khoa', 'truong khoa', 'UserT', 'AdminT', 'daoquangtrung'],
      isAdmin: true,
      canQuickSelect: false // BẢO MẬT: Không xuất hiện trong dropdown chọn nhanh
    },

    // 2. KTV. TRƯỞNG - VŨ THỊ THU TRANG
    {
      id: 'staff_trang',
      name: 'Vũ Thị Thu Trang',
      title: 'Thạc sỹ',
      roleText: 'KTV.Trưởng',
      email: 'vutrangbvdg@gmail.com',
      aliases: ['vutrangbvdg'],
      authPassword: 'UserT',
      passwords: ['UserT', 'usert', 'USERT', 'UserTrang', 'usertrang', 'KTV.Trưởng', 'ktv.trưởng', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    },

    // 3. PHỤ TRÁCH NUÔI CẤY - CHU THỊ HUYỀN (Ví dụ của người dùng: UserH)
    {
      id: 'staff_huyen',
      name: 'Chu Thị Huyền',
      title: 'BS.CKI',
      roleText: 'Phụ trách. Nuôi cấy',
      email: 'huyenct1992@gmail.com',
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
      title: 'CN.XN',
      roleText: 'Phụ trách. Miễn dịch',
      email: 'linh30011987@gmail.com',
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
      title: 'Thạc Sỹ',
      roleText: 'Phụ trách. Sinh học phân tử',
      email: 'quycnsh@gmail.com',
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
      title: 'Thạc Sỹ',
      roleText: 'Phụ trách. Nhuộm soi',
      email: 'tranthuyliench22@gmail.com',
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
      title: 'KTV – CĐ',
      roleText: 'Hành chính',
      email: 'Kimloannguyen18977@gmail.com',
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
      title: 'CN.XN',
      roleText: 'Quản lý chất lượng chung',
      email: 'batqua3@gmail.com',
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
      title: 'KTV – CĐ',
      roleText: 'Thủ quỹ khoa',
      email: 'chilanhn82@gmail.com',
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
      title: 'KTV – CĐ',
      roleText: 'Phụ trách. Nhuộm soi AFB',
      email: 'T.bjnho2@gmail.com',
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
      title: 'KTV – CĐ',
      roleText: 'Phụ trách. Kỹ thuật',
      email: 'nguyendungyk87@gmail.com',
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
      title: 'Hộ Lý',
      roleText: 'Hộ lý',
      email: 'nhim01011983@gmail.com',
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
