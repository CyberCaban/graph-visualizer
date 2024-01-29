const open_sett_btn =
  document.querySelector<HTMLButtonElement>(".open_perf_sett");
const sect = document.querySelector<HTMLElement>(".perf_settings");
const smooth_input = document.querySelector<HTMLInputElement>("#smooth_render");

window.dispatchEvent(new Event("storage"));

function load() {
  const is_visited_before = !!localStorage.getItem("smooth_render");
  if (!is_visited_before) {
    return;
  }

  smooth_input!.checked = JSON.parse(localStorage.getItem("smooth_render")!);
}

window.addEventListener("load", load);

open_sett_btn!.onclick = () => {
  if (sect!.style.display === "none") {
    sect!.style.display = "flex";
  } else {
    sect!.style.display = "none";
  }
};

smooth_input!.onchange = (e: any) => {
  const isSmooth = e.target!.checked;
  console.log(isSmooth);

  localStorage.setItem("smooth_render", JSON.stringify(isSmooth));
  window.dispatchEvent(new Event("storage"));
};
