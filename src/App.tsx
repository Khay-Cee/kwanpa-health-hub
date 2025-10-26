import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Ranking from "./pages/Ranking";
import History from "./pages/History";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import CaregiverDashboard from "./pages/CaregiverDashboard";
import CaregiverPatientDetail from "./pages/CaregiverPatientDetail";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorPatientDetail from "./pages/DoctorPatientDetail";
import ProtectedDoctorRoute from "./components/doctor/ProtectedDoctorRoute";
import ProfileEdit from "./pages/ProfileEdit";
import ProfileCompletion from "./pages/ProfileCompletion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/history" element={<History />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/caregiver" element={<CaregiverDashboard />} />
          <Route path="/caregiver/patient/:id" element={<CaregiverPatientDetail />} />
          <Route path="/doctor">
            <Route path="login" element={<DoctorLogin />} />
            {/* Protected doctor routes */}
            <Route element={<ProtectedDoctorRoute />}>
              <Route path="dashboard" element={<DoctorDashboard />} />
              <Route path="patient/:id" element={<DoctorPatientDetail />} />
              {/* future doctor routes (analytics, etc.) go here */}
            </Route>
          </Route>
          <Route path="/profile/complete" element={<ProfileCompletion />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/profile" element={<Navigate to="/profile/edit" replace />} />
          <Route path="/settings" element={<Navigate to="/home" replace />} />
          <Route path="/terms" element={<Navigate to="/home" replace />} />
          <Route path="/partners" element={<Navigate to="/home" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
