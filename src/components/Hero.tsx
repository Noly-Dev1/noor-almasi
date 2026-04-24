import { motion } from 'motion/react';
import { Language, translations } from '../lib/translations';
import { ArrowRight, Calendar, Phone, Truck } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const t = translations[lang].hero;
  const isRtl = lang === 'ar';
  const MotionHashLink = motion(HashLink);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-transparent"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1562426509-5044a121aa49?q=80&w=2070&auto=format&fit=crop"
          alt="Car in Garage"
          className="w-full h-full object-cover opacity-20 scale-105 animate-slow-zoom"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-neutral-950/20" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-gold uppercase bg-gold/10 border border-gold/20 rounded-full"
          >
            {isRtl ? 'التميز في صيانة السيارات' : 'Excellence in Car Maintenance'}
          </motion.span>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight">
            {t.title}
          </h1>

          <p className="text-base md:text-xl text-neutral-400 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
            <br />
            <span className="text-gold font-bold">{isRtl ? 'بإشراف المهندس زياد' : 'Under the supervision of Engineer Ziad'}</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <MotionHashLink
              smooth
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              to="#booking"
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gold hover:bg-gold-dark text-neutral-950 rounded-2xl font-bold text-base md:text-lg shadow-xl shadow-gold/20 flex items-center justify-center gap-3 transition-all"
            >
              <Calendar className="w-5 h-5" />
              {t.cta_book}
            </MotionHashLink>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:0551933926"
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 rounded-2xl font-bold text-base md:text-lg flex items-center justify-center gap-3 transition-all"
            >
              <Phone className="w-5 h-5" />
              {t.cta_contact}
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:0551933926"
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-base md:text-lg shadow-xl shadow-red-600/20 flex items-center justify-center gap-3 transition-all"
            >
              <Truck className="w-5 h-5" />
              {isRtl ? 'طلب سطحة' : 'Request Towing'}
            </motion.a>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto border-t border-neutral-900 pt-8 md:pt-12"
        >
          {[
            { label: isRtl ? 'عميل سعيد' : 'Happy Clients', value: '5000+' },
            { label: isRtl ? 'سنوات خبرة' : 'Years Experience', value: '30+' },
            { label: isRtl ? 'أجهزة فحص' : 'Diagnostic Tools', value: '25+' },
            { label: isRtl ? 'خدمة صيانة' : 'Services', value: '15+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gold mb-1 md:mb-2">{stat.value}</div>
              <div className="text-[10px] md:text-sm text-neutral-500 font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
