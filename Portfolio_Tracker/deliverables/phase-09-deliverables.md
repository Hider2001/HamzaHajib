# Phase 09 Deliverables

## Task 1: i18n-Aware API Client ✅

### src/lib/api.js

```javascript
import i18n from '../i18n';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * API client that automatically includes current language
 */
export const api = {
  async get(endpoint, options = {}) {
    const lang = i18n.language || 'en';
    const url = new URL(`${API_BASE}${endpoint}`, window.location.origin);
    url.searchParams.set('lang', lang);
    
    Object.entries(options.params || {}).forEach(([k, v]) => {
      url.searchParams.set(k, v);
    });

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  },

  async post(endpoint, body) {
    const lang = i18n.language || 'en';
    const res = await fetch(`${API_BASE}${endpoint}?lang=${lang}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, language: lang }),
    });
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  },
};
```

### Usage

```javascript
// Automatically uses current i18n language
const projects = await api.get('/projects');
const project = await api.get(`/projects/${slug}`);
```

---

## Task 2: Projects Data Fetching (Multilingual) ✅

### src/hooks/useProjects.js

```javascript
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '@/lib/api';

export const useProjects = (category = null) => {
  const { i18n } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const params = category ? { category } : {};
        const { data } = await api.get('/projects', { params });
        setProjects(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [i18n.language, category]); // Refetch when language changes

  return { projects, loading, error };
};
```

### src/hooks/useProject.js

```javascript
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '@/lib/api';

export const useProject = (slug) => {
  const { i18n } = useTranslation();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    
    const fetch = async () => {
      setLoading(true);
      const { data } = await api.get(`/projects/${slug}`);
      setProject(data);
      setLoading(false);
    };
    
    fetch();
  }, [slug, i18n.language]);

  return { project, loading };
};
```

---

## Task 3: Category Filtering (Bilingual Labels) ✅

### src/hooks/useCategories.js

```javascript
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '@/lib/api';

export const useCategories = () => {
  const { i18n } = useTranslation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await api.get('/categories');
      setCategories(data);
    };
    fetch();
  }, [i18n.language]);

  return categories;
};
```

### src/components/ui/CategoryFilter.jsx

```jsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCategories } from '@/hooks/useCategories';

export const CategoryFilter = ({ selected, onSelect }) => {
  const { t, i18n } = useTranslation();
  const categories = useCategories();
  const lang = i18n.language;

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition
          ${!selected ? 'bg-primary text-white' : 'bg-surface hover:bg-surface/80'}`}
      >
        {t('filter.all')}
      </motion.button>
      
      {categories.map((cat) => (
        <motion.button
          key={cat.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(cat.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition
            ${selected === cat.key ? 'bg-primary text-white' : 'bg-surface hover:bg-surface/80'}`}
        >
          {cat[`name_${lang}`] || cat.name_en}
        </motion.button>
      ))}
    </div>
  );
};
```

---

## Task 4: Contact Form Submission ✅

### src/hooks/useContactForm.js

```javascript
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '@/lib/api';

export const useContactForm = () => {
  const { t, i18n } = useTranslation();
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [error, setError] = useState(null);

  const submit = async (formData) => {
    setStatus('loading');
    setError(null);

    try {
      await api.post('/contact', {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        language: i18n.language,
        source_page: window.location.pathname,
      });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(t('errors.submit_failed'));
    }
  };

  const reset = () => {
    setStatus('idle');
    setError(null);
  };

  return { submit, status, error, reset };
};
```

### Updated Contact.jsx Usage

```jsx
const { submit, status, error, reset } = useContactForm();

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target));
  submit(formData);
};

// Show success message in user's language
{status === 'success' && <p className="text-green-600">{t('contact.success')}</p>}
{status === 'error' && <p className="text-red-600">{error}</p>}
```

---

## Task 5: Image Loading with Bilingual Alt Text ✅

### src/components/ui/ProjectImage.jsx

```jsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const ProjectImage = ({ 
  src, 
  alt_en, 
  alt_ar, 
  className = '',
  priority = false 
}) => {
  const { i18n } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  
  const alt = i18n.language === 'ar' ? (alt_ar || alt_en) : alt_en;
  
  // Generate Supabase image transform URL for thumbnails
  const thumbnailUrl = src?.includes('supabase') 
    ? `${src}?width=40&quality=20` 
    : src;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {!loaded && (
        <img
          src={thumbnailUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-lg scale-105"
        />
      )}
      
      {/* Full image */}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 
          ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};
```

### Usage

```jsx
<ProjectImage
  src={project.thumbnail_url}
  alt_en={project.title_en}
  alt_ar={project.title_ar}
  className="aspect-video rounded-lg"
/>
```

---

## Task 6: UI Translation Loading ✅

### Strategy: Bundled + Optional API Fallback

```javascript
// src/i18n.js (updated)
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Bundled translations (always available)
import en from './locales/en.json';
import ar from './locales/ar.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    interpolation: { escapeValue: false },
  });

// Optional: Fetch latest translations from API (for CMS updates)
export const refreshTranslations = async (lang) => {
  try {
    const res = await fetch(`/api/translations/${lang}`);
    if (res.ok) {
      const { data } = await res.json();
      i18n.addResourceBundle(lang, 'translation', data, true, true);
    }
  } catch (e) {
    console.warn('Using bundled translations');
  }
};

export default i18n;
```

### Usage in App

```jsx
import { refreshTranslations } from './i18n';

useEffect(() => {
  // Optionally refresh translations on app load
  refreshTranslations(i18n.language);
}, []);
```

---

## Phase 09 Complete ✅

All 6 tasks have deliverables documented. Ready for Phase 10.
