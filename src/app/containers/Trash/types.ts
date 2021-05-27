/* --- STATE --- */
import { Slide } from 'types/slide';

export interface TrashState {
  loading: boolean;
  slides: Slide[];
  reOpenSlideResult: any;
  error: any;
}

export type ContainerState = TrashState;
