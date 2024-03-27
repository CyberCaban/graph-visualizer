import type {refType} from "./types";
export type LOCAL_STORAGE_KEYS = "vertices" | "edges" | "show_gui" | "smooth_render" | "dijkstra_root" | "isOriented"

export const getElement = (ref: refType): HTMLElement => {
    let resultRef;
    if (typeof ref === "string") {
        resultRef = document.getElementById(ref);
    } else {
        resultRef = ref?.current;
    }
    return resultRef;
};

export const getLocalstorage = (key: LOCAL_STORAGE_KEYS) => {
    try {
        return JSON.parse(localStorage.getItem(key)!);
    } catch {
        console.log(`ne parsim: ${localStorage.getItem(key)}`);
        return localStorage.getItem(key);
    }
};

export const setLocalstorage = (key: LOCAL_STORAGE_KEYS, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
};
