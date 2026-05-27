import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { DeepworkPresenceProvider } from "@/hooks/useDeepworkPresence";
import LoginPage from "./pages/LoginPage";
import SetupPage from "./pages/SetupPage";
import OnboardingPage from "./pages/Onboarding";
import StudentDashboard from "./pages/StudentDashboard";
import DeepworkPage from "./pages/DeepworkPage";
import ProfilePage from "./pages/ProfilePage";
import AvatarCustomizePage from "./pages/AvatarCustomizePage";
import PublicProfilePage from "./pages/PublicProfilePage";
import CoachDashboard from "./pages/CoachDashboard";
import NotFound from "./pages/NotFound";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: 'coach' | 'student' }) {
  const { user, role, loading } = useAuth();
  // Safety timeout: if user is authenticated but role hasn't loaded after
  // 5 s, stop waiting (the DB row may genuinely be missing).
  const [roleTimedOut, setRoleTimedOut] = useState(false);
  useEffect(() => {
    if (!user || role) { setRoleTimedOut(false); return; }
    const t = setTimeout(() => setRoleTimedOut(true), 5000);
    return () => clearTimeout(t);
  }, [user, role]);

  if (loading || (user && requiredRole && !role && !roleTimedOut)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  // After timeout with no role → treat as unauthenticated
  if (requiredRole && !role) return <Navigate to="/login" replace />;
  if (requiredRole && role !== requiredRole) {
    return <Navigate to={role === 'coach' ? '/coach' : '/student'} replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user, role, loading, profile } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <DeepworkPresenceProvider userId={user?.id} profile={profile}>
    <Routes>
      <Route path="/login" element={(user && role) ? <Navigate to={role === 'coach' ? '/coach' : '/student'} replace /> : <LoginPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/setup" element={(user && role) ? <Navigate to={role === 'coach' ? '/coach' : '/student'} replace /> : <SetupPage />} />
      <Route path="/student" element={<ProtectedRoute requiredRole="student"><StudentDashboard /></ProtectedRoute>} />
      <Route path="/student/deepwork" element={<ProtectedRoute requiredRole="student"><DeepworkPage /></ProtectedRoute>} />
      <Route path="/student/profile" element={<ProtectedRoute requiredRole="student"><ProfilePage /></ProtectedRoute>} />
      <Route path="/student/profile/customize" element={<ProtectedRoute requiredRole="student"><AvatarCustomizePage /></ProtectedRoute>} />
      <Route path="/student/profile/:userId" element={<ProtectedRoute requiredRole="student"><PublicProfilePage /></ProtectedRoute>} />
      <Route path="/coach" element={<ProtectedRoute requiredRole="coach"><CoachDashboard /></ProtectedRoute>} />
      <Route path="/" element={(user && role) ? <Navigate to={role === 'coach' ? '/coach' : '/student'} replace /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </DeepworkPresenceProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
