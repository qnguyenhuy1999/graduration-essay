export interface UpdatePasswordFormValues {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdatePasswordPayload {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface UpdateProfileFormValues {
  name: string;
  sex: number;
  age: number;
}
