/**
 * Projects Admin Service
 * Full CRUD operations for projects management with Supabase
 */

import { supabase } from '@/lib/supabase';
import type { Project } from '@/types';

export const projectsAdminService = {
    /**
     * Get ALL projects (including drafts/archived) with tags and categories
     */
    async getAll(filters?: { status?: string; search?: string }) {
        let query = supabase
            .from('projects')
            .select(`
                *,
                project_tags(tags(id, key, name_en, name_ar, color)),
                project_categories(categories(id, key, name_en, name_ar, icon))
            `)
            .order('display_order', { ascending: true });

        if (filters?.status && filters.status !== 'all') {
            query = query.eq('status', filters.status);
        }
        if (filters?.search) {
            query = query.or(`title_en.ilike.%${filters.search}%,title_ar.ilike.%${filters.search}%`);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data ?? [];
    },

    /**
     * Get a single project by ID
     */
    async getById(id: string) {
        const { data, error } = await supabase
            .from('projects')
            .select(`
                *,
                project_tags(tags(id, key, name_en, name_ar, color)),
                project_categories(categories(id, key, name_en, name_ar, icon))
            `)
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    },

    /**
     * Create a new project
     */
    async create(data: Partial<Project>) {
        const { data: project, error } = await supabase
            .from('projects')
            .insert(data)
            .select()
            .single();
        if (error) throw error;
        return project;
    },

    /**
     * Update a project by ID
     */
    async update(id: string, data: Partial<Project>) {
        const { data: project, error } = await supabase
            .from('projects')
            .update(data)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return project;
    },

    /**
     * Delete a project by ID
     */
    async delete(id: string) {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);
        if (error) throw error;
    },

    /**
     * Update project tags (replace all)
     */
    async updateTags(projectId: string, tagIds: string[]) {
        // Clear existing tags
        await supabase.from('project_tags').delete().eq('project_id', projectId);
        // Insert new
        if (tagIds.length > 0) {
            const rows = tagIds.map((tag_id) => ({ project_id: projectId, tag_id }));
            const { error } = await supabase.from('project_tags').insert(rows);
            if (error) throw error;
        }
    },

    /**
     * Update project categories (replace all)
     */
    async updateCategories(projectId: string, categoryIds: string[]) {
        await supabase.from('project_categories').delete().eq('project_id', projectId);
        if (categoryIds.length > 0) {
            const rows = categoryIds.map((category_id) => ({ project_id: projectId, category_id }));
            const { error } = await supabase.from('project_categories').insert(rows);
            if (error) throw error;
        }
    },

    /**
     * Upload thumbnail to Supabase Storage
     */
    async uploadThumbnail(file: File) {
        const ext = file.name.split('.').pop();
        const path = `thumbnails/${Date.now()}.${ext}`;
        const { error } = await supabase.storage
            .from('portfolio-media')
            .upload(path, file);
        if (error) throw error;
        const { data } = supabase.storage.from('portfolio-media').getPublicUrl(path);
        return data.publicUrl;
    },
};
