import React, { useState } from 'react';
import { QrCode, Copy, Check, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { PhotoUploader } from './PhotoUploader';

interface PaymentSectionProps {
  comprovanteFile: File | null;
  comprovantePreview: string;
  comprovanteFileName: string;
  comprovanteError?: string;
  onComprovanteChange: (file: File | null, previewUrl: string) => void;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  comprovanteFile,
  comprovantePreview,
  comprovanteFileName,
  comprovanteError,
  onComprovanteChange,
}) => {
  const [copied, setCopied] = useState(false);
  const pixKey = "desafiofitcheck21@gmail.com";
  const valorDesafio = "R$ 49,90";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="rounded-2xl border border-rose-100 bg-white/90 shadow-xs p-6 space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center font-bold text-sm">
            4
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900 font-display">
              Inscrição & Comprovante de Pagamento
            </h3>
            <p className="text-xs text-stone-500">
              Taxa de adesão única para os 21 dias do desafio completo
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider block">Valor Único</span>
          <span className="text-xl font-extrabold text-stone-900 font-display">{valorDesafio}</span>
        </div>
      </div>

      {/* Benefits Included */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 bg-rose-50/40 p-3.5 rounded-xl border border-rose-100/70">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
          <span>21 Treinos guiados em vídeo</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
          <span>Guia nutricional & receitas fit</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
          <span>Avaliação física comparativa (Antes/Depois)</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
          <span>Acesso ao Grupo VIP no WhatsApp</span>
        </div>
      </div>

      {/* PIX Payment Card */}
      <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          {/* QR Code Mock Box */}
          <div className="w-28 h-28 bg-white rounded-xl border-2 border-dashed border-rose-200 p-2 flex flex-col items-center justify-center shrink-0 shadow-2xs">
            <QrCode className="w-16 h-16 text-rose-600" />
            <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider mt-1">PIX Oficial</span>
          </div>

          <div className="flex-1 w-full text-center sm:text-left space-y-2">
            <div>
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">Chave PIX (E-mail)</span>
              <div className="mt-1 flex items-center justify-between gap-2 p-2.5 bg-white border border-stone-200 rounded-xl text-stone-800 text-sm font-mono font-medium">
                <span className="truncate">{pixKey}</span>
                <button
                  type="button"
                  onClick={handleCopyPix}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 hover:bg-rose-700 text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar PIX</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <p className="text-xs text-stone-500">
              Nome do titular: <strong className="text-stone-700">FitCheck Treinamento e Saúde Ltda.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Upload Comprovante */}
      <div>
        <PhotoUploader
          id="comprovantePagamento"
          label="Anexar Comprovante de Pagamento"
          subtext="Envie a captura de tela (print) ou comprovante em PDF do Pix realizado para confirmar sua vaga"
          required={true}
          type="comprovante"
          file={comprovanteFile}
          preview={comprovantePreview}
          fileName={comprovanteFileName}
          error={comprovanteError}
          onFileChange={onComprovanteChange}
        />
      </div>

      {/* Security reassurance */}
      <div className="flex items-center gap-2 text-xs text-stone-500 pt-1">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Sua inscrição será validada e confirmada via WhatsApp e e-mail imediatamente após a conferência.</span>
      </div>
    </div>
  );
};
