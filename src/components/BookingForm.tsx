import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations } from '../lib/translations';
import { Calendar, Clock, User, Phone, Car, CheckCircle2, Send, Settings as SettingsIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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

interface BookingFormProps {
  lang: Language;
}

export default function BookingForm({ lang }: BookingFormProps) {
  const t = translations[lang].booking;
  const isRtl = lang === 'ar';
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [dateError, setDateError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    carType: '',
    date: '',
    time: '',
  });

  const [timeSelection, setTimeSelection] = useState({
    hour: '09',
    minute: '00',
    period: 'AM'
  });

  const services = [
    translations[lang].services.computer_check,
    translations[lang].services.programming,
    translations[lang].services.electrical,
    translations[lang].services.diagnostics,
    translations[lang].services.towing,
  ];

  const validatePhone = (phone: string) => {
    if (phone.length === 0) return '';
    if (!/^\d+$/.test(phone)) {
      return isRtl ? 'يجب أن يحتوي الرقم على أرقام فقط' : 'Phone must contain only digits';
    }
    if (!phone.startsWith('05')) {
      return isRtl ? 'يجب أن يبدأ الرقم بـ 05' : 'Number must start with 05';
    }
    if (phone.length < 10) {
      return isRtl ? 'يجب أن يتكون الرقم من 10 أرقام على الأقل' : 'Number must be at least 10 digits';
    }
    if (phone.length > 10) {
      return isRtl ? 'يجب ألا يتجاوز الرقم 10 أرقام' : 'Number must not exceed 10 digits';
    }
    return '';
  };

  const validateDate = (date: string) => {
    if (!date) return '';
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return isRtl ? 'لا يمكن اختيار تاريخ في الماضي' : 'Date cannot be in the past';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const pError = validatePhone(formData.phone);
    const dError = validateDate(formData.date);
    
    if (pError || dError) {
      setPhoneError(pError);
      setDateError(dError);
      return;
    }

    setPhoneError('');
    setDateError('');
    setLoading(true);
    const finalTime = `${timeSelection.hour}:${timeSelection.minute} ${timeSelection.period}`;
    
    try {
      // Save to Firestore
      const bookingsRef = collection(db, 'bookings');
      await addDoc(bookingsRef, {
        ...formData,
        time: finalTime,
        status: 'pending',
        userId: auth.currentUser?.uid || null,
        createdAt: serverTimestamp(),
      });

      // WhatsApp Integration
      const whatsappNumber = '966530012363';
      const message = isRtl 
        ? `حجز جديد من مركز نور الماسي:\nالاسم: ${formData.name}\nالجوال: ${formData.phone}\nالخدمة: ${formData.service}\nالسيارة: ${formData.carType || 'غير محدد'}\nالتاريخ: ${formData.date}\nالوقت: ${finalTime}`
        : `New Booking from Noor Al-Masi Center:\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}\nCar: ${formData.carType || 'Not Specified'}\nDate: ${formData.date}\nTime: ${finalTime}`;
      
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      setIsSubmitted(true);
      setFormData({ name: '', phone: '', service: '', carType: '', date: '', time: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'bookings');
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section id="booking" className="py-24 bg-transparent relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-neutral-900 border border-neutral-800 rounded-[3rem] overflow-hidden shadow-2xl shadow-gold/5">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Form Side */}
            <div className="p-8 md:p-12">
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{t.title}</h2>
                <div className="w-16 h-1 bg-gold rounded-full" />
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{t.success}</h3>
                  <p className="text-neutral-400">
                    {isRtl 
                      ? 'تم إرسال تفاصيل حجزك عبر واتساب وحفظها في نظامنا. سنتصل بك لتأكيد الموعد.' 
                      : 'Your booking details have been sent via WhatsApp and saved in our system. We will call you to confirm the appointment.'}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-neutral-400 flex items-center gap-2 px-1">
                        <User className="w-4 h-4 text-gold" /> {t.name}
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-neutral-800/50 border border-neutral-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all placeholder:text-neutral-600"
                        placeholder={isRtl ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-neutral-400 flex items-center gap-2 px-1">
                        <Phone className="w-4 h-4 text-gold" /> {t.phone}
                      </label>
                      <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500 font-bold pointer-events-none group-focus-within:text-gold transition-colors">
                          {isRtl ? '' : ''}
                        </div>
                        <input
                          required
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          value={formData.phone}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setFormData({ ...formData, phone: value });
                            setPhoneError(validatePhone(value));
                          }}
                          className={cn(
                            "w-full bg-neutral-800/40 border rounded-2xl px-5 py-4 text-white focus:outline-none transition-all placeholder:text-neutral-700 font-medium",
                            phoneError ? "border-red-500/50 focus:border-red-500 ring-1 ring-red-500/10" : "border-neutral-700/50 focus:border-gold focus:ring-2 focus:ring-gold/10"
                          )}
                          placeholder="05XXXXXXXX"
                        />
                        <AnimatePresence>
                          {phoneError && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-500 text-xs mt-1.5 absolute -bottom-5 left-1 font-medium"
                            >
                              {phoneError}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-neutral-400 flex items-center gap-2 px-1">
                        <SettingsIcon className="w-4 h-4 text-gold" /> {t.service}
                      </label>
                      <div className="relative group">
                        <select
                          required
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full bg-neutral-800/40 border border-neutral-700/50 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all appearance-none cursor-pointer font-medium"
                        >
                          <option value="" className="bg-neutral-900">{t.select_service}</option>
                          {services.map((s) => (
                            <option key={s} value={s} className="bg-neutral-900">{s}</option>
                          ))}
                        </select>
                        <div className={cn("absolute top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 group-focus-within:text-gold transition-colors", isRtl ? "left-5" : "right-5")}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-neutral-400 flex items-center gap-2 px-1">
                        <Car className="w-4 h-4 text-gold" /> {t.car_type}
                      </label>
                      <input
                        type="text"
                        value={formData.carType}
                        onChange={(e) => setFormData({ ...formData, carType: e.target.value })}
                        className="w-full bg-neutral-800/40 border border-neutral-700/50 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all placeholder:text-neutral-700 font-medium"
                        placeholder={isRtl ? 'مثال: تويوتا كامري' : 'e.g. Toyota Camry'}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-neutral-400 flex items-center gap-2 px-1">
                        <Calendar className="w-4 h-4 text-gold" /> {t.date}
                      </label>
                      <input
                        required
                        type="date"
                        min={new Date().toLocaleDateString('en-CA')}
                        value={formData.date}
                        onChange={(e) => {
                          setFormData({ ...formData, date: e.target.value });
                          setDateError(validateDate(e.target.value));
                        }}
                        className={cn(
                          "w-full bg-neutral-800/40 border rounded-2xl px-5 py-4 text-white focus:outline-none transition-all cursor-pointer font-medium",
                          dateError ? "border-red-500/50 focus:border-red-500 ring-1 ring-red-500/10" : "border-neutral-700/50 focus:border-gold focus:ring-2 focus:ring-gold/10"
                        )}
                      />
                      <AnimatePresence>
                        {dateError && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-500 text-xs mt-1.5 absolute -bottom-5 left-1 font-medium"
                          >
                            {dateError}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-neutral-400 flex items-center gap-2 px-1">
                        <Clock className="w-4 h-4 text-gold" /> {t.time}
                      </label>
                      <div className="flex gap-3">
                        <div className="flex-1 relative group">
                          <select
                            value={timeSelection.hour}
                            onChange={(e) => setTimeSelection({ ...timeSelection, hour: e.target.value })}
                            className="w-full bg-neutral-800/40 border border-neutral-700/50 rounded-2xl px-2 py-4 text-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all appearance-none text-center font-bold text-lg cursor-pointer"
                          >
                            {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(h => (
                              <option key={h} value={h} className="bg-neutral-900">{h}</option>
                            ))}
                          </select>
                        </div>
                        <span className="flex items-center text-gold font-bold text-xl">:</span>
                        <div className="flex-1 relative group">
                          <select
                            value={timeSelection.minute}
                            onChange={(e) => setTimeSelection({ ...timeSelection, minute: e.target.value })}
                            className="w-full bg-neutral-800/40 border border-neutral-700/50 rounded-2xl px-2 py-4 text-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all appearance-none text-center font-bold text-lg cursor-pointer"
                          >
                            {['00', '15', '30', '45'].map(m => (
                              <option key={m} value={m} className="bg-neutral-900">{m}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex-1 relative group">
                          <select
                            value={timeSelection.period}
                            onChange={(e) => setTimeSelection({ ...timeSelection, period: e.target.value })}
                            className="w-full bg-neutral-800/40 border border-neutral-700/50 rounded-2xl px-2 py-4 text-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all appearance-none text-center font-bold text-lg cursor-pointer"
                          >
                            <option value="AM" className="bg-neutral-900">{isRtl ? 'صباحاً' : 'AM'}</option>
                            <option value="PM" className="bg-neutral-900">{isRtl ? 'مساءً' : 'PM'}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gold hover:bg-gold-dark text-neutral-950 font-bold py-5 rounded-2xl shadow-xl shadow-gold/20 flex items-center justify-center gap-3 transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {t.submit}
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>

            {/* Info Side */}
            <div className="bg-neutral-800/50 p-8 md:p-12 flex flex-col justify-center border-l border-neutral-800">
              <div className="space-y-10">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {isRtl ? 'لماذا تختارنا؟' : 'Why Choose Us?'}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    {isRtl 
                      ? 'نحن نستخدم أحدث التقنيات العالمية في فحص وبرمجة السيارات لضمان دقة النتائج وسلامة مركبتك.' 
                      : 'We use the latest global technologies in car inspection and programming to ensure accurate results and vehicle safety.'}
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    { title: isRtl ? 'فحص شامل ودقيق' : 'Comprehensive Inspection', icon: CheckCircle2 },
                    { title: isRtl ? 'فنيين متخصصين' : 'Specialized Technicians', icon: CheckCircle2 },
                    { title: isRtl ? 'أسعار تنافسية' : 'Competitive Pricing', icon: CheckCircle2 },
                    { title: isRtl ? 'خدمة سريعة' : 'Fast Service', icon: CheckCircle2 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-6 h-6 bg-gold/10 text-gold rounded-full flex items-center justify-center">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="text-neutral-300 font-medium">{item.title}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-neutral-700">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neutral-700 rounded-2xl flex items-center justify-center text-gold">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500 font-medium">{isRtl ? 'للحالات الطارئة' : 'Emergency Contact'}</div>
                      <div className="text-xl font-bold text-white tracking-wider">0551933926</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Settings(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
