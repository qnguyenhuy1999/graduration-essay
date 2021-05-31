export interface Slide {
  id: string;
  name: string;
  status: 'able';
  accessModifier: 1 | 0;
}

export interface InfoDetailSlide {
  accessModifier: 0 | 1;
  id: string;
  name: string;
  status: 'able';
  userId: string;
}

export interface CreateSlideFormValues {
  name: string;
}

export interface UpdateSlidePayload {
  id: string;
  name: string;
}
