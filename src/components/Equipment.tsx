import { motion } from 'motion/react';
import { Language, translations } from '../lib/translations';
import { Settings, Wrench, Laptop } from 'lucide-react';

interface EquipmentProps {
  lang: Language;
}

export default function Equipment({ lang }: EquipmentProps) {
  const t = translations[lang].equipment;
  const isRtl = lang === 'ar';

  const equipmentItems = [
    {
      title: t.modern_check,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
      icon: Laptop,
    },
    {
      title: t.advanced_prog,
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
      icon: Settings,
    },
    {
      title: t.pro_tools,
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2072&auto=format&fit=crop',
      icon: Wrench,
    },
  ];

  return (
    <section id="equipment" className="py-24 bg-transparent overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
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
          <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {equipmentItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative h-[300px] md:h-[400px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-neutral-800"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gold/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-gold border border-gold/30">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                </div>
                <div className="h-1 w-0 group-hover:w-full bg-gold transition-all duration-500 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
