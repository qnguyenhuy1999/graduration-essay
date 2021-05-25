export interface Line {
  linkId: string;
  from: string;
  to: string;
}
export interface RemoveLine {
  linkId: string;
}

export interface CreateLine {
  eSource: string;
  nSource: string;
  eTarget: string;
  nTarget: string;
}
