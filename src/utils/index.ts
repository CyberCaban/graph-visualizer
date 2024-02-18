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

export const get_localstorage = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key)!);
  } catch {
    console.log(`ne parsim: ${localStorage.getItem(key)}`);
    return localStorage.getItem(key);
  }
};

export const set_localstorage = (key: string, value: any) => {
  typeof value === "object"
    ? localStorage.setItem(key, JSON.stringify(value))
    : localStorage.setItem(key, value);
};
