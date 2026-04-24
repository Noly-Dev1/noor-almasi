import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations } from '../lib/translations';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { Calendar, Clock, Car, Settings as SettingsIcon, CheckCircle2, XCircle, Loader2, AlertCircle } from 'lucide-react';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

interface UserBookingsProps {
  lang: Language;
}

interface Booking {
  id: string;
  name: string;
  phone: string;
  service: string;
  carType: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export default function UserBookings({ lang }: UserBookingsProps) {
  const t = translations[lang].user_bookings;
  const isRtl = lang === 'ar';
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        setLoading(false);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Booking[];
      setBookings(bookingsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'bookings');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'completed': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'cancelled': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return t.status_confirmed;
      case 'completed': return t.status_completed;
      case 'cancelled': return t.status_cancelled;
      default: return t.status_pending;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-gold animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950 pt-32 pb-24 flex items-center justify-center px-4" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-neutral-800">
            <AlertCircle className="w-10 h-10 text-gold" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">{t.login_required}</h2>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-neutral-950 px-8 py-3 rounded-xl font-bold transition-all"
          >
            {isRtl ? 'العودة للرئيسية' : 'Back to Home'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950/50 pt-32 pb-24" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">{t.title}</h1>
              <div className="w-16 h-1 bg-gold rounded-full" />
            </div>
            <HashLink
              smooth
              to="/#booking"
              className="hidden sm:flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-gold border border-gold/20 px-6 py-3 rounded-xl font-bold transition-all"
            >
              <Calendar className="w-5 h-5" />
              {isRtl ? 'حجز جديد' : 'New Booking'}
            </HashLink>
          </div>

          {bookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-900 border border-neutral-800 rounded-[2.5rem] p-12 text-center"
            >
              <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-neutral-600" />
              </div>
              <p className="text-xl text-neutral-400 mb-8">{t.no_bookings}</p>
              <HashLink
                smooth
                to="/#booking"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-neutral-950 px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105"
              >
                {t.book_now}
              </HashLink>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-neutral-900 border border-neutral-800 rounded-[2rem] p-6 md:p-8 hover:border-gold/20 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-wrap gap-6 items-center">
                      <div className="w-16 h-16 bg-neutral-800 rounded-2xl flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                        <SettingsIcon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{booking.service}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-neutral-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gold" />
                            {booking.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gold" />
                            {booking.time}
                          </div>
                          {booking.carType && (
                            <div className="flex items-center gap-2">
                              <Car className="w-4 h-4 text-gold" />
                              {booking.carType}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end gap-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                      {booking.status === 'confirmed' && (
                        <div className="w-10 h-10 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                      )}
                      {booking.status === 'cancelled' && (
                        <div className="w-10 h-10 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center">
                          <XCircle className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
