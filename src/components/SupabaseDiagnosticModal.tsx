import React, { useState, useEffect } from 'react';
import { Database, Key, CheckCircle, AlertCircle, RefreshCw, X, Shield, Server, ArrowRight, ExternalLink } from 'lucide-react';
import { getSupabaseCredentials, getSupabaseClient, testSupabaseConnection } from '../lib/supabase';

interface SupabaseDiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCredentialsUpdated?: () => void;
}

export const SupabaseDiagnosticModal: React.FC<SupabaseDiagnosticModalProps> = ({
  isOpen,
  onClose,
  onCredentialsUpdated,
}) => {
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const [testResult, setTestResult] = useState<{
    running: boolean;
    success?: boolean;
    message?: string;
  }>({ running: false });

  useEffect(() => {
    if (isOpen) {
      const creds = getSupabaseCredentials();
      setUrl(creds.url || '');
      setKey(creds.key || '');
      handleTestConnection();
    }
  }, [isOpen]);

  const handleTestConnection = async () => {
    setTestResult({ running: true });
    const result = await testSupabaseConnection();
    setTestResult({
      running: false,
      success: result.success,
      message: result.message,
    });
  };

  const handleSave = () => {
    if (url.trim()) {
      localStorage.setItem('fitcheck_supabase_url', url.trim());
    } else {
      localStorage.removeItem('fitcheck_supabase_url');
    }

    if (key.trim()) {
      localStorage.setItem('fitcheck_supabase_key', key.trim());
    } else {
      localStorage.removeItem('fitcheck_supabase_key');
    }

    handleTestConnection();
    if (onCredentialsUpdated) onCredentialsUpdated();
  };

  const handleClear = () => {
    localStorage.removeItem('fitcheck_supabase_url');
    localStorage.removeItem('fitcheck_supabase_key');
    setUrl(import.meta.env.VITE_SUPABASE_URL || '');
    setKey(import.meta.env.VITE_SUPABASE_ANON_KEY || '');
    setTimeout(handleTestConnection, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-[#141414] rounded-3xl max-w-lg w-full shadow-2xl border border-stone-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#1A1A1A] border-b border-stone-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#FF914D]/20 text-[#FF914D] border border-[#FF914D]/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white font-display">Diagnóstico & Conexão Supabase</h3>
              <p className="text-xs text-stone-400">Verifique se suas inscrições estão conectadas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-stone-200">
          {/* Status Alert */}
          <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
            testResult.running 
              ? 'bg-blue-950/40 border-blue-800/80 text-blue-200' 
              : testResult.success 
                ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200' 
                : 'bg-amber-950/40 border-amber-800/80 text-amber-200'
          }`}>
            {testResult.running ? (
              <RefreshCw className="w-5 h-5 animate-spin text-blue-400 shrink-0 mt-0.5" />
            ) : testResult.success ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider mb-0.5">
                {testResult.running ? 'Testando Conexão...' : testResult.success ? 'Conectado ao Supabase' : 'Atenção / Não Conectado'}
              </h4>
              <p className="text-xs text-stone-300">
                {testResult.message || 'Clique em testar para validar a conexão.'}
              </p>
            </div>
          </div>

          {/* Form Credentials */}
          <div className="space-y-3.5 bg-[#1A1A1A] p-4 rounded-2xl border border-stone-800">
            <h4 className="font-bold text-xs uppercase text-stone-300 tracking-wider flex items-center justify-between">
              <span>Chaves de Acesso</span>
              <a 
                href="https://supabase.com/dashboard" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#FF914D] lowercase font-semibold hover:underline flex items-center gap-1 text-[11px]"
              >
                abrir painel <ExternalLink className="w-3 h-3" />
              </a>
            </h4>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Supabase Project URL
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://xyzcompany.supabase.co"
                className="w-full px-3 py-2 text-xs font-mono bg-[#141414] text-white border border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF914D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Supabase Anon / Public Key
              </label>
              <input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full px-3 py-2 text-xs font-mono bg-[#141414] text-white border border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF914D]"
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 py-2.5 px-3 bg-[#FF914D] hover:bg-[#ff7724] text-black text-xs font-black rounded-xl transition cursor-pointer"
              >
                Salvar & Testar Conexão
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                Limpar
              </button>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-2 text-xs text-stone-300 bg-[#1A1A1A] p-4 rounded-2xl border border-stone-800">
            <h5 className="font-bold text-white flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#FF914D]" />
              Por que os dados podem não ter sido gravados?
            </h5>
            <ul className="space-y-1.5 list-disc list-inside text-stone-300 pl-1 text-[12px]">
              <li><strong>Variáveis no Netlify:</strong> No Netlify, adicione <code className="bg-stone-800 text-stone-200 px-1.5 py-0.5 rounded font-mono">VITE_SUPABASE_URL</code> e <code className="bg-stone-800 text-stone-200 px-1.5 py-0.5 rounded font-mono">VITE_SUPABASE_ANON_KEY</code> e faça um novo deploy.</li>
              <li><strong>Tabela no Supabase:</strong> Você executou o script SQL no <em>SQL Editor</em> do Supabase para criar a tabela <code className="bg-stone-800 text-stone-200 px-1.5 py-0.5 rounded font-mono">inscricoes_fitcheck</code>?</li>
              <li><strong>Buckets de Fotos:</strong> Certifique-se de que os buckets <code className="bg-stone-800 text-stone-200 px-1.5 py-0.5 rounded font-mono">fitcheck-avaliacoes</code> e <code className="bg-stone-800 text-stone-200 px-1.5 py-0.5 rounded font-mono">fitcheck-comprovantes</code> foram criados com leitura pública.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#1A1A1A] border-t border-stone-800 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
          >
            Fechar Diagnóstico
          </button>
        </div>
      </div>
    </div>
  );
};
