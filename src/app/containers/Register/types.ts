/* --- STATE --- */

export interface RegisterState {
  loading: boolean;
  error?: any;
  registerResult?: string;
}

export type ContainerState = RegisterState;
