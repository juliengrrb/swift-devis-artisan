
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import QuotesPage from "./pages/QuotesPage";
import CreateQuotePage from "./pages/CreateQuotePage";
import CreateQuoteAIPage from "./pages/CreateQuoteAIPage";
import CreateQuoteManualPage from "./pages/CreateQuoteManualPage";
import ClientsPage from "./pages/ClientsPage";
import LibraryPage from "./pages/LibraryPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quotes" element={<QuotesPage />} />
          <Route path="/create-quote" element={<CreateQuotePage />} />
          <Route path="/create-quote/ai" element={<CreateQuoteAIPage />} />
          <Route path="/create-quote/manual" element={<CreateQuoteManualPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
