import { slideUp } from "./SlideUp";
import { slideDown } from "./SlideDown";

export function slideToggle(elm: HTMLElement, duration: number = 300): void {
  if (window.getComputedStyle(elm).display === "none") {
    slideDown(elm, duration);
  } else {
    slideUp(elm, duration);
  }
}
