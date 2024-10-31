import { createClient } from '@supabase/supabase-js'

// Supabase URL and public API key (replace with your details)
const SUPABASE_URL = 'https://wjfcmtexzuectdphzmkx.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqZmNtdGV4enVlY3RkcGh6bWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg3MTkyNTEsImV4cCI6MjA0NDI5NTI1MX0.QY-fB5NMbZOKHzftuzbX4Xi4HueTgklMoJ_PCLlY9jk'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
