import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations } from '../lib/translations';
import { MapPin, Phone, MessageCircle, Mail, Instagram, Facebook, Twitter, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { siX, siTiktok } from 'simple-icons';
import { Link } from 'react-router-dom';

interface ContactProps {
  lang: Language;
}

export function AboutUs({ lang }: ContactProps) {
  const t = translations[lang].about;
  const isRtl = lang === 'ar';

  return (
    <section id="about" className="py-24 bg-transparent overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2rem] md:rounded-[3rem] overflow-hidden border-4 md:border-8 border-neutral-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=2070&auto=format&fit=crop"
                alt="Car on Lift"
                className="w-full h-[300px] md:h-[500px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gold/20 rounded-full blur-3xl -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-2 border-gold/20 rounded-[4rem] -z-10 scale-110" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold font-bold tracking-widest uppercase mb-4 block">
              {isRtl ? 'من نحن' : 'Who We Are'}
            </span>
            <h2 className="text-2xl md:text-5xl font-bold text-white mb-6 md:mb-8 leading-tight">
              {t.title}
            </h2>
            <p className="text-base md:text-lg text-neutral-400 mb-6 md:mb-8 leading-relaxed">
              {t.content}
            </p>
            
            <div className="grid grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-10">
              <div className="p-4 md:p-6 bg-neutral-800/50 rounded-2xl md:rounded-3xl border border-neutral-700/50 text-center md:text-right">
                <div className="text-2xl md:text-3xl font-bold text-gold mb-1 md:mb-2">30+</div>
                <div className="text-xs md:text-neutral-300 font-medium">{t.experience}</div>
              </div>
              <div className="p-4 md:p-6 bg-neutral-800/50 rounded-2xl md:rounded-3xl border border-neutral-700/50 text-center md:text-right">
                <div className="text-lg md:text-xl font-bold text-gold mb-1 md:mb-2">{isRtl ? 'المدينة' : 'Madinah'}</div>
                <div className="text-xs md:text-neutral-300 font-medium">{t.location}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Contact({ lang }: ContactProps) {
  const t = translations[lang].contact;
  const isRtl = lang === 'ar';

  return (
    <section id="contact" className="py-24 bg-transparent" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <h2 className="text-2xl md:text-4xl font-bold text-gold mb-4 md:mb-6">
            {isRtl ? 'موقع الورشة' : 'Workshop Location'}
          </h2>
          <div className="w-20 h-1 bg-gold/30 mx-auto rounded-full mb-6" />
          <p className="text-neutral-400">{isRtl ? 'نحن هنا لمساعدتك في أي وقت' : 'We are here to help you anytime'}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info - Hidden on mobile as requested */}
          <div className="hidden md:flex lg:col-span-1 flex-col space-y-6">
            <a 
              href="tel:0551933926"
              className="p-8 bg-neutral-900 rounded-[2rem] border border-neutral-800 flex items-center gap-6 hover:border-gold/50 transition-all group"
            >
              <div className="w-14 h-14 bg-gold/10 text-gold rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Phone className="w-7 h-7" />
              </div>
              <div>
                <div className="text-sm text-neutral-500 font-medium">{t.phone_label}</div>
                <div className="text-xl font-bold text-white tracking-wider">{t.phone}</div>
              </div>
            </a>

            <a 
              href={`https://wa.me/966${t.whatsapp.substring(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 bg-neutral-900 rounded-[2rem] border border-neutral-800 flex items-center gap-6 hover:border-green-500/50 transition-all group"
            >
              <div className="w-14 h-14 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div>
                <div className="text-sm text-neutral-500 font-medium">{t.whatsapp_label}</div>
                <div className="text-xl font-bold text-white tracking-wider">{t.whatsapp}</div>
              </div>
            </a>

            <div className="p-8 bg-neutral-900 rounded-[2rem] border border-neutral-800 flex items-center gap-6">
              <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center shrink-0">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <div className="text-sm text-neutral-500 font-medium">{t.address}</div>
                <div className="text-lg font-bold text-white">{t.location}</div>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="lg:col-span-2 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-neutral-800 h-[300px] md:h-[450px] relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.6214545454545!2d39.6160333!3d24.4672105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15bdbe5197d220d5%3A0x2e54514fea4b01c!2z2YXYsdmD2LIg2YbZiNixINin2YTZhNin2LPZiiAtIE5vb3IgQWwtTWFzaSBDZW50ZXI!5e0!3m2!1sar!2ssa!4v1712217600000!5m2!1sar!2ssa"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <a 
                href="https://maps.app.goo.gl/zVHvkCqmQjXtRrRd6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gold text-neutral-950 px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition-transform"
              >
                <ExternalLink className="w-4 h-4" />
                {isRtl ? 'فتح في خرائط جوجل' : 'Open in Google Maps'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({ lang }: ContactProps) {
  const isRtl = lang === 'ar';
  const t = translations[lang].nav;

  return (
    <footer className="bg-transparent border-t border-neutral-900 pt-20 pb-10" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-neutral-900 border border-gold/30 rounded-lg flex items-center justify-center shadow-lg shadow-gold/10 overflow-hidden">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                  <path d="M9 23V9H12.5L19.5 19.5V9H23V23H19.5L12.5 12.5V23H9Z" fill="#FFFFFF"/>
                  <path d="M22 6L23.5 9L26.5 10.5L23.5 12L22 15L20.5 12L17.5 10.5L20.5 9L22 6Z" fill="#D4AF37"/>
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                {isRtl ? 'نور الماسي' : 'Noor Al-Masi'}
              </span>
            </div>
            <p className="text-neutral-500 leading-relaxed">
              {isRtl 
                ? 'مركز متخصص في صيانة وبرمجة السيارات في المدينة المنورة بأحدث التقنيات.' 
                : 'Specialized center for car maintenance and programming in Madinah with the latest technologies.'}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center text-neutral-400 hover:text-gold hover:bg-neutral-800 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center text-neutral-400 hover:text-gold hover:bg-neutral-800 transition-all">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
                  <path d={siX.path}/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center text-neutral-400 hover:text-gold hover:bg-neutral-800 transition-all">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
                  <path d={siTiktok.path}/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center text-neutral-400 hover:text-gold hover:bg-neutral-800 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{isRtl ? 'خدماتنا' : 'Our Services'}</h4>
            <ul className="space-y-4">
              {[
                translations[lang].services.computer_check,
                translations[lang].services.programming,
                translations[lang].services.electrical,
                translations[lang].services.diagnostics,
              ].map((service, i) => (
                <li key={i} className="text-neutral-500">{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{isRtl ? 'ساعات العمل' : 'Working Hours'}</h4>
            <ul className="space-y-4 text-neutral-500">
              <li className="flex justify-between">
                <span>{isRtl ? 'السبت - الخميس' : 'Sat - Thu'}</span>
                <span className="text-gold">08:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>{isRtl ? 'الجمعة' : 'Friday'}</span>
                <span className="text-red-500 font-bold">{isRtl ? 'مغلق' : 'Closed'}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-6 text-neutral-600 text-sm">
          <p>© {new Date().getFullYear()} {isRtl ? 'مركز نور الماسي. جميع الحقوق محفوظة.' : 'Noor Al-Masi Center. All rights reserved.'}</p>
          <div className="flex items-center gap-8">
            <Link to="/support" className="hover:text-gold transition-colors">{translations[lang].nav.support}</Link>
            <Link to="/privacy" className="hover:text-gold transition-colors">{translations[lang].nav.privacy}</Link>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/966530012363"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 z-50 hover:scale-110 active:scale-95 transition-all"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
      </a>
    </footer>
  );
}
