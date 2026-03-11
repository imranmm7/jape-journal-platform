import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AimsScope from "./pages/AimsScope";
import EditorialBoard from "./pages/EditorialBoard";
import OpenAccess from "./pages/OpenAccess";
import PeerReview from "./pages/PeerReview";
import SubmitManuscript from "./pages/SubmitManuscript";
import Policies from "./pages/Policies";
import AuthorGuidelines from "./pages/AuthorGuidelines";
import CurrentIssue from "./pages/CurrentIssue";
import Archives from "./pages/Archives";
import PublicationEthics from "./pages/PublicationEthics";
import CopyrightPage from "./pages/Copyright";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ManuscriptDetail from "./pages/ManuscriptDetail";
import ReviewPage from "./pages/ReviewPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/aims-scope" element={<AimsScope />} />
            <Route path="/editorial-board" element={<EditorialBoard />} />
            <Route path="/open-access" element={<OpenAccess />} />
            <Route path="/peer-review" element={<PeerReview />} />
            <Route path="/submit" element={<SubmitManuscript />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/author-guidelines" element={<AuthorGuidelines />} />
            <Route path="/current-issue" element={<CurrentIssue />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/ethics" element={<PublicationEthics />} />
            <Route path="/copyright" element={<CopyrightPage />} />
            <Route path="/in-press" element={<CurrentIssue />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/manuscript/:id" element={<ManuscriptDetail />} />
            <Route path="/review/:id" element={<ReviewPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
