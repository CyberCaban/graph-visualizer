import type { Edge, Graph, Vertice } from "../utils/types";

const form = document.querySelector<HTMLFormElement>(".make_graph");
const error = document.querySelector<HTMLHeadingElement>(".error");

window.dispatchEvent(new Event("storage"));

function validate_graph(G: Graph): boolean | String[] {
  let err: String[] = [];
  const edges = G.Edges.flat();

  for (let i = 0; i < edges.length; i++) {
    const el = edges[i];
    if (!G.Vertices.includes(el)) {
      err.push(el);
    }
  }

  if (err.length) {
    return err;
  }
  return true;
}

form!.onsubmit = (e) => {
  e.preventDefault();
  let vertices: Vertice[] = e
    //@ts-ignore
    .target!.vertices.value.split(",")
    .map((vert: Vertice) => vert.trim());

  let edges: Edge[] = e
    //@ts-ignore
    .target!.edges.value.split(" ")
    .filter((edge: String) => edge !== "")
    .map((edge: String) => edge.replace(/[()]/g, "").split(","));

  let is_valid_graph = validate_graph({
    Vertices: vertices,
    Edges: edges,
  });

  console.log(is_valid_graph);
  if (Array.isArray(is_valid_graph)) {
    error!.textContent = `Error: non-existent edges: ${is_valid_graph}`;
  } else {
    error!.textContent = "";
    localStorage.setItem("vertices", JSON.stringify(vertices));
    localStorage.setItem("edges", JSON.stringify(edges));
    window.dispatchEvent(new Event("storage"));
  }
};
