import { motion } from 'motion/react';
import { Language } from '../lib/translations';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PrivacyProps {
  lang: Language;
}

export default function Privacy({ lang }: PrivacyProps) {
  const isRtl = lang === 'ar';
  
  const content = {
    ar: {
      title: 'سياسة الخصوصية',
      lastUpdated: 'آخر تحديث: 4 أبريل 2024',
      sections: [
        {
          title: '1. جمع المعلومات',
          content: 'نقوم بجمع المعلومات التي تقدمها لنا مباشرة عند حجز موعد، مثل الاسم ورقم الجوال ونوع السيارة.'
        },
        {
          title: '2. استخدام المعلومات',
          content: 'نستخدم المعلومات التي نجمعها لتأكيد الحجوزات، والتواصل معك بشأن حالة سيارتك، وتحسين خدماتنا.'
        },
        {
          title: '3. حماية البيانات',
          content: 'نحن نطبق إجراءات أمنية متنوعة للحفاظ على سلامة معلوماتك الشخصية.'
        }
      ],
      back: 'العودة للرئيسية'
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: April 4, 2024',
      sections: [
        {
          title: '1. Information Collection',
          content: 'We collect information you provide directly to us when booking an appointment, such as name, phone number, and car type.'
        },
        {
          title: '2. Use of Information',
          content: 'We use the information we collect to confirm bookings, communicate with you about your car status, and improve our services.'
        },
        {
          title: '3. Data Protection',
          content: 'We implement a variety of security measures to maintain the safety of your personal information.'
        }
      ],
      back: 'Back to Home'
    }
  };

  const currentContent = content[lang];

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
            {currentContent.back}
          </Link>

          <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-[3rem] p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gold/10 text-gold rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">{currentContent.title}</h1>
                <p className="text-neutral-500 text-sm mt-1">{currentContent.lastUpdated}</p>
              </div>
            </div>

            <div className="space-y-10">
              {currentContent.sections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h2 className="text-xl font-bold text-white">{section.title}</h2>
                  <p className="text-neutral-400 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-neutral-800 text-center">
              <p className="text-neutral-500 text-sm">
                {isRtl 
                  ? 'إذا كان لديك أي أسئلة، يرجى التواصل معنا عبر واتساب.' 
                  : 'If you have any questions, please contact us via WhatsApp.'}
              </p>
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
