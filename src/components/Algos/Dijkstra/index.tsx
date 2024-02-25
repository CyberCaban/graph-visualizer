import { useEffect, useState } from "react";
import {
  type Graph,
  type Edge,
  type Vertice,
  type graph_matrix,
} from "../../../utils/types";

export default function Dijkstra() {
  const [graph, setgraph] = useState<Graph>();
  const [root, setRoot] = useState();

  useEffect(() => {
    const handleStorage = () => {
      //   const { edges, vertices, dijkstra_root } = window.localStorage;
      const edges = JSON.parse(window.localStorage.edges);
      const vertices = JSON.parse(window.localStorage.vertices);
      const dijkstra_root = window.localStorage.dijkstra_root;
      console.log(edges, vertices);

      const is_dijkstra_able = edges.every((edge: Edge) => +edge[2]! > 0);
      const is_root_valid = vertices.includes(dijkstra_root);
      if (!is_dijkstra_able || !is_root_valid) {
        console.log("Cannot traverse by dijkstra");
      } else {
        console.log("looks food");

        setgraph({ Vertices: vertices, Edges: edges });
        setRoot(dijkstra_root);
      }
    };
    handleStorage();
    // TODO: Rewrite astro components to react

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    const dijkstra = () => {
      const matrix = () => {
        const res: graph_matrix = {}; //{vert: [vert1: weight, vert2: weight]}
        graph.Vertices.forEach((vert: Vertice) => {
          res[vert] = [];
        });
      };
    };
    return () => {};
  }, [graph]);
}
