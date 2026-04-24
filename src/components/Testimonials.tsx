import { motion } from 'motion/react';
import { Language, translations } from '../lib/translations';
import { Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  lang: Language;
}

export default function Testimonials({ lang }: TestimonialsProps) {
  const t = translations[lang].testimonials;
  const isRtl = lang === 'ar';

  return (
    <section id="testimonials" className="py-24 bg-transparent relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full mb-6"
          >
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-xs font-bold text-gold uppercase tracking-widest">
              {isRtl ? 'ثقة العملاء' : 'Customer Trust'}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            {t.title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-400 leading-relaxed"
          >
            {t.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 bg-neutral-900 border border-neutral-800 rounded-[2.5rem] hover:border-gold/30 transition-all duration-500 relative"
            >
              <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 text-gold" />
              </div>

              <div className="flex gap-1 mb-6">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                ))}
              </div>

              <p className="text-lg text-neutral-200 leading-relaxed mb-8 italic relative z-10">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4 border-t border-neutral-800 pt-6">
                <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center text-gold font-bold text-xl border border-neutral-700">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold">{review.name}</h4>
                  <p className="text-sm text-gold/80">{review.car}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center justify-center gap-4"
        >
          <div className="flex items-center gap-3 text-neutral-400">
            <span className="text-lg font-bold text-white">4.9</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold fill-gold" />
              ))}
            </div>
            <span className="text-neutral-500">(117)</span>
          </div>
          <p className="text-sm text-neutral-500 font-medium">
            {isRtl ? 'متوسط التقييم على Google Maps' : 'Average Rating on Google Maps'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
