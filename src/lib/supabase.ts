import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Obter URL e Chave do .env ou de configuração salva no navegador (para testes rápidos)
export function getSupabaseCredentials() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  const localUrl = typeof window !== 'undefined' ? localStorage.getItem('fitcheck_supabase_url') || '' : '';
  const localKey = typeof window !== 'undefined' ? localStorage.getItem('fitcheck_supabase_key') || '' : '';

  const url = localUrl || envUrl;
  const key = localKey || envKey;

  const isConfigured = Boolean(
    url &&
    key &&
    !url.includes('your-project') &&
    !key.includes('your-anon-key') &&
    url.startsWith('https://')
  );

  return { url, key, isConfigured };
}

let cachedClient: SupabaseClient | null = null;
let lastUrl = '';
let lastKey = '';

export function getSupabaseClient(): SupabaseClient | null {
  const { url, key, isConfigured } = getSupabaseCredentials();
  if (!isConfigured) return null;

  if (cachedClient && lastUrl === url && lastKey === key) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    });
    lastUrl = url;
    lastKey = key;
    return cachedClient;
  } catch (err) {
    console.error('Erro ao inicializar Supabase Client:', err);
    return null;
  }
}

export const isSupabaseConfigured = getSupabaseCredentials().isConfigured;
export const supabase = getSupabaseClient();

export async function uploadFileToSupabase(
  bucketName: 'fitcheck-avaliacoes' | 'fitcheck-comprovantes',
  filePath: string,
  file: File
): Promise<string> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase não configurado. Verifique VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.');
  }

  const { error: uploadError } = await client.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) {
    console.warn(`Aviso no upload para o bucket "${bucketName}":`, uploadError.message);
    // Se o bucket não existir ou der erro de RLS no Storage, retorna um identificador
    return `storage://${bucketName}/${filePath}`;
  }

  // Get public or signed url
  const { data } = client.storage.from(bucketName).getPublicUrl(filePath);
  return data.publicUrl || filePath;
}

export async function testSupabaseConnection(): Promise<{
  success: boolean;
  message: string;
  details?: any;
}> {
  const { url, key, isConfigured } = getSupabaseCredentials();
  if (!isConfigured) {
    return {
      success: false,
      message: 'As variáveis de ambiente VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não foram preenchidas.',
    };
  }

  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      message: 'Falha ao inicializar o cliente Supabase. Verifique se a URL é válida (ex: https://xyz.supabase.co).',
    };
  }

  try {
    // 1. Tentar ler da tabela (SELECT limitado a 1)
    const { data, error } = await client
      .from('inscricoes_fitcheck')
      .select('id')
      .limit(1);

    if (error) {
      // Se der erro de RLS no SELECT, o SELECT é bloqueado para anônimos (o que é normal pelas nossas regras de segurança)
      if (error.code === '42501' || error.message.includes('permission denied') || error.message.includes('security policy')) {
        return {
          success: true,
          message: 'Conectado ao Supabase com sucesso! (RLS ativo na leitura)',
          details: { table: 'inscricoes_fitcheck', rls: 'Ativo' }
        };
      }

      if (error.code === '42P01' || error.message.includes('relation') || error.message.includes('does not exist')) {
        return {
          success: false,
          message: 'A tabela "inscricoes_fitcheck" não existe no Supabase. Execute o script SQL no SQL Editor do Supabase.',
          details: error
        };
      }

      return {
        success: false,
        message: `Erro ao consultar Supabase: ${error.message} (${error.code || ''})`,
        details: error
      };
    }

    return {
      success: true,
      message: 'Conexão com Supabase validada e tabela "inscricoes_fitcheck" pronta!',
      details: { rows: data?.length ?? 0 }
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Falha de rede ao tentar conectar com ${url}: ${err.message || err}`,
      details: err
    };
  }
}

