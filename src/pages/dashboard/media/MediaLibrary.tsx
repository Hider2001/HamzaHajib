/**
 * Media Library Page
 * Grid view with upload, preview, and delete
 */

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { mediaAdminService, type MediaFile } from '@/services/admin/media.admin.service';

export default function MediaLibrary() {
    const { t } = useTranslation();
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<MediaFile | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadFiles();
    }, []);

    const loadFiles = async () => {
        setLoading(true);
        try {
            const data = await mediaAdminService.listFiles('uploads');
            setFiles(data);
        } catch (err) {
            console.error('Failed to load media:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files;
        if (!selected?.length) return;
        setUploading(true);
        try {
            const uploads = Array.from(selected).map((file) => mediaAdminService.upload(file));
            const results = await Promise.all(uploads);
            setFiles((prev) => [...results, ...prev]);
        } catch (err) {
            console.error('Upload failed:', err);
        } finally {
            setUploading(false);
            if (fileRef.current) fileRef.current.value = '';
        }
    };

    const handleDelete = async (file: MediaFile) => {
        if (!confirm(`Delete ${file.name}?`)) return;
        try {
            // Extract relative path from URL
            const urlParts = file.url.split('/portfolio-media/');
            const path = urlParts[1] || file.name;
            await mediaAdminService.delete(path);
            setFiles((prev) => prev.filter((f) => f.url !== file.url));
            if (preview?.url === file.url) setPreview(null);
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    const copyUrl = (url: string) => {
        navigator.clipboard.writeText(url);
    };

    const isImage = (name: string) => /\.(jpg|jpeg|png|gif|webp|svg|avif)$/i.test(name);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">{t('dashboard.media', 'Media Library')}</h1>
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-white cursor-pointer
                                  bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400
                                  shadow-lg shadow-sky-500/20 transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    {uploading ? 'Uploading…' : 'Upload Files'}
                    <input ref={fileRef} type="file" multiple accept="image/*,video/*,.pdf,.doc,.docx" onChange={handleUpload} className="hidden" />
                </label>
            </div>

            {/* Upload progress */}
            {uploading && (
                <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-4 flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-sky-300">Uploading files…</span>
                </div>
            )}

            {/* Grid */}
            <div className="rounded-xl border border-slate-700/40 p-6" style={{ background: 'rgba(30,41,59,0.5)' }}>
                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {Array.from({ length: 10 }).map((_, i) => <div key={i} className="aspect-square rounded-xl skeleton" />)}
                    </div>
                ) : files.length === 0 ? (
                    <div className="text-center py-16">
                        <svg className="w-16 h-16 mx-auto mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <p className="text-slate-500">No media files yet. Upload some!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {files.map((file) => (
                            <motion.div key={file.url} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                className="group relative aspect-square rounded-xl overflow-hidden border border-slate-700/30 bg-slate-800/30 cursor-pointer hover:border-sky-500/40 transition-all"
                                onClick={() => setPreview(file)}>
                                {isImage(file.name) ? (
                                    <img src={file.url} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center p-3">
                                        <svg className="w-10 h-10 text-slate-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                        <p className="text-xs text-slate-400 text-center truncate w-full">{file.name}</p>
                                    </div>
                                )}
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                    <p className="text-xs text-white truncate w-full">{file.name}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Preview modal */}
            <AnimatePresence>
                {preview && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => setPreview(null)}>
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()} className="max-w-3xl w-full rounded-2xl border border-slate-700/40 overflow-hidden"
                            style={{ background: 'rgba(30,41,59,0.95)', backdropFilter: 'blur(20px)' }}>
                            {isImage(preview.name) && (
                                <img src={preview.url} alt={preview.name} className="w-full max-h-[60vh] object-contain bg-black/30" />
                            )}
                            <div className="p-4 flex items-center justify-between">
                                <p className="text-sm text-white font-medium truncate flex-1">{preview.name}</p>
                                <div className="flex gap-2 flex-shrink-0">
                                    <button onClick={() => copyUrl(preview.url)}
                                        className="px-3 py-1.5 rounded-lg bg-sky-500/15 text-sky-400 text-xs font-medium hover:bg-sky-500/25 transition-colors">
                                        Copy URL
                                    </button>
                                    <button onClick={() => handleDelete(preview)}
                                        className="px-3 py-1.5 rounded-lg text-red-400 text-xs font-medium hover:bg-red-500/15 transition-colors">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
