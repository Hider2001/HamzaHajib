# Phase 07 Deliverables

## Task 1: Projects Table (Multilingual) ✅

### DDL Script

```sql
-- Projects table with separate EN/AR columns (Option A - easier querying)
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

-- Index for faster queries
CREATE INDEX idx_projects_featured ON projects(featured) WHERE featured = true;
CREATE INDEX idx_projects_status ON projects(status);

-- Auto-update timestamp
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
```

### RLS Policies

```sql
-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public read for published projects
CREATE POLICY "Public can read published" ON projects
  FOR SELECT USING (status = 'published');

-- Admin full access (authenticated users)
CREATE POLICY "Admin full access" ON projects
  FOR ALL USING (auth.role() = 'authenticated');
```

---

## Task 2: Categories & Tags Tables (i18n) ✅

### DDL Script

```sql
-- Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL, -- e.g., 'web', 'mobile'
  name_en VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  icon VARCHAR(50), -- e.g., 'code', 'mobile'
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tags
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL, -- e.g., 'react', 'flutter'
  name_en VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  color VARCHAR(7), -- hex color
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Junction: Projects <-> Categories
CREATE TABLE project_categories (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, category_id)
);

-- Junction: Projects <-> Tags
CREATE TABLE project_tags (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, tag_id)
);
```

---

## Task 3: Media Assets Table ✅

### DDL Script

```sql
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  
  -- File info
  url TEXT NOT NULL,
  storage_path TEXT, -- Supabase storage path
  type VARCHAR(50) NOT NULL, -- image, video, document
  mime_type VARCHAR(100),
  size_bytes INTEGER,
  
  -- Dimensions (for images/video)
  width INTEGER,
  height INTEGER,
  
  -- Bilingual alt text
  alt_text_en TEXT,
  alt_text_ar TEXT,
  
  -- Display
  display_order INTEGER DEFAULT 0,
  is_thumbnail BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_media_project ON media(project_id);
CREATE INDEX idx_media_thumbnail ON media(is_thumbnail) WHERE is_thumbnail = true;
```

---

## Task 4: Contact Submissions Table ✅

### DDL Script

```sql
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Sender info
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  
  -- Context
  language VARCHAR(2) DEFAULT 'en', -- which language form was used
  source_page VARCHAR(255), -- URL where form was submitted
  
  -- Status
  status VARCHAR(50) DEFAULT 'new', -- new, read, replied, archived
  replied_at TIMESTAMPTZ,
  
  -- Metadata
  ip_address INET,
  user_agent TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contact_status ON contact_submissions(status);
CREATE INDEX idx_contact_created ON contact_submissions(created_at DESC);
```

### RLS Policies

```sql
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public can insert (submit form)
CREATE POLICY "Public can submit" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Only admin can read
CREATE POLICY "Admin can read" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Admin can update status
CREATE POLICY "Admin can update" ON contact_submissions
  FOR UPDATE USING (auth.role() = 'authenticated');
```

---

## Task 5: UI Translations Table ✅

### DDL Script

```sql
CREATE TABLE ui_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(255) UNIQUE NOT NULL, -- e.g., 'nav.home', 'hero.cta'
  en TEXT NOT NULL,
  ar TEXT NOT NULL,
  context VARCHAR(100), -- navigation, hero, contact, errors, etc.
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_translations_context ON ui_translations(context);

-- Trigger for updated_at
CREATE TRIGGER translations_updated_at
  BEFORE UPDATE ON ui_translations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

## Task 6: Database Seed Script (EN/AR) ✅

### Seed Data

```sql
-- Categories
INSERT INTO categories (key, name_en, name_ar, icon, display_order) VALUES
  ('web', 'Web Development', 'تطوير الويب', 'code', 1),
  ('mobile', 'Mobile Apps', 'تطبيقات الجوال', 'smartphone', 2),
  ('desktop', 'Desktop Apps', 'تطبيقات سطح المكتب', 'monitor', 3),
  ('dashboard', 'Dashboards', 'لوحات المعلومات', 'layout-dashboard', 4),
  ('api', 'Backend / API', 'الخوادم والـ API', 'server', 5);

-- Tags
INSERT INTO tags (key, name_en, name_ar, color) VALUES
  ('react', 'React', 'React', '#61DAFB'),
  ('flutter', 'Flutter', 'Flutter', '#02569B'),
  ('nodejs', 'Node.js', 'Node.js', '#339933'),
  ('sql', 'SQL Server', 'SQL Server', '#CC2927'),
  ('firebase', 'Firebase', 'Firebase', '#FFCA28'),
  ('electron', 'Electron', 'Electron', '#47848F');

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
);

-- UI Translations
INSERT INTO ui_translations (key, en, ar, context) VALUES
  ('nav.home', 'Home', 'الرئيسية', 'navigation'),
  ('nav.work', 'Work', 'أعمالي', 'navigation'),
  ('nav.about', 'About', 'عني', 'navigation'),
  ('nav.contact', 'Contact', 'تواصل', 'navigation'),
  ('hero.headline', 'Building Digital Experiences', 'أبني تجارب رقمية', 'hero'),
  ('hero.cta', 'View Work', 'شاهد أعمالي', 'hero'),
  ('contact.name', 'Your Name', 'اسمك', 'contact'),
  ('contact.email', 'Email Address', 'البريد الإلكتروني', 'contact'),
  ('contact.message', 'Message', 'الرسالة', 'contact'),
  ('contact.submit', 'Send Message', 'إرسال الرسالة', 'contact'),
  ('contact.success', 'Message sent successfully!', 'تم إرسال الرسالة بنجاح!', 'contact'),
  ('errors.required', 'This field is required', 'هذا الحقل مطلوب', 'errors'),
  ('errors.email', 'Invalid email address', 'بريد إلكتروني غير صالح', 'errors');
```

---

## Complete Schema Diagram

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────┐
│    projects     │────<│ project_categories│>────│  categories │
│─────────────────│     └──────────────────┘     │─────────────│
│ id              │                               │ id          │
│ slug            │     ┌──────────────────┐     │ key         │
│ title_en/ar     │────<│   project_tags   │>────│ name_en/ar  │
│ summary_en/ar   │     └──────────────────┘     └─────────────┘
│ description_en/ar│                                    
│ thumbnail_url   │     ┌─────────────┐           ┌─────────────┐
│ featured        │────<│    media    │           │    tags     │
│ status          │     │─────────────│           │─────────────│
└─────────────────┘     │ url         │           │ key         │
                        │ alt_en/ar   │           │ name_en/ar  │
                        └─────────────┘           │ color       │
                                                  └─────────────┘

┌─────────────────────┐     ┌─────────────────────┐
│ contact_submissions │     │   ui_translations   │
│─────────────────────│     │─────────────────────│
│ name, email, message│     │ key                 │
│ language            │     │ en, ar              │
│ status              │     │ context             │
└─────────────────────┘     └─────────────────────┘
```

---

## Phase 07 Complete ✅

All 6 tasks have deliverables documented. Ready for Phase 08.
