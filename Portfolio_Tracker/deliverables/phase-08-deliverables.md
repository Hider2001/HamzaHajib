# Phase 08 Deliverables

## Task 1: Vite + React Project Setup ✅

### Commands

```bash
npm create vite@latest portfolio -- --template react
cd portfolio
npm install
npm install react-router-dom framer-motion
npm install -D @types/node
```

### vite.config.js

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@locales': path.resolve(__dirname, './src/locales'),
    },
  },
  base: '/', // Change for GitHub Pages: '/repo-name/'
});
```

### Folder Structure

```
src/
├── components/
│   ├── layout/        # Header, Footer, Section
│   ├── ui/            # Button, Card, Input
│   └── sections/      # Hero, Work, About, Contact
├── hooks/
│   ├── useDirection.js
│   └── useScrollReveal.js
├── locales/
│   ├── en.json
│   └── ar.json
├── utils/
│   └── motion.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## Task 2: Tailwind + RTL Configuration ✅

### Install

```bash
npm install -D tailwindcss postcss autoprefixer tailwindcss-rtl
npx tailwindcss init -p
```

### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0A2540',
        accent: '#38BDF8',
        surface: '#CBD5E1',
        muted: '#64748B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        'sans-ar': ['Tajawal', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        'display-ar': ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-rtl')],
};
```

### index.css

```css
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Inter:wght@400;500;600;700&family=Outfit:wght@400;600;700&family=Tajawal:wght@400;500;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #0A2540;
  --color-accent: #38BDF8;
}

[lang="ar"] body { font-family: 'Tajawal', sans-serif; }
[lang="en"] body { font-family: 'Inter', sans-serif; }
```

---

## Task 3: i18n Setup (react-i18next) ✅

### Install

```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

### src/i18n.js

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import ar from './locales/ar.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, ar: { translation: ar } },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
    },
    interpolation: { escapeValue: false },
  });

// Update document direction
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
});

export default i18n;
```

---

## Task 4: Language Switcher Component ✅

### src/components/ui/LanguageSwitcher.jsx

```jsx
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const toggle = () => {
    const newLang = isArabic ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    localStorage.setItem('preferredLanguage', newLang);
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface/50 hover:bg-surface transition-colors"
    >
      <span className="text-sm font-medium">
        {isArabic ? 'EN' : 'عربي'}
      </span>
    </motion.button>
  );
};
```

---

## Task 5: Layout Components (RTL-Aware) ✅

### Header.jsx

```jsx
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';

export const Header = () => {
  const { t } = useTranslation();
  
  const navItems = [
    { key: 'home', href: '#' },
    { key: 'work', href: '#work' },
    { key: 'about', href: '#about' },
    { key: 'contact', href: '#contact' },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="font-display text-xl font-bold text-primary">
          {t('brand')}
        </a>
        <div className="flex items-center gap-6">
          {navItems.map(({ key, href }) => (
            <a key={key} href={href} className="text-sm hover:text-accent transition">
              {t(`nav.${key}`)}
            </a>
          ))}
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
};
```

---

## Task 6: Progressive Reveal Component ✅

### src/components/ui/RevealOnScroll.jsx

```jsx
import { motion } from 'framer-motion';
import { useDirection } from '@hooks/useDirection';

export const RevealOnScroll = ({ children, direction = 'up', delay = 0 }) => {
  const { isRTL } = useDirection();

  const variants = {
    up: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: isRTL ? 30 : -30 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: isRTL ? -30 : 30 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } },
  };

  return (
    <motion.div
      variants={variants[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};
```

---

## Task 7: Interactive Case Card ✅

### src/components/ui/ProjectCard.jsx

```jsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const ProjectCard = ({ project }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  
  const title = project[`title_${lang}`] || project.title_en;
  const summary = project[`summary_${lang}`] || project.summary_en;

  return (
    <motion.article
      layoutId={`card-${project.id}`}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={project.thumbnail_url}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold text-primary mb-2">
          {title}
        </h3>
        <p className="text-muted text-sm line-clamp-2">{summary}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags?.map(tag => (
            <span key={tag} className="px-2 py-1 text-xs bg-surface rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};
```

---

## Task 8: Hero Section (EN/AR) ✅

### src/components/sections/Hero.jsx

```jsx
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '../ui/RevealOnScroll';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary/90 text-white">
      <div className="container mx-auto px-4 text-center">
        <RevealOnScroll>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            {t('hero.headline')}
          </h1>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            {t('hero.subheadline')}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.4}>
          <motion.a
            href="#work"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-accent text-primary font-semibold rounded-lg"
          >
            {t('hero.cta')}
          </motion.a>
        </RevealOnScroll>
      </div>
    </section>
  );
};
```

---

## Task 9: Project Detail View ✅

### src/components/sections/ProjectDetail.jsx

```jsx
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const ProjectDetail = ({ projects }) => {
  const { slug } = useParams();
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  
  const project = projects.find(p => p.slug === slug);
  if (!project) return <div>{t('errors.not_found')}</div>;

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-24"
    >
      <img src={project.thumbnail_url} alt="" className="w-full rounded-xl mb-8" />
      <h1 className="font-display text-3xl font-bold mb-4">
        {project[`title_${lang}`]}
      </h1>
      <p className="text-muted mb-8">{project[`summary_${lang}`]}</p>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ 
        __html: project[`description_${lang}`] 
      }} />
    </motion.article>
  );
};
```

---

## Task 10: Contact Section (Bilingual) ✅

### src/components/sections/Contact.jsx

```jsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '../ui/RevealOnScroll';

