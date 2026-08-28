import React, { useState } from 'react';
import { Database, Key, CheckCircle, AlertTriangle, ExternalLink, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

export const SupabaseStatusBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-6">
      <div className={`rounded-2xl border p-4 transition-all duration-200 ${
        isSupabaseConfigured 
          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
          : 'bg-gradient-to-r from-amber-50 to-orange-50/60 border-amber-200 text-amber-900 shadow-xs'
      }`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            {isSupabaseConfigured ? (
              <div className="p-1.5 rounded-lg bg-emerald-600 text-white shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4" />
              </div>
            ) : (
              <div className="p-1.5 rounded-lg bg-amber-600 text-white shrink-0 mt-0.5">
                <Database className="w-4 h-4" />
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold">
                  {isSupabaseConfigured 
                    ? 'Conexão Supabase Ativa: Cadastros salvos em tempo real no banco!' 
                    : 'Modo Demonstração Ativo (Conecte seu Supabase em 2 passos)'}
                </h4>
              </div>
              <p className="text-xs text-stone-600 mt-0.5">
                {isSupabaseConfigured
                  ? 'Os dados dos formulários e imagens estão sendo gravados na sua tabela e buckets do Supabase.'
                  : 'O formulário funciona perfeitamente em modo teste. Para gravar no seu banco, adicione as variáveis no seu `.env` ou Netlify.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 shrink-0 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>{isExpanded ? 'Ocultar' : 'Como Conectar'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-stone-200/80 text-xs space-y-3">
            <div className="bg-white rounded-xl p-3 border border-stone-200 space-y-2">
              <span className="font-bold text-stone-800 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-rose-500" />
                Onde pegar suas chaves no Supabase:
              </span>
              <ol className="list-decimal list-inside space-y-1 text-stone-600 pl-1">
                <li>No painel do Supabase, clique em <strong>Project Settings (ícone de engrenagem)</strong> &gt; <strong>API</strong>.</li>
                <li>Copie a <strong>Project URL</strong> e a <strong>anon / public key</strong>.</li>
                <li>Adicione no seu arquivo <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-800 font-mono">.env</code> (ou nas Environment Variables do Netlify):</li>
              </ol>
              <div className="bg-stone-900 text-stone-200 font-mono text-[11px] p-2.5 rounded-lg overflow-x-auto select-all">
                VITE_SUPABASE_URL=https://seu-projeto.supabase.co<br/>
                VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-500">
              <span>Arquivo SQL de criação da tabela já disponível em <code className="font-mono text-stone-700">supabase/schema.sql</code></span>
              <a 
                href="https://supabase.com/dashboard" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-rose-600 hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <span>Acessar Supabase Dashboard</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
