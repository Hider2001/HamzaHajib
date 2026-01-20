/**
 * useCategories Hook
 * Presentation layer hook for category data
 */

import { useEffect, useState } from 'react';
import { categoriesService } from '@/services';
import type { Category } from '@/types';

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoriesService.getAll();
                setCategories(data);
            } catch (err) {
                console.error('useCategories error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading };
};
