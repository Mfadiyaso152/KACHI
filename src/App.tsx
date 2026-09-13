import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { TrophiesView } from './components/TrophiesView';
import { GameDetailPage } from './components/GameDetailPage';
import { LeaderboardView } from './components/LeaderboardView';
import { VerificationView } from './components/VerificationView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { TermsView } from './components/TermsView';
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
  const location = useLocation();
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

      {/* Main Content Area with Page Route Transitions */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <Routes location={location}>
              {/* Home view */}
              <Route path="/" element={<HomeView />} />

              {/* Trophies list view */}
              <Route path="/games" element={<TrophiesView />} />

              {/* Dynamic Route for Game Details */}
              <Route path="/games/:slug" element={<GameDetailPage />} />

              {/* Backward compatibility for /trophies */}
              <Route path="/trophies" element={<Navigate to="/games" replace />} />

              {/* Leaderboard view */}
              <Route path="/leaderboard" element={<LeaderboardView />} />

              {/* Verification view */}
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

              {/* Admin Dashboard view */}
              <Route 
                path="/admin" 
                element={
                  <AdminDashboardView currentUserEmail={currentUser?.email} />
                } 
              />

              {/* Dedicated Full Terms of Use Page */}
              <Route path="/terms" element={<TermsView />} />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFoundView />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
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
