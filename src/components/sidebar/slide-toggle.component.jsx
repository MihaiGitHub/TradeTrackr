import { slideUp } from "./slide-up.component";
import { slideDown } from "./slide-down.component";

export function slideToggle(elm, duration = 300) {
  if (window.getComputedStyle(elm).display === "none") {
    slideDown(elm, duration);
  } else {
    slideUp(elm, duration);
  }
}
