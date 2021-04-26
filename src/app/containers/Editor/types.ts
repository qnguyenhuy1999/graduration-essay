/* --- STATE --- */
import { NodeElement } from 'types/element';
import { Line } from 'types/line';

export interface EditorState {
  listElements: NodeElement[];
  listLines: Line[];
}

export type ContainerState = EditorState;
