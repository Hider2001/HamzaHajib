/**
 * useProjects Hook
 * Presentation layer hook for project data
 */

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { projectsService } from '@/services';
import type { ProjectWithTags } from '@/types';

export const useProjects = (categoryKey?: string | null) => {
    const { i18n } = useTranslation();
    const [projects, setProjects] = useState<ProjectWithTags[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await projectsService.getAll(categoryKey);
                setProjects(data);
            } catch (err) {
                console.error('useProjects error:', err);
                setError('Failed to load projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [categoryKey, i18n.language]);

    return { projects, loading, error };
};
