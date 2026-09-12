import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { TrophiesView } from './components/TrophiesView';
import { GameDetailPage } from './components/GameDetailPage';
import { LeaderboardView } from './components/LeaderboardView';
import { VerificationView } from './components/VerificationView';
import { NotFoundView } from './components/NotFoundView';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { auth, onAuthStateChanged, logOut, User } from './lib/firebase';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogOut = async () => {
    await logOut();
  };

  return (
    <div className="min-h-screen bg-[#0c0d12] text-gray-100 flex flex-col font-['Tajawal',sans-serif]">
      <ScrollToTop />
      
      {/* Navbar with 3-lines menu icon, Navigation & Auth */}
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogOut={handleLogOut}
      />

      {/* Slide-out Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogOut={handleLogOut}
      />

      {/* Main Content Area with Dynamic Routes */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 pt-8">
        <Routes>
          {/* Home view */}
          <Route 
            path="/" 
            element={
              <HomeView 
                currentUser={currentUser}
                onOpenAuth={() => setIsAuthModalOpen(true)}
              />
            } 
          />

          {/* Games list view */}
          <Route path="/games" element={<TrophiesView />} />

          {/* Dynamic Route for Game Details */}
          <Route path="/games/:slug" element={<GameDetailPage />} />

          {/* Backward compatibility for /trophies */}
          <Route path="/trophies" element={<Navigate to="/games" replace />} />

          {/* Leaderboard view */}
          <Route path="/leaderboard" element={<LeaderboardView />} />

          {/* Verification view */}
          <Route path="/verify" element={<VerificationView />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFoundView />} />
        </Routes>
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
      <Footer />

    </div>
  );
}
