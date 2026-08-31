export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (!digits) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

export function formatWeight(value: string): string {
  // Extract only digits, max 5 characters (e.g. 10020 -> 100,20)
  const digits = value.replace(/\D/g, '').slice(0, 5);
  if (!digits) return '';

  if (digits.length <= 2) {
    // e.g. "6", "65"
    return digits;
  }

  if (digits.length === 3) {
    const num = parseInt(digits, 10);
    // If between 300 and 999 (e.g. 605 -> 60,5, 755 -> 75,5)
    if (num >= 300) {
      return `${digits.slice(0, 2)},${digits.slice(2)}`;
    }
    // If 100 to 299 (e.g. 100, 115, 120 kg whole number)
    return digits;
  }

  if (digits.length === 4) {
    const firstTwo = parseInt(digits.slice(0, 2), 10);
    // If starting with 30-99 (e.g. 6050 -> 60,50, 7525 -> 75,25)
    if (firstTwo >= 30) {
      return `${digits.slice(0, 2)},${digits.slice(2, 4)}`;
    }
    // If starting with 10-29 (e.g. 1005 -> 100,5, 1205 -> 120,5)
    return `${digits.slice(0, 3)},${digits.slice(3, 4)}`;
  }

  // 5 digits: e.g. "10020" -> "100,20", "12550" -> "125,50"
  return `${digits.slice(0, 3)},${digits.slice(3, 5)}`;
}

export function formatHeight(value: string): string {
  // Extract only digits, max 3 characters (e.g. 169 -> 1,69)
  const digits = value.replace(/\D/g, '').slice(0, 3);
  if (!digits) return '';

  if (digits.length === 1) {
    return digits;
  }

  if (digits.length === 2) {
    // e.g. "16" -> "1,6"
    return `${digits[0]},${digits[1]}`;
  }

  // 3 digits: e.g. "169" -> "1,69"
  return `${digits[0]},${digits.slice(1, 3)}`;
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
