/* --- STATE --- */
import { NodeElement } from 'types/element';
import { Line } from 'types/line';

export interface HomeState {
  listElements: NodeElement[];
  listLines: Line[];
}

export type ContainerState = HomeState;
