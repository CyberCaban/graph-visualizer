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

smooth_input!.onchange = (e: any) => {
  const isSmooth = e.target!.checked;

  localStorage.setItem("smooth_render", JSON.stringify(isSmooth));
  window.dispatchEvent(new Event("storage"));
};
