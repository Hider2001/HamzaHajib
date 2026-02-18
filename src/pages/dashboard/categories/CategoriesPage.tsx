/**
 * Categories Page
 * CRUD management for project categories
 */

import { useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { categoriesAdminService } from '@/services/admin/categories.admin.service';
import type { Category } from '@/types';

export default function CategoriesPage() {
    const { t } = useTranslation();
    const [items, setItems] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [form, setForm] = useState({ key: '', name_en: '', name_ar: '', icon: '', display_order: 0 });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        categoriesAdminService.getAll().then(setItems).catch(console.error).finally(() => setLoading(false));
    }, []);

    const resetForm = () => {
        setForm({ key: '', name_en: '', name_ar: '', icon: '', display_order: 0 });
        setEditId(null); setShowForm(false);
    };

    const openEdit = (cat: Category) => {
        setForm({ key: cat.key, name_en: cat.name_en, name_ar: cat.name_ar, icon: cat.icon ?? '', display_order: cat.display_order });
        setEditId(cat.id); setShowForm(true);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editId) {
                const updated = await categoriesAdminService.update(editId, form);
                setItems((prev) => prev.map((x) => x.id === editId ? updated : x));
            } else {
                const created = await categoriesAdminService.create(form);
                setItems((prev) => [...prev, created]);
            }
            resetForm();
        } catch (err) {
            console.error('Save failed:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this category?')) return;
        try {
            await categoriesAdminService.delete(id);
            setItems((prev) => prev.filter((x) => x.id !== id));
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">{t('dashboard.categories', 'Categories')}</h1>
                <button onClick={() => { resetForm(); setShowForm(true); }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 shadow-lg shadow-sky-500/20 transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    Add Category
                </button>
            </div>

            {/* Form modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => resetForm()}>
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl border border-slate-700/40 p-6" style={{ background: 'rgba(30,41,59,0.95)', backdropFilter: 'blur(20px)' }}>
                            <h2 className="text-lg font-semibold text-white mb-4">{editId ? 'Edit Category' : 'New Category'}</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input label="Key" value={form.key} onChange={(v) => setForm((f) => ({ ...f, key: v }))} required placeholder="web-dev" />
                                <Input label="Name (EN)" value={form.name_en} onChange={(v) => setForm((f) => ({ ...f, name_en: v }))} required />
                                <Input label="Name (AR)" value={form.name_ar} onChange={(v) => setForm((f) => ({ ...f, name_ar: v }))} />
                                <Input label="Icon" value={form.icon} onChange={(v) => setForm((f) => ({ ...f, icon: v }))} placeholder="HiCode" />
                                <Input label="Display Order" value={String(form.display_order)} onChange={(v) => setForm((f) => ({ ...f, display_order: parseInt(v) || 0 }))} type="number" />
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={resetForm} className="flex-1 py-2.5 rounded-xl border border-slate-600/40 text-slate-300 text-sm hover:bg-slate-800 transition-colors">Cancel</button>
                                    <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-medium hover:from-sky-400 hover:to-indigo-400 disabled:opacity-50 transition-all">
                                        {saving ? 'Saving…' : editId ? 'Update' : 'Create'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* List */}
            <div className="rounded-xl border border-slate-700/40 overflow-hidden" style={{ background: 'rgba(30,41,59,0.5)' }}>
                {loading ? (
                    <div className="p-6 space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-14 rounded-lg skeleton" />)}</div>
                ) : items.length === 0 ? (
                    <div className="p-12 text-center"><p className="text-slate-500">No categories yet</p></div>
                ) : (
                    <table className="w-full">
                        <thead><tr className="border-b border-slate-700/40">
                            <th className="px-4 py-3 text-xs font-medium text-slate-500 text-start">Key</th>
                            <th className="px-4 py-3 text-xs font-medium text-slate-500 text-start">Name (EN)</th>
                            <th className="px-4 py-3 text-xs font-medium text-slate-500 text-start hidden md:table-cell">Name (AR)</th>
                            <th className="px-4 py-3 text-xs font-medium text-slate-500 text-end">Actions</th>
                        </tr></thead>
                        <tbody>
                            {items.map((cat) => (
                                <tr key={cat.id} className="border-b border-slate-700/20 hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 text-sm text-slate-400 font-mono">{cat.key}</td>
                                    <td className="px-4 py-3 text-sm text-white">{cat.name_en}</td>
                                    <td className="px-4 py-3 text-sm text-slate-300 hidden md:table-cell" dir="rtl">{cat.name_ar}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-1">
                                            <button onClick={() => openEdit(cat)} className="p-2 rounded-lg hover:bg-sky-500/15 text-slate-400 hover:text-sky-400 transition-colors">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </button>
                                            <button onClick={() => handleDelete(cat.id)} className="p-2 rounded-lg hover:bg-red-500/15 text-slate-400 hover:text-red-400 transition-colors">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

function Input({ label, value, onChange, required, placeholder, type = 'text' }: {
    label: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string; type?: string;
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
            <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-600/40 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/40 transition-all" />
        </div>
    );
}
