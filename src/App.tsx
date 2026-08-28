import React, { useState } from 'react';
import { Header } from './components/Header';
import { RegistrationForm } from './components/RegistrationForm';
import { SuccessView } from './components/SuccessView';
import { SupabaseStatusBanner } from './components/SupabaseStatusBanner';
import { SubmittedRegistration } from './types';
import { Heart, Sparkles, Shield, Dumbbell } from 'lucide-react';

export default function App() {
  const [submittedData, setSubmittedData] = useState<SubmittedRegistration | null>(null);

  const handleSuccess = (data: SubmittedRegistration) => {
    setSubmittedData(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSubmittedData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] flex flex-col justify-between text-stone-800">
      {/* Top micro bar */}
      <div className="bg-stone-900 text-stone-200 py-1.5 px-4 text-center text-xs font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-rose-400" />
        <span>Inscrições Abertas para a Turma de 21 Dias • Vagas Limitadas</span>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {submittedData ? (
          <SuccessView data={submittedData} onReset={handleReset} />
        ) : (
          <div>
            <Header />
            <SupabaseStatusBanner />
            <RegistrationForm onSuccess={handleSuccess} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-rose-100 py-6 px-4 text-center text-xs text-stone-500">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-display font-bold text-stone-800 text-sm">
            <Dumbbell className="w-4 h-4 text-rose-500" />
            <span>FitCheck © 2026 • Desafio 21 Dias</span>
          </div>

          <div className="flex items-center gap-1 text-stone-500">
            <span>Desenvolvido com foco no empoderamento e saúde feminina</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </footer>
    </div>
  );
}
