import { createClient } from '@supabase/supabase-js';

const url = 'https://glfkfamleygvfaamjsrp.supabase.co';
const publicKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsZmtmYW1sZXlndmZhYW1qc3JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2OTM0NTYsImV4cCI6MjAxNTI2OTQ1Nn0.Q4rVQ5FU4tRSySvLGZdZhPI_Bg1loBrTLHDVfuoBnds';
export const supabase = createClient(url, publicKey);

export default supabase;
