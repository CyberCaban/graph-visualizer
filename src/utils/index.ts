import type { refType } from "./types";

export const getElement = (ref: refType): HTMLElement => {
  let resultRef;
  if (typeof ref === "string") {
    resultRef = document.getElementById(ref);
  } else {
    resultRef = ref?.current;
  }
  return resultRef;
};
