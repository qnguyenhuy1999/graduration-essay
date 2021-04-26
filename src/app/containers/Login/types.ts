/* --- STATE --- */
import { LoginResult } from 'types/auth';

export interface LoginState {
  loading: boolean;
  error?: any;
  loginResult?: LoginResult | null;
}

export type ContainerState = LoginState;
