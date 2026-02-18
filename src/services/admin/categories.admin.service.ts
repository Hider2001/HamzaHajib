/**
 * Categories & Tags Admin Service
 * CRUD operations for categories and tags
 */

import { supabase } from '@/lib/supabase';
import type { Category, Tag } from '@/types';

export const categoriesAdminService = {
    async getAll() {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('display_order');
        if (error) throw error;
        return (data ?? []) as Category[];
    },

    async create(data: Partial<Category>) {
        const { data: cat, error } = await supabase
            .from('categories')
            .insert(data)
            .select()
            .single();
        if (error) throw error;
        return cat as Category;
    },

    async update(id: string, data: Partial<Category>) {
        const { data: cat, error } = await supabase
            .from('categories')
            .update(data)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return cat as Category;
    },

    async delete(id: string) {
        const { error } = await supabase.from('categories').delete().eq('id', id);
        if (error) throw error;
    },
};

export const tagsAdminService = {
    async getAll() {
        const { data, error } = await supabase
            .from('tags')
            .select('*')
            .order('name_en');
        if (error) throw error;
        return (data ?? []) as Tag[];
    },

    async create(data: Partial<Tag>) {
        const { data: tag, error } = await supabase
            .from('tags')
            .insert(data)
            .select()
            .single();
        if (error) throw error;
        return tag as Tag;
    },

    async update(id: string, data: Partial<Tag>) {
        const { data: tag, error } = await supabase
            .from('tags')
            .update(data)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return tag as Tag;
    },

    async delete(id: string) {
        const { error } = await supabase.from('tags').delete().eq('id', id);
        if (error) throw error;
    },
};
