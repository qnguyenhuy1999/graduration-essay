/* --- STATE --- */
import { Slide } from 'types/slide';

export interface HomeState {
  loading: boolean;
  slides: Slide[];
  createSlideResult: any;
  removeSlideResult: any;
  error: any;
}

export type ContainerState = HomeState;
