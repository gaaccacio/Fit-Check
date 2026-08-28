import React from 'react';
import { X, CheckCircle2, AlertCircle, Sun, Shirt, Camera, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PhotoGuidelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'frontal' | 'lateral' | 'all';
}

export const PhotoGuidelineModal: React.FC<PhotoGuidelineModalProps> = ({
  isOpen,
  onClose,
  type = 'all',
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-rose-100 p-6 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 text-rose-600 mb-2">
              <Camera className="w-6 h-6" />
              <h2 className="text-xl font-bold text-stone-900 font-display">
                Guia de Fotos para Avaliação Física
              </h2>
            </div>
            <p className="text-stone-600 text-sm mb-5 leading-relaxed">
              Suas fotos serão usadas exclusivamente pela equipe técnica para registrar seu ponto de partida (Dia 1) e comparar com sua evolução no Dia 21.
            </p>

            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-100 flex items-start gap-3">
                <Shirt className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">Roupas Adequadas</h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Use roupas de treino justas como top fitness e shorts/legging para permitir a visualização precisa das linhas corporais e postura.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-100 flex items-start gap-3">
                <Sun className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">Iluminação e Fundo</h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Prefira um ambiente bem iluminado de frente para a luz e com fundo neutro (uma parede lisa e limpa).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {/* Frontal */}
                <div className="border border-stone-200 rounded-xl p-3 bg-stone-50/50">
                  <div className="flex items-center gap-1.5 text-rose-700 font-semibold text-xs uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-600" />
                    <span>Foto Frontal</span>
                  </div>
                  <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
                    <li>Fique de frente para a câmera</li>
                    <li>Braços relaxados ao lado do corpo</li>
                    <li>Pés afastados na largura do quadril</li>
                    <li>Olhar na linha do horizonte</li>
                  </ul>
                </div>

                {/* Lateral */}
                <div className="border border-stone-200 rounded-xl p-3 bg-stone-50/50">
                  <div className="flex items-center gap-1.5 text-rose-700 font-semibold text-xs uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-600" />
                    <span>Foto Lateral (Perfil)</span>
                  </div>
                  <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
                    <li>Fique 100% de perfil (lado direito ou esquerdo)</li>
                    <li>Braços levemente flexionados ou soltos</li>
                    <li>Cabelos presos para mostrar pescoço e coluna</li>
                    <li>Postura natural, sem encolher o abdômen</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Privacidade Garantida:</strong> Suas fotos são 100% confidenciais e protegidas.</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold rounded-xl text-sm transition-all shadow-xs cursor-pointer"
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
