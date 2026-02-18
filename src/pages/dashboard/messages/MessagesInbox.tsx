/**
 * Messages Inbox Page
 * Filtered list of contact messages with status management
 */

import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { messagesAdminService, type ContactMessage } from '@/services/admin/messages.admin.service';

const STATUS_COLORS: Record<string, string> = {
    new: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    read: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
    replied: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    archived: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
};

export default function MessagesInbox() {
    const { t } = useTranslation();
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    const fetchMessages = useCallback(async () => {
        setLoading(true);
        try {
            const data = await messagesAdminService.getAll({ status: filter, search: search || undefined });
            setMessages(data);
        } catch (err) {
            console.error('Failed to load messages:', err);
        } finally {
            setLoading(false);
        }
    }, [filter, search]);

    useEffect(() => { fetchMessages(); }, [fetchMessages]);

    const handleDelete = async () => {
        if (!deleteId) return;
        setDeleting(true);
        try {
            await messagesAdminService.delete(deleteId);
            setMessages((m) => m.filter((x) => x.id !== deleteId));
            setDeleteId(null);
        } catch (err) {
            console.error('Delete failed:', err);
        } finally {
            setDeleting(false);
        }
    };

    const handleStatusChange = async (id: string, status: ContactMessage['status']) => {
        try {
            await messagesAdminService.updateStatus(id, status);
            setMessages((m) => m.map((x) => x.id === id ? { ...x, status } : x));
        } catch (err) {
            console.error('Status update failed:', err);
        }
    };

    const formatDate = (ts: string) => {
        return new Date(ts).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <h1 className="text-2xl font-bold text-white">{t('dashboard.messages', 'Messages')}</h1>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex gap-1 rounded-xl bg-slate-800/50 p-1 border border-slate-700/40">
                    {['all', 'new', 'read', 'replied', 'archived'].map((s) => (
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

            {/* Messages list */}
            <div className="rounded-xl border border-slate-700/40 divide-y divide-slate-700/30 overflow-hidden" style={{ background: 'rgba(30,41,59,0.5)' }}>
                {loading ? (
                    <div className="p-6 space-y-3">
                        {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-16 rounded-lg skeleton" />)}
                    </div>
                ) : messages.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-slate-500">{t('dashboard.no_messages', 'No messages found')}</p>
                    </div>
                ) : (
                    messages.map((msg, i) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.03 }}
                            className={`flex items-start gap-4 p-4 hover:bg-slate-800/30 transition-colors ${msg.status === 'new' ? 'border-l-2 border-l-sky-400' : ''}`}
                        >
                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 uppercase">
                                {msg.name?.charAt(0) || '?'}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <Link to={`/dashboard/messages/${msg.id}`} className="text-sm font-semibold text-white hover:text-sky-400 transition-colors truncate">
                                        {msg.name}
                                    </Link>
                                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border ${STATUS_COLORS[msg.status] || ''}`}>
                                        {msg.status}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 mb-1">{msg.email}</p>
                                <p className="text-sm text-slate-300 truncate">{msg.message}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <span className="text-xs text-slate-500 mr-2 hidden sm:block">{formatDate(msg.created_at)}</span>
                                <select
                                    value={msg.status}
                                    onChange={(e) => handleStatusChange(msg.id, e.target.value as ContactMessage['status'])}
                                    className="px-2 py-1 rounded-lg bg-slate-800/60 border border-slate-600/30 text-xs text-slate-300 focus:outline-none"
                                >
                                    <option value="new">New</option>
                                    <option value="read">Read</option>
                                    <option value="replied">Replied</option>
                                    <option value="archived">Archived</option>
                                </select>
                                <button
                                    onClick={() => setDeleteId(msg.id)}
                                    className="p-1.5 rounded-lg hover:bg-red-500/15 text-slate-400 hover:text-red-400 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Delete modal */}
            <AnimatePresence>
                {deleteId && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                        onClick={() => !deleting && setDeleteId(null)}>
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-sm rounded-2xl border border-red-500/20 p-6"
                            style={{ background: 'rgba(30,41,59,0.95)', backdropFilter: 'blur(20px)' }}>
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-white mb-2">Delete Message?</h3>
                                <p className="text-sm text-slate-400 mb-6">This action cannot be undone.</p>
                                <div className="flex gap-3">
                                    <button onClick={() => setDeleteId(null)} disabled={deleting}
                                        className="flex-1 py-2.5 rounded-xl border border-slate-600/40 text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50">Cancel</button>
                                    <button onClick={handleDelete} disabled={deleting}
                                        className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-400 transition-colors disabled:opacity-50">
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
