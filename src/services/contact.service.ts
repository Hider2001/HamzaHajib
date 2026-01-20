/**
 * Contact Service
 * Handles contact form submissions
 */

import { supabase } from '@/lib/supabase';
import type { ContactSubmission } from '@/types';

export const contactService = {
    /**
     * Submit a new contact form entry
     */
    async submit(data: Omit<ContactSubmission, 'id' | 'status' | 'created_at'>): Promise<void> {
        const { error } = await supabase.from('contact_submissions').insert([data]);

        if (error) {
            console.error('Error submitting contact form:', error);
            throw error;
        }
    },
};
