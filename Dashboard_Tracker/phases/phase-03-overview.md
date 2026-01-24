# Phase 03: Dashboard Overview

**Priority:** 🟡 High  
**Estimated Time:** 2-3 hours  
**Status:** ⬜ Pending

---

## Overview

Create the main dashboard landing page with statistics cards and recent activity.

---

## Tasks

- [ ] **3.1** Create `dashboard.service.ts` for stats
- [ ] **3.2** Create `StatsCard.tsx` component
- [ ] **3.3** Create `DashboardOverview.tsx` page
- [ ] **3.4** Add animated number counters
- [ ] **3.5** Add recent activity widget

---

## Files to Create

### 1. Dashboard Service
**Path:** `src/services/dashboard.service.ts`

```typescript
import { supabase } from '@/lib/supabase';

export const dashboardService = {
    async getStats() {
        const [projects, messages, categories, tags] = await Promise.all([
            supabase.from('projects').select('id', { count: 'exact' }),
            supabase.from('contact_submissions').select('id', { count: 'exact' })
                .eq('status', 'new'),
            supabase.from('categories').select('id', { count: 'exact' }),
            supabase.from('tags').select('id', { count: 'exact' })
        ]);

        return {
            totalProjects: projects.count || 0,
            newMessages: messages.count || 0,
            totalCategories: categories.count || 0,
            totalTags: tags.count || 0
        };
    },

    async getRecentActivity(limit = 5) {
        // Get recent projects and messages
        const { data } = await supabase
            .from('projects')
            .select('id, title_en, updated_at')
            .order('updated_at', { ascending: false })
            .limit(limit);
        return data || [];
    }
};
```

---

### 2. Stats Card Component
**Path:** `src/components/dashboard/ui/StatsCard.tsx`

```typescript
interface StatsCardProps {
    icon: React.ReactNode;
    title: string;
    value: number;
    trend?: { value: number; isUp: boolean };
    color?: 'blue' | 'green' | 'purple' | 'orange';
}
```

**Features:**
- Animated count-up on mount
- Color-coded backgrounds
- Optional trend indicator (+/-%)

---

### 3. Overview Page
**Path:** `src/pages/dashboard/DashboardOverview.tsx`

**Layout:**
```
┌─────────────────────────────────────────┐
│           Welcome, Hamza! 👋            │
├─────────┬─────────┬─────────┬───────────┤
│ Projects│ Messages│ Category│   Tags    │
│   12    │   5 new │    5    │    10     │
├─────────┴─────────┴─────────┴───────────┤
│          Recent Activity                │
│  • Updated Project X - 2 hours ago     │
│  • New message from John - 1 day ago   │
├─────────────────────────────────────────┤
│          Quick Actions                  │
│  [Add Project] [View Messages]          │
└─────────────────────────────────────────┘
```

---

## Verification

1. Navigate to `/dashboard`
2. Stats cards should show correct counts from Supabase
3. Numbers should animate on load
4. Recent activity should show latest items
5. Quick actions should navigate correctly

---

## Dependencies

- Phase 01, 02 must be complete
