import { get_localstorage, set_localstorage } from "../utils";

const dijkstra = document.querySelector<HTMLFormElement>(".algos_dijkstra");
const dijkstra_error =
  document.querySelector<HTMLHeadingElement>(".dijkstra_error");

dijkstra!.onsubmit = (e) => {
  e.preventDefault();
  const root = dijkstra!.dijkstra_input.value;

  set_localstorage("dijkstra_root", root);
  window.dispatchEvent(new Event("storage"));
  if (!get_localstorage("vertices").includes(root)) {
    dijkstra_error!.textContent = "Invalid vertice";
  } else {
    dijkstra_error!.textContent = "";
  }
};
