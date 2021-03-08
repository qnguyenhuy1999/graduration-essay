/* --- STATE --- */
import { NodeElement } from 'types/element';

export interface HomeState {
  listElements: NodeElement[];
}

export type ContainerState = HomeState;
