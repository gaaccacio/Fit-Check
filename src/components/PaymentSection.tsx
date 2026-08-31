import React, { useState } from 'react';
import { QrCode, Copy, Check, ShieldCheck, Sparkles, UserCheck, CreditCard } from 'lucide-react';
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
  const pixKey = "desafiofitcheck@gmail.com";
  const titularNome = "Bruna Valle leite";
  const valorDesafio = "R$ 49,90";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="rounded-2xl border border-stone-800 bg-[#141414] shadow-xl p-6 sm:p-7 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-800/80 pb-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FF914D] text-black flex items-center justify-center font-black text-sm shadow-md shadow-[#FF914D]/20">
            4
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">
              Inscrição & Comprovante de Pagamento
            </h3>
            <p className="text-xs text-stone-400">
              Taxa de adesão única para os 21 dias do desafio completo
            </p>
          </div>
        </div>
        <div className="sm:text-right flex sm:flex-col items-baseline sm:items-end justify-between">
          <span className="text-[11px] font-bold text-[#FF914D] uppercase tracking-wider block">Valor Único</span>
          <span className="text-2xl font-black text-white font-display">{valorDesafio}</span>
        </div>
      </div>

      {/* Benefits Included */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-300 bg-[#1A1A1A] p-4 rounded-xl border border-stone-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FF914D] shrink-0" />
          <span>21 Treinos guiados e progressivos</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FF914D] shrink-0" />
          <span>Guia nutricional & sugestões fit</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FF914D] shrink-0" />
          <span>Avaliação física comparativa (Antes/Depois)</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FF914D] shrink-0" />
          <span>Acesso ao Grupo VIP no WhatsApp</span>
        </div>
      </div>

      {/* PIX Payment Card */}
      <div className="bg-[#181818] rounded-2xl p-5 border border-stone-800 shadow-inner">
        <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
          {/* QR Code Mock Box */}
          <div className="w-28 h-28 bg-[#111111] rounded-2xl border-2 border-dashed border-[#FF914D]/40 p-2.5 flex flex-col items-center justify-center shrink-0 shadow-md">
            <QrCode className="w-14 h-14 text-[#FF914D]" />
            <span className="text-[9px] font-black text-stone-400 uppercase tracking-wider mt-1">PIX Oficial</span>
          </div>

          <div className="flex-1 w-full text-center sm:text-left space-y-3">
            <div>
              <span className="text-xs font-bold text-[#FF914D] uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
                <CreditCard className="w-3.5 h-3.5" />
                Chave PIX (E-mail)
              </span>
              
              <div className="mt-1.5 flex items-center justify-between gap-2 p-2.5 bg-[#0D0D0D] border border-stone-700/80 rounded-xl text-white text-xs sm:text-sm font-mono font-medium">
                <span className="truncate text-stone-100">{pixKey}</span>
                <button
                  type="button"
                  onClick={handleCopyPix}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#FF914D] hover:bg-[#ff7724] text-black shadow-md shadow-[#FF914D]/20'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
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

            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-stone-400">
              <UserCheck className="w-4 h-4 text-[#FF914D] shrink-0" />
              <span>Titular da conta: <strong className="text-white">{titularNome}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Comprovante */}
      <div>
        <PhotoUploader
          id="comprovantePagamento"
          label="Anexar Comprovante do PIX"
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
      <div className="flex items-center gap-2 text-xs text-stone-400 pt-1">
        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
        <span>Sua vaga será confirmada imediatamente pela coordenação do desafio após a verificação.</span>
      </div>
    </div>
  );
};

