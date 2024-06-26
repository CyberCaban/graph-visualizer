import React from "react";

export type refType = React.MutableRefObject<any> | string;
export type Vertice = String;
export type Edge_weight = String;
export type Edge = [Vertice, Vertice, Edge_weight?];
export type Graph = {
    Vertices: Vertice[];
    Edges: Edge[];
};
export type ArrowProps = {
    start: refType;
    end: refType;
    oriented?: boolean;
    weight?: string;
    color?: string;
    strokeWidth?: string | number;
    fill?: string;
    showHead?: boolean;
    headScale?: number;
    headColor?: string;
};
export type ArrowHead = {
    show: boolean;
    posX: number;
    posY: number;
    rotation: number;
    scale: number;
};
export type ArrowState = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    stroke: string;
    strokeWidth: number | string;
    fill: string;
    head: ArrowHead;
};
export type gui_state = {
    [index: string]: any;
    graph_input: boolean;
    perf_settings: boolean;
    algos: boolean;
};
export type graph_matrix = {
    [index: string]: any;
};

export enum ls_key {
    edges = "edges",
    isOriented = "isOriented",
    show_gui = "show_gui",
    smooth_render = "smooth_render",
    vertices = "vertices"
}

export type guis = "perf_settings" | "algos" | "graph_input"