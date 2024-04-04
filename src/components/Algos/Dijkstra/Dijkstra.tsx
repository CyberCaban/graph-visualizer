import { useEffect, useMemo, useState } from "react";
import { type Graph, type Edge, type Vertice } from "../../../utils/types";
import { getElement } from "../../../utils";

const dijkstraOriented = (
  graph: Graph,
  root: Vertice,
  ajacencyMatrix: Map<string, Edge[]>
) => {
  let dist: Map<String, number> = new Map();
  graph?.Vertices.map((vert) => {
    dist.set(vert, Infinity);
  });
  dist.set(root, 0);

  let unvisited = [];
  if (graph?.Vertices) {
    unvisited = [...graph.Vertices];

    while (unvisited?.length) {
      let min_node: string | String = "";
      for (let node of unvisited) {
        if (min_node === "") {
          min_node = node;
        } else if (dist.get(node) < dist.get(min_node)) {
          min_node = node;
        }
      }

      for (let neighbor of ajacencyMatrix.get(`${min_node}`)) {
        const travel_cost = dist.get(min_node) + +neighbor[1];
        if (travel_cost < dist.get(neighbor[0])) {
          dist.set(neighbor[0], travel_cost);
        }
      }
      let index = unvisited.indexOf(min_node);
      unvisited.splice(index, 1);
    }

    return dist;
  }
};

type Props = {
  graph: Graph;
  root: Vertice;
};

export default function Dijkstra({ graph, root }: Props) {
  const [ajacencyMatrix, setAjacencyMatrix] = useState(new Map());
  const [distance, setDistance] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    const is_dijkstra_able = graph?.Edges.every((edge: Edge) => +edge[2]! > 0);
    const is_root_valid = graph?.Vertices.includes(root);
    console.log(is_root_valid);
    if (!is_dijkstra_able || !is_root_valid) {
      console.log("Cannot traverse by dijkstra");
      setDistance(new Map());
    } else {
      const matrix = new Map(
        graph.Vertices.map((vert: Vertice) => [
          vert,
          graph.Edges.filter(([src]) => vert === src).map(
            ([_, dest, weight]: Edge) => [dest, +weight!]
          ),
        ])
      );
      setAjacencyMatrix(matrix);
    }
    // TODO: Rewrite astro components to react

    return () => {};
  }, [graph, root]);

  useEffect(() => {
    // console.log("ajacencyMatrix", ajacencyMatrix);
    // console.log(dijkstraOriented(graph, root, ajacencyMatrix));
    // setDistance(
    //   () => dijkstraOriented(graph, root, ajacencyMatrix) as Map<string, number>
    // );
  }, [ajacencyMatrix]);

  useEffect(() => {
    // console.log("distance: ", distance);
    // console.log(Array.from(distance));
  }, [distance]);

  return (
    <>
      {/* {distance &&
        Array.from(distance).map(([vert, dist]) => (
          <span key={vert}>{`${vert}: ${dist}`}</span>
        ))} */}
    </>
  );
}
