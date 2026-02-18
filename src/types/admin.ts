/**
 * Admin Dashboard Types
 * Types specific to the admin dashboard functionality
 */

import type { User } from '@supabase/supabase-js';

// ============================================
// AUTH
// ============================================
export interface AuthState {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

// ============================================
// DASHBOARD STATS
// ============================================
export interface DashboardStats {
    totalProjects: number;
    publishedProjects: number;
    draftProjects: number;
    newMessages: number;
    totalCategories: number;
    totalTags: number;
    totalMediaFiles: number;
}

// ============================================
// ACTIVITY LOG
// ============================================
export interface ActivityItem {
    id: string;
    type: 'project_created' | 'project_updated' | 'message_received' | 'media_uploaded';
    title: string;
    description?: string;
    timestamp: string;
}

// ============================================
// MEDIA
// ============================================
export interface MediaAsset {
    id: string;
    name: string;
    url: string;
    storage_path: string;
    type: 'image' | 'video' | 'document';
    mime_type: string;
    size_bytes: number;
    width?: number;
    height?: number;
    created_at: string;
}

// ============================================
// GENERIC HELPERS
// ============================================
export interface PaginatedResponse<T> {
    data: T[];
    count: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface SortConfig {
    column: string;
    direction: 'asc' | 'desc';
}

export interface TableColumn<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    render?: (value: unknown, row: T) => React.ReactNode;
    width?: string;
}

// ============================================
// FORM TYPES
// ============================================
export interface ProjectFormData {
    slug: string;
    title_en: string;
    title_ar: string;
    summary_en: string;
    summary_ar: string;
    description_en: string;
    description_ar: string;
    thumbnail_url: string | null;
    live_url: string;
    github_url: string;
    featured: boolean;
    status: 'draft' | 'published' | 'archived';
    display_order: number;
    tagIds: string[];
    categoryIds: string[];
}

export interface MessageFilters {
    status: 'all' | 'new' | 'read' | 'replied' | 'archived';
    search?: string;
}
