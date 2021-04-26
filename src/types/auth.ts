import { Slide } from './slide';

export interface UserInfo {
  id: string;
  email: string;
  name: string;
  slides: Slide[];
}

export interface LoginResult {
  loginToken: string;
  data: UserInfo;
}
