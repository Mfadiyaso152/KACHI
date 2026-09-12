import { useState, useEffect } from 'react';
import { ViewType } from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { TrophiesView } from './components/TrophiesView';
import { LeaderboardView } from './components/LeaderboardView';
import { VerificationView } from './components/VerificationView';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { auth, onAuthStateChanged, logOut, User } from './lib/firebase';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogOut = async () => {
    await logOut();
  };

  return (
    <div className="min-h-screen bg-[#0c0d12] text-gray-100 flex flex-col font-['Tajawal',sans-serif]">
      
      {/* Navbar with 3-lines menu icon, Navigation & Auth */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onToggleSidebar={() => setIsSidebarOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogOut={handleLogOut}
      />

      {/* Slide-out Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentView={currentView}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogOut={handleLogOut}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 pt-8">
        {currentView === 'home' && (
          <HomeView 
            onNavigate={handleNavigate} 
            currentUser={currentUser}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}
        {currentView === 'trophies' && <TrophiesView />}
        {currentView === 'leaderboard' && <LeaderboardView onNavigate={handleNavigate} />}
        {currentView === 'verify' && <VerificationView />}
      </main>

      {/* Authentication Modal (Google / Microsoft via Firebase) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
        }}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
