import { motion } from 'motion/react';
import { Language, translations } from '../lib/translations';
import { HelpCircle, ArrowLeft, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SupportProps {
  lang: Language;
}

export default function Support({ lang }: SupportProps) {
  const isRtl = lang === 'ar';
  const t = translations[lang].faq;
  const nav = translations[lang].nav;
  
  return (
    <div className="pt-32 pb-24 min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gold hover:text-gold-dark mb-8 transition-colors"
          >
            <ArrowLeft className={cn("w-4 h-4", isRtl && "rotate-180")} />
            {isRtl ? 'العودة للرئيسية' : 'Back to Home'}
          </Link>

          <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-[3rem] p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gold/10 text-gold rounded-2xl flex items-center justify-center">
                <HelpCircle className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">{t.title}</h1>
                <p className="text-neutral-500 text-sm mt-1">{t.subtitle}</p>
              </div>
            </div>

            <div className="space-y-6">
              {t.questions.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-neutral-800/30 rounded-2xl border border-neutral-800 hover:border-gold/30 transition-all group"
                >
                  <h2 className="text-xl font-bold text-white mb-3 flex items-start gap-3">
                    <span className="text-gold mt-1">Q:</span>
                    {item.q}
                  </h2>
                  <p className="text-neutral-400 leading-relaxed flex items-start gap-3">
                    <span className="text-neutral-600 mt-1">A:</span>
                    {item.a}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-neutral-800 text-center">
              <p className="text-neutral-400 mb-6">
                {isRtl 
                  ? 'لم تجد إجابة لسؤالك؟ نحن هنا للمساعدة.' 
                  : "Didn't find your answer? We're here to help."}
              </p>
              <a 
                href="https://wa.me/966530012363"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105"
              >
                <MessageCircle className="w-6 h-6" />
                {isRtl ? 'تواصل مع الدعم الفني' : 'Contact Technical Support'}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
