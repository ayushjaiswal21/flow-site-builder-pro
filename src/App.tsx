
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import HRDashboard from "./pages/hr/Dashboard";
import CreateTest from "./pages/hr/CreateTest";
import MonitorTests from "./pages/hr/MonitorTests";
import Reports from "./pages/hr/Reports";
import CandidateDashboard from "./pages/candidate/Dashboard";
import StartTest from "./pages/candidate/StartTest";
import PreviousResults from "./pages/candidate/PreviousResults";
import TakeTest from "./pages/candidate/TakeTest";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* HR Routes */}
            <Route path="/hr/dashboard" element={<HRDashboard />} />
            <Route path="/hr/create-test" element={<CreateTest />} />
            <Route path="/hr/monitor" element={<MonitorTests />} />
            <Route path="/hr/reports" element={<Reports />} />
            
            {/* Candidate Routes */}
            <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
            <Route path="/candidate/start-test" element={<StartTest />} />
            <Route path="/candidate/results" element={<PreviousResults />} />
            <Route path="/candidate/take-test" element={<TakeTest />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
