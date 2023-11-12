import {
  AuthError,
  AuthTokenResponse,
  User,
  UserResponse,
} from '@supabase/supabase-js';

export interface IAuthContext {
  auth: boolean;
  user: User | null;
  login?: (email: string, password: string) => Promise<AuthTokenResponse>;
  signOut?: () => void;
  passwordReset?: (
    email: string
  ) => Promise<
    { data: object; error: null } | { data: null; error: AuthError }
  >;
  updatePassword?: (updatedPassword: string) => Promise<UserResponse>;
}
