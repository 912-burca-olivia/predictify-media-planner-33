
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { MediaPlanProvider } from "./contexts/MediaPlanContext";
import AutoGenerate from "./pages/AutoGenerate";
import UserGuide from "./pages/UserGuide";
import MyMediaPlans from "./pages/MyMediaPlans";
import AdminPanel from "./pages/AdminPanel";
import OrganizationDetails from "./pages/OrganizationDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MediaPlanProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auto-generate" element={<AutoGenerate />} />
            <Route path="/user-guide" element={<UserGuide />} />
            <Route path="/my-media-plans" element={<MyMediaPlans />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/organizations/:id" element={<OrganizationDetails />} />
            <Route path="/login" element={<Login />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MediaPlanProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
