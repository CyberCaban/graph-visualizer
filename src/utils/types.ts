export type refType = React.MutableRefObject<any> | string;
export type Vertice = String;
export type Edge = [Vertice, Vertice];
export type Graph = {
  Vertices: Vertice[];
  Edges: Edge[];
};
export type ArrowProps = {
  start: refType;
  end: refType;
  oriented?: boolean;
  color?: string;
  strokeWidth?: string | number;
  fill?: string;
  showHead?: boolean;
  headScale?: number;
  headColor?: string;
};
export type ArrowHead = {
  show: boolean;
  posX: number;
  posY: number;
  rotation: number;
  scale: number;
};
export type ArrowState = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  stroke: string;
  strokeWidth: number | string;
  fill: string;
  head: ArrowHead;
};
export type gui_state = {
  graph_input: boolean;
  settings: boolean;
};
