import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { TrophiesView } from './components/TrophiesView';
import { GameDetailPage } from './components/GameDetailPage';
import { LeaderboardView } from './components/LeaderboardView';
import { VerificationView } from './components/VerificationView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { NotFoundView } from './components/NotFoundView';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { auth, onAuthStateChanged, logOut, User } from './lib/firebase';
import { 
  ADMIN_EMAIL, 
  syncCurrentUserRecord, 
  isUserVerified, 
  isUserBanned 
} from './lib/adminStore';

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
  const [userVerified, setUserVerified] = useState(false);
  const [userBanned, setUserBanned] = useState(false);

  // Sync user state with admin store & checks
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        syncCurrentUserRecord({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        });
        setUserVerified(isUserVerified(user.email));
        setUserBanned(isUserBanned(user.email));
      } else {
        setUserVerified(false);
        setUserBanned(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogOut = async () => {
    await logOut();
    setUserVerified(false);
    setUserBanned(false);
  };

  const isCurrentAdmin = currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  return (
    <div className="min-h-screen bg-[#0c0d12] text-gray-100 flex flex-col font-['Tajawal',sans-serif]">
      <ScrollToTop />
      
      {/* Navbar with 3-lines menu icon on right, Navigation & Auth */}
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogOut={handleLogOut}
        isUserVerified={userVerified || isCurrentAdmin}
      />

      {/* Slide-out Sidebar opening from the right */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogOut={handleLogOut}
        isUserVerified={userVerified || isCurrentAdmin}
      />

      {/* Main Content Area - Fully open without forced login gating */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 pt-8">
        <Routes>
          {/* Home view - Fully open */}
          <Route path="/" element={<HomeView />} />

          {/* Trophies list view - Fully open */}
          <Route path="/games" element={<TrophiesView />} />

          {/* Dynamic Route for Game Details - Fully open */}
          <Route path="/games/:slug" element={<GameDetailPage />} />

          {/* Backward compatibility for /trophies */}
          <Route path="/trophies" element={<Navigate to="/games" replace />} />

          {/* Leaderboard view - Fully open to view */}
          <Route path="/leaderboard" element={<LeaderboardView />} />

          {/* Verification view - Open to view, clicking verify triggers login if guest */}
          <Route 
            path="/verify" 
            element={
              <VerificationView 
                currentUser={currentUser}
                onOpenAuth={() => setIsAuthModalOpen(true)}
                isVerified={userVerified || isCurrentAdmin}
              />
            } 
          />

          {/* Admin Dashboard view - Disabled / experimental state */}
          <Route 
            path="/admin" 
            element={
              <AdminDashboardView currentUserEmail={currentUser?.email} />
            } 
          />

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
          syncCurrentUserRecord({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          });
          setUserVerified(isUserVerified(user.email));
          setUserBanned(isUserBanned(user.email));
        }}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
