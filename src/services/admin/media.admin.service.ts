/**
 * Media Admin Service
 * Supabase Storage upload, list, and delete for portfolio media
 */

import { supabase } from '@/lib/supabase';

export interface MediaFile {
    name: string;
    id?: string;
    url: string;
    created_at?: string;
    metadata?: {
        size?: number;
        mimetype?: string;
    };
}

const BUCKET = 'portfolio-media';

export const mediaAdminService = {
    /**
     * List all files in the bucket
     */
    async listFiles(path = ''): Promise<MediaFile[]> {
        const { data, error } = await supabase.storage
            .from(BUCKET)
            .list(path, { sortBy: { column: 'created_at', order: 'desc' } });
        if (error) throw error;

        return (data ?? [])
            .filter((f) => f.name !== '.emptyFolderPlaceholder')
            .map((f) => ({
                name: f.name,
                id: f.id,
                url: supabase.storage.from(BUCKET).getPublicUrl(`${path ? path + '/' : ''}${f.name}`).data.publicUrl,
                created_at: f.created_at,
                metadata: f.metadata as MediaFile['metadata'],
            }));
    },

    /**
     * Upload a file
     */
    async upload(file: File, folder = 'uploads'): Promise<MediaFile> {
        const ext = file.name.split('.').pop();
        const path = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
        const { error } = await supabase.storage
            .from(BUCKET)
            .upload(path, file, { contentType: file.type });
        if (error) throw error;
        const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
        return {
            name: file.name,
            url: data.publicUrl,
            metadata: { size: file.size, mimetype: file.type },
        };
    },

    /**
     * Delete a file
     */
    async delete(path: string) {
        const { error } = await supabase.storage
            .from(BUCKET)
            .remove([path]);
        if (error) throw error;
    },

    /**
     * Get public URL for a file
     */
    getPublicUrl(path: string) {
        return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
    },
};
