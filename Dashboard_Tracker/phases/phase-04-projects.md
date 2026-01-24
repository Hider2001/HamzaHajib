# Phase 04: Projects Management

**Priority:** 🔴 Critical  
**Estimated Time:** 6-8 hours  
**Status:** ⬜ Pending

---

## Overview

Full CRUD management for portfolio projects with media upload.

---

## Tasks

- [ ] **4.1** Create `projects.admin.service.ts` with full CRUD
- [ ] **4.2** Create `DataTable.tsx` reusable component
- [ ] **4.3** Create `ProjectsList.tsx` page
- [ ] **4.4** Create `ProjectForm.tsx` create/edit form
- [ ] **4.5** Add thumbnail upload functionality
- [ ] **4.6** Add tags/categories multi-select
- [ ] **4.7** Add delete with confirmation

---

## Files to Create

### 1. Projects Admin Service
**Path:** `src/services/admin/projects.admin.service.ts`

```typescript
import { supabase } from '@/lib/supabase';
import type { Project, ProjectWithTags } from '@/types';

export const projectsAdminService = {
    // Get ALL projects (including drafts)
    async getAll(filters?: { status?: string; category?: string }) {
        let query = supabase
            .from('projects')
            .select(`*, project_tags(tags(*)), project_categories(categories(*))`)
            .order('display_order');

        if (filters?.status) {
            query = query.eq('status', filters.status);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    },

    // Create new project
    async create(data: Partial<Project>) {
        const { data: project, error } = await supabase
            .from('projects')
            .insert(data)
            .select()
            .single();
        if (error) throw error;
        return project;
    },

    // Update project
    async update(id: string, data: Partial<Project>) {
        const { data: project, error } = await supabase
            .from('projects')
            .update(data)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return project;
    },

    // Delete project
    async delete(id: string) {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);
        if (error) throw error;
    },

    // Update project tags
    async updateTags(projectId: string, tagIds: string[]) {
        // Delete existing
        await supabase.from('project_tags').delete().eq('project_id', projectId);
        // Insert new
        const inserts = tagIds.map(tag_id => ({ project_id: projectId, tag_id }));
        await supabase.from('project_tags').insert(inserts);
    },

    // Update project categories
    async updateCategories(projectId: string, categoryIds: string[]) {
        await supabase.from('project_categories').delete().eq('project_id', projectId);
        const inserts = categoryIds.map(category_id => ({ project_id: projectId, category_id }));
        await supabase.from('project_categories').insert(inserts);
    }
};
```

---

### 2. Projects List Page
**Path:** `src/pages/dashboard/projects/ProjectsList.tsx`

**Features:**
- DataTable with columns: Thumbnail, Title, Status, Category, Actions
- Filter by status (All, Draft, Published, Archived)
- Search by title
- Row actions: Edit, View Live, Delete
- "Add Project" button

---

### 3. Project Form
**Path:** `src/pages/dashboard/projects/ProjectForm.tsx`

**Tabbed Form:**
| Tab | Fields |
|-----|--------|
| English | Title, Summary, Description |
| Arabic | Title (AR), Summary (AR), Description (AR) |
| Media | Thumbnail upload, Gallery |
| Settings | Slug, URLs, Featured, Status, Display Order |
| Tags | Multi-select tags and categories |

---

## Verification

1. `/dashboard/projects` - List all projects
2. Click "Add" - Form opens, submit creates project
3. Click "Edit" - Form pre-filled, submit updates
4. Click "Delete" - Confirmation dialog, confirm deletes
5. Upload thumbnail - Shows preview, saves to storage

---

## Dependencies

- Phases 01-03 complete
- Phase 09 (DataTable component) can be built inline
