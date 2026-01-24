# Phase 01: Foundation & Authentication

**Priority:** 🔴 Critical  
**Estimated Time:** 4-6 hours  
**Status:** ⬜ Pending

---

## Overview

Set up Supabase Authentication with protected routes for the admin dashboard.

---

## Tasks

- [ ] **1.1** Create `auth.service.ts` with Supabase Auth functions
- [ ] **1.2** Create `AuthContext.tsx` for global auth state
- [ ] **1.3** Create `useAuth.ts` hook
- [ ] **1.4** Create `ProtectedRoute.tsx` component
- [ ] **1.5** Create `Login.tsx` page
- [ ] **1.6** Add dashboard routes to `App.tsx`

---

## Files to Create

### 1. Auth Service
**Path:** `src/services/auth.service.ts`

```typescript
import { supabase } from '@/lib/supabase';

export const authService = {
    async signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;
        return data;
    },

    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    async getCurrentUser() {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    },

    onAuthStateChange(callback: (user: any) => void) {
        return supabase.auth.onAuthStateChange((_, session) => {
            callback(session?.user || null);
        });
    }
};
```

---

### 2. Auth Context
**Path:** `src/context/AuthContext.tsx`

- Wrap app with `AuthProvider`
- Provide `user`, `loading`, `signIn`, `signOut`
- Auto-persist session from Supabase

---

### 3. Protected Route
**Path:** `src/components/auth/ProtectedRoute.tsx`

- Check auth state
- Redirect to `/dashboard/login` if not authenticated
- Show loading spinner while checking

---

### 4. Login Page
**Path:** `src/pages/dashboard/Login.tsx`

- Email/password form
- Error handling
- Redirect to `/dashboard` on success
- Bilingual (EN/AR) support
- Animated with Framer Motion

---

## Verification

```bash
# Build should pass
npm run build

# Test in browser:
# 1. Navigate to /dashboard → should redirect to login
# 2. Login with valid credentials → should redirect to dashboard
# 3. Refresh page → should stay logged in
# 4. Logout → should redirect to login
```

---

## Dependencies

None - uses existing Supabase client.

---

## Notes

> [!IMPORTANT]
> You'll need a Supabase user account created for the admin. Create one in the Supabase dashboard before testing.
