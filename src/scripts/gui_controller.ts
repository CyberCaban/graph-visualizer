import { get_localstorage, set_localstorage } from "../utils";
import type { gui_state } from "../utils/types";

const open_sett_btn =
  document.querySelector<HTMLButtonElement>(".open_perf_sett");
const perf_sett = document.querySelector<HTMLElement>(".perf_settings");
const graph_input = document.querySelector<HTMLElement>(".graph_input");
const minimize_btn = document.querySelector<HTMLButtonElement>(".minimize");
const unminimize_btn = document.querySelector<HTMLButtonElement>(".unminimize");
const gui = document.querySelectorAll<HTMLElement>(".gui_input");

let gui_st: gui_state;

const gi_style = graph_input!.style;

if (!get_localstorage("show_gui")) {
  gui_st = { graph_input: true, perf_settings: false };
  gi_style.display = "flex";
  perf_sett!.style.display = "none";
  set_localstorage("show_gui", gui_st);
} else {
  gui_st = get_localstorage("show_gui");
  gi_style.display = gui_st.graph_input ? "flex" : "none";
  perf_sett!.style.display = gui_st.perf_settings ? "flex" : "none";
}

// window.addEventListener("storage", (e) => {
//   console.log(localStorage);
// });

open_sett_btn!.onclick = () => {
  switch (perf_sett!.style.display) {
    case "none":
      perf_sett!.style.display = "flex";
      gui_st.perf_settings = true;
      break;
    case "flex":
      perf_sett!.style.display = "none";
      gui_st.perf_settings = false;
      break;
  }
  set_localstorage("show_gui", gui_st);
};

minimize_btn!.onclick = () => {
  if (get_localstorage("show_gui")) {
    gui.forEach((item) => {
      item.style.display = "none";
    });
  }
  unminimize_btn!.style.display = "block";
};

unminimize_btn!.onclick = () => {
  gui.forEach((item) => {
    const item_st = item.style;
    for (let ui in gui_st) {
      if (item.classList.contains(ui)) {
        item_st.display = gui_st[ui] ? "flex" : "none";
      }
    }
  });
  unminimize_btn!.style.display = "none";
};
