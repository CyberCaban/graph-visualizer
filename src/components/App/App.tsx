import GraphVisualizer from "../GraphVisualizer";
import Dijkstra from "../Algos/Dijkstra/Dijkstra.tsx";
import arrows_out from "./arrows-out.svg";
import arrows_in from "../../icons/arrows-in.svg";
import algos_icon from "../../icons/algos.svg";
import settings from "../../icons/settings.svg";
import { useEffect, useState } from "react";
import {
  type Edge,
  type Graph,
  type gui_state,
  type guis,
} from "../../utils/types.ts";
import { getLocalstorage, setLocalstorage } from "../../utils";
import Icon from "../Icon/Icon.tsx";
import Checkbox from "./../Checkbox/Checkbox";
import "./index.css";

export default function App() {
  const [vertices, setVertices] = useState("");
  const [edges, setEdges] = useState("");
  const [isOriented, setIsOriented] = useState<boolean>();
  const [root, setRoot] = useState<string>();
  const [isSmooth, setIsSmooth] = useState<boolean>();
  const [inertia, setInertia] = useState<boolean>();
  const [error, setError] = useState("");
  const [graph, setGraph] = useState<Graph>();
  const [showgui, setShowgui] = useState<gui_state>({
    graph_input: true,
    algos: false,
    perf_settings: false,
  });

  useEffect(() => {
    const handleStorage = () => {
      const show_gui = getLocalstorage("show_gui");
      const vertices_values = getLocalstorage("vertices");
      const edges_values = getLocalstorage("edges");
      const isOriented_value = getLocalstorage("isOriented");
      if (show_gui) setShowgui(show_gui);
      console.log(edges_values);
      if (vertices_values !== "[]") setVertices(vertices_values);
      if (edges_values !== "[]") setEdges(edges_values);
      setIsOriented(isOriented_value);
    };
    handleStorage();
  }, []);

  useEffect(() => {
    if (showgui.graph_input) {
      setLocalstorage("show_gui", showgui);
    }
  }, [showgui]);

  useEffect(() => {
    if (vertices && edges) {
      let vertices_values;
      let edges_values;
      if (typeof edges !== "object") {
        edges_values = edges
          .split(" ")
          .filter((edge: string) => edge !== "")
          .map((edge: string) => edge.split(","));
      } else {
        edges_values = edges;
      }
      if (typeof vertices !== "object") {
        vertices_values = vertices
          .split(",")
          .map((vert: string) => vert.trim());
      } else {
        vertices_values = vertices;
      }

      const validateGraph = (): boolean | Edge[] | string => {
        const invalid_edges = [];

        for (const [vert1, vert2, weight] of edges_values) {
          if (
            !vertices_values.includes(vert1) ||
            !vertices_values.includes(vert2)
          ) {
            invalid_edges.push([vert1, vert2, weight]);
          }
        }
        // @ts-ignore
        return invalid_edges.length ? invalid_edges : true;
      };
      const is_valid_graph = validateGraph();
      if (Array.isArray(is_valid_graph)) {
        setError(`Error: non-existent edges: ${is_valid_graph}`);
      } else if (typeof is_valid_graph === "string") {
        setError(is_valid_graph);
      } else {
        // @ts-ignore
        setGraph({ Edges: edges_values, Vertices: vertices_values });
        setError("");
        console.log(vertices);

        setLocalstorage("vertices", vertices);
        setLocalstorage("edges", edges);
        setLocalstorage("isOriented", isOriented);
      }
    } else {
      return;
    }
  }, [vertices, edges]);

  function handleGui(gui_part: guis) {
    switch (gui_part) {
      case "algos":
        setShowgui((prevState) => ({
          ...prevState!,
          algos: !prevState?.algos,
        }));
        break;
      case "perf_settings":
        setShowgui((prevState) => ({
          ...prevState!,
          perf_settings: !prevState?.perf_settings,
        }));
        break;
      case "graph_input":
        setShowgui((prevState) => ({
          ...prevState!,
          graph_input: !prevState?.graph_input,
        }));
        break;
    }
  }

  return (
    <main>
      <div>
        {showgui?.graph_input ? null : (
          <button
            className="icon_btn unminimize"
            onClick={() => handleGui("graph_input")}
          >
            <Icon src={arrows_out.src} className="unminimize_icon" />
          </button>
        )}
        {showgui?.graph_input && (
          <div className="gui">
            <section className="gui_input graph_input">
              <div className="btn_panel">
                <button
                  className="btn minimize"
                  onClick={() => handleGui("graph_input")}
                >
                  <Icon src={arrows_in.src} className="icon minimize_icon" />
                </button>
                <button
                  className="btn open_algos"
                  disabled
                  onClick={() => handleGui("algos")}
                >
                  <Icon src={algos_icon.src} className="icon" />
                </button>
                <button
                  className="btn open_perf_sett"
                  onClick={() => handleGui("perf_settings")}
                >
                  <Icon src={settings.src} className="icon" />
                </button>
              </div>
              <form className="make_graph" onSubmit={(e) => e.preventDefault()}>
                <label form="vertices">Input vertices</label>
                <input
                  type="text"
                  id="vertices"
                  name="vertices"
                  placeholder="ex. A,B,C..."
                  value={vertices}
                  onChange={(e) => setVertices(e.target.value)}
                />
                <label form="edges">Input edges</label>
                <input
                  type="text"
                  id="edges"
                  name="edges"
                  placeholder="ex. A,B,4 C,A,5..."
                  value={edges}
                  onChange={(e) => setEdges(e.target.value)}
                />
                <label
                  form="isOriented"
                  id="isOriented_label"
                  className="checkbox_label"
                >
                  Oriented:{" "}
                  <input
                    type="checkbox"
                    name="isOriented"
                    id="isOriented"
                    className="checkbox_input"
                    onChange={(e) => setIsOriented(e.target.checked)}
                  />
                </label>
                {/* <button type="submit" className="btn">
                  Make
                </button> */}
                <h4 className="error error_msg">{error}</h4>
              </form>
            </section>
            {showgui?.perf_settings && (
              <section className="gui_input perf_settings">
                <Checkbox
                  name="smooth_render"
                  label="Smooth render: "
                  id="smooth_render"
                  checked={isSmooth || false}
                  onChange={(e) => setIsSmooth(e.target.checked)}
                />
                <Checkbox
                  name="inertia"
                  label="Drag inertia: "
                  id="inertia"
                  checked={inertia || false}
                  onChange={(e) => setInertia(e.target.checked)}
                />
              </section>
            )}
            {showgui?.algos && (
              <section className="gui_input algos">
                <span className="text-red-500">Disabled</span>
                <form action="" className="algos_dijkstra">
                  <label form="">Dijkstra</label>
                  <input
                    type="text"
                    id="dijkstra_input"
                    name="dijkstra_input"
                    className="dijkstra_input"
                    onChange={(e) => setRoot(e.target.value)}
                  />
                  <h4 className="dijkstra_error error_msg"></h4>
                  <button className="btn" type="submit">
                    Start
                  </button>
                </form>
                {/* <Dijkstra graph={graph as Graph} root={root as string} /> */}
              </section>
            )}
          </div>
        )}
      </div>
      <GraphVisualizer
        vertices={graph?.Vertices ?? []}
        edges={graph?.Edges ?? []}
        isOriented={isOriented ? true : false}
        isSmooth={isSmooth}
        inertia={inertia}
      />
    </main>
  );
}
