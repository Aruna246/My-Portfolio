import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import {
  Settings,
  Menu,
  X,
  LogOut,
  Home,
  User,
  Compass,
  Code2,
  FolderGit2,
  Award,
  GraduationCap,
  Mail,
  FileText,
  Send,
  LucideIcon
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'journey', label: 'Journey', icon: Compass },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'awards', label: 'Awards', icon: Award },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export const Navbar: React.FC = () => {
  const { data, openAdmin, isAdminAuthenticated, logoutAdmin, setIsResumeModalOpen } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // 1. Scrolled state for background styling
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Active section tracking based on viewport scroll position
      const scrollPosition = window.scrollY + 200;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const sectionId = NAV_ITEMS[i].id;
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open & close on resize
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs border-b border-[#E7E2D6] py-2.5 sm:py-3'
            : 'bg-transparent py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Avatar & Name */}
          <button
            id="nav-brand-button"
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2.5 sm:gap-3 group text-left cursor-pointer focus:outline-none min-w-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-amber-600/25 group-hover:scale-105 transition-all duration-300 shrink-0">
              {data?.profile?.initials || 'IA'}
            </div>
            <div className="min-w-0">
              <span className="font-bold text-stone-900 text-sm sm:text-base lg:text-lg tracking-wider uppercase block truncate group-hover:text-amber-700 transition-colors">
                {data?.profile?.name || 'Indhu Aruna S'}
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm font-semibold">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer font-semibold ${
                    isActive
                      ? 'text-amber-800 bg-amber-100/70 border border-amber-300/60 font-bold shadow-2xs'
                      : 'text-stone-600 hover:text-amber-700 hover:bg-stone-200/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin Settings & Logout - ONLY visible when admin is authenticated */}
            {isAdminAuthenticated && (
              <>
                <button
                  id="admin-settings-button"
                  onClick={openAdmin}
                  className="p-2 sm:p-2.5 rounded-xl border transition-all duration-200 cursor-pointer text-amber-800 bg-amber-100 border-amber-300 hover:bg-amber-200/60 shadow-xs"
                  title="Admin Console (Active)"
                  aria-label="Admin Console"
                >
                  <Settings className="w-4 h-4 animate-spin-slow text-amber-700" />
                </button>

                <button
                  onClick={logoutAdmin}
                  className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors cursor-pointer"
                  title="Log out from Admin session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </>
            )}

            {/* Desktop Resume Quick Button */}
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="hidden sm:inline-flex lg:hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-300/80 transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-amber-700" />
              <span>Resume</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                mobileMenuOpen
                  ? 'bg-amber-100 border border-amber-300 text-amber-800 shadow-inner'
                  : 'bg-white/90 border border-stone-200 text-stone-700 hover:bg-amber-50 hover:text-amber-800 shadow-2xs'
              }`}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Sheet */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#FAF7F2]/98 backdrop-blur-2xl border-b border-[#E7E2D6] shadow-2xl rounded-b-3xl px-4 pt-3 pb-5 space-y-4 animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-80px)] overflow-y-auto">
            {/* Quick Title & Status */}
            <div className="flex items-center justify-between px-1 text-xs font-semibold text-stone-500 uppercase tracking-wider">
              <span>Navigation Menu</span>
              <span className="flex items-center gap-1 text-emerald-600 lowercase font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                online
              </span>
            </div>

            {/* 2-Column Grid of Navigation Items */}
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={`mobile-${item.id}`}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-amber-600/25 font-bold'
                        : 'bg-white/80 hover:bg-amber-50/80 text-stone-700 hover:text-amber-900 border border-[#E7E2D6]'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-white/20 text-white' : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Action Buttons: Resume & Get In Touch */}
            <div className="pt-2 border-t border-[#E7E2D6] grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsResumeModalOpen(true);
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 border border-amber-300 font-bold text-xs sm:text-sm cursor-pointer transition-colors"
              >
                <FileText className="w-4 h-4 text-amber-700" />
                <span>View Resume</span>
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm cursor-pointer transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Admin Controls in Mobile Menu when Authenticated */}
            {isAdminAuthenticated && (
              <div className="pt-2 border-t border-[#E7E2D6] flex items-center gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAdmin();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-100 hover:bg-amber-200/80 text-amber-900 font-bold text-xs border border-amber-300 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-amber-700" />
                  <span>Admin Drawer</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logoutAdmin();
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs border border-red-200 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-stone-950/35 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};
