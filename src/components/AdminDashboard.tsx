import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Language, translations } from '../lib/translations';
import { Calendar, Clock, User, Phone, Car, Trash2, CheckCircle, XCircle, ArrowLeft, LogIn, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { db, auth } from '../firebase';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

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

interface Booking {
  id: string;
  name: string;
  phone: string;
  service: string;
  carType: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface AdminDashboardProps {
  lang: Language;
}

export default function AdminDashboard({ lang }: AdminDashboardProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const t = translations[lang].admin;
  const isRtl = lang === 'ar';

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Booking[];
      setBookings(bookingsData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'bookings');
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error: ", error);
    }
  };

  const handleLogout = () => signOut(auth);

  const updateStatus = async (id: string, status: Booking['status']) => {
    try {
      const bookingRef = doc(db, 'bookings', id);
      await updateDoc(bookingRef, { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `bookings/${id}`);
    }
  };

  const deleteBooking = async (id: string) => {
    if (window.confirm(isRtl ? 'هل أنت متأكد من حذف هذا الحجز؟' : 'Are you sure you want to delete this booking?')) {
      try {
        await deleteDoc(doc(db, 'bookings', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `bookings/${id}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center py-24 px-4" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-[2.5rem] p-12 text-center">
          <div className="w-20 h-20 bg-gold/10 text-gold rounded-3xl flex items-center justify-center mx-auto mb-8">
            <LogIn className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">{isRtl ? 'تسجيل دخول الإدارة' : 'Admin Login'}</h1>
          <p className="text-neutral-400 mb-10">{isRtl ? 'يرجى تسجيل الدخول للوصول إلى لوحة التحكم.' : 'Please login to access the dashboard.'}</p>
          <button
            onClick={handleLogin}
            className="w-full bg-gold hover:bg-gold-dark text-neutral-950 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all"
          >
            <LogIn className="w-5 h-5" />
            {isRtl ? 'تسجيل الدخول باستخدام جوجل' : 'Login with Google'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950/50 py-24" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <Link to="/" className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center text-neutral-400 hover:text-gold hover:bg-neutral-800 transition-all">
              <ArrowLeft className={cn("w-5 h-5", isRtl && "rotate-180")} />
            </Link>
            <h1 className="text-3xl font-bold text-white tracking-tight">{t.title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-bold border border-gold/20">
              {bookings.length} {isRtl ? 'حجوزات إجمالية' : 'Total Bookings'}
            </div>
            <button
              onClick={handleLogout}
              className="w-10 h-10 bg-neutral-900 text-neutral-400 hover:text-red-500 rounded-full flex items-center justify-center transition-all"
              title={isRtl ? 'تسجيل الخروج' : 'Logout'}
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900 rounded-[2.5rem] border border-neutral-800">
            <Calendar className="w-16 h-16 text-neutral-700 mx-auto mb-6" />
            <p className="text-xl text-neutral-500">{t.no_bookings}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 hover:border-gold/20 transition-all"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center text-gold">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 font-medium uppercase tracking-wider mb-1">{isRtl ? 'العميل' : 'Customer'}</div>
                      <div className="text-lg font-bold text-white">{booking.name}</div>
                      <div className="text-sm text-neutral-400">{booking.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center text-gold">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 font-medium uppercase tracking-wider mb-1">{isRtl ? 'الموعد' : 'Appointment'}</div>
                      <div className="text-lg font-bold text-white">{booking.date}</div>
                      <div className="text-sm text-neutral-400">{booking.time}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center text-gold">
                      <Car className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500 font-medium uppercase tracking-wider mb-1">{isRtl ? 'الخدمة والسيارة' : 'Service & Car'}</div>
                      <div className="text-lg font-bold text-white">{booking.service}</div>
                      <div className="text-sm text-neutral-400">{booking.carType || (isRtl ? 'غير محدد' : 'Not Specified')}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto pt-6 md:pt-0 border-t md:border-t-0 border-neutral-800">
                  <div className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mr-auto md:mr-0",
                    booking.status === 'pending' && "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
                    booking.status === 'confirmed' && "bg-green-500/10 text-green-500 border border-green-500/20",
                    booking.status === 'cancelled' && "bg-red-500/10 text-red-500 border border-red-500/20"
                  )}>
                    {booking.status}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateStatus(booking.id, 'confirmed')}
                      className="w-10 h-10 bg-neutral-800 hover:bg-green-500/20 hover:text-green-500 rounded-xl flex items-center justify-center transition-all"
                      title={isRtl ? 'تأكيد' : 'Confirm'}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => updateStatus(booking.id, 'cancelled')}
                      className="w-10 h-10 bg-neutral-800 hover:bg-red-500/20 hover:text-red-500 rounded-xl flex items-center justify-center transition-all"
                      title={isRtl ? 'إلغاء' : 'Cancel'}
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteBooking(booking.id)}
                      className="w-10 h-10 bg-neutral-800 hover:bg-red-500 hover:text-white rounded-xl flex items-center justify-center transition-all"
                      title={isRtl ? 'حذف' : 'Delete'}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
