/**
 * Message Detail Page
 * Full view of a single contact message with actions
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { messagesAdminService, type ContactMessage } from '@/services/admin/messages.admin.service';

export default function MessageDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [msg, setMsg] = useState<ContactMessage | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            if (!id) return;
            try {
                const data = await messagesAdminService.getById(id);
                setMsg(data);
                // Auto-mark as read
                if (data.status === 'new') {
                    await messagesAdminService.updateStatus(id, 'read');
                    setMsg((m) => m ? { ...m, status: 'read' } : m);
                }
            } catch (err) {
                console.error('Load error:', err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const handleStatusChange = async (status: ContactMessage['status']) => {
        if (!id) return;
        try {
            await messagesAdminService.updateStatus(id, status);
            setMsg((m) => m ? { ...m, status } : m);
        } catch (err) {
            console.error('Status update failed:', err);
        }
    };

    const handleDelete = async () => {
        if (!id) return;
        await messagesAdminService.delete(id);
        navigate('/dashboard/messages');
    };

    if (loading) {
        return (
            <div className="max-w-3xl space-y-4">
                <div className="h-8 w-48 skeleton rounded-lg" />
                <div className="h-64 skeleton rounded-xl" />
            </div>
        );
    }

    if (!msg) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-500">Message not found</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl space-y-6">
            {/* Back button */}
            <div className="flex items-center gap-3">
                <button onClick={() => navigate('/dashboard/messages')} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
                <h1 className="text-xl font-bold text-white">{t('dashboard.message_detail', 'Message Detail')}</h1>
            </div>

            {/* Message card */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-slate-700/40 p-6"
                style={{ background: 'rgba(30,41,59,0.5)', backdropFilter: 'blur(8px)' }}
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold uppercase">
                            {msg.name?.charAt(0) || '?'}
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">{msg.name}</h2>
                            <a href={`mailto:${msg.email}`} className="text-sm text-sky-400 hover:underline">{msg.email}</a>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-500">
                            {new Date(msg.created_at).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric',
                                hour: '2-digit', minute: '2-digit',
                            })}
                        </p>
                    </div>
                </div>

                {/* Subject */}
                {msg.subject && (
                    <div className="mb-4 pb-4 border-b border-slate-700/30">
                        <h3 className="text-sm font-medium text-slate-300">{msg.subject}</h3>
                    </div>
                )}

                {/* Body */}
                <div className="mb-6">
                    <p className="text-slate-200 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                </div>

                {/* Actions bar */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-700/30">
                    <a
                        href={`mailto:${msg.email}?subject=Re: ${msg.subject || 'Your message'}`}
                        onClick={() => handleStatusChange('replied')}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-sky-500/15 text-sky-400 border border-sky-500/25 hover:bg-sky-500/25 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
                        Reply via Email
                    </a>
                    <select
                        value={msg.status}
                        onChange={(e) => handleStatusChange(e.target.value as ContactMessage['status'])}
                        className="px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-600/30 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                    >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="archived">Archived</option>
                    </select>
                    <div className="flex-1" />
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/15 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
