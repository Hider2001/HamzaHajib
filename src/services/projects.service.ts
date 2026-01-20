/**
 * Projects Service
 * Handles all project-related API calls
 */

import { supabase } from '@/lib/supabase';
import type { ProjectWithTags } from '@/types';

export const projectsService = {
    /**
     * Fetch all published projects with their tags
     */
    async getAll(categoryKey?: string | null): Promise<ProjectWithTags[]> {
        let query = supabase
            .from('projects')
            .select(`
        *,
        project_tags (
          tags (
            id,
            key,
            name_en,
            name_ar,
            color
          )
        )
      `)
            .eq('status', 'published')
            .order('display_order', { ascending: true });

        // If category filter is applied, we need a different approach
        if (categoryKey) {
            // First get project IDs that belong to this category
            const { data: categoryProjects } = await supabase
                .from('project_categories')
                .select('project_id, categories!inner(key)')
                .eq('categories.key', categoryKey);

            if (categoryProjects && categoryProjects.length > 0) {
                const projectIds = categoryProjects.map((cp) => cp.project_id);
                query = query.in('id', projectIds);
            } else {
                return []; // No projects in this category
            }
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }

        return data || [];
    },

    /**
     * Fetch a single project by slug
     */
    async getBySlug(slug: string): Promise<ProjectWithTags | null> {
        const { data, error } = await supabase
            .from('projects')
            .select(`
        *,
        project_tags (
          tags (
            id,
            key,
            name_en,
            name_ar,
            color
          )
        )
      `)
            .eq('slug', slug)
            .eq('status', 'published')
            .single();

        if (error) {
            console.error('Error fetching project:', error);
            return null;
        }

        return data;
    },

    /**
     * Fetch featured projects only
     */
    async getFeatured(): Promise<ProjectWithTags[]> {
        const { data, error } = await supabase
            .from('projects')
            .select(`
        *,
        project_tags (
          tags (
            id,
            key,
            name_en,
            name_ar,
            color
          )
        )
      `)
            .eq('status', 'published')
            .eq('featured', true)
            .order('display_order', { ascending: true });

        if (error) {
            console.error('Error fetching featured projects:', error);
            throw error;
        }

        return data || [];
    },
};
