import {getLocalstorage, setLocalstorage} from "../utils";
import {type gui_state, type guis} from "../utils/types";
import {ls_key} from "../utils/types";

const open_sett_btn =
    document.querySelector<HTMLButtonElement>(".open_perf_sett");
const open_algos = document.querySelector<HTMLButtonElement>(".open_algos");
const algos = document.querySelector<HTMLElement>(".algos");
const perf_settings = document.querySelector<HTMLElement>(".perf_settings");
const graph_input = document.querySelector<HTMLElement>(".graph_input");
const minimize_btn = document.querySelector<HTMLButtonElement>(".minimize");
const unminimize_btn = document.querySelector<HTMLButtonElement>(".unminimize");
const gui = document.querySelectorAll<HTMLElement>(".gui_input");

const toggle_gui_part = (gui: HTMLElement, gui_alias: guis) => {
    switch (gui!.style.display) {
        case "none":
            gui!.style.display = "flex";
            gui_st[gui_alias] = true;
            break;
        case "flex":
            gui!.style.display = "none";
            gui_st[gui_alias] = false;
            break;
    }

    setLocalstorage(ls_key.show_gui, gui_st);
};

let gui_st: gui_state;

const gi_style = graph_input!.style;

function localstorage_init() {
    if (!getLocalstorage(ls_key.isOriented)) {
        setLocalstorage(ls_key.isOriented, "false")
    }
    if (!getLocalstorage(ls_key.vertices)) {
        setLocalstorage(ls_key.vertices, "[]")
    }
    if (!getLocalstorage(ls_key.edges)) {
        setLocalstorage(ls_key.edges, "[]")
    }
    if (!getLocalstorage(ls_key.smooth_render)) {
        setLocalstorage(ls_key.smooth_render, "false")
    }
    if (!getLocalstorage(ls_key.show_gui)) {
        gui_st = {graph_input: true, perf_settings: false, algos: false};
        gi_style.display = "flex";
        perf_settings!.style.display = "none";
        algos!.style.display = "none"
        setLocalstorage(ls_key.show_gui, gui_st);
    }
}

localstorage_init()

gui_st = getLocalstorage(ls_key.show_gui);
gi_style.display = gui_st.graph_input ? "flex" : "none";
perf_settings!.style.display = gui_st.perf_settings ? "flex" : "none";
algos!.style.display = gui_st.algos ? "flex" : "none";

open_sett_btn!.onclick = () => toggle_gui_part(perf_settings!, "perf_settings");
open_algos!.onclick = () => toggle_gui_part(algos!, "algos");

minimize_btn!.onclick = () => {
    if (getLocalstorage(ls_key.show_gui)) {
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
