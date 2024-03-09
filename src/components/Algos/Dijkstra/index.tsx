import { useEffect, useState } from "react";
import { type Graph, type Edge, type Vertice } from "../../../utils/types";

export default function Dijkstra() {
  const [graph, setGraph] = useState<Graph>();
  const [root, setRoot] = useState();
  const [ajacencyMatrix, setAjacencyMatrix] = useState(new Map());

  useEffect(() => {
    const handleStorage = () => {
      const edges = JSON.parse(window.localStorage.edges);
      const vertices = JSON.parse(window.localStorage.vertices);
      const dijkstra_root = window.localStorage.dijkstra_root;

      const is_dijkstra_able = edges.every((edge: Edge) => +edge[2]! > 0);
      const is_root_valid = vertices.includes(dijkstra_root);
      if (!is_dijkstra_able || !is_root_valid) {
        console.log("Cannot traverse by dijkstra");
      } else {
        setGraph({ Vertices: vertices, Edges: edges });
        setRoot(dijkstra_root);

        const matrix = new Map(
          vertices.map((vert: Vertice) => [
            vert,
            edges
              .filter(([src]: [Vertice]) => vert === src)
              .map(([_, dest, weight]: Edge) => [dest, +weight!]),
          ])
        );
        setAjacencyMatrix(matrix);
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
    let distance = new Map();
    graph?.Vertices.map((vert) => {
      distance.set(vert, Infinity);
    });
    distance.set(root, 0);

    console.log("ajacencyMatrix", ajacencyMatrix);
    let marked: any[] = [];
    marked.push(root);
    let unvisited = [];
    if (graph?.Vertices) {
      unvisited = [...graph.Vertices];

      while (unvisited?.length) {
        let min_node: string | String = "";
        for (let node of unvisited) {
          if (min_node === "") {
            min_node = node;
          } else if (distance.get(node) < distance.get(min_node)) {
            min_node = node;
          }
        }

        for (let neighbor of ajacencyMatrix.get(min_node)) {
          const travel_cost = distance.get(min_node) + +neighbor[1];
          if (travel_cost < distance.get(neighbor[0])) {
            distance.set(neighbor[0], travel_cost);
          }
        }
        let index = unvisited.indexOf(min_node);
        unvisited.splice(index, 1);
      }
      console.log("results: ", distance);
    }

    return () => {};
  }, [graph, ajacencyMatrix]);

  // return (<p>hello wordle</p>)
}
