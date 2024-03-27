import GraphVisualizer from "../GraphVisualizer";
import Dijkstra from "../Algos/Dijkstra";
import arrows_out from './arrows-out.svg'
import arrows_in from '../../../public/arrows-in.svg'
import algos_icon from '../../../public/algos.svg'
import settings from '../../../public/settings.svg'
import "./index.css"
import {useEffect, useState} from "react";
import {type Edge, type Graph, type gui_state, type guis} from "../../utils/types.ts";
import {getLocalstorage, setLocalstorage} from "../../utils";
import Arrow from "../Arrow";

export default function App() {
    const [vertices, setVertices] = useState<string>("");
    const [edges, setEdges] = useState<string>("");
    const [isOriented, setIsOriented] = useState<boolean>();
    const [error, setError] = useState("");
    const [graph, setGraph] = useState<Graph>();
    const [showgui, setShowgui] = useState<gui_state>({
        graph_input: true,
        algos: false,
        perf_settings: false
    });

    useEffect(() => {
        const handleStorage = () => {
            const show_gui = getLocalstorage("show_gui")
            const vertices_values = getLocalstorage("vertices")
            const edges_values = getLocalstorage("edges")
            const isOriented_value = getLocalstorage("isOriented")
            setShowgui(show_gui)
            setVertices(vertices_values)
            setEdges(edges_values)
            setIsOriented(isOriented_value)

        }
        handleStorage()
    }, []);

    useEffect(() => {
        showgui.graph_input &&
        setLocalstorage("show_gui", showgui)
    }, [showgui]);

    useEffect(() => {
        console.log(vertices)
        const vertices_values = vertices.split(",").map((vert: string) => vert.trim())
        const edges_values: Edge[] = edges.split(" ").filter((edge: string) => edge !== "").map((edge: string) => edge.split(","))
        const validateGraph = (): boolean | Edge[] | string => {
            const invalid_edges = []

            // if (vertices_values![0] === "") {
            //     return "Vertices array is empty"
            // }
            if (vertices_values.length !== [...new Set(vertices_values)].length) {
                return "Duplicate vertices"
            }

            for (const [vert1, vert2, weight] of edges_values) {
                if (!vertices_values.includes(vert1) || !vertices_values.includes(vert2)) {
                    invalid_edges.push([vert1, vert2, weight])
                }
            }
            return invalid_edges.length ? invalid_edges : true
        }

        const is_valid_graph = validateGraph()
        if (Array.isArray(is_valid_graph)) {
            setError(`Error: non-existent edges: ${is_valid_graph}`)
        } else if (typeof is_valid_graph === "string") {
            setError(is_valid_graph)
        } else {
            setGraph({Edges: edges_values, Vertices: vertices_values})
            setLocalstorage("vertices", vertices_values)
            setLocalstorage("edges", edges_values)
            setLocalstorage("isOriented", isOriented)
        }
    }, [vertices, edges]);

    function handleGui(gui_part: guis) {
        switch (gui_part) {
            case "algos":
                setShowgui(prevState => ({...prevState!, algos: !prevState?.algos}))
                break
            case "perf_settings":
                setShowgui(prevState => ({...prevState!, perf_settings: !prevState?.perf_settings}))
                break
            case "graph_input":
                setShowgui(prevState => ({...prevState!, graph_input: !prevState?.graph_input}))
                setShowgui(prevState => ({...prevState!, algos: false}))
                setShowgui(prevState => ({...prevState!, perf_settings: false}))
                break
        }
    }

    return (
        <main>
            <div className="gui">
                {showgui?.graph_input ? null : <button className="icon_btn unminimize"
                                                       onClick={() => handleGui("graph_input")}>
                    <img src={arrows_out.src} className="unminimize_icon" alt=""/>
                </button>}
                {showgui?.graph_input && <section className="gui_input graph_input">
                    <div className="btn_panel">
                        <button className="btn minimize"
                                onClick={() => handleGui("graph_input")}>
                            <img src={arrows_in.src} alt="" className="icon minimize_icon"/>
                        </button>
                        <button className="btn open_algos" onClick={() => handleGui("algos")}>
                            <img src={algos_icon.src} className="icon" alt=""/>
                        </button>
                        <button className="btn open_perf_sett" onClick={() => handleGui("perf_settings")}>
                            <img src={settings.src} className="icon" alt=""/>
                        </button>
                    </div>
                    <form className="make_graph">
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
                        <label form="isOriented" id="isOriented_label" className="checkbox_label"
                        >Oriented: <input
                            type="checkbox"
                            name="isOriented"
                            id="isOriented"
                            className="checkbox_input"
                            onChange={(e) => setIsOriented(e.target.checked)}
                        /></label
                        >
                        <button type="submit" className="btn">Make</button>
                        <h4 className="error error_msg">{error}</h4>
                    </form>
                </section>}
                {showgui?.perf_settings && <section className="gui_input perf_settings">
                    <label form="smooth_render" className="checkbox_label">Smooth render: <input
                        type="checkbox"
                        name="smooth_render"
                        id="smooth_render"
                        className="checkbox_input"
                    /></label>
                </section>}
                {showgui?.algos && <section className="gui_input algos">
                    <form action="" className="algos_dijkstra">
                        <label form="">Dijkstra</label>
                        <input
                            type="text"
                            id="dijkstra_input"
                            name="dijkstra_input"
                            className="dijkstra_input"
                        />
                        <h4 className="dijkstra_error error_msg"></h4>
                        <button className="btn" type="submit">Start</button>
                    </form>
                    {/*<Dijkstra/>*/}
                </section>}
            </div>
            {/*<GraphVisualizer/>*/}
        </main>
    )
}