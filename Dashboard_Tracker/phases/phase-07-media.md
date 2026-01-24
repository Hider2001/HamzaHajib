# Phase 07: Media Management

**Priority:** 🟢 Medium  
**Estimated Time:** 4-6 hours  
**Status:** ⬜ Pending

---

## Overview

Media library with Supabase Storage integration for image uploads.

---

## Tasks

- [ ] **7.1** Create Storage bucket in Supabase
- [ ] **7.2** Create `media.service.ts`
- [ ] **7.3** Create `ImageUpload.tsx` component
- [ ] **7.4** Create `MediaLibrary.tsx` page
- [ ] **7.5** Create `MediaPicker.tsx` modal
- [ ] **7.6** Add drag-and-drop upload

---

## Supabase Setup

Run this SQL in Supabase to create the storage bucket:

```sql
-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true);

-- Public read policy
CREATE POLICY "Public can view media" ON storage.objects
FOR SELECT USING (bucket_id = 'portfolio-media');

-- Authenticated upload policy
CREATE POLICY "Authenticated can upload" ON storage.objects
FOR INSERT WITH CHECK (
    bucket_id = 'portfolio-media' 
    AND auth.role() = 'authenticated'
);

-- Authenticated delete policy
CREATE POLICY "Authenticated can delete" ON storage.objects
FOR DELETE USING (
    bucket_id = 'portfolio-media' 
    AND auth.role() = 'authenticated'
);
```

---

## Files to Create

### 1. Media Service
**Path:** `src/services/admin/media.service.ts`

```typescript
import { supabase } from '@/lib/supabase';

const BUCKET = 'portfolio-media';

export const mediaService = {
    async upload(file: File, folder = 'images') {
        const filename = `${Date.now()}-${file.name}`;
        const path = `${folder}/${filename}`;

        const { error: uploadError } = await supabase.storage
            .from(BUCKET)
            .upload(path, file);

        if (uploadError) throw uploadError;

        return this.getPublicUrl(path);
    },

    getPublicUrl(path: string) {
        const { data } = supabase.storage
            .from(BUCKET)
            .getPublicUrl(path);
        return data.publicUrl;
    },

    async list(folder = 'images') {
        const { data, error } = await supabase.storage
            .from(BUCKET)
            .list(folder, { 
                limit: 100,
                sortBy: { column: 'created_at', order: 'desc' }
            });
        if (error) throw error;
        return data;
    },

    async delete(path: string) {
        const { error } = await supabase.storage
            .from(BUCKET)
            .remove([path]);
        if (error) throw error;
    }
};
```

---

### 2. Image Upload Component
**Path:** `src/components/dashboard/ui/ImageUpload.tsx`

```typescript
interface ImageUploadProps {
    value?: string;
    onChange: (url: string | null) => void;
    folder?: string;
}
```

**Features:**
- Drag-and-drop zone
- Click to browse
- Preview current image
- Remove button
- Upload progress
- File validation (type, size)

---

### 3. Media Library Page
**Path:** `src/pages/dashboard/media/MediaLibrary.tsx`

**Layout:**
```
┌─────────────────────────────────────────┐
│  🖼️ Media Library        [Upload Files] │
├─────────────────────────────────────────┤
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │
│  │ img │ │ img │ │ img │ │ img │       │
│  └─────┘ └─────┘ └─────┘ └─────┘       │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │
│  │ img │ │ img │ │ img │ │ img │       │
│  └─────┘ └─────┘ └─────┘ └─────┘       │
└─────────────────────────────────────────┘
```

**Features:**
- Grid view with thumbnails
- Click to view full size
- Hover to show actions (copy URL, delete)
- Multi-file drag-and-drop upload
- Bulk selection and delete

---

### 4. Media Picker Modal
**Path:** `src/components/dashboard/ui/MediaPicker.tsx`

For selecting images in forms (e.g., project thumbnail):
- Modal with media grid
- Upload new from modal
- Click to select
- Returns URL to parent

---

## Verification

1. `/dashboard/media` - Shows all uploaded images
2. Drag files to upload - Progress shown, appears in grid
3. Click image - Shows full size preview
4. Copy URL - Copies public URL
5. Delete - Removes from storage
6. In project form - Media picker modal works

---

## Dependencies

- Phases 01-03 complete
- Storage bucket created in Supabase
