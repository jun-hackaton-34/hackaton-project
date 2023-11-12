import { AuthError } from '@supabase/supabase-js';

export default interface IErrorState {
  error: boolean;
  errorMessage: string | AuthError;
}
