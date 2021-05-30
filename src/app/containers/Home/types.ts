/* --- STATE --- */
import { Slide } from 'types/slide';

export interface HomeState {
  loading: boolean;
  slides: Slide[];
  createSlideResult: any;
  updateSlideResult: any;
  removeSlideResult: any;
  error: any;
}

export type ContainerState = HomeState;
