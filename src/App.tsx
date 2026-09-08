import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlanSignup from "./pages/PlanSignup";
import ContactPage from "./pages/ContactPage";
import Handover from "./pages/Handover";
import HandoverSuccess from "./pages/HandoverSuccess";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/plan-signup" element={<PlanSignup />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/handover/:slug" element={<Handover />} />
          <Route path="/handover/:slug/success" element={<HandoverSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
