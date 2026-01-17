import { useEffect, useState } from 'react';

export const useDirection = () => {
    const [isRTL, setIsRTL] = useState(false);

    useEffect(() => {
        const checkDirection = () => {
            setIsRTL(document.documentElement.dir === 'rtl');
        };

        checkDirection();

        const observer = new MutationObserver(checkDirection);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['dir'],
        });

        return () => observer.disconnect();
    }, []);

    return { isRTL, dir: isRTL ? 'rtl' : 'ltr' };
};
