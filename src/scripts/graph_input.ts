import type { Edge, Graph, Vertice } from "../utils/types";

const form = document.querySelector<HTMLFormElement>(".make_graph");
const error = document.querySelector<HTMLHeadingElement>(".error");

window.dispatchEvent(new Event("storage"));

function load_values_from_localstorage() {
  const is_visited_before = !!localStorage.getItem("vertices");
  if (!is_visited_before) {
    return;
  }
  form!.vertices.value = JSON.parse(localStorage.getItem("vertices")!);
  form!.edges.value = JSON.parse(localStorage.getItem("edges")!).join(" ");
  form!.isOriented.checked = JSON.parse(localStorage.getItem("isOriented")!);
}

window.addEventListener("load", load_values_from_localstorage);

function validate_graph(G: Graph): boolean | String[] {
  let err: String[] = [];
  const edges = G.Edges.flat();

  if (G.Vertices[0] === "") {
    return false;
  }

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
  console.log(e);

  let vertices: Vertice[] = e
    //@ts-ignore
    .target!.vertices.value.split(",")
    .map((vert: Vertice) => vert.trim());

  let edges: Edge[] = e
    //@ts-ignore
    .target!.edges.value.split(" ")
    .filter((edge: String) => edge !== "")
    .map((edge: String) => edge.split(","));

  //@ts-ignore
  let isOriented = e.target!.isOriented.checked;

  let is_valid_graph = validate_graph({
    Vertices: vertices,
    Edges: edges,
  });

  if (Array.isArray(is_valid_graph)) {
    error!.textContent = `Error: non-existent edges: ${is_valid_graph}`;
  } else if (!is_valid_graph) {
    error!.textContent = `Error: cannot make empty graph`;
  } else {
    error!.textContent = "";
    localStorage.setItem("vertices", JSON.stringify(vertices));
    localStorage.setItem("edges", JSON.stringify(edges));
    localStorage.setItem("isOriented", JSON.stringify(isOriented));
    window.dispatchEvent(new Event("storage"));
  }
};
