export interface Element {
  elementId: string;
  position: Position;
  caption: string;
  html: string;
  status: 'able' | string;
  nodes?: Node[];
}

export interface Node {
  id: string;
  position: Position;
  positionNext: Position;
  nodeLinkDefault: number;
  nodeNumber: number;
  caption: string;
  linkId: 'empty' | 'string';
}

export interface Position {
  x: number;
  y: number;
}

export interface CreateElement {
  elementId: string;
  nodeId: string;
  slideId: string;
}

export interface RemoveElement {
  elementId: string;
  slideId: string;
}

export interface RemoveElementResponse {
  elementId: string;
  message: string;
}

export interface NewElement {
  id: string;
  slideId: string;
  position: Position;
  caption: string;
  html: string;
  status: 'able' | string;
}

export interface ResponseNewElement {
  newElement: NewElement;
  linked: string;
}
