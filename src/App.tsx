/**
 * Main App Component
 * Root component with all UX polish features
 */

import './i18n';
import './index.css';

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

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <div className="min-h-screen bg-white dark:bg-[#0F172A] transition-colors duration-300">
          {/* Custom Cursor */}
          <CursorFollower />

          {/* A11y Skip Link */}
          <SkipLink />

          {/* SEO Meta Tags */}
          <SEO />

          {/* Scroll Progress Indicator */}
          <ScrollProgress />

          {/* Header */}
          <Header />

          {/* Main Content */}
          <main id="main-content">
            <Hero />
            <Work />
            <About />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />

          {/* Back to Top Button */}
          <BackToTop />
        </div>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
