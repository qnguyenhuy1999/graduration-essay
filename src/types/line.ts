export type Direction = 'top' | 'right' | 'bottom' | 'left';

export interface Line {
  mainId: number;
  mainDirection: Direction;
  extraId: number;
  extraDirection: Direction;
}
