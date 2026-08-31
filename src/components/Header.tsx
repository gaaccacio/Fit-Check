import React from 'react';
import { Sparkles, Flame, Calendar, Trophy, Instagram, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { FitCheckLogo } from './FitCheckLogo';

export const Header: React.FC = () => {
  return (
    <header className="relative overflow-hidden pt-8 pb-6 px-4 sm:px-6">
      {/* Background soft ambient orange glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-gradient-to-b from-[#FF914D]/15 via-[#FF914D]/5 to-transparent blur-3xl -z-10 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center">
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181818] border border-[#FF914D]/40 text-[#FF914D] text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-black/40"
          >
            <Flame className="w-4 h-4 text-[#FF914D] animate-pulse" />
            <span>DESAFIO EXCLUSIVO</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF914D]" />
            <span className="text-white">21 DIAS DE TRANSFORMAÇÃO</span>
          </motion.div>

          {/* Instagram Link Button */}
          <motion.a
            href="https://www.instagram.com/desafiofitcheck/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#1E1E1E] to-[#141414] hover:from-[#282828] hover:to-[#1E1E1E] border border-stone-800 hover:border-[#FF914D]/60 text-stone-200 hover:text-white text-xs sm:text-sm font-semibold transition-all group shadow-sm"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center p-0.5 text-white">
              <Instagram className="w-3.5 h-3.5" />
            </div>
            <span>@desafiofitcheck</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-[#FF914D] transition-colors" />
          </motion.a>
        </div>

        {/* Primary Logo (Second Image IMG_4914.PNG) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center my-3"
        >
          <div className="p-3 sm:p-4 rounded-3xl bg-[#141414]/90 border border-stone-800/80 shadow-2xl backdrop-blur-md">
            <FitCheckLogo variant="full" size="xl" />
          </div>

          <p className="mt-5 text-base sm:text-lg text-stone-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Supere seus limites a cada dia. Conecte mente, corpo e disciplina em uma jornada inesquecível de 21 dias com acompanhamento e evolução real.
          </p>
        </motion.div>

        {/* Feature Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-stone-300"
        >
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#161616] border border-stone-800 hover:border-[#FF914D]/30 transition-colors shadow-sm">
            <Calendar className="w-4 h-4 text-[#FF914D]" />
            <span className="font-medium">21 Dias de Constância</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#161616] border border-stone-800 hover:border-[#FF914D]/30 transition-colors shadow-sm">
            <Trophy className="w-4 h-4 text-[#FF914D]" />
            <span className="font-medium">Avaliação Comparativa</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#161616] border border-stone-800 hover:border-[#FF914D]/30 transition-colors shadow-sm">
            <Sparkles className="w-4 h-4 text-[#FF914D]" />
            <span className="font-medium">Treinos & Guia Diário</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#161616] border border-stone-800 hover:border-[#FF914D]/30 transition-colors shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#FF914D]" />
            <span className="font-medium">Comunidade & Apoio</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

