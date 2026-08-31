import React from 'react';
import { X, CheckCircle2, Sun, Shirt, Camera, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PhotoGuidelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'frontal' | 'lateral' | 'all';
}

export const PhotoGuidelineModal: React.FC<PhotoGuidelineModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-[#141414] rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-stone-800 p-6 sm:p-7 relative text-stone-100"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 text-[#FF914D] mb-2">
              <Camera className="w-6 h-6" />
              <h2 className="text-xl font-bold text-white font-display">
                Guia de Fotos para Avaliação Física
              </h2>
            </div>
            <p className="text-stone-300 text-sm mb-5 leading-relaxed">
              Suas fotos serão usadas pela equipe técnica exclusivamente para registrar seu ponto de partida (Dia 1) e comparar com sua evolução no Dia 21.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#1C1C1C] border border-stone-800 flex items-start gap-3.5">
                <Shirt className="w-5 h-5 text-[#FF914D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Roupas Adequadas</h4>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                    Use roupas de treino justas como top fitness e shorts/legging para permitir a visualização precisa das linhas corporais e postura.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#1C1C1C] border border-stone-800 flex items-start gap-3.5">
                <Sun className="w-5 h-5 text-[#FF914D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Iluminação e Fundo</h4>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                    Prefira um ambiente bem iluminado de frente para a luz e com fundo neutro (uma parede lisa e limpa).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Frontal */}
                <div className="border border-stone-800 rounded-2xl p-3.5 bg-[#181818]">
                  <div className="flex items-center gap-1.5 text-[#FF914D] font-bold text-xs uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF914D]" />
                    <span>Foto Frontal</span>
                  </div>
                  <ul className="text-xs text-stone-300 space-y-1.5 list-disc list-inside">
                    <li>Fique de frente para a câmera</li>
                    <li>Braços relaxados ao lado do corpo</li>
                    <li>Pés afastados na largura do quadril</li>
                    <li>Olhar na linha do horizonte</li>
                  </ul>
                </div>

                {/* Lateral */}
                <div className="border border-stone-800 rounded-2xl p-3.5 bg-[#181818]">
                  <div className="flex items-center gap-1.5 text-[#FF914D] font-bold text-xs uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF914D]" />
                    <span>Foto Lateral (Perfil)</span>
                  </div>
                  <ul className="text-xs text-stone-300 space-y-1.5 list-disc list-inside">
                    <li>100% de perfil (lado D ou E)</li>
                    <li>Braços soltos ou levemente flexionados</li>
                    <li>Cabelos presos para mostrar postura</li>
                    <li>Postura natural, sem encolher</li>
                  </ul>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Privacidade Garantida:</strong> Suas fotos são 100% confidenciais e protegidas.</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 px-4 bg-[#FF914D] hover:bg-[#ff7724] text-black font-bold rounded-xl text-sm transition-all shadow-lg shadow-[#FF914D]/25 cursor-pointer"
              >
                Entendi as instruções
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

