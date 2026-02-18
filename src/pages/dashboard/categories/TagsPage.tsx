/**
 * Tags Page
 * CRUD management for project tags with color picker
 */

import { useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { tagsAdminService } from '@/services/admin/categories.admin.service';
import type { Tag } from '@/types';

const PRESET_COLORS = [
    '#38BDF8', '#818CF8', '#34D399', '#FBBF24', '#FB7185',
    '#F472B6', '#A78BFA', '#2DD4BF', '#F97316', '#64748B',
];

export default function TagsPage() {
    const { t } = useTranslation();
    const [items, setItems] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [form, setForm] = useState({ key: '', name_en: '', name_ar: '', color: '#38BDF8' });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        tagsAdminService.getAll().then(setItems).catch(console.error).finally(() => setLoading(false));
    }, []);

    const resetForm = () => { setForm({ key: '', name_en: '', name_ar: '', color: '#38BDF8' }); setEditId(null); setShowForm(false); };

    const openEdit = (tag: Tag) => {
        setForm({ key: tag.key, name_en: tag.name_en, name_ar: tag.name_ar, color: tag.color ?? '#38BDF8' });
        setEditId(tag.id); setShowForm(true);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editId) {
                const updated = await tagsAdminService.update(editId, form);
                setItems((prev) => prev.map((x) => x.id === editId ? updated : x));
            } else {
                const created = await tagsAdminService.create(form);
                setItems((prev) => [...prev, created]);
            }
            resetForm();
        } catch (err) { console.error('Save failed:', err); }
        finally { setSaving(false); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this tag?')) return;
        try { await tagsAdminService.delete(id); setItems((prev) => prev.filter((x) => x.id !== id)); }
        catch (err) { console.error('Delete failed:', err); }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">{t('dashboard.tags', 'Tags')}</h1>
                <button onClick={() => { resetForm(); setShowForm(true); }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 shadow-lg shadow-sky-500/20 transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    Add Tag
                </button>
            </div>

            {/* Form modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => resetForm()}>
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl border border-slate-700/40 p-6" style={{ background: 'rgba(30,41,59,0.95)', backdropFilter: 'blur(20px)' }}>
                            <h2 className="text-lg font-semibold text-white mb-4">{editId ? 'Edit Tag' : 'New Tag'}</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Key</label>
                                    <input type="text" value={form.key} onChange={(e) => setForm((f) => ({ ...f, key: e.target.value }))} required placeholder="react"
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-600/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/40 transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Name (EN)</label>
                                    <input type="text" value={form.name_en} onChange={(e) => setForm((f) => ({ ...f, name_en: e.target.value }))} required
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-600/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/40 transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Name (AR)</label>
                                    <input type="text" value={form.name_ar} onChange={(e) => setForm((f) => ({ ...f, name_ar: e.target.value }))} dir="rtl"
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-600/40 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/40 transition-all" />
                                </div>
                                {/* Color picker */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Color</label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {PRESET_COLORS.map((c) => (
                                            <button key={c} type="button" onClick={() => setForm((f) => ({ ...f, color: c }))}
                                                className={`w-8 h-8 rounded-full border-2 transition-all ${form.color === c ? 'border-white scale-110' : 'border-transparent'}`}
                                                style={{ background: c }} />
                                        ))}
                                    </div>
                                    <input type="color" value={form.color} onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                                        className="w-12 h-8 rounded cursor-pointer bg-transparent" />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={resetForm} className="flex-1 py-2.5 rounded-xl border border-slate-600/40 text-slate-300 text-sm hover:bg-slate-800 transition-colors">Cancel</button>
                                    <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-medium disabled:opacity-50 transition-all">
                                        {saving ? 'Saving…' : editId ? 'Update' : 'Create'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tags grid */}
            <div className="rounded-xl border border-slate-700/40 p-6" style={{ background: 'rgba(30,41,59,0.5)' }}>
                {loading ? (
                    <div className="flex flex-wrap gap-3">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-8 w-24 rounded-full skeleton" />)}</div>
                ) : items.length === 0 ? (
                    <p className="text-slate-500 text-center py-8">No tags yet</p>
                ) : (
                    <div className="flex flex-wrap gap-3">
                        {items.map((tag) => (
                            <div key={tag.id} className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all"
                                style={{ borderColor: `${tag.color}40`, background: `${tag.color}10` }}>
                                <span className="w-3 h-3 rounded-full" style={{ background: tag.color ?? '#38BDF8' }} />
                                <span className="text-sm font-medium" style={{ color: tag.color ?? '#e2e8f0' }}>{tag.name_en}</span>
                                <div className="hidden group-hover:flex gap-0.5 ml-1">
                                    <button onClick={() => openEdit(tag)} className="p-1 rounded hover:bg-white/10">
                                        <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                    </button>
                                    <button onClick={() => handleDelete(tag.id)} className="p-1 rounded hover:bg-white/10">
                                        <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
