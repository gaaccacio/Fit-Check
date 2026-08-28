import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project') &&
  !supabaseAnonKey.includes('your-anon-key')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function uploadFileToSupabase(
  bucketName: 'fitcheck-avaliacoes' | 'fitcheck-comprovantes',
  filePath: string,
  file: File
): Promise<string> {
  if (!supabase) {
    throw new Error('Supabase não configurado');
  }

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) {
    throw uploadError;
  }

  // Get public or signed url
  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
  return data.publicUrl || filePath;
}
