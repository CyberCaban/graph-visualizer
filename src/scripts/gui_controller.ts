import type { gui_state } from "../utils/types";

const open_sett_btn =
  document.querySelector<HTMLButtonElement>(".open_perf_sett");
const sect = document.querySelector<HTMLElement>(".perf_settings");
const minimize_btn = document.querySelector<HTMLButtonElement>(".minimize");
const gui = document.querySelectorAll<HTMLElement>(".gui_input");

let gui_opened: gui_state;

if (!localStorage.getItem("show_gui")) {
  gui_opened = { graph_input: true, settings: false };
  localStorage.setItem("show_gui", JSON.stringify(gui_opened));
}

function get_show_gui() {
  return JSON.parse(localStorage.getItem("show_gui")!);
}

function set_show_gui(set_to: any) {
  localStorage.setItem("show_gui", JSON.stringify(set_to));
}

window.addEventListener("storage", (e) => {
  console.log(localStorage);
});

console.log(JSON.parse(localStorage.getItem("show_gui")!));

open_sett_btn!.onclick = () => {
  if (sect!.style.display === "none") {
    sect!.style.display = "flex";
  } else {
    sect!.style.display = "none";
  }
};

minimize_btn!.onclick = () => {
  if (get_show_gui()) {
    gui.forEach((item) => {
      console.log(item.style.display);
    });
  } else {
  }
};
