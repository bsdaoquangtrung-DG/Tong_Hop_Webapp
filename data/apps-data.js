/**
 * CẤU HÌNH DỮ LIỆU DANH MỤC 9 ỨNG DỤNG SỐ THỰC TẾ
 * KHOA VI SINH – BỆNH VIỆN ĐA KHOA ĐỨC GIANG
 * 
 * Người phụ trách: BS.CKII. Đào Quang Trung - Trưởng khoa
 * Địa chỉ: 54 Trường Lâm, Phường Việt Hưng, Quận Long Biên, Hà Nội
 * 
 * Toàn bộ 9 ứng dụng đều là hệ thống thực tế đang hoạt động 100%
 */

const PORTAL_CONFIG = {
  department: {
    name: "KHOA VI SINH",
    hospital: "BỆNH VIỆN ĐA KHOA ĐỨC GIANG",
    slogan: "Kết nối hệ thống – Chuẩn hóa quy trình – Nâng cao chất lượng – Thúc đẩy chuyển đổi số y tế.",
    headDoctor: "BS.CKII. Đào Quang Trung",
    headTitle: "Trưởng khoa Vi sinh – Bệnh viện Đa khoa Đức Giang",
    address: "54 Trường Lâm, Phường Việt Hưng, Quận Long Biên, Hà Nội",
    phone: "024 3827 1884",
    email: "visinh.bvdkg@gmail.com",
    portalVersion: "3.3.0",
    releaseYear: 2026
  },
  
  categories: [
    {
      id: "cat-management",
      name: "Quản lý và điều hành",
      description: "Theo dõi tiến độ công việc, giao ban khoa và điều hành vận hành toàn diện.",
      icon: "Briefcase"
    },
    {
      id: "cat-quality",
      name: "Quản lý chất lượng – ISO 15189",
      description: "Hệ thống quy trình thao tác chuẩn (SOP), sổ tay chất lượng, hồ sơ nhân sự ISO 15189.",
      icon: "ShieldCheck"
    },
    {
      id: "cat-inventory",
      name: "Quản lý hóa chất – vật tư",
      description: "Kiểm soát tồn kho hóa chất, sinh phẩm, hạn dùng, số lô và xuất nhập kho vật tư.",
      icon: "FlaskConical"
    },
    {
      id: "cat-cme",
      name: "Đào tạo liên tục – CME",
      description: "Giám sát số tiết đào tạo liên tục, theo dõi tín chỉ CME và hồ sơ đào tạo nhân viên.",
      icon: "GraduationCap"
    },
    {
      id: "cat-specialty",
      name: "Chuyên môn vi sinh",
      description: "Báo cáo kháng thuốc vi sinh, tra cứu sổ tay kháng sinh đồ điện tử phục vụ điều trị.",
      icon: "Microscope"
    }
  ],

  applications: [
    // ==================== NHÓM 1. QUẢN LÝ VÀ ĐIỀU HÀNH ====================
    {
      id: "so-giao-ban-dien-tu",
      name: "Sổ giao ban điện tử",
      description: "Tổng hợp nội dung giao ban chuyên môn khoa hàng ngày. Theo dõi kết luận chỉ đạo của lãnh đạo khoa, công việc tồn đọng và biên bản giao ban.",
      category: "Quản lý và điều hành",
      icon: "CalendarDays",
      url: "https://script.google.com/macros/s/AKfycby_NXX-10ouqeahRgtEvb-G9CeS71Dt0VT0JDIxWw24Q8NF55325zPRTE1J8TES1Ek/exec",
      platform: "Google Apps Script",
      featured: true,
      enabled: true,
      sortOrder: 1,
      badge: "Giao ban khoa"
    },
    {
      id: "nhat-ky-cong-viec",
      name: "Nhật ký công việc",
      description: "Theo dõi công việc hàng ngày, tiến độ thực hiện, phân công nhiệm vụ và cảnh báo thời hạn hoàn thành của từng nhân viên trong khoa.",
      category: "Quản lý và điều hành",
      icon: "ClipboardList",
      url: "https://script.google.com/macros/s/AKfycbxM95o4r553PLGZTa4LahcModPuxuJVTVQRALd-3pOTXYclK7p933YU_eNLa-hHToOEjA/exec",
      platform: "Google Apps Script",
      featured: true,
      enabled: true,
      sortOrder: 2,
      badge: "Điều hành"
    },

    // ==================== NHÓM 2. QUẢN LÝ CHẤT LƯỢNG – ISO 15189 ====================
    {
      id: "quan-ly-quy-trinh-vi-sinh",
      name: "Quản lý quy trình Vi sinh",
      description: "Truy cập hệ thống quy trình thao tác chuẩn (SOP), biểu mẫu kiểm soát, hướng dẫn kỹ thuật xét nghiệm vi sinh chuẩn hóa theo ISO 15189.",
      category: "Quản lý chất lượng – ISO 15189",
      icon: "Files",
      url: "https://qlquytrinhvisinh.vercel.app/",
      platform: "Vercel / Webapp",
      featured: true,
      enabled: true,
      sortOrder: 3,
      badge: "Quy trình SOP"
    },
    {
      id: "quan-ly-ho-so-nhan-su-iso-15189",
      name: "Quản Lý Hồ Sơ Nhân Sự ISO 15189",
      description: "Quản lý hồ sơ nhân sự, hồ sơ năng lực cán bộ, văn bằng chứng chỉ, phân công nhiệm vụ chuyên môn và đánh giá năng lực theo chuẩn ISO 15189.",
      category: "Quản lý chất lượng – ISO 15189",
      icon: "UserCheck",
      url: "https://qlnhansu.vercel.app/",
      platform: "Vercel / Webapp",
      featured: true,
      enabled: true,
      sortOrder: 4,
      badge: "Nhân sự ISO"
    },

    // ==================== NHÓM 3. QUẢN LÝ HÓA CHẤT – VẬT TƯ ====================
    {
      id: "thong-ke-hoa-chat",
      name: "Thống kê hoá chất",
      description: "Theo dõi danh mục hóa chất, đĩa nuôi cấy, kháng sinh đồ, số lượng tồn kho, số lô, hạn dùng và cảnh báo hóa chất sắp hết hạn.",
      category: "Quản lý hóa chất – vật tư",
      icon: "FlaskConical",
      url: "https://script.google.com/macros/s/AKfycbxmC9bTeQwVKVPaplv-SJF5Tak92BlN28f5hwo2h6PRD8YdWtVGRJu7qJxTkUI5drb4/exec",
      platform: "Google Apps Script",
      featured: true,
      enabled: true,
      sortOrder: 5,
      badge: "Hóa chất & Lô"
    },
    {
      id: "quan-ly-kho",
      name: "Quản Lý kho",
      description: "Hệ thống quản lý kho vật tư xét nghiệm, kiểm soát nhập - xuất - hủy vật tư, lam kính, môi trường cấy, bông cồn và dự trù vật tư hàng tháng.",
      category: "Quản lý hóa chất – vật tư",
      icon: "Package",
      url: "https://script.google.com/macros/s/AKfycbyu-x-7XZdgqJvWqk04TbtdwZ5dURs1zbAdQafYKz95oc0N206Lex0E_T0xN1LNabyg/exec",
      platform: "Google Apps Script",
      featured: true,
      enabled: true,
      sortOrder: 6,
      badge: "Kho vật tư"
    },

    // ==================== NHÓM 4. ĐÀO TẠO LIÊN TỤC – CME ====================
    {
      id: "giam-sat-dao-tao-cme",
      name: "Giám sát số tiết đào tạo liên tục",
      description: "Theo dõi quá trình tích lũy số tiết đào tạo y khoa liên tục (CME) của bác sĩ và kỹ thuật viên. Tổng hợp giờ tín chỉ và hồ sơ minh chứng đào tạo.",
      category: "Đào tạo liên tục – CME",
      icon: "GraduationCap",
      url: "https://script.google.com/macros/s/AKfycbwu00vxwcBssQ_acK4YWiee91PcW6HRa2g8hECtm4Zk6-BXknWnJ1Rq1r9p0FeU_gRJ/exec",
      platform: "Google Apps Script",
      featured: true,
      enabled: true,
      sortOrder: 7,
      badge: "Tín chỉ CME"
    },

    // ==================== NHÓM 5. CHUYÊN MÔN VI SINH ====================
    {
      id: "bao-cao-khang-thuoc",
      name: "Báo cáo kháng thuốc",
      description: "Tổng hợp dữ liệu kháng sinh đồ (Antibiogram), phân tích tỷ lệ nhạy cảm, trung gian, kháng thuốc (AMR) phục vụ kiểm soát nhiễm khuẩn và ban QLSD kháng sinh.",
      category: "Chuyên môn vi sinh",
      icon: "Microscope",
      url: "https://baobaokhangthuoc.vercel.app/",
      platform: "Vercel / BI",
      featured: true,
      enabled: true,
      sortOrder: 8,
      badge: "Dữ liệu AMR"
    },
    {
      id: "so-tay-khang-sinh-do",
      name: "Sổ tay kháng sinh đồ",
      description: "Tra cứu sổ tay kháng sinh đồ điện tử (Google NotebookLM), hướng dẫn đọc kết quả kháng sinh đồ, tiêu chuẩn CLSI/EUCAST và khuyến cáo điều trị vi sinh.",
      category: "Chuyên môn vi sinh",
      icon: "BookOpen",
      url: "https://notebook.google.com/notebook/8a770f76-2399-4e7d-bd5b-ca809c56f3de",
      platform: "Google NotebookLM",
      featured: true,
      enabled: true,
      sortOrder: 9,
      badge: "NotebookLM AI"
    }
  ]
};

// Đảm bảo có thể truy xuất qua window object hoặc module
if (typeof window !== 'undefined') {
  window.PORTAL_CONFIG = PORTAL_CONFIG;
}
