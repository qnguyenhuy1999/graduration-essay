/* --- STATE --- */
import { Element, ResponseNewElement } from 'types/element';
import { Line } from 'types/line';
import { InfoDetailSlide } from 'types/slide';

export interface EditorState {
  loading: boolean;
  infoSlideDetail: InfoDetailSlide | null;
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
