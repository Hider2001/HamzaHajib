# Phase 06: Categories & Tags

**Priority:** 🟡 High  
**Estimated Time:** 3-4 hours  
**Status:** ⬜ Pending

---

## Overview

CRUD management for project categories and tags with color customization.

---

## Tasks

- [ ] **6.1** Create `categories.admin.service.ts`
- [ ] **6.2** Create `tags.admin.service.ts`
- [ ] **6.3** Create `CategoriesPage.tsx`
- [ ] **6.4** Create `TagsPage.tsx`
- [ ] **6.5** Add color picker for tags
- [ ] **6.6** Add drag-and-drop reordering

---

## Files to Create

### 1. Categories Admin Service
**Path:** `src/services/admin/categories.admin.service.ts`

```typescript
import { supabase } from '@/lib/supabase';

export const categoriesAdminService = {
    async getAll() {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('display_order');
        if (error) throw error;
        return data;
    },

    async create(data: { key: string; name_en: string; name_ar: string; icon?: string }) {
        const { data: category, error } = await supabase
            .from('categories')
            .insert(data)
            .select()
            .single();
        if (error) throw error;
        return category;
    },

    async update(id: string, data: Partial<Category>) {
        const { error } = await supabase
            .from('categories')
            .update(data)
            .eq('id', id);
        if (error) throw error;
    },

    async delete(id: string) {
        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', id);
        if (error) throw error;
    },

    async reorder(orderedIds: string[]) {
        const updates = orderedIds.map((id, index) => ({
            id,
            display_order: index
        }));
        // Batch update
        for (const { id, display_order } of updates) {
            await supabase.from('categories').update({ display_order }).eq('id', id);
        }
    }
};
```

---

### 2. Tags Admin Service
**Path:** `src/services/admin/tags.admin.service.ts`

Similar to categories, with color field support.

---

### 3. Categories Page
**Path:** `src/pages/dashboard/categories/CategoriesPage.tsx`

**Layout:**
```
┌─────────────────────────────────────────┐
│  🏷️ Categories             [+ Add New] │
├─────────────────────────────────────────┤
│  ≡  📱 Mobile Apps     | Edit | Delete  │
│  ≡  💻 Web Development | Edit | Delete  │
│  ≡  🖥️ Desktop Apps    | Edit | Delete  │
└─────────────────────────────────────────┘
   ↑ drag handles
```

**Features:**
- List with icon, name (EN), name (AR)
- Drag-and-drop reordering
- Inline edit or modal
- Delete with confirmation

---

### 4. Tags Page
**Path:** `src/pages/dashboard/tags/TagsPage.tsx`

**Features:**
- Grid view with colored badges
- Color picker (preset colors or custom)
- Usage count (how many projects use)
- Cannot delete if in use (or warn)

---

## Color Picker

Use a simple preset palette:
```typescript
const PRESET_COLORS = [
    '#61DAFB', // React Blue
    '#02569B', // Flutter Blue
    '#339933', // Node Green
    '#CC2927', // SQL Red
    '#FFCA28', // Firebase Yellow
    '#47848F', // Electron Teal
    '#764ABC', // Redux Purple
    '#E34F26', // HTML Orange
];
```

---

## Verification

1. `/dashboard/categories` - List all categories
2. Add new category - appears in list
3. Edit category - updates
4. Drag to reorder - order persists
5. `/dashboard/tags` - Grid of colored tags
6. Add tag with color - shows in grid

---

## Dependencies

- Phases 01-03 complete
