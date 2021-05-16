export interface Element {
  elementId: string;
  position: Position;
  caption: string;
  html: string;
  status: 'able' | string;
  nodes: Node[];
}

export interface Node {
  id: string;
  position: Position;
  positionNext: Position;
  nodeLinkDefault: number;
  nodeNumber: number;
  caption: string;
  linkId: 'empty' | string;
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
}

export interface RemoveElementResponse {
  elementId: string;
  message: string;
}

export interface ResponseNewElement {
  newElement: Element;
  elementId: string;
  nodeId: string;
  linked: string | 'empty';
}

export interface SetPositionType {
  x: number;
  y: number;
  elementId: string;
}

export interface NodeUpdate {
  id: string;
  caption: string;
}

export interface UpdateElement {
  slideId: string;
  elementId: string;
  position: Position;
  caption: string;
  html: string;
  status: 'able' | string;
  nodes: NodeUpdate[];
}

export interface ResponseNewElement {
  newElement: Element;
  elementId: string;
  nodeId: string;
  linked: string | 'empty';
}

export interface EditElementFormValues {
  html: any;
  content: {
    top: NodeUpdate;
    right: NodeUpdate;
    bottom: NodeUpdate;
    left: NodeUpdate;
  } | null;
}
