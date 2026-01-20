/**
 * Domain Types/Models
 * Single source of truth for all data structures
 */

// ============================================
// PROJECT
// ============================================
export interface Project {
    [key: string]: unknown;
    id: string;
    slug: string;
    title_en: string;
    title_ar: string;
    summary_en: string;
    summary_ar: string;
    description_en?: string;
    description_ar?: string;
    thumbnail_url: string | null;
    live_url?: string;
    github_url?: string;
    featured: boolean;
    display_order: number;
    status: 'draft' | 'published' | 'archived';
    created_at: string;
    updated_at: string;
}

export interface ProjectWithTags extends Project {
    project_tags: {
        tags: Tag;
    }[];
    project_categories?: {
        categories: Category;
    }[];
}

// ============================================
// CATEGORY
// ============================================
export interface Category {
    [key: string]: unknown;
    id: string;
    key: string;
    name_en: string;
    name_ar: string;
    icon: string | null;
    display_order: number;
}

// ============================================
// TAG
// ============================================
export interface Tag {
    [key: string]: unknown;
    id: string;
    key: string;
    name_en: string;
    name_ar: string;
    color: string | null;
}

// ============================================
// CONTACT
// ============================================
export interface ContactSubmission {
    id?: string;
    name: string;
    email: string;
    message: string;
    language: 'en' | 'ar';
    source_page?: string;
    status?: 'new' | 'read' | 'replied' | 'archived';
    created_at?: string;
}

// ============================================
// UI TRANSLATION
// ============================================
export interface UITranslation {
    id: string;
    key: string;
    en: string;
    ar: string;
    context: string;
}

// ============================================
// HELPERS
// ============================================
export type Language = 'en' | 'ar';

export const getLocalizedField = <T extends Record<string, unknown>>(
    item: T,
    field: string,
    lang: Language
): string => {
    const key = `${field}_${lang}` as keyof T;
    const fallbackKey = `${field}_en` as keyof T;
    return (item[key] as string) || (item[fallbackKey] as string) || '';
};
