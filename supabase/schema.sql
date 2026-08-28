-- ==============================================================================
-- FITCHECK - DESAFIO 21 DIAS
-- Script SQL para Criação do Banco de Dados no Supabase
-- Inclui: Tabelas, Storage Buckets, Políticas de Segurança (RLS), Triggers e Índices
-- ==============================================================================

-- 1. HABILITAR EXTENSÃO DE UUID (se ainda não estiver habilitada)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUM PARA STATUS DE PAGAMENTO E AVALIAÇÃO (Opcional, ou usar CHECK constraints)
DO $$ BEGIN
    CREATE TYPE status_pagamento_enum AS ENUM ('em_analise', 'confirmado', 'recusado');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE status_desafio_enum AS ENUM ('inscrita', 'em_andamento', 'concluido', 'desistente');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. TABELA PRINCIPAL DE INSCRIÇÕES
CREATE TABLE IF NOT EXISTS public.inscricoes_fitcheck (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    protocolo VARCHAR(20) NOT NULL UNIQUE,
    nome VARCHAR(255) NOT NULL,
    idade INTEGER NOT NULL CHECK (idade >= 14 AND idade <= 100),
    peso_kg NUMERIC(5,2) NOT NULL CHECK (peso_kg > 20 AND peso_kg < 300),
    altura_m NUMERIC(4,2) NOT NULL CHECK (altura_m > 0.5 AND altura_m < 2.5),
    imc NUMERIC(4,1) GENERATED ALWAYS AS (ROUND((peso_kg / (altura_m * altura_m))::numeric, 1)) STORED,
    email VARCHAR(255) NOT NULL,
    celular VARCHAR(30) NOT NULL,
    objetivo_principal TEXT,
    
    -- URLs dos arquivos armazenados no Supabase Storage
    foto_frontal_url TEXT NOT NULL,
    foto_lateral_url TEXT NOT NULL,
    comprovante_pagamento_url TEXT NOT NULL,
    
    -- Metadados da inscrição
    termo_aceito BOOLEAN NOT NULL DEFAULT true,
    status_pagamento status_pagamento_enum NOT NULL DEFAULT 'em_analise',
    status_desafio status_desafio_enum NOT NULL DEFAULT 'inscrita',
    observacoes_admin TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. ÍNDICES PARA ALTA PERFORMANCE DE CONSULTA
CREATE INDEX IF NOT EXISTS idx_inscricoes_email ON public.inscricoes_fitcheck (email);
CREATE INDEX IF NOT EXISTS idx_inscricoes_celular ON public.inscricoes_fitcheck (celular);
CREATE INDEX IF NOT EXISTS idx_inscricoes_protocolo ON public.inscricoes_fitcheck (protocolo);
CREATE INDEX IF NOT EXISTS idx_inscricoes_status_pagamento ON public.inscricoes_fitcheck (status_pagamento);
CREATE INDEX IF NOT EXISTS idx_inscricoes_created_at ON public.inscricoes_fitcheck (created_at DESC);

-- 5. TRIGGER AUTOMÁTICO PARA ATUALIZAR O CAMPO updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON public.inscricoes_fitcheck;
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.inscricoes_fitcheck
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 6. HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE public.inscricoes_fitcheck ENABLE ROW LEVEL SECURITY;

-- Política 1: Permitir inserção anônima (qualquer usuária pode enviar seu cadastro pelo formulário)
CREATE POLICY "Permitir insercao publica de inscricoes"
ON public.inscricoes_fitcheck
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Política 2: Leitura apenas para administradores autenticados (ou via Service Role)
CREATE POLICY "Permitir leitura apenas para autenticados"
ON public.inscricoes_fitcheck
FOR SELECT
TO authenticated
USING (true);

-- Política 3: Atualização apenas para administradores autenticados
CREATE POLICY "Permitir update apenas para autenticados"
ON public.inscricoes_fitcheck
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);


-- ==============================================================================
-- 7. CONFIGURAÇÃO DOS BUCKETS DO SUPABASE STORAGE
-- ==============================================================================

-- Criar Bucket para Fotos de Avaliação Física (Privado por padrão para privacidade)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    (
        'fitcheck-avaliacoes', 
        'fitcheck-avaliacoes', 
        false, 
        10485760, -- 10MB
        ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic']
    ),
    (
        'fitcheck-comprovantes', 
        'fitcheck-comprovantes', 
        false, 
        10485760, -- 10MB
        ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf']
    )
ON CONFLICT (id) DO NOTHING;

-- Políticas de Storage: Permitir Upload anônimo (pelo formulário web)
CREATE POLICY "Permitir upload publico de fotos de avaliacao"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'fitcheck-avaliacoes');

CREATE POLICY "Permitir upload publico de comprovantes"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'fitcheck-comprovantes');

-- Políticas de Storage: Permitir leitura e download apenas para usuários autenticados (administradores/avaliadores)
CREATE POLICY "Permitir leitura de avaliacoes apenas para autenticados"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'fitcheck-avaliacoes');

CREATE POLICY "Permitir leitura de comprovantes apenas para autenticados"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'fitcheck-comprovantes');
