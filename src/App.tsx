/**
 * Main App Component
 * Root component with routing — portfolio + admin dashboard
 */

import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './i18n';
import './index.css';

// Portfolio (main site) components
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Work } from '@/components/sections/Work';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { SkipLink } from '@/components/ui/SkipLink';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { SEO } from '@/components/ui/SEO';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { CursorFollower } from '@/components/ui/CursorFollower';
import { BackToTop } from '@/components/ui/BackToTop';
import { ToastProvider } from '@/components/ui/Toast';

// Dashboard (lazy loaded)
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

const Login = lazy(() => import('@/pages/dashboard/Login'));
const DashboardOverview = lazy(() => import('@/pages/dashboard/DashboardOverview'));
const ProjectsList = lazy(() => import('@/pages/dashboard/projects/ProjectsList'));
const ProjectForm = lazy(() => import('@/pages/dashboard/projects/ProjectForm'));
const MessagesInbox = lazy(() => import('@/pages/dashboard/messages/MessagesInbox'));
const MessageDetail = lazy(() => import('@/pages/dashboard/messages/MessageDetail'));
const CategoriesPage = lazy(() => import('@/pages/dashboard/categories/CategoriesPage'));
const TagsPage = lazy(() => import('@/pages/dashboard/categories/TagsPage'));
const MediaLibrary = lazy(() => import('@/pages/dashboard/media/MediaLibrary'));
const SettingsPage = lazy(() => import('@/pages/dashboard/settings/SettingsPage'));

// ============================================
// PORTFOLIO PAGE (Original single-page site)
// ============================================
function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] transition-colors duration-300">
      <CursorFollower />
      <SkipLink />
      <SEO />
      <ScrollProgress />
      <Header />
      <main id="main-content">
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

// ============================================
// DASHBOARD LOADING FALLBACK
// ============================================
function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-sky-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-slate-500 text-sm">Loading…</span>
      </div>
    </div>
  );
}

// ============================================
// APP
// ============================================
function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Suspense fallback={<DashboardLoading />}>
          <Routes>
            {/* Portfolio (main site) */}
            <Route path="/" element={<PortfolioPage />} />

            {/* Dashboard login (public) */}
            <Route path="/dashboard/login" element={<Login />} />

            {/* Dashboard (protected) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="projects" element={<ProjectsList />} />
                <Route path="projects/new" element={<ProjectForm />} />
                <Route path="projects/:id/edit" element={<ProjectForm />} />
                <Route path="messages" element={<MessagesInbox />} />
                <Route path="messages/:id" element={<MessageDetail />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="tags" element={<TagsPage />} />
                <Route path="media" element={<MediaLibrary />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