export const Contact = () => {
  const { t, i18n } = useTranslation();
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const form = new FormData(e.target);
    
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.get('name'),
        email: form.get('email'),
        message: form.get('message'),
        language: i18n.language,
      }),
    });
    
    setStatus('success');
  };

  return (
    <section id="contact" className="py-24 bg-surface/30">
      <div className="container mx-auto px-4 max-w-xl">
        <RevealOnScroll>
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            {t('contact.title')}
          </h2>
        </RevealOnScroll>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="name"
            placeholder={t('contact.name')}
            required
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-accent"
          />
          <input
            name="email"
            type="email"
            placeholder={t('contact.email')}
            required
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-accent"
          />
          <textarea
            name="message"
            placeholder={t('contact.message')}
            rows={5}
            required
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-accent"
          />
          <motion.button
            type="submit"
            disabled={status === 'loading'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-primary text-white font-semibold rounded-lg"
          >
            {status === 'loading' ? '...' : t('contact.submit')}
          </motion.button>
          {status === 'success' && (
            <p className="text-center text-green-600">{t('contact.success')}</p>
          )}
        </form>
      </div>
    </section>
  );
};
```

---

## Task 11: Translation Files (EN/AR) ✅

### src/locales/en.json

```json
{
  "brand": "Hamza Hajeb",
  "nav": {
    "home": "Home",
    "work": "Work",
    "about": "About",
    "contact": "Contact"
  },
  "hero": {
    "headline": "Building Digital Experiences",
    "subheadline": "Full-stack developer crafting clean, scalable solutions",
    "cta": "View Work"
  },
  "work": {
    "title": "Selected Projects",
    "viewProject": "View Project"
  },
  "about": {
    "title": "About Me"
  },
  "contact": {
    "title": "Get In Touch",
    "name": "Your Name",
    "email": "Email Address",
    "message": "Your Message",
    "submit": "Send Message",
    "success": "Message sent successfully!"
  },
  "errors": {
    "required": "This field is required",
    "email": "Invalid email address",
    "not_found": "Not found"
  }
}
```

### src/locales/ar.json

```json
{
  "brand": "حمزة حاجب",
  "nav": {
    "home": "الرئيسية",
    "work": "أعمالي",
    "about": "عني",
    "contact": "تواصل"
  },
  "hero": {
    "headline": "أبني تجارب رقمية",
    "subheadline": "مطور متكامل أصنع حلولاً نظيفة وقابلة للتوسع",
    "cta": "شاهد أعمالي"
  },
  "work": {
    "title": "مشاريع مختارة",
    "viewProject": "عرض المشروع"
  },
  "about": {
    "title": "عني"
  },
  "contact": {
    "title": "تواصل معي",
    "name": "اسمك",
    "email": "البريد الإلكتروني",
    "message": "رسالتك",
    "submit": "إرسال الرسالة",
    "success": "تم إرسال الرسالة بنجاح!"
  },
  "errors": {
    "required": "هذا الحقل مطلوب",
    "email": "بريد إلكتروني غير صالح",
    "not_found": "غير موجود"
  }
}
```

---

## Phase 08 Complete ✅

All 11 tasks have deliverables documented with code. Ready for Phase 09.
