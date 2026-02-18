/**
 * Auth Context
 * Provides authentication state and actions throughout the app
 */

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { authService } from '@/services/auth.service';

// ============================================
// CONTEXT TYPE
// ============================================
interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ============================================
// PROVIDER
// ============================================
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Check session on mount
    useEffect(() => {
        const initAuth = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initAuth();

        // Subscribe to auth state changes
        const { data: { subscription } } = authService.onAuthStateChange((authUser) => {
            setUser(authUser);
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        setLoading(true);
        try {
            const { user: authUser } = await authService.signIn({ email, password });
            setUser(authUser);
        } finally {
            setLoading(false);
        }
    }, []);

    const signOut = useCallback(async () => {
        await authService.signOut();
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: !!user,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// ============================================
// HOOK
// ============================================
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
