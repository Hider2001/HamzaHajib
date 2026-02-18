/**
 * Project Form Page
 * Create / Edit project with tabbed interface
 */

import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { projectsAdminService } from '@/services/admin/projects.admin.service';
import { supabase } from '@/lib/supabase';
import type { Tag, Category } from '@/types';

interface FormData {
    slug: string;
    title_en: string;
    title_ar: string;
    summary_en: string;
    summary_ar: string;
    description_en: string;
    description_ar: string;
    thumbnail_url: string;
    live_url: string;
    github_url: string;
    featured: boolean;
    status: 'draft' | 'published' | 'archived';
    display_order: number;
}

const INITIAL: FormData = {
    slug: '', title_en: '', title_ar: '', summary_en: '', summary_ar: '',
    description_en: '', description_ar: '', thumbnail_url: '', live_url: '',
    github_url: '', featured: false, status: 'draft', display_order: 0,
};

type Tab = 'english' | 'arabic' | 'media' | 'settings';

export default function ProjectForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isEdit = Boolean(id);

    const [form, setForm] = useState<FormData>(INITIAL);
    const [activeTab, setActiveTab] = useState<Tab>('english');
    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    // Tags & categories
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Load existing project if editing
    useEffect(() => {
        const load = async () => {
            try {
                // Load tags and categories
                const [tagsRes, catsRes] = await Promise.all([
                    supabase.from('tags').select('*').order('name_en'),
                    supabase.from('categories').select('*').order('display_order'),
                ]);
                setAllTags((tagsRes.data ?? []) as Tag[]);
                setAllCategories((catsRes.data ?? []) as Category[]);

                if (id) {
                    const project = await projectsAdminService.getById(id);
                    if (project) {
                        setForm({
                            slug: project.slug || '',
                            title_en: project.title_en || '',
                            title_ar: project.title_ar || '',
                            summary_en: project.summary_en || '',
                            summary_ar: project.summary_ar || '',
                            description_en: project.description_en || '',
                            description_ar: project.description_ar || '',
                            thumbnail_url: project.thumbnail_url || '',
                            live_url: project.live_url || '',
                            github_url: project.github_url || '',
                            featured: project.featured || false,
                            status: project.status || 'draft',
                            display_order: project.display_order || 0,
                        });
                        setSelectedTags(project.project_tags?.map((pt: { tags: Tag }) => pt.tags.id) ?? []);
                        setSelectedCategories(project.project_categories?.map((pc: { categories: Category }) => pc.categories.id) ?? []);
                    }
                }
            } catch (err) {
                console.error('Load error:', err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const update = (key: keyof FormData, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

    const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const url = await projectsAdminService.uploadThumbnail(file);
            update('thumbnail_url', url);
        } catch (err) {
            console.error('Upload failed:', err);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSaving(true);
        try {
            const payload = { ...form };
            if (isEdit && id) {
                await projectsAdminService.update(id, payload);
                await projectsAdminService.updateTags(id, selectedTags);
                await projectsAdminService.updateCategories(id, selectedCategories);
            } else {
                const created = await projectsAdminService.create(payload);
                if (created) {
                    await projectsAdminService.updateTags(created.id, selectedTags);
                    await projectsAdminService.updateCategories(created.id, selectedCategories);
                }
            }
            navigate('/dashboard/projects');
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Save failed');
        } finally {
            setSaving(false);
        }
    };

    const tabs: { key: Tab; label: string }[] = [
        { key: 'english', label: 'English' },
        { key: 'arabic', label: 'العربية' },
        { key: 'media', label: t('dashboard.media_tab', 'Media') },
        { key: 'settings', label: t('dashboard.settings_tab', 'Settings') },
    ];

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="h-8 w-48 skeleton rounded-lg" />
                <div className="h-96 skeleton rounded-xl" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button onClick={() => navigate('/dashboard/projects')} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
                <h1 className="text-2xl font-bold text-white">
                    {isEdit ? t('dashboard.edit_project', 'Edit Project') : t('dashboard.new_project', 'New Project')}
                </h1>
            </div>

            {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-sm">
                    {error}
                </motion.div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Tabs */}
                <div className="flex gap-1 mb-6 rounded-xl bg-slate-800/50 p-1 border border-slate-700/40 w-fit">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.key ? 'bg-sky-500/20 text-sky-400' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                <div className="rounded-xl border border-slate-700/40 p-6 space-y-5" style={{ background: 'rgba(30,41,59,0.5)' }}>
                    {/* English Tab */}
                    {activeTab === 'english' && (
                        <div className="space-y-4">
                            <Field label="Title (EN)" value={form.title_en} onChange={(v) => update('title_en', v)} required />
                            <Field label="Summary (EN)" value={form.summary_en} onChange={(v) => update('summary_en', v)} textarea />
                            <Field label="Description (EN)" value={form.description_en} onChange={(v) => update('description_en', v)} textarea rows={6} />
                        </div>
                    )}

                    {/* Arabic Tab */}
                    {activeTab === 'arabic' && (
                        <div className="space-y-4" dir="rtl">
                            <Field label="العنوان" value={form.title_ar} onChange={(v) => update('title_ar', v)} />
                            <Field label="الملخص" value={form.summary_ar} onChange={(v) => update('summary_ar', v)} textarea />
                            <Field label="الوصف" value={form.description_ar} onChange={(v) => update('description_ar', v)} textarea rows={6} />
                        </div>
                    )}

                    {/* Media Tab */}
                    {activeTab === 'media' && (
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-slate-300 mb-2">Thumbnail</label>
                            {form.thumbnail_url && (
                                <img src={form.thumbnail_url} alt="Thumbnail" className="w-40 h-24 rounded-lg object-cover mb-3 border border-slate-700" />
                            )}
                            <input type="file" accept="image/*" onChange={handleThumbnailUpload}
                                className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-sky-500/15 file:text-sky-400 hover:file:bg-sky-500/25 file:cursor-pointer"
                            />
                            <Field label="Thumbnail URL" value={form.thumbnail_url} onChange={(v) => update('thumbnail_url', v)} placeholder="Or paste URL directly" />
                        </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <div className="space-y-4">
                            <Field label="Slug" value={form.slug} onChange={(v) => update('slug', v)} required placeholder="my-project" />
                            <Field label="Live URL" value={form.live_url} onChange={(v) => update('live_url', v)} placeholder="https://…" />
                            <Field label="GitHub URL" value={form.github_url} onChange={(v) => update('github_url', v)} placeholder="https://github.com/…" />

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                                    <select value={form.status} onChange={(e) => update('status', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-600/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/40">
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Display Order</label>
                                    <input type="number" value={form.display_order} onChange={(e) => update('display_order', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-600/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/40" />
                                </div>
                            </div>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-600 text-sky-500 focus:ring-sky-400" />
                                <span className="text-sm text-slate-300">Featured Project</span>
                            </label>

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Tags</label>
                                <div className="flex flex-wrap gap-2">
                                    {allTags.map((tag) => (
                                        <button
                                            key={tag.id}
                                            type="button"
                                            onClick={() => setSelectedTags((prev) => prev.includes(tag.id) ? prev.filter((id) => id !== tag.id) : [...prev, tag.id])}
                                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${selectedTags.includes(tag.id)
                                                    ? 'border-sky-400/50 bg-sky-500/15 text-sky-400'
                                                    : 'border-slate-600/30 text-slate-400 hover:text-white'
                                                }`}
                                            style={selectedTags.includes(tag.id) && tag.color ? { borderColor: `${tag.color}60`, color: tag.color, background: `${tag.color}15` } : {}}
                                        >
                                            {tag.name_en}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Categories */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Categories</label>
                                <div className="flex flex-wrap gap-2">
                                    {allCategories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => setSelectedCategories((prev) => prev.includes(cat.id) ? prev.filter((id) => id !== cat.id) : [...prev, cat.id])}
                                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${selectedCategories.includes(cat.id)
                                                    ? 'border-violet-400/50 bg-violet-500/15 text-violet-400'
                                                    : 'border-slate-600/30 text-slate-400 hover:text-white'
                                                }`}
                                        >
                                            {cat.name_en}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-6">
                    <button type="button" onClick={() => navigate('/dashboard/projects')}
                        className="px-5 py-2.5 rounded-xl border border-slate-600/40 text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" disabled={saving}
                        className="px-6 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 shadow-lg shadow-sky-500/20 disabled:opacity-50 transition-all">
                        {saving ? 'Saving…' : isEdit ? 'Update Project' : 'Create Project'}
                    </button>
                </div>
            </form>
        </div>
    );
}

/* ── Reusable form field ── */
function Field({ label, value, onChange, textarea, rows = 3, required, placeholder }: {
    label: string; value: string; onChange: (v: string) => void;
    textarea?: boolean; rows?: number; required?: boolean; placeholder?: string;
}) {
    const cls = "w-full px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-600/40 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/40 transition-all";
    return (
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
            {textarea ? (
                <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className={`${cls} resize-none`} placeholder={placeholder} />
            ) : (
                <input type="text" value={value} onChange={(e) => onChange(e.target.value)} required={required} className={cls} placeholder={placeholder} />
            )}
        </div>
    );
}
