import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Arrow from "../Arrow";
import type { Edge, Vertice } from "../../utils/types";
import "./index.css";

type Props = {
  vertices: Vertice[];
  edges: Edge[];
  isOriented: boolean;
  isSmooth?: boolean;
  inertia?: boolean;
};
const GraphVisualizer = ({
  edges,
  vertices,
  isOriented,
  isSmooth,
  inertia,
}: Props) => {
  const [updateCount, setUpdateCount] = useState(0);

  const fieldRef = useRef(null);

  const updateArrow = () => setUpdateCount((prev) => prev + 1);

  useEffect(() => {
    updateArrow();
    window.addEventListener("resize", updateArrow);
    return () => {
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
            key={`${start.concat(`-${end}-${weight || ""}-${isOriented}`)}`}
            showHead={isOriented}
            weight={`${weight || ""}`}
          />
        ))}
      </svg>

      {vertices?.map((vert, index) => (
        <motion.div
          key={`${vert}`}
          className="vertice"
          id={`V-${vert}`}
          style={{
            top: `calc(30% + ${index * 3}rem)`,
          }}
          drag
          dragMomentum={inertia ? true : false}
          dragConstraints={fieldRef}
          onDragTransitionEnd={updateArrow}
          onDrag={isSmooth ? updateArrow : undefined}
        >
          {vert}
        </motion.div>
      ))}
    </div>
  );
};

export default GraphVisualizer;
