/**
 * CẤU HÌNH KẾT NỐI SUPABASE THỰC TẾ
 * KHOA VI SINH – BỆNH VIỆN ĐA KHOA ĐỨC GIANG
 */

const SUPABASE_CONFIG = {
  // Thông tin kết nối Supabase thực tế được cung cấp
  url: "https://kqbdrnumjiynpxvuosxl.supabase.co",
  publishableKey: "sb_publishable_Do7UXTysSfavGQvaCv605g_Lsytm81n",
  
  // Tên bảng lưu trữ danh mục ứng dụng
  tableName: "applications",

  // Cấu hình tính năng Cloud Sync
  enableSync: true,
  autoFetchOnLoad: true,

  // Câu lệnh SQL mẫu để tạo bảng và phân quyền trên Supabase SQL Editor (nếu chưa tạo)
  schemaSql: `-- SQL TẠO BẢNG QUẢN LÝ ỨNG DỤNG CHO KHOA VI SINH BVĐK ĐỨC GIANG
CREATE TABLE IF NOT EXISTS public.applications (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  icon TEXT DEFAULT 'Activity',
  url TEXT DEFAULT '',
  platform TEXT DEFAULT 'Supabase',
  featured BOOLEAN DEFAULT false,
  enabled BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 99,
  badge TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Kích hoạt Row Level Security (RLS)
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Cho phép tất cả nhân viên (anon) xem danh mục ứng dụng
CREATE POLICY "Public Read Applications" 
ON public.applications FOR SELECT 
TO anon, authenticated 
USING (true);

-- Cho phép cập nhật/thêm ứng dụng
CREATE POLICY "Public Insert/Update Applications" 
ON public.applications FOR ALL 
TO anon, authenticated 
USING (true)
WITH CHECK (true);
`
};

// Đảm bảo có thể truy xuất qua window object
if (typeof window !== 'undefined') {
  window.SUPABASE_CONFIG = SUPABASE_CONFIG;
}
