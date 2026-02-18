/**
 * Dashboard Layout
 * Main shell with sidebar, header, and content area
 */

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sidebar } from './Sidebar';
import { DashboardHeader } from './DashboardHeader';

export const DashboardLayout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const { i18n } = useTranslation();

    const isRTL = i18n.language === 'ar';

    const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);
    const closeMobileSidebar = () => setSidebarCollapsed(true);

    return (
        <div
            className="min-h-screen bg-slate-950 flex"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            {/* Sidebar */}
            <Sidebar
                collapsed={sidebarCollapsed}
                onToggle={toggleSidebar}
                onMobileClose={closeMobileSidebar}
            />

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Header */}
                <DashboardHeader onMenuToggle={toggleSidebar} />

                {/* Page content */}
                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
