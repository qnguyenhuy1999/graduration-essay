export interface DirectionDescription {
  id?: number;
  text: string;
  linked: boolean;
}

export interface Direction {
  top: DirectionDescription;
  right: DirectionDescription;
  bottom: DirectionDescription;
  left: DirectionDescription;
}

export interface NodeElement {
  id?: number;
  x: number;
  y: number;
  content: string;
  direction: Direction;
}

export interface Position {
  x: number;
  y: number;
}
