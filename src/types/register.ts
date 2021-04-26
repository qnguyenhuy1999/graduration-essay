export interface RegisterFormValues {
  email: string;
  name: string;
  sex: 0 | 1; // 0: Female 1: Male
  age: number;
  password: string;
  confirmPassword: string;
}
