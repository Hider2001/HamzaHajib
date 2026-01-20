/**
 * SEO Component
 * Manages document head with bilingual meta tags
 */

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SEOProps {
    title?: string;
    description?: string;
    path?: string;
}

export const SEO = ({ title, description, path = '' }: SEOProps) => {
    const { i18n } = useTranslation();
    const lang = i18n.language;
    const baseUrl = 'https://hamzahajeb.com';

    const defaultTitle = lang === 'ar'
        ? 'حمزة حاجب | مطور ويب وبرمجيات'
        : 'Hamza Hajeb | Web & Software Developer';

    const defaultDescription = lang === 'ar'
        ? 'مطور متكامل يبني حلول ويب نظيفة وقابلة للتوسع.'
        : 'Full-stack developer building clean, scalable web solutions.';

    const finalTitle = title || defaultTitle;
    const finalDescription = description || defaultDescription;

    useEffect(() => {
        // Update document title
        document.title = finalTitle;

        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', finalDescription);

        // Update OG tags
        updateMetaTag('og:title', finalTitle);
        updateMetaTag('og:description', finalDescription);
        updateMetaTag('og:url', `${baseUrl}/${lang}${path}`);
        updateMetaTag('og:locale', lang === 'ar' ? 'ar_SA' : 'en_US');

        // Update hreflang links
        updateLinkTag('alternate', 'en', `${baseUrl}/en${path}`);
        updateLinkTag('alternate', 'ar', `${baseUrl}/ar${path}`);
        updateLinkTag('alternate', 'x-default', `${baseUrl}/en${path}`);

    }, [finalTitle, finalDescription, lang, path]);

    return null;
};

function updateMetaTag(property: string, content: string) {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
}

function updateLinkTag(rel: string, hreflang: string, href: string) {
    let tag = document.querySelector(`link[rel="${rel}"][hreflang="${hreflang}"]`);
    if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', rel);
        tag.setAttribute('hreflang', hreflang);
        document.head.appendChild(tag);
    }
    tag.setAttribute('href', href);
}
