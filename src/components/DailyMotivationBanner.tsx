import React, { useState, useEffect } from 'react';
import { Quote, Sparkles, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const quotes = [
  {
    quote: "A constância supera a intensidade. 21 dias para você se colocar como prioridade.",
    author: "Comunidade FitCheck",
  },
  {
    quote: "Você não precisa ser perfeita, só precisa não desistir a cada novo dia.",
    author: "Desafio 21 Dias",
  },
  {
    quote: "Seu corpo alcança o que a sua mente acredita. Vamos juntas até o Dia 21!",
    author: "Equipe FitCheck",
  },
  {
    quote: "Cada gota de suor é uma vitória contra o cansaço. Você é mais forte do que imagina.",
    author: "Treino & Autocuidado",
  },
];

export const DailyMotivationBanner: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-rose-50 via-pink-50/60 to-rose-50 border border-rose-100 rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-2xs">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
          <Dumbbell className="w-5 h-5" />
        </div>
        <div className="flex-1 min-h-[48px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs sm:text-sm italic font-medium text-stone-700 leading-relaxed">
                "{quotes[index].quote}"
              </p>
              <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider block mt-1">
                ✦ {quotes[index].author}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
