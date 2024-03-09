import type { Edge, Graph, Vertice } from "../utils/types";

const form = document.querySelector<HTMLFormElement>(".make_graph");
const error = document.querySelector<HTMLHeadingElement>(".error");

window.dispatchEvent(new Event("storage"));

function loadValuesFromLocalStorage() {
  const hasVisitedBefore = !!localStorage.getItem("vertices");
  if (!hasVisitedBefore) {
    return;
  }

  const vertices = JSON.parse(localStorage.getItem("vertices")!);
  const edges = JSON.parse(localStorage.getItem("edges")!).join(" ");
  const isOriented = JSON.parse(localStorage.getItem("isOriented")!);

  form!.vertices.value = vertices;
  form!.edges.value = edges;
  form!.isOriented.checked = isOriented;
}

window.addEventListener("load", loadValuesFromLocalStorage);

function validateGraph(graph: Graph): boolean | Edge[] {
  const { Vertices: vertices, Edges: edges } = graph;
  const invalidEdges: Edge[] = [];

  if (vertices[0] === "") {
    return false;
  }

  for (const [vert1, vert2, weight] of edges) {
    if (!vertices.includes(vert1) || !vertices.includes(vert2)) {
      invalidEdges.push([vert1, vert2, weight]);
    }
  }

  return invalidEdges.length ? invalidEdges : true;
}

form!.onsubmit = (e) => {
  e.preventDefault();

  const target = e.target;
  if (!target) {
    return;
  }
  // @ts-ignore
  const verticesInput = target.vertices;
  // @ts-ignore
  const edgesInput = target.edges;
  // @ts-ignore
  const isOrientedInput = target.isOriented;

  if (!verticesInput || !edgesInput || !isOrientedInput) {
    return;
  }

  const verticesValues = verticesInput.value
    .split(",")
    .map((vert: string) => vert.trim());
  const edgesValues = edgesInput.value
    .split(" ")
    .filter((edge: string) => edge !== "")
    .map((edge: string) => edge.split(","));
  const isOrientedValue = isOrientedInput.checked;

  const isValidGraph = validateGraph({
    Vertices: verticesValues,
    Edges: edgesValues,
  });

  if (Array.isArray(isValidGraph)) {
    error!.textContent = `Error: non-existent edges: ${isValidGraph}`;
  } else if (!isValidGraph) {
    error!.textContent = `Error: cannot make empty graph`;
  } else {
    error!.textContent = "";
    localStorage.setItem("vertices", JSON.stringify(verticesValues));
    localStorage.setItem("edges", JSON.stringify(edgesValues));
    localStorage.setItem("isOriented", JSON.stringify(isOrientedValue));
    window.dispatchEvent(new Event("storage"));
  }
};
