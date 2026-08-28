import React from 'react';
import { Sparkles, Flame, Calendar, Trophy, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export const Header: React.FC = () => {
  return (
    <header className="relative overflow-hidden pt-8 pb-6 px-4 sm:px-6">
      {/* Background soft ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-56 bg-gradient-to-b from-rose-200/40 via-pink-100/20 to-transparent blur-3xl -z-10 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center">
        {/* Top Tag */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold mb-4 tracking-wide shadow-xs"
        >
          <Flame className="w-4 h-4 text-rose-600 animate-pulse" />
          <span>DESAFIO EXCLUSIVO PARA MULHERES</span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          <span className="font-bold text-rose-900">21 DIAS DE TRANSFORMAÇÃO</span>
        </motion.div>

        {/* Brand Name & Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 font-display">
            Fit<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600">Check</span>
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Supere seus limites a cada dia. Conecte mente, corpo e disciplina em uma jornada inesquecível de 21 dias.
          </p>
        </motion.div>

        {/* Feature Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-stone-700"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-rose-100 shadow-2xs">
            <Calendar className="w-4 h-4 text-rose-500" />
            <span className="font-medium">21 Dias de Constância</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-rose-100 shadow-2xs">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="font-medium">Avaliação Física Comparativa</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-rose-100 shadow-2xs">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="font-medium">Treinos & Inspiração Diária</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-rose-100 shadow-2xs">
            <Heart className="w-4 h-4 text-rose-500" />
            <span className="font-medium">Comunidade & Apoio</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
};
