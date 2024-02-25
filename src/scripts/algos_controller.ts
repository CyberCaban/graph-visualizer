import { get_localstorage, set_localstorage } from "../utils";

const dijkstra = document.querySelector<HTMLFormElement>(".algos_dijkstra");

dijkstra!.onsubmit = (e) => {
  e.preventDefault();
  const root = dijkstra!.dijkstra_input.value;

  if (get_localstorage("vertices").includes(root)) {
    set_localstorage("dijkstra_root", root);
    window.dispatchEvent(new Event("storage"));
  }
};
