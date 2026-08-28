import React, { useEffect } from 'react';
import { 
  CheckCircle2, 
  Flame, 
  Calendar, 
  MessageCircle, 
  Download, 
  Share2, 
  ArrowRight, 
  Sparkles, 
  User, 
  Phone, 
  Mail, 
  Scale, 
  Ruler, 
  Clock, 
  RotateCcw 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { SubmittedRegistration } from '../types';

interface SuccessViewProps {
  data: SubmittedRegistration;
  onReset: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ data, onReset }) => {
  useEffect(() => {
    // Fire confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#e11d48'],
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
      className="max-w-3xl mx-auto px-4 py-8 space-y-8"
    >
      {/* Top Banner Card */}
      <div className="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center relative overflow-hidden">
        {/* Glow decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-inner">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider mb-2">
          <Flame className="w-3.5 h-3.5 text-amber-300" />
          Inscrição Confirmada • Turma FitCheck 21 Dias
        </span>

        <h2 className="text-2xl sm:text-4xl font-extrabold font-display">
          Você deu o primeiro passo, {data.nome.split(' ')[0]}!
        </h2>
        <p className="mt-2 text-rose-100 text-sm sm:text-base max-w-lg mx-auto">
          Seu cadastro e fotos de avaliação física foram recebidos. Prepare-se para 21 dias que vão redefinir sua relação com o treino e com você mesma.
        </p>

        {/* Participant ID Badge */}
        <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-4 py-2 rounded-2xl bg-black/20 backdrop-blur-md border border-white/20 text-xs">
          <span>Protocolo da Inscrição: <strong className="font-mono text-amber-200">{data.id}</strong></span>
          <span className="hidden sm:inline opacity-40">•</span>
          <span>Status: <strong className="text-emerald-300 uppercase">Comprovante em Análise</strong></span>
        </div>
      </div>

      {/* Next Steps Guide */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-rose-100 shadow-sm space-y-5">
        <div className="flex items-center gap-2 text-rose-600">
          <Sparkles className="w-5 h-5" />
          <h3 className="text-lg font-bold text-stone-900 font-display">
            Seus Próximos Passos
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h4 className="font-bold text-stone-900 text-sm">Entre no Grupo VIP</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              O link exclusivo do WhatsApp com todas as alunas será enviado para o seu número cadastrado.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h4 className="font-bold text-stone-900 text-sm">Receba o Manual Dia 1</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Você receberá a planilha de treinos, cronograma e orientações nutricionais 24h antes do início.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h4 className="font-bold text-stone-900 text-sm">Fotos do Dia 21</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              No 21º dia você enviará as mesmas fotos para receber seu relatório de evolução comparativo.
            </p>
          </div>
        </div>

        {/* WhatsApp Button Link */}
        <div className="pt-2">
          <a
            href={`https://api.whatsapp.com/send?text=Oi!%20Acabei%20de%20me%20cadastrar%20no%20Desafio%20FitCheck%2021%20Dias!%20Meu%20nome%20%C3%A9%20${encodeURIComponent(data.nome)}%20e%20meu%20protocolo%20%C3%A9%20${data.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-xs"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Falar com o Suporte FitCheck no WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Registration Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <h3 className="text-lg font-bold text-stone-900 font-display">
            Resumo dos Dados Cadastrados
          </h3>
          <span className="text-xs text-stone-500">
            Cadastrado em {data.dataCadastro}
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
            <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
              <User className="w-3.5 h-3.5 text-rose-500" />
              <span>Nome Completo</span>
            </div>
            <span className="font-semibold text-stone-900 block truncate">{data.nome}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
            <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
              <Clock className="w-3.5 h-3.5 text-rose-500" />
              <span>Idade</span>
            </div>
            <span className="font-semibold text-stone-900">{data.idade} anos</span>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
            <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
              <Scale className="w-3.5 h-3.5 text-rose-500" />
              <span>Peso Atual</span>
            </div>
            <span className="font-semibold text-stone-900">{data.peso}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
            <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
              <Ruler className="w-3.5 h-3.5 text-rose-500" />
              <span>Altura</span>
            </div>
            <span className="font-semibold text-stone-900">{data.altura}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
            <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
              <Mail className="w-3.5 h-3.5 text-rose-500" />
              <span>E-mail</span>
            </div>
            <span className="font-semibold text-stone-900 block truncate">{data.email}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
            <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
              <Phone className="w-3.5 h-3.5 text-rose-500" />
              <span>Celular / WhatsApp</span>
            </div>
            <span className="font-semibold text-stone-900">{data.celular}</span>
          </div>
        </div>

        {/* IMC Badge if available */}
        {data.imc && (
          <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs sm:text-sm ${data.imc.cor}`}>
            <div>
              <span className="font-bold">Índice de Massa Corporal (IMC Inicial): </span>
              <strong className="text-base font-extrabold">{data.imc.valor}</strong> — {data.imc.classificacao}
            </div>
            <span className="px-2.5 py-1 rounded-full bg-white/80 font-semibold text-xs border">
              Metas calculadas
            </span>
          </div>
        )}

        {/* Attached Photos Previews */}
        <div className="border-t border-stone-100 pt-4 space-y-3">
          <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
            Arquivos e Fotos de Avaliação Enviados
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {/* Foto Frontal */}
            <div className="border border-stone-200 rounded-xl p-2 bg-stone-50 text-center">
              <span className="text-[11px] font-bold text-stone-600 block mb-1.5">Foto Frontal</span>
              {data.fotoFrontalPreview ? (
                <img
                  src={data.fotoFrontalPreview}
                  alt="Foto Frontal"
                  className="w-full h-28 object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="h-28 flex items-center justify-center text-xs text-stone-400">Anexada</div>
              )}
            </div>

            {/* Foto Lateral */}
            <div className="border border-stone-200 rounded-xl p-2 bg-stone-50 text-center">
              <span className="text-[11px] font-bold text-stone-600 block mb-1.5">Foto Lateral</span>
              {data.fotoLateralPreview ? (
                <img
                  src={data.fotoLateralPreview}
                  alt="Foto Lateral"
                  className="w-full h-28 object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="h-28 flex items-center justify-center text-xs text-stone-400">Anexada</div>
              )}
            </div>

            {/* Comprovante */}
            <div className="border border-stone-200 rounded-xl p-2 bg-stone-50 text-center">
              <span className="text-[11px] font-bold text-stone-600 block mb-1.5">Comprovante PIX</span>
              {data.comprovantePreview ? (
                <img
                  src={data.comprovantePreview}
                  alt="Comprovante"
                  className="w-full h-28 object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="h-28 flex flex-col items-center justify-center text-xs text-emerald-700 bg-emerald-50 rounded-lg p-2 font-medium">
                  <CheckCircle2 className="w-6 h-6 mb-1" />
                  <span className="truncate w-full text-[10px]">{data.comprovanteFileName || 'Anexo Confirmado'}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-100">
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Fazer Nova Inscrição</span>
          </button>

          <button
            type="button"
            onClick={handlePrintOrDownload}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Imprimir / Salvar Comprovante</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
