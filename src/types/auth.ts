export interface UserInfo {
  id: string;
  email: string;
  name: string;
  sex: number;
  age: number;
}

export interface LoginResult {
  loginToken: string;
  data: UserInfo;
}
