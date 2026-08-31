import React, { useState, useId } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Scale, 
  Ruler, 
  Camera, 
  CheckSquare, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Target,
  Flame
} from 'lucide-react';
import { motion } from 'motion/react';
import { RegistrationFormData, FormErrors, SubmittedRegistration } from '../types';
import { formatPhone, formatWeight, formatHeight, calculateIMC, validateEmail, parseWeightValue, parseHeightValue } from '../utils/formatters';
import { PhotoUploader } from './PhotoUploader';
import { PaymentSection } from './PaymentSection';
import { PhotoGuidelineModal } from './PhotoGuidelineModal';
import { DailyMotivationBanner } from './DailyMotivationBanner';
import { getSupabaseClient, getSupabaseCredentials, uploadFileToSupabase } from '../lib/supabase';

interface RegistrationFormProps {
  onSuccess: (data: SubmittedRegistration) => void;
}

const OBJETIVOS = [
  '🔥 Queimar gordura e afinar a cintura',
  '💪 Tonificar e definir pernas, glúteos e abdômen',
  '⚡ Ganhar energia, disposição e saúde',
  '🎯 Criar a rotina de treinos e não desistir mais',
];

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    nome: '',
    idade: '',
    peso: '',
    altura: '',
    email: '',
    celular: '',
    fotoFrontal: null,
    fotoFrontalPreview: '',
    fotoLateral: null,
    fotoLateralPreview: '',
    comprovantePagamento: null,
    comprovantePreview: '',
    comprovanteFileName: '',
    objetivoPrincipal: OBJETIVOS[0],
    termoAceito: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [guidelineModalOpen, setGuidelineModalOpen] = useState(false);

  // Live BMI calculation
  const imcInfo = calculateIMC(formData.peso, formData.altura);

  // Field change handlers
  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, nome: e.target.value }));
    if (errors.nome) setErrors((prev) => ({ ...prev, nome: undefined }));
  };

  const handleIdadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setFormData((prev) => ({ ...prev, idade: val }));
    if (errors.idade) setErrors((prev) => ({ ...prev, idade: undefined }));
  };

  const handlePesoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWeight(e.target.value);
    setFormData((prev) => ({ ...prev, peso: formatted }));
    if (errors.peso) setErrors((prev) => ({ ...prev, peso: undefined }));
  };

  const handleAlturaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatHeight(e.target.value);
    setFormData((prev) => ({ ...prev, altura: formatted }));
    if (errors.altura) setErrors((prev) => ({ ...prev, altura: undefined }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const handleCelularChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, celular: formatted }));
    if (errors.celular) setErrors((prev) => ({ ...prev, celular: undefined }));
  };

  const handleFotoFrontalChange = (file: File | null, preview: string) => {
    setFormData((prev) => ({
      ...prev,
      fotoFrontal: file,
      fotoFrontalPreview: preview,
    }));
    if (errors.fotoFrontal) setErrors((prev) => ({ ...prev, fotoFrontal: undefined }));
  };

  const handleFotoLateralChange = (file: File | null, preview: string) => {
    setFormData((prev) => ({
      ...prev,
      fotoLateral: file,
      fotoLateralPreview: preview,
    }));
    if (errors.fotoLateral) setErrors((prev) => ({ ...prev, fotoLateral: undefined }));
  };

  const handleComprovanteChange = (file: File | null, preview: string) => {
    setFormData((prev) => ({
      ...prev,
      comprovantePagamento: file,
      comprovantePreview: preview,
      comprovanteFileName: file?.name || '',
    }));
    if (errors.comprovantePagamento) {
      setErrors((prev) => ({ ...prev, comprovantePagamento: undefined }));
    }
  };

  // Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Por favor, informe seu nome completo.';
    } else if (formData.nome.trim().split(' ').length < 2) {
      newErrors.nome = 'Informe seu nome e sobrenome.';
    }

    if (!formData.idade) {
      newErrors.idade = 'Informe sua idade.';
    } else {
      const ageNum = parseInt(formData.idade, 10);
      if (isNaN(ageNum) || ageNum < 14 || ageNum > 90) {
        newErrors.idade = 'Idade deve ser entre 14 e 90 anos.';
      }
    }

    if (!formData.peso.trim()) {
      newErrors.peso = 'Informe seu peso atual em kg (ex: 60,5 kg).';
    }

    if (!formData.altura.trim()) {
      newErrors.altura = 'Informe sua altura em metros (ex: 1,69 m).';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Informe seu endereço de e-mail.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'E-mail inválido. Exemplo: nome@dominio.com';
    }

    if (!formData.celular.trim()) {
      newErrors.celular = 'Informe seu número de celular / WhatsApp.';
    } else if (formData.celular.replace(/\D/g, '').length < 10) {
      newErrors.celular = 'Número incompleto. Formato: (00) 00000-0000';
    }

    if (!formData.fotoFrontal) {
      newErrors.fotoFrontal = 'Foto frontal é obrigatória para a avaliação física.';
    }

    if (!formData.fotoLateral) {
      newErrors.fotoLateral = 'Foto lateral (perfil) é obrigatória para a avaliação física.';
    }

    if (!formData.comprovantePagamento) {
      newErrors.comprovantePagamento = 'O envio do comprovante de pagamento é obrigatório.';
    }

    if (!formData.termoAceito) {
      newErrors.termoAceito = 'Você precisa aceitar os termos do desafio de 21 dias para continuar.';
    }

    setErrors(newErrors);

    // If there are errors, scroll to the first one
    const errorKeys = Object.keys(newErrors);
    if (errorKeys.length > 0) {
      const firstErrorElement = document.getElementById(errorKeys[0]);
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const protocolNumber = `FC21-${randomCode}`;

    try {
      const client = getSupabaseClient();
      const creds = getSupabaseCredentials();

      let fotoFrontalUrl = '';
      let fotoLateralUrl = '';
      let comprovanteUrl = '';

      if (creds.isConfigured && client) {
        const timestamp = Date.now();
        const safeName = formData.nome.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 20);

        // 1. Upload Foto Frontal
        if (formData.fotoFrontal) {
          try {
            const ext = formData.fotoFrontal.name.split('.').pop() || 'jpg';
            const path = `${protocolNumber}/${safeName}_frontal_${timestamp}.${ext}`;
            fotoFrontalUrl = await uploadFileToSupabase('fitcheck-avaliacoes', path, formData.fotoFrontal);
          } catch (uploadErr) {
            console.warn('Erro ao subir foto frontal no storage:', uploadErr);
            fotoFrontalUrl = `pendente_${protocolNumber}_frontal`;
          }
        } else {
          fotoFrontalUrl = `sem_foto_${protocolNumber}_frontal`;
        }

        // 2. Upload Foto Lateral
        if (formData.fotoLateral) {
          try {
            const ext = formData.fotoLateral.name.split('.').pop() || 'jpg';
            const path = `${protocolNumber}/${safeName}_lateral_${timestamp}.${ext}`;
            fotoLateralUrl = await uploadFileToSupabase('fitcheck-avaliacoes', path, formData.fotoLateral);
          } catch (uploadErr) {
            console.warn('Erro ao subir foto lateral no storage:', uploadErr);
            fotoLateralUrl = `pendente_${protocolNumber}_lateral`;
          }
        } else {
          fotoLateralUrl = `sem_foto_${protocolNumber}_lateral`;
        }

        // 3. Upload Comprovante
        if (formData.comprovantePagamento) {
          try {
            const ext = formData.comprovantePagamento.name.split('.').pop() || 'pdf';
            const path = `${protocolNumber}/${safeName}_comprovante_${timestamp}.${ext}`;
            comprovanteUrl = await uploadFileToSupabase('fitcheck-comprovantes', path, formData.comprovantePagamento);
          } catch (uploadErr) {
            console.warn('Erro ao subir comprovante no storage:', uploadErr);
            comprovanteUrl = `pendente_${protocolNumber}_comprovante`;
          }
        } else {
          comprovanteUrl = `sem_comprovante_${protocolNumber}`;
        }

        // 4. Salvar na Tabela do Supabase
        const pesoNumerico = parseWeightValue(formData.peso) || 0;
        const alturaNumerica = parseHeightValue(formData.altura) || 0;

        const { error: insertError } = await client
          .from('inscricoes_fitcheck')
          .insert({
            protocolo: protocolNumber,
            nome: formData.nome.trim(),
            idade: parseInt(formData.idade, 10),
            peso_kg: pesoNumerico,
            altura_m: alturaNumerica,
            email: formData.email.trim(),
            celular: formData.celular.trim(),
            objetivo_principal: formData.objetivoPrincipal || 'Foco no desafio 21 dias',
            foto_frontal_url: fotoFrontalUrl,
            foto_lateral_url: fotoLateralUrl,
            comprovante_pagamento_url: comprovanteUrl,
            termo_aceito: formData.termoAceito,
            status_pagamento: 'em_analise',
            status_desafio: 'inscrita',
          });

        if (insertError) {
          console.error('Erro ao salvar no Supabase:', insertError);
          setSubmitError(`Erro ao gravar no banco: ${insertError.message} (${insertError.code || 'RLS/Tabela'}).`);
          setIsSubmitting(false);
          return;
        }
      } else {
        console.warn('Supabase não está configurado com variáveis de ambiente. Usando modo local/demonstração.');
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      const submission: SubmittedRegistration = {
        ...formData,
        id: protocolNumber,
        dataCadastro: new Date().toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        statusPagamento: 'em_analise',
        imc: imcInfo ? {
          valor: imcInfo.valor,
          classificacao: imcInfo.classificacao,
          cor: imcInfo.cor,
        } : undefined,
      };

      setIsSubmitting(false);
      onSuccess(submission);
    } catch (err: any) {
      console.error('Erro no envio do formulário:', err);
      setSubmitError(`Ocorreu uma falha ao enviar: ${err?.message || err}.`);
      setIsSubmitting(false);
    }
  };


  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 space-y-8">
      {/* Motivation Banner */}
      <DailyMotivationBanner />

      {submitError && (
        <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 text-red-900 shadow-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-bold text-sm">Não foi possível gravar no banco de dados</h4>
            <p className="text-xs text-red-700 mt-1">{submitError}</p>
            <p className="text-xs text-red-600 mt-2">
              Dica: Verifique se executou o script SQL no SQL Editor do Supabase ou se as chaves estão corretas.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSubmitError(null)}
            className="text-red-500 hover:text-red-800 text-xs font-bold px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Registration Card */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Dados Pessoais */}
        <div className="bg-[#141414] rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-800/80 pb-4">
            <div className="w-9 h-9 rounded-xl bg-[#FF914D] text-black flex items-center justify-center font-black text-sm shadow-md shadow-[#FF914D]/20">
              1
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                Dados Pessoais & Contato
              </h2>
              <p className="text-xs text-stone-400">
                Informações para cadastro e acesso ao grupo exclusivo
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Nome Completo */}
            <div className="sm:col-span-2">
              <label htmlFor="nome" className="block text-sm font-semibold text-stone-200 mb-1.5">
                Nome Completo <span className="text-[#FF914D] font-bold">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="nome"
                  value={formData.nome}
                  onChange={handleNomeChange}
                  placeholder="Ex: Gabriela Medeiros Silva"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all outline-none text-white ${
                    errors.nome
                      ? 'border-red-500/80 bg-red-950/20 focus:ring-2 focus:ring-red-500/30'
                      : 'border-stone-800 focus:border-[#FF914D] focus:ring-2 focus:ring-[#FF914D]/20 bg-[#1A1A1A]'
                  }`}
                />
              </div>
              {errors.nome && <p className="text-xs text-red-400 mt-1 font-medium">{errors.nome}</p>}
            </div>

            {/* Idade */}
            <div>
              <label htmlFor="idade" className="block text-sm font-semibold text-stone-200 mb-1.5">
                Idade <span className="text-[#FF914D] font-bold">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="idade"
                  value={formData.idade}
                  onChange={handleIdadeChange}
                  placeholder="Ex: 28"
                  maxLength={2}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all outline-none text-white ${
                    errors.idade
                      ? 'border-red-500/80 bg-red-950/20 focus:ring-2 focus:ring-red-500/30'
                      : 'border-stone-800 focus:border-[#FF914D] focus:ring-2 focus:ring-[#FF914D]/20 bg-[#1A1A1A]'
                  }`}
                />
              </div>
              {errors.idade && <p className="text-xs text-red-400 mt-1 font-medium">{errors.idade}</p>}
            </div>

            {/* Celular / WhatsApp */}
            <div>
              <label htmlFor="celular" className="block text-sm font-semibold text-stone-200 mb-1.5">
                Celular / WhatsApp <span className="text-[#FF914D] font-bold">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  id="celular"
                  value={formData.celular}
                  onChange={handleCelularChange}
                  placeholder="(00) 00000-0000"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all outline-none text-white ${
                    errors.celular
                      ? 'border-red-500/80 bg-red-950/20 focus:ring-2 focus:ring-red-500/30'
                      : 'border-stone-800 focus:border-[#FF914D] focus:ring-2 focus:ring-[#FF914D]/20 bg-[#1A1A1A]'
                  }`}
                />
              </div>
              {errors.celular ? (
                <p className="text-xs text-red-400 mt-1 font-medium">{errors.celular}</p>
              ) : (
                <p className="text-[11px] text-stone-400 mt-1">Para envio do link do grupo VIP</p>
              )}
            </div>

            {/* E-mail */}
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold text-stone-200 mb-1.5">
                E-mail <span className="text-[#FF914D] font-bold">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  placeholder="seuemail@exemplo.com"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all outline-none text-white ${
                    errors.email
                      ? 'border-red-500/80 bg-red-950/20 focus:ring-2 focus:ring-red-500/30'
                      : 'border-stone-800 focus:border-[#FF914D] focus:ring-2 focus:ring-[#FF914D]/20 bg-[#1A1A1A]'
                  }`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-400 mt-1 font-medium">{errors.email}</p>}
            </div>
          </div>
        </div>

        {/* Section 2: Medidas & Avaliação Física Inicial */}
        <div className="bg-[#141414] rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-800/80 pb-4">
            <div className="w-9 h-9 rounded-xl bg-[#FF914D] text-black flex items-center justify-center font-black text-sm shadow-md shadow-[#FF914D]/20">
              2
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                Medidas & Ponto de Partida
              </h2>
              <p className="text-xs text-stone-400">
                Seus dados corporais para acompanhamento dos 21 dias
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Peso */}
            <div>
              <label htmlFor="peso" className="block text-sm font-semibold text-stone-200 mb-1.5">
                Peso Atual (em kg) <span className="text-[#FF914D] font-bold">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                  <Scale className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="peso"
                  value={formData.peso}
                  onChange={handlePesoChange}
                  placeholder="ex: 60,5"
                  className={`w-full pl-10 pr-12 py-2.5 rounded-xl border text-sm transition-all outline-none text-white ${
                    errors.peso
                      ? 'border-red-500/80 bg-red-950/20 focus:ring-2 focus:ring-red-500/30'
                      : 'border-stone-800 focus:border-[#FF914D] focus:ring-2 focus:ring-[#FF914D]/20 bg-[#1A1A1A]'
                  }`}
                />
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-semibold text-stone-400 pointer-events-none">
                  kg
                </span>
              </div>
              {errors.peso ? (
                <p className="text-xs text-red-400 mt-1 font-medium">{errors.peso}</p>
              ) : (
                <p className="text-[11px] text-stone-400 mt-1">Exemplo: 60,5 kg ou 65 kg</p>
              )}
            </div>

            {/* Altura */}
            <div>
              <label htmlFor="altura" className="block text-sm font-semibold text-stone-200 mb-1.5">
                Altura (em m) <span className="text-[#FF914D] font-bold">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                  <Ruler className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="altura"
                  value={formData.altura}
                  onChange={handleAlturaChange}
                  placeholder="ex: 1,69"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm transition-all outline-none text-white ${
                    errors.altura
                      ? 'border-red-500/80 bg-red-950/20 focus:ring-2 focus:ring-red-500/30'
                      : 'border-stone-800 focus:border-[#FF914D] focus:ring-2 focus:ring-[#FF914D]/20 bg-[#1A1A1A]'
                  }`}
                />
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-semibold text-stone-400 pointer-events-none">
                  m
                </span>
              </div>
              {errors.altura ? (
                <p className="text-xs text-red-400 mt-1 font-medium">{errors.altura}</p>
              ) : (
                <p className="text-[11px] text-stone-400 mt-1">Exemplo: 1,69 m ou 1.69</p>
              )}
            </div>
          </div>

          {/* Dynamic IMC Feedback Card */}
          {imcInfo && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-4 rounded-2xl border border-stone-700 bg-[#1A1A1A] text-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold uppercase tracking-wider text-stone-400">Seu IMC Calculado:</span>
                <span className="text-sm font-extrabold text-[#FF914D]">{imcInfo.valor} ({imcInfo.classificacao})</span>
              </div>
              <p className="text-stone-300">{imcInfo.dica}</p>
            </motion.div>
          )}

          {/* Objetivo Principal */}
          <div className="pt-2">
            <label className="block text-sm font-semibold text-stone-200 mb-2">
              Qual é o seu objetivo principal no Desafio FitCheck 21 Dias?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {OBJETIVOS.map((item) => (
                <label
                  key={item}
                  className={`flex items-center gap-2.5 p-3.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                    formData.objetivoPrincipal === item
                      ? 'border-[#FF914D] bg-[#FF914D]/15 text-white shadow-md font-bold'
                      : 'border-stone-800 bg-[#181818] text-stone-300 hover:bg-[#1f1f1f] hover:border-stone-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="objetivoPrincipal"
                    value={item}
                    checked={formData.objetivoPrincipal === item}
                    onChange={(e) => setFormData((prev) => ({ ...prev, objetivoPrincipal: e.target.value }))}
                    className="accent-[#FF914D] w-4 h-4 cursor-pointer"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Fotos para Avaliação Física (Frontal e Lateral) */}
        <div className="bg-[#141414] rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-800/80 pb-4 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FF914D] text-black flex items-center justify-center font-black text-sm shadow-md shadow-[#FF914D]/20">
                3
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                  Fotos do Corpo para Avaliação Física
                </h2>
                <p className="text-xs text-stone-400">
                  Registro visual do Dia 1 para comparação com o Dia 21 (ambas obrigatórias)
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setGuidelineModalOpen(true)}
              className="text-xs font-bold text-[#FF914D] hover:text-[#ffaa75] bg-[#1E1E1E] hover:bg-[#252525] border border-stone-700 hover:border-[#FF914D]/40 px-3.5 py-1.5 rounded-xl inline-flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Ver Dicas de Foto</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Foto Frontal */}
            <div id="fotoFrontal">
              <PhotoUploader
                id="fotoFrontalInput"
                label="Foto Frontal (De Frente)"
                subtext="Corpo inteiro de frente, braços soltos e postura relaxada"
                required={true}
                type="frontal"
                file={formData.fotoFrontal}
                preview={formData.fotoFrontalPreview}
                error={errors.fotoFrontal}
                onFileChange={handleFotoFrontalChange}
                onOpenGuideline={() => setGuidelineModalOpen(true)}
              />
            </div>

            {/* Foto Lateral */}
            <div id="fotoLateral">
              <PhotoUploader
                id="fotoLateralInput"
                label="Foto Lateral (De Perfil)"
                subtext="Corpo inteiro de lado (perfil), postura natural"
                required={true}
                type="lateral"
                file={formData.fotoLateral}
                preview={formData.fotoLateralPreview}
                error={errors.fotoLateral}
                onFileChange={handleFotoLateralChange}
                onOpenGuideline={() => setGuidelineModalOpen(true)}
              />
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-3.5 rounded-2xl bg-[#181818] border border-stone-800 flex items-start gap-2.5 text-xs text-stone-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              <strong>Sigilo e Respeito Total:</strong> As fotos são acessadas estritamente pela equipe de avaliação física FitCheck para gerar sua comparação do dia 1 vs dia 21. Nunca são divulgadas sem sua permissão formal por escrito.
            </p>
          </div>
        </div>

        {/* Section 4: Comprovante de Pagamento */}
        <div id="comprovantePagamento">
          <PaymentSection
            comprovanteFile={formData.comprovantePagamento}
            comprovantePreview={formData.comprovantePreview}
            comprovanteFileName={formData.comprovanteFileName}
            comprovanteError={errors.comprovantePagamento}
            onComprovanteChange={handleComprovanteChange}
          />
        </div>

        {/* Section 5: Termo de Compromisso & Envio */}
        <div className="bg-gradient-to-r from-[#1E1E1E] via-[#171717] to-[#1E1E1E] rounded-3xl p-6 sm:p-7 border border-stone-800 space-y-5 shadow-xl">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              id="termoAceito"
              checked={formData.termoAceito}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, termoAceito: e.target.checked }));
                if (errors.termoAceito) setErrors((prev) => ({ ...prev, termoAceito: undefined }));
              }}
              className="accent-[#FF914D] w-5 h-5 rounded mt-0.5 cursor-pointer"
            />
            <span className="text-xs sm:text-sm text-stone-200 leading-relaxed font-medium">
              Eu confirmo que todas as informações acima são verdadeiras, estou apta a realizar atividades físicas e me comprometo com os <strong className="text-white">21 dias de superação do Desafio FitCheck</strong>! <span className="text-[#FF914D] font-bold">*</span>
            </span>
          </label>
          {errors.termoAceito && (
            <p className="text-xs text-red-400 font-medium pl-8">{errors.termoAceito}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-2xl bg-[#FF914D] hover:bg-[#ff7724] active:scale-[0.99] text-black font-black text-base sm:text-lg shadow-xl shadow-[#FF914D]/25 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Processando Inscrição...</span>
              </>
            ) : (
              <>
                <Flame className="w-5 h-5 text-black" />
                <span>FINALIZAR INSCRIÇÃO • DESAFIO FITCHECK</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-stone-400">
            Todos os campos marcados com <span className="text-[#FF914D] font-bold">*</span> são de preenchimento obrigatório.
          </p>
        </div>
      </form>

      {/* Photo Guideline Modal */}
      <PhotoGuidelineModal
        isOpen={guidelineModalOpen}
        onClose={() => setGuidelineModalOpen(false)}
      />
    </div>
  );
};
