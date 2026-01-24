# Phase 09: Shared UI Components

**Priority:** 🔴 Critical  
**Estimated Time:** 4-5 hours  
**Status:** ⬜ Pending

---

## Overview

Build reusable UI components for the dashboard: buttons, modals, tables, toasts, etc.

> [!NOTE]
> These components should be built **early** (during Phase 01-02) and refined throughout as needed. Many other phases depend on them.

---

## Tasks

- [ ] **9.1** Create `Button.tsx` with variants
- [ ] **9.2** Create `Modal.tsx` component
- [ ] **9.3** Create `DataTable.tsx` component
- [ ] **9.4** Create `Toast.tsx` notification system
- [ ] **9.5** Create `Skeleton.tsx` loading states
- [ ] **9.6** Create `ConfirmDialog.tsx`
- [ ] **9.7** Create `Badge.tsx` for status indicators
- [ ] **9.8** Create `Input.tsx` and `Textarea.tsx`

---

## Files to Create

### 1. Button Component
**Path:** `src/components/dashboard/ui/Button.tsx`

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    icon?: React.ReactNode;
}
```

**Styles:**
- primary: Blue background, white text
- secondary: Gray background, dark text
- danger: Red background, white text
- ghost: Transparent, text color

---

### 2. Modal Component
**Path:** `src/components/dashboard/ui/Modal.tsx`

```typescript
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}
```

**Features:**
- Portal rendering
- Backdrop with blur
- Close on escape key
- Close on backdrop click
- Framer Motion animations

---

### 3. DataTable Component
**Path:** `src/components/dashboard/ui/DataTable.tsx`

```typescript
interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef[];
    loading?: boolean;
    pagination?: PaginationConfig;
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
}
```

**Features:**
- Sortable columns
- Pagination (client-side)
- Row selection (checkbox)
- Custom cell renderers
- Loading skeleton rows
- Empty state

---

### 4. Toast System
**Path:** `src/components/dashboard/ui/Toast.tsx`

```typescript
// Usage: toast.success('Project saved!')
interface Toast {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
}
```

**Features:**
- Auto-dismiss (3s default)
- Stack multiple toasts
- Dismiss button
- Icons per type
- Slide-in animation

**Context:**
```typescript
// ToastContext.tsx
export const useToast = () => {
    const context = useContext(ToastContext);
    return {
        success: (msg: string) => context.add({ type: 'success', message: msg }),
        error: (msg: string) => context.add({ type: 'error', message: msg }),
        // ...
    };
};
```

---

### 5. Skeleton Component
**Path:** `src/components/dashboard/ui/Skeleton.tsx`

```typescript
interface SkeletonProps {
    variant?: 'text' | 'circle' | 'rect';
    width?: string | number;
    height?: string | number;
    className?: string;
}
```

**Usage:**
```tsx
// Loading stats card
<Skeleton variant="rect" width={200} height={100} />

// Loading text
<Skeleton variant="text" width="80%" />

// Loading avatar
<Skeleton variant="circle" width={40} height={40} />
```

---

### 6. Confirm Dialog
**Path:** `src/components/dashboard/ui/ConfirmDialog.tsx`

```typescript
interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
    loading?: boolean;
}
```

---

### 7. Badge Component
**Path:** `src/components/dashboard/ui/Badge.tsx`

```typescript
interface BadgeProps {
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    children: React.ReactNode;
}
```

**For status indicators:**
- Published → green badge
- Draft → gray badge
- Archived → orange badge

---

### 8. Form Inputs
**Path:** `src/components/dashboard/ui/Input.tsx`

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    rows?: number;
}
```

---

## Component Index

**Path:** `src/components/dashboard/ui/index.ts`

```typescript
export { Button } from './Button';
export { Modal } from './Modal';
export { DataTable } from './DataTable';
export { Toast, ToastProvider, useToast } from './Toast';
export { Skeleton } from './Skeleton';
export { ConfirmDialog } from './ConfirmDialog';
export { Badge } from './Badge';
export { Input, Textarea } from './Input';
```

---

## Verification

Create a test page `/dashboard/components` that showcases all components:
- All button variants
- Modal open/close
- DataTable with sample data
- Toast triggers
- Skeleton states
- Confirm dialog

---

## Dependencies

None - this is foundational.
