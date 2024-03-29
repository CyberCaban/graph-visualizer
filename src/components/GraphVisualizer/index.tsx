import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Arrow from "../Arrow";
import type { Edge } from "../../utils/types";
import "./index.css";

const GraphVisualizer = () => {
  const [vertices, setVertices] = useState<String[]>();
  const [edges, setEdges] = useState<Edge[]>();
  const [isOriented, setIsOriented] = useState<boolean>();
  const [isSmooth, setIsSmooth] = useState<boolean>();
  const [updateCount, setUpdateCount] = useState(0);

  const fieldRef = useRef(null);

  const updateArrow = () => setUpdateCount((prev) => prev + 1);

  useEffect(() => {
    const handleStorage = () => {
      const { edges, vertices, isOriented, smooth_render } =
        window.localStorage;

      setVertices(JSON.parse(vertices));
      setEdges(JSON.parse(edges));
      setIsOriented(JSON.parse(isOriented));
      setIsSmooth(JSON.parse(smooth_render));
    };
    handleStorage();

    updateArrow();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("resize", updateArrow);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("resize", updateArrow);
    };
  }, []);

  useEffect(() => {
    updateArrow();
  }, [edges, vertices]);

  return (
    <div className="GrVi" ref={fieldRef}>
      <svg xmlns="http://www.w3.org/2000/svg" key={updateCount}>
        {edges?.map(([start, end, weight]: Edge) => (
          <Arrow
            start={`V-${start}`}
            end={`V-${end}`}
            key={`${start.concat(`-${end}-${weight || ""}`)}`}
            showHead={isOriented}
            weight={`${weight || ""}`}
          />
        ))}
      </svg>

      {isSmooth
        ? vertices?.map((vert, index) => (
            <motion.div
              key={`${vert}`}
              className="vertice"
              id={`V-${vert}`}
              style={{
                top: `calc(30% + ${index * 3}rem)`,
              }}
              drag
              dragMomentum={false}
              dragConstraints={fieldRef}
              onDragTransitionEnd={updateArrow}
              onDrag={updateArrow}
            >
              {vert}
            </motion.div>
          ))
        : vertices?.map((vert, index) => (
            <motion.div
              key={`${vert}`}
              className="vertice"
              id={`V-${vert}`}
              style={{
                top: `calc(30% + ${index * 3}rem)`,
              }}
              drag
              dragMomentum={false}
              dragConstraints={fieldRef}
              onDragTransitionEnd={updateArrow}
            >
              {vert}
            </motion.div>
          ))}
    </div>
  );
};

export default GraphVisualizer;
