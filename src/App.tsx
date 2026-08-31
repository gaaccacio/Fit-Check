import React, { useState } from 'react';
import { Header } from './components/Header';
import { RegistrationForm } from './components/RegistrationForm';
import { SuccessView } from './components/SuccessView';
import { SupabaseDiagnosticModal } from './components/SupabaseDiagnosticModal';
import { SubmittedRegistration } from './types';
import { Heart, Sparkles, Shield, Dumbbell, Database } from 'lucide-react';

export default function App() {
  const [submittedData, setSubmittedData] = useState<SubmittedRegistration | null>(null);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);

  const handleSuccess = (data: SubmittedRegistration) => {
    setSubmittedData(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSubmittedData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex flex-col justify-between text-stone-100 selection:bg-[#FF914D] selection:text-black">
      {/* Top micro bar */}
      <div className="bg-[#141414] border-b border-stone-800 text-stone-300 py-2 px-4 text-center text-xs font-semibold tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#FF914D]" />
        <span>Inscrições Abertas para a Turma de 21 Dias • <strong className="text-[#FF914D]">Vagas Limitadas</strong></span>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {submittedData ? (
          <SuccessView data={submittedData} onReset={handleReset} />
        ) : (
          <div>
            <Header />
            <RegistrationForm onSuccess={handleSuccess} />
          </div>
        )}
      </main>

      {/* Diagnostic Modal */}
      <SupabaseDiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-[#0e0e0e] border-t border-stone-800/80 py-6 px-4 text-center text-xs text-stone-500">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-display font-bold text-stone-200 text-sm">
            <Dumbbell className="w-4 h-4 text-[#FF914D]" />
            <span>FitCheck © 2026 • Desafio 21 Dias</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsDiagnosticOpen(true)}
              className="text-stone-400 hover:text-[#FF914D] transition flex items-center gap-1 cursor-pointer font-medium"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Conexão Supabase</span>
            </button>

            <div className="flex items-center gap-1 text-stone-400">
              <span>Constância e resultado</span>
              <Heart className="w-3.5 h-3.5 text-[#FF914D] fill-[#FF914D]" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

