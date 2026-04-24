import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Language } from './lib/translations';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Equipment from './components/Equipment';
import BookingForm from './components/BookingForm';
import { AboutUs, Contact, Footer } from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import MaintenanceTips from './components/MaintenanceTips';
import Testimonials from './components/Testimonials';
import UserBookings from './components/UserBookings';
import Expertise from './components/Expertise';
import Support from './components/Support';
import Privacy from './components/Privacy';
import { AnimatePresence, motion } from 'motion/react';
import { db } from './firebase';
import { collection, getDocs, limit, query, getDocFromServer, doc } from 'firebase/firestore';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage({ lang }: { lang: Language }) {
  return (
    <>
      <Hero lang={lang} />
      <Services lang={lang} />
      <Equipment lang={lang} />
      <Expertise lang={lang} />
      <Testimonials lang={lang} />
      <AboutUs lang={lang} />
      <BookingForm lang={lang} />
      <Contact lang={lang} />
    </>
  );
}

function AppContent({ lang, setLang }: { lang: Language; setLang: (lang: Language) => void }) {
  const location = useLocation();
  
  return (
    <div className="min-h-screen font-sans selection:bg-gold selection:text-neutral-950 relative">
      {/* Global Background Image */}
      <div className="fixed inset-0 z-[-1]">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
          alt="Car Background"
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-neutral-950/80" />
      </div>

      <Navbar lang={lang} setLang={setLang} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage lang={lang} />} />
            <Route path="/admin" element={<AdminDashboard lang={lang} />} />
            <Route path="/tips" element={<MaintenanceTips lang={lang} />} />
            <Route path="/my-bookings" element={<UserBookings lang={lang} />} />
            <Route path="/support" element={<Support lang={lang} />} />
            <Route path="/privacy" element={<Privacy lang={lang} />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <Footer lang={lang} />
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>('ar');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Use getDocFromServer to force a network request and test connectivity
        await getDocFromServer(doc(db, '_connection_test_', 'ping'));
        console.log("Firebase connection successful");
      } catch (error) {
        console.error("Firebase connection test error:", error);
        if (error instanceof Error && (error.message.includes('the client is offline') || error.message.includes('unavailable'))) {
          console.error("Firebase connection failed: check your configuration or internet connection.");
        }
      }
    };
    testConnection();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AppContent lang={lang} setLang={setLang} />
    </Router>
  );
}
