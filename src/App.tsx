import React, { useEffect } from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { Navbar } from './components/Navbar';
import { AnimatedBackground } from './components/AnimatedBackground';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { JourneySection } from './components/JourneySection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AwardsSection } from './components/AwardsSection';
import { EducationSection } from './components/EducationSection';
import { CtaSection } from './components/CtaSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { CMSAdminDrawer } from './components/cms/CMSAdminDrawer';

const PortfolioContent: React.FC = () => {
  const { openAdmin } = useCMS();

  // Listen for /admin or #admin in URL to open Admin Gateway
  useEffect(() => {
    const handleAdminRoute = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || hash === '#admin') {
        openAdmin();
      }
    };

    handleAdminRoute();
    window.addEventListener('popstate', handleAdminRoute);
    window.addEventListener('hashchange', handleAdminRoute);
    return () => {
      window.removeEventListener('popstate', handleAdminRoute);
      window.removeEventListener('hashchange', handleAdminRoute);
    };
  }, [openAdmin]);

  return (
    <div className="min-h-screen w-full max-w-full bg-[#FAF7F2] text-stone-800 flex flex-col antialiased selection:bg-amber-500/25 selection:text-amber-900 font-sans overflow-x-hidden">
      {/* Interactive Animated Ambient & Particle Canvas Layer */}
      <AnimatedBackground />

      <Navbar />
      <main className="relative z-10 flex-1">
        <HeroSection />
        <AboutSection />
        <JourneySection />
        <SkillsSection />
        <ProjectsSection />
        <AwardsSection />
        <EducationSection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
      <ProjectModal />
      <ResumeModal />
      <AdminAuthModal />
      <CMSAdminDrawer />
    </div>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Portfolio caught render error:', error, info);
  }

  handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) { }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E7E2D6] shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto text-xl font-bold">
              !
            </div>
            <h2 className="text-xl font-bold text-stone-900">Restoring Portfolio State</h2>
            <p className="text-xs text-stone-500">
              A previous local browser cache needs to be refreshed.
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold text-sm shadow-md shadow-amber-600/20 hover:from-amber-500 hover:to-orange-500 cursor-pointer"
            >
              Refresh Portfolio
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <CMSProvider>
        <PortfolioContent />
      </CMSProvider>
    </ErrorBoundary>
  );
}
