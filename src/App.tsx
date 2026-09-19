import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SiteLayout from "@/components/layout/SiteLayout";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import About from "./pages/About.tsx";
import Services from "./pages/Services.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import CaseStudy from "./pages/CaseStudy.tsx";
import Articles from "./pages/Articles.tsx";
import Article from "./pages/Article.tsx";
import Contact from "./pages/Contact.tsx";
import Testimonials from "./pages/Testimonials.tsx";
import Awards from "./pages/Awards.tsx";
import Auth from "./pages/Auth.tsx";
import Submissions from "./pages/admin/Submissions.tsx";
import Analytics from "./pages/admin/Analytics.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<CaseStudy />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<Article />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin/submissions" element={<Submissions />} />
            <Route path="/admin/analytics" element={<Analytics />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
