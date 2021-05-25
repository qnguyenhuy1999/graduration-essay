/* --- STATE --- */
import { Element, ResponseNewElement } from 'types/element';
import { Line } from 'types/line';

export interface EditorState {
  loading: boolean;
  listElements: Element[];
  listLines: Line[];
  createElementResult: ResponseNewElement | null;
  removeElementResult: any;
  resetSlideResult: any;
  removeLineResult: any;
  createLineResult: any;
  updateElementResult: any;
  error: any;
}

export type ContainerState = EditorState;
