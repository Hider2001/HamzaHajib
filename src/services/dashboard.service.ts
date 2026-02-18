/**
 * Dashboard Service
 * Fetches aggregate stats and recent activity from Supabase
 */

import { supabase } from '@/lib/supabase';
import type { DashboardStats, ActivityItem } from '@/types/admin';

export const dashboardService = {
    /**
     * Fetch aggregate dashboard statistics
     */
    async getStats(): Promise<DashboardStats> {
        const [
            projects,
            published,
            drafts,
            messages,
            categories,
            tags,
        ] = await Promise.all([
            supabase.from('projects').select('id', { count: 'exact', head: true }),
            supabase.from('projects').select('id', { count: 'exact', head: true }).eq('status', 'published'),
            supabase.from('projects').select('id', { count: 'exact', head: true }).eq('status', 'draft'),
            supabase.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('status', 'new'),
            supabase.from('categories').select('id', { count: 'exact', head: true }),
            supabase.from('tags').select('id', { count: 'exact', head: true }),
        ]);

        return {
            totalProjects: projects.count ?? 0,
            publishedProjects: published.count ?? 0,
            draftProjects: drafts.count ?? 0,
            newMessages: messages.count ?? 0,
            totalCategories: categories.count ?? 0,
            totalTags: tags.count ?? 0,
            totalMediaFiles: 0, // Will be populated in Phase 07
        };
    },

    /**
     * Fetch recent activity (latest updated projects + messages)
     */
    async getRecentActivity(limit = 8): Promise<ActivityItem[]> {
        const [projectsRes, messagesRes] = await Promise.all([
            supabase
                .from('projects')
                .select('id, title_en, updated_at, created_at')
                .order('updated_at', { ascending: false })
                .limit(limit),
            supabase
                .from('contact_submissions')
                .select('id, name, email, created_at')
                .order('created_at', { ascending: false })
                .limit(limit),
        ]);

        const items: ActivityItem[] = [];

        // Map projects
        for (const p of projectsRes.data ?? []) {
            const isNew = p.created_at === p.updated_at;
            items.push({
                id: p.id,
                type: isNew ? 'project_created' : 'project_updated',
                title: isNew ? `New project: ${p.title_en}` : `Updated: ${p.title_en}`,
                timestamp: p.updated_at,
            });
        }

        // Map messages
        for (const m of messagesRes.data ?? []) {
            items.push({
                id: m.id,
                type: 'message_received',
                title: `Message from ${m.name}`,
                description: m.email,
                timestamp: m.created_at,
            });
        }

        // Sort by timestamp descending
        items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        return items.slice(0, limit);
    },
};
