/**
 * Projects List Page
 * Admin table with filtering, search, and row actions
 */

import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { projectsAdminService } from '@/services/admin/projects.admin.service';
import type { ProjectWithTags } from '@/types';

const STATUS_COLORS: Record<string, string> = {
    published: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    draft: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
    archived: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
};

export default function ProjectsList() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [projects, setProjects] = useState<ProjectWithTags[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    const isRTL = i18n.language === 'ar';

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            const data = await projectsAdminService.getAll({ status: filter, search: search || undefined });
            setProjects(data as ProjectWithTags[]);
        } catch (err) {
            console.error('Failed to load projects:', err);
        } finally {
            setLoading(false);
        }
    }, [filter, search]);

    useEffect(() => { fetchProjects(); }, [fetchProjects]);

    const handleDelete = async () => {
        if (!deleteId) return;
        setDeleting(true);
        try {
            await projectsAdminService.delete(deleteId);
            setProjects((p) => p.filter((x) => x.id !== deleteId));
            setDeleteId(null);
        } catch (err) {
            console.error('Delete failed:', err);
        } finally {
            setDeleting(false);
        }
    };

    const title = (p: ProjectWithTags) => isRTL ? (p.title_ar || p.title_en) : p.title_en;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl font-bold text-white">{t('dashboard.projects', 'Projects')}</h1>
                <Link
                    to="/dashboard/projects/new"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-white
                               bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400
                               shadow-lg shadow-sky-500/20 transition-all"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    {t('dashboard.add_project', 'Add Project')}
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex gap-1 rounded-xl bg-slate-800/50 p-1 border border-slate-700/40">
                    {['all', 'published', 'draft', 'archived'].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${filter === s ? 'bg-sky-500/20 text-sky-400' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder={t('dashboard.search', 'Search…')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700/40 text-sm text-white placeholder-slate-500
                               focus:outline-none focus:ring-2 focus:ring-sky-400/40 transition-all flex-1 max-w-xs"
                />
            </div>

            {/* Table */}
            <div className="rounded-xl border border-slate-700/40 overflow-hidden" style={{ background: 'rgba(30,41,59,0.5)' }}>
                {loading ? (
                    <div className="p-6 space-y-3">
                        {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-14 rounded-lg skeleton" />)}
                    </div>
                ) : projects.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-slate-500">{t('dashboard.no_projects', 'No projects found')}</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700/40">
                                <th className="px-4 py-3 text-xs font-medium text-slate-500 text-start">#</th>
                                <th className="px-4 py-3 text-xs font-medium text-slate-500 text-start">{t('dashboard.title', 'Title')}</th>
                                <th className="px-4 py-3 text-xs font-medium text-slate-500 text-start hidden md:table-cell">{t('dashboard.status', 'Status')}</th>
                                <th className="px-4 py-3 text-xs font-medium text-slate-500 text-start hidden lg:table-cell">{t('dashboard.tags_label', 'Tags')}</th>
                                <th className="px-4 py-3 text-xs font-medium text-slate-500 text-end">{t('dashboard.actions', 'Actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((p, i) => (
                                <motion.tr
                                    key={p.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="border-b border-slate-700/20 hover:bg-slate-800/30 transition-colors"
                                >
                                    <td className="px-4 py-3 text-sm text-slate-500">{i + 1}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            {p.thumbnail_url && (
                                                <img src={p.thumbnail_url} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                                            )}
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-white truncate">{title(p)}</p>
                                                <p className="text-xs text-slate-500 truncate">{p.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 hidden md:table-cell">
                                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[p.status] || ''}`}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 hidden lg:table-cell">
                                        <div className="flex gap-1 flex-wrap">
                                            {p.project_tags?.slice(0, 3).map((pt) => (
                                                <span
                                                    key={pt.tags.id}
                                                    className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-slate-600/30 text-slate-300"
                                                    style={pt.tags.color ? { borderColor: `${pt.tags.color}40`, color: pt.tags.color } : {}}
                                                >
                                                    {isRTL ? pt.tags.name_ar : pt.tags.name_en}
                                                </span>
                                            ))}
                                            {(p.project_tags?.length ?? 0) > 3 && (
                                                <span className="text-xs text-slate-500">+{(p.project_tags?.length ?? 0) - 3}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-1">
                                            <button
                                                onClick={() => navigate(`/dashboard/projects/${p.id}/edit`)}
                                                className="p-2 rounded-lg hover:bg-sky-500/15 text-slate-400 hover:text-sky-400 transition-colors"
                                                title="Edit"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </button>
                                            <button
                                                onClick={() => setDeleteId(p.id)}
                                                className="p-2 rounded-lg hover:bg-red-500/15 text-slate-400 hover:text-red-400 transition-colors"
                                                title="Delete"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {deleteId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                        onClick={() => !deleting && setDeleteId(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-sm rounded-2xl border border-red-500/20 p-6"
                            style={{ background: 'rgba(30,41,59,0.95)', backdropFilter: 'blur(20px)' }}
                        >
                            <div className="text-center">
                                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-500/15 flex items-center justify-center text-red-400">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Delete Project?</h3>
                                <p className="text-sm text-slate-400 mb-6">This action cannot be undone.</p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setDeleteId(null)}
                                        disabled={deleting}
                                        className="flex-1 py-2.5 rounded-xl border border-slate-600/40 text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        disabled={deleting}
                                        className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-400 transition-colors disabled:opacity-50"
                                    >
                                        {deleting ? 'Deleting…' : 'Delete'}
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
