export type refType = React.MutableRefObject<any> | string;
export type Vertice = String;
export type Edge = [Vertice, Vertice];
export type Graph = {
  Vertices: Vertice[];
  Edges: Edge[];
};
