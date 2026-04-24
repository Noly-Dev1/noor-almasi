import { motion } from 'motion/react';
import { Language, translations } from '../lib/translations';
import { Award, CheckCircle, ShieldCheck, GraduationCap, Briefcase } from 'lucide-react';

interface ExpertiseProps {
  lang: Language;
}

export default function Expertise({ lang }: ExpertiseProps) {
  const t = translations[lang].expert;
  const isRtl = lang === 'ar';

  return (
    <section id="expert" className="py-24 bg-transparent relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2rem] md:rounded-[3rem] overflow-hidden border-4 md:border-8 border-neutral-800 shadow-2xl shadow-gold/5">
              <img
                src="https://images.unsplash.com/photo-1504222490345-c075b6008014?q=80&w=2070&auto=format&fit=crop"
                alt="Engineer Ziad - Technical Expert"
                className="w-full h-[400px] md:h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 p-4 md:p-6 bg-neutral-900/90 backdrop-blur-md rounded-2xl md:rounded-3xl border border-gold/20">
                <div className="flex items-center gap-3 md:gap-4 mb-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gold rounded-xl md:rounded-2xl flex items-center justify-center text-neutral-950">
                    <Award className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg md:text-xl">{t.title}</h4>
                    <p className="text-gold text-[10px] md:text-sm font-medium">{t.certified}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <Briefcase className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-[10px] md:text-sm">{t.experience_years}</span>
                </div>
              </div>
            </div>
            
            {/* Floating Certificate Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-gold text-neutral-950 p-6 rounded-3xl shadow-2xl z-20 hidden md:block"
            >
              <GraduationCap className="w-10 h-10 mb-2" />
              <div className="font-bold text-lg leading-tight">
                {isRtl ? 'خبير معتمد' : 'Certified Expert'}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold font-bold tracking-widest uppercase mb-4 block">
              {isRtl ? 'الخبرة التقنية' : 'Technical Expertise'}
            </span>
            <h2 className="text-2xl md:text-5xl font-bold text-white mb-6 md:mb-8 leading-tight">
              {t.title}
            </h2>
            <p className="text-base md:text-lg text-neutral-400 mb-8 md:mb-10 leading-relaxed">
              {t.description}
            </p>
            
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-6">
                <ShieldCheck className="w-6 h-6 text-gold" />
                {isRtl ? 'الشهادات والاعتمادات' : 'Certifications & Credentials'}
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {t.certificates.map((cert: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-5 bg-neutral-800/40 rounded-2xl border border-neutral-700/50 hover:border-gold/30 transition-all group"
                  >
                    <div className="w-10 h-10 bg-gold/10 text-gold rounded-xl flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-neutral-950 transition-all">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className="text-neutral-200 font-medium">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8 md:mt-12 p-6 md:p-8 bg-gold/5 rounded-[1.5rem] md:rounded-[2.5rem] border border-gold/10">
              <p className="text-sm md:text-neutral-300 italic leading-relaxed">
                {isRtl 
                  ? '"نحن في مركز نور الماسي لا نكتفي بمجرد الإصلاح، بل نسعى لفهم جذور المشكلة التقنية لضمان عدم تكرارها، مستخدمين أحدث ما توصلت إليه تكنولوجيا صيانة السيارات العالمية."'
                  : '"At Noor Al-Masi Center, we don\'t just repair; we strive to understand the root of the technical problem to ensure it doesn\'t recur, using the latest global automotive maintenance technology."'}
              </p>
              <div className="mt-3 md:mt-4 font-bold text-gold text-sm md:text-base">
                - {t.title}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
