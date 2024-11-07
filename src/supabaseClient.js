import { createClient } from '@supabase/supabase-js';

// Supabase URL e Key (você encontra isso no painel do Supabase)
const supabaseUrl = 'https://<sua-supabase-url>.supabase.co';
const supabaseAnonKey = '<sua-supabase-key>';

// Cria a instância do cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
