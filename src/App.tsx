import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

import { ROUTE_PATHS } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { Layout } from '@/components/Layout';

import Dashboard from '@/pages/Dashboard';
import TasksPage from '@/pages/Tasks';
import Calendar from '@/pages/Calendar';
import Settings from '@/pages/Settings';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated, 'isLoading:', isLoading);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }

  console.log('Authenticated, rendering protected content');
  return <Layout>{children}</Layout>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.DASHBOARD} replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route
              path={ROUTE_PATHS.LOGIN}
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path={ROUTE_PATHS.SIGNUP}
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />

            <Route
              path={ROUTE_PATHS.DASHBOARD}
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path={ROUTE_PATHS.TASKS}
              element={
                <ProtectedRoute>
                  <TasksPage />
                </ProtectedRoute>
              }
            />

            <Route
              path={ROUTE_PATHS.CALENDAR}
              element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              }
            />

            <Route
              path={ROUTE_PATHS.SETTINGS}
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to={ROUTE_PATHS.DASHBOARD} replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner position="top-right" expand={false} richColors />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
