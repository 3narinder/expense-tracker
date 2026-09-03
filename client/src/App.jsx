import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ProtectedRoute, { PublicRoute } from "./components/ProtectiveRoutes";
import {
  AuthPageSkeleton,
  DashboardShellSkeleton,
} from "./components/SuspenseFallbacks.jsx";
import { Toaster } from "react-hot-toast";

// Eager-load auth shell so mobile doesn't wait on extra lazy chunks before login/dashboard.
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Layout from "./components/Layout.jsx";

const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Transactions = lazy(() => import("./pages/Transactions.jsx"));
const Categories = lazy(() => import("./pages/Categories.jsx"));
const Budgets = lazy(() => import("./pages/Budgets.jsx"));
const Insight = lazy(() => import("./pages/Insight.jsx"));
const Notifications = lazy(() => import("./pages/Notifications.jsx"));
const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import("@tanstack/react-query-devtools").then((module) => ({
        default: module.ReactQueryDevtools,
      })),
    )
  : null;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {ReactQueryDevtools ? (
        <Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      ) : null}
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute fallback={<AuthPageSkeleton />}>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute fallback={<AuthPageSkeleton />}>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute fallback={<DashboardShellSkeleton />}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/"
            element={
              <Suspense fallback={<DashboardShellSkeleton />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/transactions"
            element={
              <Suspense fallback={<DashboardShellSkeleton />}>
                <Transactions />
              </Suspense>
            }
          />
          <Route
            path="/categories"
            element={
              <Suspense fallback={<DashboardShellSkeleton />}>
                <Categories />
              </Suspense>
            }
          />
          <Route
            path="/budgets"
            element={
              <Suspense fallback={<DashboardShellSkeleton />}>
                <Budgets />
              </Suspense>
            }
          />
          <Route
            path="/insights"
            element={
              <Suspense fallback={<DashboardShellSkeleton />}>
                <Insight />
              </Suspense>
            }
          />
          <Route
            path="/notifications"
            element={
              <Suspense fallback={<DashboardShellSkeleton />}>
                <Notifications />
              </Suspense>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
