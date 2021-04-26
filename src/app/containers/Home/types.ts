/* --- STATE --- */
import { Slide } from 'types/slide';

export interface HomeState {
  loading: boolean;
  slides: Slide[];
  error: any;
}

export type ContainerState = HomeState;
