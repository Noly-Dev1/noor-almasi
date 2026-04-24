import { motion } from 'motion/react';
import { Language, translations } from '../lib/translations';
import { Monitor, Cpu, Zap, Search, ShieldCheck, Clock, Award, Users, Truck } from 'lucide-react';

interface ServicesProps {
  lang: Language;
}

export default function Services({ lang }: ServicesProps) {
  const t = translations[lang].services;
  const isRtl = lang === 'ar';

  const services = [
    {
      title: t.computer_check,
      description: t.computer_check_desc,
      icon: Monitor,
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      title: t.programming,
      description: t.programming_desc,
      icon: Cpu,
      color: 'bg-gold/10 text-gold',
    },
    {
      title: t.electrical,
      description: t.electrical_desc,
      icon: Zap,
      color: 'bg-yellow-500/10 text-yellow-500',
    },
    {
      title: t.diagnostics,
      description: t.diagnostics_desc,
      icon: Search,
      color: 'bg-red-500/10 text-red-500',
    },
    {
      title: t.towing,
      description: t.towing_desc,
      icon: Truck,
      color: 'bg-green-500/10 text-green-500',
    },
  ];

  const features = [
    { title: isRtl ? 'ضمان الجودة' : 'Quality Guarantee', icon: ShieldCheck },
    { title: isRtl ? 'سرعة في التنفيذ' : 'Fast Execution', icon: Clock },
    { title: isRtl ? 'خبرة معتمدة' : 'Certified Experience', icon: Award },
    { title: isRtl ? 'فريق محترف' : 'Professional Team', icon: Users },
  ];

  return (
    <section id="services" className="py-24 bg-transparent overflow-hidden relative" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background Image for Services */}
      <div className="absolute inset-0 z-[-1] opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop" 
          alt="Car Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-400"
          >
            {t.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-6 md:p-8 bg-neutral-900 border border-neutral-800 rounded-3xl hover:border-gold/30 transition-all duration-300"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-4 md:mb-6 transition-transform group-hover:scale-110 ${service.color}`}>
                <service.icon className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-4 group-hover:text-gold transition-colors">
                {service.title}
              </h3>
              <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center gap-2 md:gap-4"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-neutral-800 rounded-full flex items-center justify-center text-gold">
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="text-[10px] md:text-sm font-bold text-neutral-300 uppercase tracking-wider">
                  {feature.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
