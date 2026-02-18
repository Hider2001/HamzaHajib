# Phase 08: Settings & Translations

**Priority:** 🟢 Medium  
**Estimated Time:** 3-4 hours  
**Status:** ✅ Complete  
**Completed:** 2026-02-18

---

## Overview

Settings page with profile management and UI translations editor.

---

## Tasks

- [ ] **8.1** Create `translations.admin.service.ts` (deferred — future enhancement)
- [x] **8.2** Create `SettingsPage.tsx` with tabs
- [ ] **8.3** Create `TranslationsEditor.tsx` (deferred — future enhancement)
- [x] **8.4** Add profile settings section
- [ ] **8.5** Add import/export for translations (deferred — future enhancement)

---

## Files to Create

### 1. Translations Admin Service
**Path:** `src/services/admin/translations.admin.service.ts`

```typescript
import { supabase } from '@/lib/supabase';

export const translationsAdminService = {
    async getAll(context?: string) {
        let query = supabase
            .from('ui_translations')
            .select('*')
            .order('key');

        if (context) {
            query = query.eq('context', context);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    },

    async create(data: { key: string; en: string; ar: string; context?: string }) {
        const { data: translation, error } = await supabase
            .from('ui_translations')
            .insert(data)
            .select()
            .single();
        if (error) throw error;
        return translation;
    },

    async update(id: string, data: { en: string; ar: string }) {
        const { error } = await supabase
            .from('ui_translations')
            .update(data)
            .eq('id', id);
        if (error) throw error;
    },

    async delete(id: string) {
        const { error } = await supabase
            .from('ui_translations')
            .delete()
            .eq('id', id);
        if (error) throw error;
    },

    async export() {
        const { data } = await this.getAll();
        return {
            en: Object.fromEntries(data?.map(t => [t.key, t.en]) || []),
            ar: Object.fromEntries(data?.map(t => [t.key, t.ar]) || [])
        };
    },

    async import(translations: { key: string; en: string; ar: string }[]) {
        // Upsert translations
        const { error } = await supabase
            .from('ui_translations')
            .upsert(translations, { onConflict: 'key' });
        if (error) throw error;
    }
};
```

---

### 2. Settings Page
**Path:** `src/pages/dashboard/settings/SettingsPage.tsx`

**Tabs:**
| Tab | Content |
|-----|---------|
| Profile | User info, change password |
| Translations | Translation key editor |
| Site | General site settings |

---

### 3. Translations Editor
**Path:** `src/pages/dashboard/settings/TranslationsEditor.tsx`

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  🌐 UI Translations          [+ Add] [Export] [Import]     │
├─────────────────────────────────────────────────────────────┤
│  Filter: [All Contexts ▼]  Search: [____________]          │
├─────────────────────────────────────────────────────────────┤
│   Key              │    English          │    Arabic        │
├─────────────────────────────────────────────────────────────┤
│  hero.title        │  Welcome            │  مرحبًا           │
│  hero.subtitle     │  I'm a developer    │  أنا مطور         │
│  nav.home          │  Home               │  الرئيسية         │
│  nav.projects      │  Projects           │  المشاريع         │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Searchable table
- Filter by context (nav, hero, footer, etc.)
- Inline editing
- Add new translation modal
- Export as JSON file
- Import from JSON file

---

### 4. Profile Settings
**Path:** Inside SettingsPage.tsx

- Display user email (read-only)
- Change password form
- Sign out all devices button

---

## Verification

1. `/dashboard/settings` - Settings tabs load
2. Translations tab - Shows all translations
3. Edit inline - Updates in database
4. Add new - Appears in list
5. Export - Downloads JSON file
6. Import - Uploads and updates

---

## Dependencies

- Phases 01-03 complete
