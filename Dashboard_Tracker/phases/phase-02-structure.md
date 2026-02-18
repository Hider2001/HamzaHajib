# Phase 02: Core Dashboard Structure

**Priority:** 🔴 Critical  
**Estimated Time:** 3-4 hours  
**Status:** ✅ Complete  
**Completed:** 2026-02-18

---

## Overview

Build the main dashboard shell with sidebar navigation, header, and responsive layout.

---

## Tasks

- [x] **2.1** Create `DashboardLayout.tsx` shell component
- [x] **2.2** Create `Sidebar.tsx` navigation component
- [x] **2.3** Create `DashboardHeader.tsx` top bar
- [x] **2.4** Add RTL/LTR support for dashboard
- [x] **2.5** Add responsive mobile menu

---

## Files to Create

### 1. Dashboard Layout
**Path:** `src/components/dashboard/DashboardLayout.tsx`

- Grid layout: Sidebar + Main content
- Uses React Router `<Outlet />` for nested routes
- Responsive: Sidebar collapses on mobile
- RTL support with `dir` attribute

```typescript
const DashboardLayout = () => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="dashboard-main">
                <DashboardHeader />
                <div className="dashboard-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
```

---

### 2. Sidebar Navigation
**Path:** `src/components/dashboard/Sidebar.tsx`

**Navigation Items:**
| Icon | Label | Route |
|------|-------|-------|
| 📊 | Overview | `/dashboard` |
| 📁 | Projects | `/dashboard/projects` |
| 💬 | Messages | `/dashboard/messages` |
| 🏷️ | Categories | `/dashboard/categories` |
| 🔖 | Tags | `/dashboard/tags` |
| 🖼️ | Media | `/dashboard/media` |
| ⚙️ | Settings | `/dashboard/settings` |

**Features:**
- Active route highlighting
- Collapsible on mobile
- Logo at top

---

### 3. Dashboard Header
**Path:** `src/components/dashboard/DashboardHeader.tsx`

**Contains:**
- Page title (dynamic)
- Language switcher (EN/AR)
- Theme toggle (dark/light)
- User avatar dropdown
- Logout button

---

## CSS / Styling

**Path:** `src/components/dashboard/dashboard.css`

```css
.dashboard-layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    min-height: 100vh;
}

.dashboard-sidebar {
    background: var(--sidebar-bg);
    border-right: 1px solid var(--border);
}

.dashboard-main {
    display: flex;
    flex-direction: column;
}

/* RTL Support */
[dir="rtl"] .dashboard-layout {
    grid-template-columns: 1fr 250px;
}

/* Mobile */
@media (max-width: 768px) {
    .dashboard-layout {
        grid-template-columns: 1fr;
    }
}
```

---

## Verification

1. Navigate to `/dashboard`
2. Sidebar should be visible on desktop
3. Click navigation items - routes should change
4. Active item should be highlighted
5. Switch language - RTL layout should apply
6. Resize to mobile - sidebar should collapse

---

## Dependencies

- Phase 01 (Authentication) must be complete
