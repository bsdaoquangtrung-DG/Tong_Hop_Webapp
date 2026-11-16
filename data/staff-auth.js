/**
 * CẤU HÌNH DỮ LIỆU TÀI KHOẢN & PHÂN QUYỀN TRUY CẬP (RBAC)
 * KHOA VI SINH – BỆNH VIỆN ĐA KHOA ĐỨC GIANG
 * Cập nhật chuẩn theo file: "Danh sách nhân viên 2024" (Update: 25/10/2024)
 * 
 * QUY TẮC BẢO MẬT & PHÂN QUYỀN:
 * 1. Tên đăng nhập: Cột Gmail của cán bộ.
 * 2. Mật khẩu: Tên trong cột "Chức năng / Chức vụ" đảm nhiệm của cán bộ.
 * 3. Chức năng "Hoặc chọn nhanh cán bộ": CHỈ gợi ý 11 nhân viên thường.
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
      passwords: ['Trưởng khoa', 'Trưởng Khoa', 'truong khoa', 'Truong khoa', 'Admin', 'admin', 'daoquangtrung'],
      isAdmin: true,
      canQuickSelect: false // BẢO MẬT: Không xuất hiện trong dropdown chọn nhanh
    },

    // 2. KTV. TRƯỞNG
    {
      id: 'staff_trang',
      name: 'Vũ Thị Thu Trang',
      title: 'Thạc sỹ',
      roleText: 'KTV.Trưởng',
      email: 'vutrangbvdg@gmail.com',
      aliases: ['vutrangbvdg'],
      passwords: ['KTV.Trưởng', 'KTV.Trưởng', 'ktv.trưởng', 'KTV Trưởng', 'ktv trưởng', 'ktv truong', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    },

    // 3. PHỤ TRÁCH NUÔI CẤY
    {
      id: 'staff_huyen',
      name: 'Chu Thị Huyền',
      title: 'BS.CKI',
      roleText: 'Phụ trách. Nuôi cấy',
      email: 'huyenct1992@gmail.com',
      aliases: ['huyenct1992'],
      passwords: ['Phụ trách. Nuôi cấy', 'Phụ trách nuôi cấy', 'phu trach nuoi cay', 'Nuôi cấy', 'nuoi cay', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    },

    // 4. PHỤ TRÁCH MIỄN DỊCH
    {
      id: 'staff_linh',
      name: 'Nguyễn Ngọc Linh',
      title: 'CN.XN',
      roleText: 'Phụ trách. Miễn dịch',
      email: 'linh30011987@gmail.com',
      aliases: ['linh30011987'],
      passwords: ['Phụ trách. Miễn dịch', 'Phụ trách miễn dịch', 'phu trach mien dich', 'Miễn dịch', 'mien dich', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    },

    // 5. PHỤ TRÁCH SINH HỌC PHÂN TỬ
    {
      id: 'staff_quy',
      name: 'Trần Thị Quy',
      title: 'Thạc Sỹ',
      roleText: 'Phụ trách. Sinh học phân tử',
      email: 'quycnsh@gmail.com',
      aliases: ['quycnsh'],
      passwords: ['Phụ trách. Sinh học phân tử', 'Phụ trách sinh học phân tử', 'phu trach sinh hoc phan tu', 'Sinh học phân tử', 'SHPT', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    },

    // 6. PHỤ TRÁCH NHUỘM SOI
    {
      id: 'staff_lien',
      name: 'Trần Thúy Liên',
      title: 'Thạc Sỹ',
      roleText: 'Phụ trách. Nhuộm soi',
      email: 'tranthuyliench22@gmail.com',
      aliases: ['tranthuyliench22', 'thuyliench22@gmail.com', 'thuyliench22'],
      passwords: ['Phụ trách. Nhuộm soi', 'Phụ trách nhuộm soi', 'phu trach nhuom soi', 'Nhuộm soi', 'nhuom soi', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    },

    // 7. HÀNH CHÍNH
    {
      id: 'staff_loan',
      name: 'Nguyễn Thị Kim Loan',
      title: 'KTV – CĐ',
      roleText: 'Hành chính',
      email: 'Kimloannguyen18977@gmail.com',
      aliases: ['kimloannguyen18977', 'loannguyen18977@gmail.com', 'loannguyen18977'],
      passwords: ['Hành chính', 'Hành Chánh', 'hanh chinh', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    },

    // 8. QUẢN LÝ CHẤT LƯỢNG CHUNG
    {
      id: 'staff_hung',
      name: 'Đỗ Quốc Hưng',
      title: 'CN.XN',
      roleText: 'Quản lý chất lượng chung',
      email: 'batqua3@gmail.com',
      aliases: ['batqua3'],
      passwords: ['Quản lý chất lượng chung', 'Quan ly chat luong chung', 'QLCL', 'qlcl', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    },

    // 9. THỦ QUỸ KHOA
    {
      id: 'staff_lan_nq',
      name: 'Nghiêm Thị Làn',
      title: 'KTV – CĐ',
      roleText: 'Thủ quỹ khoa',
      email: 'chilanhn82@gmail.com',
      aliases: ['chilanhn82'],
      passwords: ['Thủ quỹ khoa', 'Thu quy khoa', 'Thủ quỹ', 'thu quy', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    },

    // 10. PHỤ TRÁCH NHUỘM SOI AFB
    {
      id: 'staff_binh',
      name: 'Trần Thanh Bình',
      title: 'KTV – CĐ',
      roleText: 'Phụ trách. Nhuộm soi AFB',
      email: 'T.bjnho2@gmail.com',
      aliases: ['t.bjnho2', 'tbjnho2@gmail.com', 'tbjnho2'],
      passwords: ['Phụ trách. Nhuộm soi AFB', 'Phụ trách nhuộm soi AFB', 'phu trach nhuom soi afb', 'Nhuộm soi AFB', 'AFB', 'afb', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    },

    // 11. PHỤ TRÁCH KỸ THUẬT
    {
      id: 'staff_dung',
      name: 'Nguyễn Duy Dũng',
      title: 'KTV – CĐ',
      roleText: 'Phụ trách. Kỹ thuật',
      email: 'nguyendungyk87@gmail.com',
      aliases: ['nguyendungyk87', 'duyendungyk87@gmail.com', 'duyendungyk87'],
      passwords: ['Phụ trách. Kỹ thuật', 'Phụ trách kỹ thuật', 'phu trach ky thuat', 'Kỹ thuật', 'ky thuat', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    },

    // 12. HỘ LÝ
    {
      id: 'staff_lan_hl',
      name: 'Nguyễn Thị Lan',
      title: 'Hộ Lý',
      roleText: 'Hộ lý',
      email: 'nhim01011983@gmail.com',
      aliases: ['nhim01011983'],
      passwords: ['Hộ lý', 'Ho ly', 'ho ly', 'User', 'user'],
      isAdmin: false,
      canQuickSelect: true
    }
  ]
};

// Đăng ký toàn cục
if (typeof window !== 'undefined') {
  window.STAFF_AUTH_CONFIG = STAFF_AUTH_CONFIG;
}
