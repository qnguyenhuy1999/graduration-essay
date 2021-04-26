import { UserInfo } from 'types/auth';

export interface AuthState {
  loading: boolean;
  isAuthLoaded: boolean;
  authInfo?: UserInfo | null;
  error?: any;
}

export type ContainerState = AuthState;
