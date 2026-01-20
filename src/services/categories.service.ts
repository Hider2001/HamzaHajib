/**
 * Categories Service
 * Handles all category-related API calls
 */

import { supabase } from '@/lib/supabase';
import type { Category } from '@/types';

export const categoriesService = {
    /**
     * Fetch all categories ordered by display_order
     */
    async getAll(): Promise<Category[]> {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }

        return data || [];
    },

    /**
     * Fetch a single category by key
     */
    async getByKey(key: string): Promise<Category | null> {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('key', key)
            .single();

        if (error) {
            console.error('Error fetching category:', error);
            return null;
        }

        return data;
    },
};
