/**
 * Error Boundary Component
 * Catches and displays errors gracefully
 */

import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || <ErrorFallback />;
        }

        return this.props.children;
    }
}

/**
 * Default Error Fallback UI
 */
const ErrorFallback = () => {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
            <div className="text-center max-w-md">
                <div className="text-6xl mb-4">😕</div>
                <h1 className="text-2xl font-bold text-[#0A2540] mb-2">
                    Something went wrong
                </h1>
                <p className="text-[#64748B] mb-6">
                    We're sorry, but something unexpected happened. Please try refreshing the page.
                </p>
                <button
                    onClick={handleReload}
                    className="px-6 py-3 bg-[#0A2540] text-white rounded-lg font-medium hover:bg-[#0A2540]/90 transition-colors"
                >
                    Refresh Page
                </button>
            </div>
        </div>
    );
};
