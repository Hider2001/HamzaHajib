/**
 * useContactForm Hook
 * Presentation layer hook for contact form state
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { contactService } from '@/services';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
    name: string;
    email: string;
    message: string;
}

export const useContactForm = () => {
    const { i18n } = useTranslation();
    const [status, setStatus] = useState<FormStatus>('idle');
    const [error, setError] = useState<string | null>(null);

    const submit = async (formData: FormData) => {
        setStatus('loading');
        setError(null);

        try {
            await contactService.submit({
                ...formData,
                language: i18n.language as 'en' | 'ar',
                source_page: window.location.pathname,
            });

            setStatus('success');

            // Auto-reset after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        } catch (err) {
            console.error('useContactForm error:', err);
            setStatus('error');
            setError('Submission failed');
        }
    };

    const reset = () => {
        setStatus('idle');
        setError(null);
    };

    return { submit, status, error, reset };
};
