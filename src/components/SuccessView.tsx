import React, { useEffect } from 'react';
import { 
  CheckCircle2, 
  Flame, 
  MessageCircle, 
  Download, 
  Sparkles, 
  User, 
  Phone, 
  Mail, 
  Scale, 
  Ruler, 
  Clock, 
  RotateCcw,
  Instagram,
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { SubmittedRegistration } from '../types';
import { FitCheckLogo } from './FitCheckLogo';

interface SuccessViewProps {
  data: SubmittedRegistration;
  onReset: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ data, onReset }) => {
  useEffect(() => {
    // Fire confetti on mount
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF914D', '#FFFFFF', '#FFA873', '#E6683C', '#FFC299'],
      });
    } catch {
      // ignore
    }
  }, []);

  const handlePrintOrDownload = () => {
    window.print();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto px-4 py-8 space-y-8 text-stone-100"
    >
      {/* Top Banner Card */}
      <div className="bg-gradient-to-br from-[#1B1B1B] via-[#151515] to-[#121212] border border-[#FF914D]/40 text-white rounded-3xl p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden">
        {/* Glow decorations */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF914D]/15 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FF914D]/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
        
        <div className="flex justify-center mb-5">
          <FitCheckLogo variant="full" size="lg" />
        </div>

        <div className="w-14 h-14 rounded-2xl bg-[#FF914D] text-black flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#FF914D]/30">
          <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#222222] border border-[#FF914D]/40 text-[#FF914D] text-xs font-bold uppercase tracking-wider mb-3">
          <Flame className="w-3.5 h-3.5 text-[#FF914D]" />
          Inscrição Confirmada • Desafio 21 Dias
        </span>

        <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white">
          Você deu o primeiro passo, {data.nome.split(' ')[0]}!
        </h2>
        <p className="mt-2 text-stone-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          Seu cadastro e fotos de avaliação física foram recebidos com sucesso. Prepare-se para 21 dias de superação, disciplina e resultados visíveis.
        </p>

        {/* Participant ID Badge */}
        <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-5 py-2.5 rounded-2xl bg-[#0D0D0D] border border-stone-800 text-xs">
          <span>Protocolo da Inscrição: <strong className="font-mono text-[#FF914D]">{data.id}</strong></span>
          <span className="hidden sm:inline text-stone-700">•</span>
          <span>Status: <strong className="text-emerald-400 uppercase font-bold">Comprovante em Análise</strong></span>
        </div>
      </div>

      {/* Next Steps Guide */}
      <div className="bg-[#141414] rounded-3xl p-6 sm:p-7 border border-stone-800 shadow-xl space-y-5">
        <div className="flex items-center gap-2 text-[#FF914D]">
          <Sparkles className="w-5 h-5" />
          <h3 className="text-lg font-bold text-white font-display">
            Seus Próximos Passos
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-stone-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#FF914D] text-black flex items-center justify-center font-black text-sm">
              1
            </div>
            <h4 className="font-bold text-white text-sm">Entre no Grupo VIP</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              O link exclusivo do WhatsApp com todas as participantes será enviado para o seu número cadastrado.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-stone-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#FF914D] text-black flex items-center justify-center font-black text-sm">
              2
            </div>
            <h4 className="font-bold text-white text-sm">Receba o Manual Dia 1</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Você receberá a planilha de treinos, cronograma e orientações nutricionais 24h antes do início.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-stone-800 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#FF914D] text-black flex items-center justify-center font-black text-sm">
              3
            </div>
            <h4 className="font-bold text-white text-sm">Fotos do Dia 21</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              No 21º dia você enviará as mesmas fotos para receber seu relatório de evolução comparativo.
            </p>
          </div>
        </div>

        {/* Action Buttons: WhatsApp and Instagram */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <a
            href={`https://api.whatsapp.com/send?text=Oi!%20Acabei%20de%20me%20cadastrar%20no%20Desafio%20FitCheck%2021%20Dias!%20Meu%20nome%20%C3%A9%20${encodeURIComponent(data.nome)}%20e%20meu%20protocolo%20%C3%A9%20${data.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-md shadow-emerald-950"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Falar no WhatsApp</span>
          </a>

          <a
            href="https://www.instagram.com/desafiofitcheck/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] hover:opacity-95 text-white font-bold text-sm transition-all shadow-md"
          >
            <Instagram className="w-5 h-5" />
            <span>Seguir @desafiofitcheck</span>
            <ArrowUpRight className="w-4 h-4 opacity-80" />
          </a>
        </div>
      </div>

      {/* Registration Summary Card */}
      <div className="bg-[#141414] rounded-3xl p-6 sm:p-7 border border-stone-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <h3 className="text-lg font-bold text-white font-display">
            Resumo dos Dados Cadastrados
          </h3>
          <span className="text-xs text-stone-400">
            Cadastrado em {data.dataCadastro}
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="p-3.5 rounded-2xl bg-[#1A1A1A] border border-stone-800">
            <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1">
              <User className="w-3.5 h-3.5 text-[#FF914D]" />
              <span>Nome Completo</span>
            </div>
            <span className="font-bold text-white block truncate">{data.nome}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#1A1A1A] border border-stone-800">
            <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1">
              <Clock className="w-3.5 h-3.5 text-[#FF914D]" />
              <span>Idade</span>
            </div>
            <span className="font-bold text-white">{data.idade} anos</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#1A1A1A] border border-stone-800">
            <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1">
              <Scale className="w-3.5 h-3.5 text-[#FF914D]" />
              <span>Peso Atual</span>
            </div>
            <span className="font-bold text-white">{data.peso}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#1A1A1A] border border-stone-800">
            <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1">
              <Ruler className="w-3.5 h-3.5 text-[#FF914D]" />
              <span>Altura</span>
            </div>
            <span className="font-bold text-white">{data.altura}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#1A1A1A] border border-stone-800">
            <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1">
              <Mail className="w-3.5 h-3.5 text-[#FF914D]" />
              <span>E-mail</span>
            </div>
            <span className="font-bold text-white block truncate">{data.email}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#1A1A1A] border border-stone-800">
            <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1">
              <Phone className="w-3.5 h-3.5 text-[#FF914D]" />
              <span>Celular / WhatsApp</span>
            </div>
            <span className="font-bold text-white">{data.celular}</span>
          </div>
        </div>

        {/* IMC Badge if available */}
        {data.imc && (
          <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs sm:text-sm bg-[#1A1A1A] border-stone-700`}>
            <div>
              <span className="text-stone-300">Índice de Massa Corporal (IMC Inicial): </span>
              <strong className="text-base font-black text-[#FF914D]">{data.imc.valor}</strong> — <span className="text-white font-medium">{data.imc.classificacao}</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#252525] font-bold text-xs text-[#FF914D] border border-stone-700">
              Metas calculadas
            </span>
          </div>
        )}

        {/* Attached Photos Previews */}
        <div className="border-t border-stone-800 pt-4 space-y-3">
          <h4 className="text-xs font-bold text-[#FF914D] uppercase tracking-wider">
            Arquivos e Fotos de Avaliação Enviados
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {/* Foto Frontal */}
            <div className="border border-stone-800 rounded-2xl p-2.5 bg-[#181818] text-center">
              <span className="text-[11px] font-bold text-stone-300 block mb-1.5">Foto Frontal</span>
              {data.fotoFrontalPreview ? (
                <img
                  src={data.fotoFrontalPreview}
                  alt="Foto Frontal"
                  className="w-full h-28 object-cover rounded-xl border border-stone-700"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="h-28 flex items-center justify-center text-xs text-stone-500">Anexada</div>
              )}
            </div>

            {/* Foto Lateral */}
            <div className="border border-stone-800 rounded-2xl p-2.5 bg-[#181818] text-center">
              <span className="text-[11px] font-bold text-stone-300 block mb-1.5">Foto Lateral</span>
              {data.fotoLateralPreview ? (
                <img
                  src={data.fotoLateralPreview}
                  alt="Foto Lateral"
                  className="w-full h-28 object-cover rounded-xl border border-stone-700"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="h-28 flex items-center justify-center text-xs text-stone-500">Anexada</div>
              )}
            </div>

            {/* Comprovante */}
            <div className="border border-stone-800 rounded-2xl p-2.5 bg-[#181818] text-center">
              <span className="text-[11px] font-bold text-stone-300 block mb-1.5">Comprovante PIX</span>
              {data.comprovantePreview ? (
                <img
                  src={data.comprovantePreview}
                  alt="Comprovante"
                  className="w-full h-28 object-cover rounded-xl border border-stone-700"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="h-28 flex flex-col items-center justify-center text-xs text-emerald-400 bg-emerald-950/30 rounded-xl p-2 font-medium border border-emerald-800/40">
                  <CheckCircle2 className="w-6 h-6 mb-1" />
                  <span className="truncate w-full text-[10px]">{data.comprovanteFileName || 'Anexo Confirmado'}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-800">
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-stone-700 text-stone-300 hover:text-white hover:bg-stone-800 text-xs font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Fazer Nova Inscrição</span>
          </button>

          <button
            type="button"
            onClick={handlePrintOrDownload}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF914D] hover:bg-[#ff7724] text-black text-xs font-bold transition-all shadow-md shadow-[#FF914D]/20 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Imprimir / Salvar Comprovante</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

