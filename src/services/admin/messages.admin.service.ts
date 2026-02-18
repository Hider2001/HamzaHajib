/**
 * Messages Admin Service
 * CRUD and status management for contact submissions
 */

import { supabase } from '@/lib/supabase';

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'replied' | 'archived';
    created_at: string;
    updated_at?: string;
}

export const messagesAdminService = {
    /**
     * Get all messages with optional filters
     */
    async getAll(filters?: { status?: string; search?: string }) {
        let query = supabase
            .from('contact_submissions')
            .select('*')
            .order('created_at', { ascending: false });

        if (filters?.status && filters.status !== 'all') {
            query = query.eq('status', filters.status);
        }
        if (filters?.search) {
            query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,subject.ilike.%${filters.search}%`);
        }

        const { data, error } = await query;
        if (error) throw error;
        return (data ?? []) as ContactMessage[];
    },

    /**
     * Get single message by ID
     */
    async getById(id: string) {
        const { data, error } = await supabase
            .from('contact_submissions')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data as ContactMessage;
    },

    /**
     * Update message status
     */
    async updateStatus(id: string, status: ContactMessage['status']) {
        const { error } = await supabase
            .from('contact_submissions')
            .update({ status })
            .eq('id', id);
        if (error) throw error;
    },

    /**
     * Delete a message
     */
    async delete(id: string) {
        const { error } = await supabase
            .from('contact_submissions')
            .delete()
            .eq('id', id);
        if (error) throw error;
    },

    /**
     * Get count of new messages
     */
    async getNewCount() {
        const { count, error } = await supabase
            .from('contact_submissions')
            .select('id', { count: 'exact', head: true })
            .eq('status', 'new');
        if (error) throw error;
        return count ?? 0;
    },
};
