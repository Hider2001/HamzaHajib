/**
 * Protected Route
 * Wraps dashboard routes — redirects to login if not authenticated
 */

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // Show loading spinner while checking auth
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-slate-400 text-sm font-medium">Verifying session…</span>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/dashboard/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};
