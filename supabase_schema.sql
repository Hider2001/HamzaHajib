-- ============================================================================
-- HAMZA PORTFOLIO - SUPABASE SCHEMA (Bilingual EN/AR)
-- ============================================================================
-- Run this entire script in the Supabase SQL Editor to set up your database.

-- 1. Enable RLS (Row Level Security) on all tables by default
--    Note: We explicitly enable it for each table below.

-- ============================================================================
-- TABLE: PROJECTS (Multilingual)
-- ============================================================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  
  -- English content
  title_en VARCHAR(255) NOT NULL,
  summary_en TEXT,
  description_en TEXT,
  
  -- Arabic content
  title_ar VARCHAR(255),
  summary_ar TEXT,
  description_ar TEXT,
  
  -- Shared fields
  thumbnail_url TEXT,
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'draft', -- draft, published, archived
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_projects_featured ON projects(featured) WHERE featured = true;
CREATE INDEX idx_projects_status ON projects(status);

-- Auto-update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS Policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published" ON projects
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admin full access" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================================
-- TABLES: CATEGORIES & TAGS (i18n)
-- ============================================================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL, -- e.g., 'web', 'mobile'
  name_en VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  icon VARCHAR(50),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Admin write categories" ON categories FOR ALL USING (auth.role() = 'authenticated');

CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL, -- e.g., 'react', 'flutter'
  name_en VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  color VARCHAR(7),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read tags" ON tags FOR SELECT USING (true);
CREATE POLICY "Admin write tags" ON tags FOR ALL USING (auth.role() = 'authenticated');

-- Junction Tables
CREATE TABLE project_categories (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, category_id)
);

ALTER TABLE project_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read proj_cats" ON project_categories FOR SELECT USING (true);
CREATE POLICY "Admin write proj_cats" ON project_categories FOR ALL USING (auth.role() = 'authenticated');

CREATE TABLE project_tags (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, tag_id)
);

ALTER TABLE project_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read proj_tags" ON project_tags FOR SELECT USING (true);
CREATE POLICY "Admin write proj_tags" ON project_tags FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================================
-- TABLE: MEDIA ASSETS
-- ============================================================================
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  storage_path TEXT,
  type VARCHAR(50) NOT NULL, -- image, video, document
  mime_type VARCHAR(100),
  size_bytes INTEGER,
  width INTEGER,
  height INTEGER,
  alt_text_en TEXT,
  alt_text_ar TEXT,
  display_order INTEGER DEFAULT 0,
  is_thumbnail BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_media_project ON media(project_id);
CREATE INDEX idx_media_thumbnail ON media(is_thumbnail) WHERE is_thumbnail = true;

ALTER TABLE media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read media" ON media FOR SELECT USING (true);
CREATE POLICY "Admin write media" ON media FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================================
-- TABLE: CONTACT SUBMISSIONS
-- ============================================================================
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  language VARCHAR(2) DEFAULT 'en',
  source_page VARCHAR(255),
  status VARCHAR(50) DEFAULT 'new', -- new, read, replied, archived
  replied_at TIMESTAMPTZ,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contact_status ON contact_submissions(status);
CREATE INDEX idx_contact_created ON contact_submissions(created_at DESC);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can read" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can update" ON contact_submissions
  FOR UPDATE USING (auth.role() = 'authenticated');

-- ============================================================================
-- TABLE: UI TRANSLATIONS
-- ============================================================================
CREATE TABLE ui_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(255) UNIQUE NOT NULL,
  en TEXT NOT NULL,
  ar TEXT NOT NULL,
  context VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_translations_context ON ui_translations(context);

CREATE TRIGGER translations_updated_at
  BEFORE UPDATE ON ui_translations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE ui_translations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read translations" ON ui_translations FOR SELECT USING (true);
CREATE POLICY "Admin write translations" ON ui_translations FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================================
-- SEED DATA (Optional - run to populate with sample data)
-- ============================================================================

-- Categories
INSERT INTO categories (key, name_en, name_ar, icon, display_order) VALUES
  ('web', 'Web Development', 'تطوير الويب', 'code', 1),
  ('mobile', 'Mobile Apps', 'تطبيقات الجوال', 'smartphone', 2),
  ('desktop', 'Desktop Apps', 'تطبيقات سطح المكتب', 'monitor', 3),
  ('dashboard', 'Dashboards', 'لوحات المعلومات', 'layout-dashboard', 4),
  ('api', 'Backend / API', 'الخوادم والـ API', 'server', 5)
ON CONFLICT (key) DO NOTHING;

-- Tags
INSERT INTO tags (key, name_en, name_ar, color) VALUES
  ('react', 'React', 'React', '#61DAFB'),
  ('flutter', 'Flutter', 'Flutter', '#02569B'),
  ('nodejs', 'Node.js', 'Node.js', '#339933'),
  ('sql', 'SQL Server', 'SQL Server', '#CC2927'),
  ('firebase', 'Firebase', 'Firebase', '#FFCA28'),
  ('electron', 'Electron', 'Electron', '#47848F')
ON CONFLICT (key) DO NOTHING;

-- Sample Project
INSERT INTO projects (
  slug, title_en, title_ar, summary_en, summary_ar,
  description_en, description_ar, featured, status
) VALUES (
  'harvey-delivery-app',
  'Harvey Delivery App',
  'تطبيق هارفي للتوصيل',
  'Cross-platform delivery management application built with Flutter.',
  'تطبيق إدارة التوصيل متعدد المنصات مبني بـ Flutter.',
  'Full-featured delivery app with real-time tracking, order management, and driver assignment. Built for scalability with Firebase backend.',
  'تطبيق توصيل متكامل مع تتبع في الوقت الحقيقي، إدارة الطلبات، وتعيين السائقين. مبني للتوسع مع Firebase.',
  true,
  'published'
) ON CONFLICT (slug) DO NOTHING;
