/**
 * Auth Service
 * Handles all authentication operations via Supabase Auth
 */

import { supabase } from '@/lib/supabase';
import type { LoginCredentials } from '@/types/admin';

export const authService = {
    /**
     * Sign in with email and password
     */
    async signIn({ email, password }: LoginCredentials) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    },

    /**
     * Sign out and clear session
     */
    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    /**
     * Get the current authenticated user
     */
    async getCurrentUser() {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        return user;
    },

    /**
     * Get current session
     */
    async getSession() {
        const {
            data: { session },
        } = await supabase.auth.getSession();
        return session;
    },

    /**
     * Subscribe to authentication state changes
     */
    onAuthStateChange(callback: (user: ReturnType<typeof supabase.auth.getUser> extends Promise<infer R> ? R extends { data: { user: infer U } } ? U : never : never) => void) {
        return supabase.auth.onAuthStateChange((_event, session) => {
            callback(session?.user ?? null);
        });
    },

    /**
     * Update user password
     */
    async updatePassword(newPassword: string) {
        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });
        if (error) throw error;
    },
};
