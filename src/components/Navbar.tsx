import { useState, useEffect } from 'react';
import { Menu, X, Globe, Phone, MessageCircle, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations } from '../lib/translations';
import { cn } from '../lib/utils';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const location = useLocation();
  const t = translations[lang].nav;
  const isRtl = lang === 'ar';

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.home, href: '/' },
    { name: t.services, href: '/#services' },
    { name: t.equipment, href: '/#equipment' },
    { name: translations[lang].expert.title.split(' - ')[0], href: '/#expert' },
    { name: t.testimonials, href: '/#testimonials' },
    { name: t.about, href: '/#about' },
    { name: t.contact, href: '/#contact' },
    { name: t.tips, href: '/tips', isRoute: true },
    ...(user ? [{ name: translations[lang].nav.my_bookings, href: '/my-bookings', isRoute: true }] : []),
  ];

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleLang = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-neutral-950/90 backdrop-blur-md py-3 shadow-lg border-b border-gold/20' : 'bg-transparent py-5'
      )}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <RouterLink to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-neutral-900 border border-gold/30 rounded-lg flex items-center justify-center shadow-lg shadow-gold/10 group-hover:border-gold transition-all overflow-hidden">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
              <path d="M9 23V9H12.5L19.5 19.5V9H23V23H19.5L12.5 12.5V23H9Z" fill="#FFFFFF"/>
              <path d="M22 6L23.5 9L26.5 10.5L23.5 12L22 15L20.5 12L17.5 10.5L20.5 9L22 6Z" fill="#D4AF37"/>
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block group-hover:text-gold transition-colors">
            {lang === 'ar' ? 'نور الماسي' : 'Noor Al-Masi'}
          </span>
        </RouterLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.isRoute ? (
              <RouterLink
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-neutral-300 hover:text-gold transition-colors"
              >
                {link.name}
              </RouterLink>
            ) : (
              <HashLink
                smooth
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-neutral-300 hover:text-gold transition-colors"
              >
                {link.name}
              </HashLink>
            )
          ))}
          <RouterLink
            to="/admin"
            className="text-sm font-medium text-neutral-400 hover:text-gold transition-colors"
          >
            {t.admin}
          </RouterLink>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 text-sm font-medium text-neutral-300 hover:text-gold transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
          </button>

          {user ? (
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center border border-neutral-700 overflow-hidden">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-4 h-4 text-gold" />
                  )}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-neutral-400 hover:text-red-500 transition-colors"
                title={isRtl ? 'تسجيل الخروج' : 'Logout'}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-gold transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>{isRtl ? 'دخول' : 'Login'}</span>
            </button>
          )}
          
          <HashLink
            smooth
            to="/#booking"
            className="hidden sm:flex items-center gap-2 bg-gold hover:bg-gold-dark text-neutral-950 px-5 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 active:scale-95"
          >
            {t.book}
          </HashLink>

          <button
            className="md:hidden text-neutral-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-neutral-900 border-b border-gold/10 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <RouterLink
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-neutral-300 hover:text-gold py-2"
                  >
                    {link.name}
                  </RouterLink>
                ) : (
                  <HashLink
                    smooth
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-neutral-300 hover:text-gold py-2"
                  >
                    {link.name}
                  </HashLink>
                )
              ))}
              <RouterLink
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-neutral-400 hover:text-gold py-2"
              >
                {t.admin}
              </RouterLink>

              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 text-lg font-medium text-red-500 py-2"
                >
                  <LogOut className="w-5 h-5" />
                  {isRtl ? 'تسجيل الخروج' : 'Logout'}
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleLogin();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 text-lg font-medium text-gold py-2"
                >
                  <LogIn className="w-5 h-5" />
                  {isRtl ? 'تسجيل الدخول' : 'Login'}
                </button>
              )}

              <HashLink
                smooth
                to="/#booking"
                onClick={() => setIsOpen(false)}
                className="bg-gold text-neutral-950 px-6 py-3 rounded-xl text-center font-bold mt-2"
              >
                {t.book}
              </HashLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
