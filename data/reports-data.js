/**
 * CẤU HÌNH DỮ LIỆU TỔNG HỢP BÁO CÁO KHOA VI SINH & LINK LIÊN KẾT KHÁC
 * KHOA VI SINH – BỆNH VIỆN ĐA KHOA ĐỨC GIANG
 * 
 * Bảng 1: Bảng liên kết các link báo cáo chuyên ngành theo từng năm
 * Bảng 2: Bảng Tổng Hợp Link Liên Kết Khác
 * Phân quyền: Mọi cán bộ nhân viên đều xem được
 * Quyền Thêm mới, Sửa, Xóa và thêm cột Lưu ý: Dành riêng cho Admin
 */

const REPORTS_CONFIG = {
  title: "Tổng Hợp Báo Cáo Khoa Vi Sinh",
  subtitle: "Cổng liên kết và lưu trữ tập trung các link báo cáo chuyên môn Khoa Vi sinh – Bệnh viện Đa khoa Đức Giang",
  storageKey: "bvdkg_department_reports_v1",
  yearsStorageKey: "bvdkg_department_reports_years_v1",
  otherLinksStorageKey: "bvdkg_other_links_v1",
  
  defaultYears: ["2024", "2025", "2026"],

  defaultReports: [
    {
      id: "rep_1",
      content: "Báo cáo tổng kết công tác chuyên môn xét nghiệm Vi sinh",
      responsible: "BS.CKII. Đào Quang Trung",
      links: {
        "2024": "https://docs.google.com/document/d/1Bvdkg_BaoCaoChuyenMon_2024/edit",
        "2025": "https://docs.google.com/document/d/1Bvdkg_BaoCaoChuyenMon_2025/edit",
        "2026": "https://docs.google.com/document/d/1Bvdkg_BaoCaoChuyenMon_2026/edit"
      },
      permission: "user",
      notes: "Nộp định kỳ tháng và báo cáo tổng kết quý cho Ban Giám đốc Bệnh viện."
    },
    {
      id: "rep_2",
      content: "Báo cáo giám sát vi khuẩn kháng thuốc (AMR & Antibiogram)",
      responsible: "ThS. Nguyễn Ngọc Linh",
      links: {
        "2024": "https://baobaokhangthuoc.vercel.app/",
        "2025": "https://baobaokhangthuoc.vercel.app/",
        "2026": "https://baobaokhangthuoc.vercel.app/"
      },
      permission: "user",
      notes: "Phối hợp Hội đồng Thuốc & Điều trị và Khoa Kiểm soát nhiễm khuẩn báo cáo định kỳ."
    },
    {
      id: "rep_3",
      content: "Báo cáo đánh giá chất lượng xét nghiệm theo tiêu chuẩn ISO 15189",
      responsible: "CN. Chu Thị Huyền",
      links: {
        "2024": "https://qlquytrinhvisinh.vercel.app/",
        "2025": "https://qlquytrinhvisinh.vercel.app/",
        "2026": ""
      },
      permission: "user",
      notes: "Đánh giá nội bộ 6 tháng/lần và thẩm tra phương pháp xét nghiệm định kỳ."
    },
    {
      id: "rep_4",
      content: "Báo cáo xuất - nhập - tồn hóa chất, sinh phẩm và môi trường nuôi cấy",
      responsible: "KTV. Vũ Thị Thu Trang",
      links: {
        "2024": "https://script.google.com/macros/s/AKfycbxmC9bTeQwVKVPaplv-SJF5Tak92BlN28f5hwo2h6PRD8YdWtVGRJu7qJxTkUI5drb4/exec",
        "2025": "https://script.google.com/macros/s/AKfycbxmC9bTeQwVKVPaplv-SJF5Tak92BlN28f5hwo2h6PRD8YdWtVGRJu7qJxTkUI5drb4/exec",
        "2026": ""
      },
      permission: "user",
      notes: "Kiểm kê định kỳ ngày 25 hàng tháng, cảnh báo hạn dùng trước 60 ngày."
    },
    {
      id: "rep_5",
      content: "Báo cáo theo dõi số tiết đào tạo y khoa liên tục (CME) cán bộ khoa",
      responsible: "CN. Trần Thị Quy",
      links: {
        "2024": "https://script.google.com/macros/s/AKfycbwu00vxwcBssQ_acK4YWiee91PcW6HRa2g8hECtm4Zk6-BXknWnJ1Rq1r9p0FeU_gRJ/exec",
        "2025": "https://script.google.com/macros/s/AKfycbwu00vxwcBssQ_acK4YWiee91PcW6HRa2g8hECtm4Zk6-BXknWnJ1Rq1r9p0FeU_gRJ/exec",
        "2026": ""
      },
      permission: "user",
      notes: "Đảm bảo 100% cán bộ hoàn thành định mức giờ đào tạo theo quy định BYT."
    },
    {
      id: "rep_6",
      content: "Báo cáo công tác kiểm soát nhiễm khuẩn môi trường bệnh viện",
      responsible: "KTV. Trần Thúy Liên",
      links: {
        "2024": "https://docs.google.com/spreadsheets/d/1Bvdkg_KSNK_2024/edit",
        "2025": "https://docs.google.com/spreadsheets/d/1Bvdkg_KSNK_2025/edit",
        "2026": ""
      },
      permission: "user",
      notes: "Xét nghiệm vi sinh không khí phòng mổ, bàn tay phẫu thuật viên và nguồn nước."
    },
    {
      id: "rep_7",
      content: "Báo cáo giao ban chuyên môn và theo dõi sự cố y khoa",
      responsible: "KTV. Đỗ Quốc Hưng",
      links: {
        "2024": "https://script.google.com/macros/s/AKfycby_NXX-10ouqeahRgtEvb-G9CeS71Dt0VT0JDIxWw24Q8NF55325zPRTE1J8TES1Ek/exec",
        "2025": "https://script.google.com/macros/s/AKfycby_NXX-10ouqeahRgtEvb-G9CeS71Dt0VT0JDIxWw24Q8NF55325zPRTE1J8TES1Ek/exec",
        "2026": ""
      },
      permission: "user",
      notes: "Ghi nhận đầy đủ biên bản họp giao ban và phân tích nguyên nhân gốc (RCA)."
    }
  ],

  // BẢNG THỨ HAI: BẢNG TỔNG HỢP LINK LIÊN KẾT KHÁC
  defaultOtherLinks: [
    {
      id: "other_link_1",
      content: "Cổng thông tin điện tử Bệnh viện Đa khoa Đức Giang",
      url: "https://benhvienducgiang.org.vn/",
      permission: "user",
      notes: "Trang thông tin chính thức của Bệnh viện Đa khoa Đức Giang."
    },
    {
      id: "other_link_2",
      content: "Cổng thông tin Bộ Y tế Việt Nam (MOH)",
      url: "https://moh.gov.vn/",
      permission: "user",
      notes: "Tra cứu các văn bản quy phạm pháp luật, thông tư và hướng dẫn chuyên môn BYT."
    },
    {
      id: "other_link_3",
      content: "Thư viện Dược thư Quốc gia Việt Nam",
      url: "https://duocthuquocgia.vn/",
      permission: "user",
      notes: "Tra cứu danh mục thuốc, liều dùng, tương tác thuốc và kháng sinh điều trị."
    },
    {
      id: "other_link_4",
      content: "Hệ thống tiêu chuẩn quốc tế CLSI (Clinical and Laboratory Standards Institute)",
      url: "https://clsi.org/",
      permission: "user",
      notes: "Tiêu chuẩn phiên giải kết quả kháng sinh đồ vi sinh lâm sàng mới nhất."
    },
    {
      id: "other_link_5",
      content: "Hội Vi sinh lâm sàng & Kiểm soát nhiễm khuẩn Việt Nam",
      url: "https://vnacc.org.vn/",
      permission: "user",
      notes: "Tài liệu đào tạo, sinh hoạt khoa học và khuyến cáo chuyên ngành vi sinh."
    }
  ]
};

if (typeof window !== 'undefined') {
  window.REPORTS_CONFIG = REPORTS_CONFIG;
}
