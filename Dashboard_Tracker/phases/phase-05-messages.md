# Phase 05: Contact Messages

**Priority:** 🟡 High  
**Estimated Time:** 3-4 hours  
**Status:** ⬜ Pending

---

## Overview

Build an inbox-style interface for managing contact form submissions.

---

## Tasks

- [ ] **5.1** Create `contacts.admin.service.ts`
- [ ] **5.2** Create `MessagesInbox.tsx` page
- [ ] **5.3** Create `MessageDetail.tsx` view
- [ ] **5.4** Add status update functionality
- [ ] **5.5** Add unread badge in sidebar

---

## Files to Create

### 1. Contacts Admin Service
**Path:** `src/services/admin/contacts.admin.service.ts`

```typescript
import { supabase } from '@/lib/supabase';
import type { ContactSubmission } from '@/types';

export const contactsAdminService = {
    async getAll(status?: string) {
        let query = supabase
            .from('contact_submissions')
            .select('*')
            .order('created_at', { ascending: false });

        if (status && status !== 'all') {
            query = query.eq('status', status);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    },

    async getById(id: string) {
        const { data, error } = await supabase
            .from('contact_submissions')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    },

    async updateStatus(id: string, status: ContactSubmission['status']) {
        const updates: any = { status };
        if (status === 'replied') {
            updates.replied_at = new Date().toISOString();
        }
        
        const { error } = await supabase
            .from('contact_submissions')
            .update(updates)
            .eq('id', id);
        if (error) throw error;
    },

    async delete(id: string) {
        const { error } = await supabase
            .from('contact_submissions')
            .delete()
            .eq('id', id);
        if (error) throw error;
    },

    async getUnreadCount() {
        const { count } = await supabase
            .from('contact_submissions')
            .select('id', { count: 'exact' })
            .eq('status', 'new');
        return count || 0;
    }
};
```

---

### 2. Messages Inbox Page
**Path:** `src/pages/dashboard/messages/MessagesInbox.tsx`

**Layout:**
```
┌─────────────────────────────────────────┐
│  📬 Messages                [Refresh]   │
├─────────────────────────────────────────┤
│  [All] [New (5)] [Read] [Replied] [Arc] │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐   │
│  │ ● John Doe        jan 24, 2026  │   │
│  │   Project inquiry about...      │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │   Jane Smith      jan 23, 2026  │   │
│  │   Collaboration request...      │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

**Features:**
- Filter tabs: All, New, Read, Replied, Archived
- Unread indicator (blue dot)
- Click to open detail
- Date formatting

---

### 3. Message Detail View
**Path:** `src/pages/dashboard/messages/MessageDetail.tsx`

**Contains:**
- Full message content
- Sender info (name, email)
- Status badge
- Action buttons:
  - Mark as Read
  - Mark as Replied
  - Archive
  - Delete
- "Reply" button (opens mailto: link)

---

## Verification

1. Navigate to `/dashboard/messages`
2. See list of all contact submissions
3. Filter by status - list updates
4. Click message - detail view opens
5. Update status - badge updates
6. Sidebar shows unread count badge

---

## Dependencies

- Phases 01-03 complete
