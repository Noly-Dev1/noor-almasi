import { motion } from 'motion/react';
import { Language, translations } from '../lib/translations';
import { Battery, Droplets, Wind, Disc, CircleDot, Gauge, Lightbulb, ShieldCheck } from 'lucide-react';
import { useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';

interface MaintenanceTipsProps {
  lang: Language;
}

export default function MaintenanceTips({ lang }: MaintenanceTipsProps) {
  const t = translations[lang].tips;
  const isRtl = lang === 'ar';

  useEffect(() => {
    document.title = isRtl ? `نصائح الصيانة - مركز نور الماسي` : `Maintenance Tips - Noor Al-Masi Center`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t.description);
    }
  }, [lang, isRtl, t.description]);

  const tips = [
    {
      id: 'battery',
      title: t.battery.title,
      content: t.battery.content,
      icon: Battery,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      id: 'oil',
      title: t.oil.title,
      content: t.oil.content,
      icon: Droplets,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
    {
      id: 'air_filter',
      title: t.air_filter.title,
      content: t.air_filter.content,
      icon: Wind,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      id: 'tires',
      title: t.tires.title,
      content: t.tires.content,
      icon: CircleDot,
      color: 'text-neutral-400',
      bg: 'bg-neutral-400/10',
    },
    {
      id: 'brakes',
      title: t.brakes.title,
      content: t.brakes.content,
      icon: Disc,
      color: 'text-red-500',
      bg: 'bg-red-500/10',
    },
    {
      id: 'spark_plugs',
      title: t.spark_plugs.title,
      content: t.spark_plugs.content,
      icon: Lightbulb,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
    },
  ];

  return (
    <div className="pt-32 pb-24 bg-neutral-950/50 min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        {/* SEO Hidden Keywords */}
        <div className="hidden">
          {translations[lang].tips.seo_keywords}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full mb-6">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span className="text-xs font-bold text-gold uppercase tracking-widest">
              {isRtl ? 'دليل العناية بالسيارة' : 'Car Care Guide'}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            {t.title}
          </h1>
          <p className="text-xl text-neutral-400 leading-relaxed">
            {t.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 bg-neutral-900 border border-neutral-800 rounded-[2.5rem] hover:border-gold/30 transition-all duration-500 relative overflow-hidden"
            >
              <div className={`w-16 h-16 ${tip.bg} ${tip.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <tip.icon className="w-8 h-8" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-gold transition-colors">
                {tip.title}
              </h2>
              
              <p className="text-neutral-400 leading-relaxed mb-6">
                {tip.content}
              </p>

              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
                <tip.icon className="w-32 h-32" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* SEO Content Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 p-12 bg-neutral-900/50 border border-neutral-800 rounded-[3rem] text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            {isRtl ? 'هل تحتاج إلى فحص متخصص؟' : 'Need a Professional Check?'}
          </h3>
          <p className="text-neutral-400 max-w-2xl mx-auto mb-10">
            {isRtl 
              ? 'في مركز نور الماسي بالمدينة المنورة، نوفر لك أحدث أجهزة الفحص والبرمجة لضمان سلامة سيارتك. لا تتردد في حجز موعدك الآن.' 
              : 'At Noor Al-Masi Center in Madinah, we provide the latest diagnostic and programming tools to ensure your car safety. Don\'t hesitate to book your appointment now.'}
          </p>
          <HashLink
            smooth
            to="/#booking"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold hover:bg-gold-dark text-neutral-950 rounded-2xl font-bold transition-all transform hover:scale-105"
          >
            <Gauge className="w-5 h-5" />
            {isRtl ? 'احجز موعدك الآن' : 'Book Your Appointment Now'}
          </HashLink>
        </motion.div>
      </div>
    </div>
  );
}
