const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get("page");
const routerOutlet = document.getElementById("routerOutlet");

switch (page) {
  case "julia":
    loadPage("juliaPage");
    import("./julia.js");
    break;
  case "sierpinski":
    loadPage("sierpinskiPage");
    import("./sierpinski.js");
    break;
  case "mandelbrot":
  default:
    loadPage("mandelbrotPage");
    import("./mandelbrot.js");
    break;
}

/**
 * Loads template into router outlet
 * @param {string} id template id
 */
function loadPage(id) {
  const template = document.getElementById(id);

  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error("Not template");
  }

  const clone = template.content.cloneNode(true);
  routerOutlet.classList.add(id);
  routerOutlet.appendChild(clone);
}
