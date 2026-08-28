export interface RegistrationFormData {
  nome: string;
  idade: string;
  peso: string; // formatted e.g. "60,5 kg" or "60,5"
  altura: string; // formatted e.g. "1,69 m" or "1,69"
  email: string;
  celular: string; // formatted "(00) 00000-0000"
  fotoFrontal: File | null;
  fotoFrontalPreview: string;
  fotoLateral: File | null;
  fotoLateralPreview: string;
  comprovantePagamento: File | null;
  comprovantePreview: string;
  comprovanteFileName: string;
  objetivoPrincipal?: string;
  termoAceito: boolean;
}

export interface FormErrors {
  nome?: string;
  idade?: string;
  peso?: string;
  altura?: string;
  email?: string;
  celular?: string;
  fotoFrontal?: string;
  fotoLateral?: string;
  comprovantePagamento?: string;
  termoAceito?: string;
}

export interface SubmittedRegistration extends RegistrationFormData {
  id: string;
  dataCadastro: string;
  statusPagamento: 'em_analise' | 'confirmado';
  imc?: {
    valor: number;
    classificacao: string;
    cor: string;
  };
}
