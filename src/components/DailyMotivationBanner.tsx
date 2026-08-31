import React, { useState, useEffect } from 'react';
import { Sparkles, Dumbbell, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const quotes = [
  {
    quote: "A constância supera a intensidade. 21 dias para você se colocar como prioridade absoluta.",
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
    author: "Treino & Disciplina",
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
    <div className="bg-gradient-to-r from-[#181818] via-[#151515] to-[#181818] border border-stone-800 rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-md">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#FF914D]/15 text-[#FF914D] border border-[#FF914D]/25 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
          <Flame className="w-5 h-5" />
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
              <p className="text-xs sm:text-sm italic font-medium text-stone-200 leading-relaxed">
                "{quotes[index].quote}"
              </p>
              <span className="text-[11px] font-bold text-[#FF914D] uppercase tracking-wider block mt-1">
                ✦ {quotes[index].author}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

