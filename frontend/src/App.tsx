import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PollProvider } from "@/contexts/PollContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import Navigation from "@/components/Navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import Home from "./pages/Home";
import Teacher from "./pages/Teacher";
import Student from "./pages/Student";
import KickedOut from "./pages/KickedOut";
import About from "./pages/About";
import Features from "./pages/Features";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PollProvider>
            <div className="min-h-screen bg-poll-accent">
              <Navigation />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/teacher" element={<Teacher />} />
                <Route path="/student" element={<Student />} />
                <Route path="/kicked-out" element={<KickedOut />} />
                <Route path="/about" element={<About />} />
                <Route path="/features" element={<Features />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </PollProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
