export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (!digits) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

export function formatWeight(value: string): string {
  // Allow user to type numbers and comma/dot
  const clean = value.replace(/[^0-9.,]/g, '');
  if (!clean) return '';
  
  // Normalize comma/dot
  const normalized = clean.replace(',', '.');
  const num = parseFloat(normalized);
  if (isNaN(num)) return clean;
  return clean;
}

export function formatHeight(value: string): string {
  // Allow user to type numbers, comma, dot
  const clean = value.replace(/[^0-9.,]/g, '');
  return clean;
}

export function parseWeightValue(value: string): number | null {
  const clean = value.replace('kg', '').trim().replace(',', '.');
  const num = parseFloat(clean);
  return isNaN(num) || num <= 0 ? null : num;
}

export function parseHeightValue(value: string): number | null {
  let clean = value.replace('m', '').trim().replace(',', '.');
  let num = parseFloat(clean);
  if (isNaN(num) || num <= 0) return null;
  // If user typed 169 (cm), convert to 1.69 m
  if (num > 3) {
    num = num / 100;
  }
  return num;
}

export function calculateIMC(pesoStr: string, alturaStr: string): {
  valor: number;
  classificacao: string;
  cor: string;
  dica: string;
} | null {
  const peso = parseWeightValue(pesoStr);
  const altura = parseHeightValue(alturaStr);

  if (!peso || !altura || altura <= 0.5 || peso <= 20) return null;

  const imc = peso / (altura * altura);
  const rounded = Math.round(imc * 10) / 10;

  if (rounded < 18.5) {
    return {
      valor: rounded,
      classificacao: 'Abaixo do peso',
      cor: 'text-amber-600 bg-amber-50 border-amber-200',
      dica: 'Foco no ganho de massa magra e nutrição balanceada durante os 21 dias!',
    };
  } else if (rounded < 24.9) {
    return {
      valor: rounded,
      classificacao: 'Peso adequado',
      cor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      dica: 'Excelente! O desafio vai te ajudar a tonificar, ganhar disposição e definir o corpo.',
    };
  } else if (rounded < 29.9) {
    return {
      valor: rounded,
      classificacao: 'Sobrepeso',
      cor: 'text-rose-700 bg-rose-50 border-rose-200',
      dica: 'Perfeito para iniciar uma rotina consistente de queima calórica e autocuidado.',
    };
  } else {
    return {
      valor: rounded,
      classificacao: 'Obesidade',
      cor: 'text-purple-700 bg-purple-50 border-purple-200',
      dica: 'Uma jornada passo a passo com foco em saúde, consistência e pequenas vitórias diárias.',
    };
  }
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}
