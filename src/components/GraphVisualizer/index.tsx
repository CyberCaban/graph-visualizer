import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Arrow from "../Arrow";
import type { Edge } from "../../utils/types";
import "./index.css";

export default function GraphVisualizer() {
  const [vertices, setVertices] = useState<String[]>();
  const [edges, setEdges] = useState<Edge[]>();
  const [updateCount, setUpdateCount] = useState(0);

  const updateArrow = () => setUpdateCount(updateCount + 1);

  useEffect(() => {
    const handleStorage = () => {
      const { edges, vertices } = window.localStorage;
      setVertices(JSON.parse(vertices));
      setEdges(JSON.parse(edges));
      console.log(JSON.parse(edges));
    };
    handleStorage();

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
    <>
      <svg xmlns="http://www.w3.org/2000/svg" key={updateCount}>
        {edges?.map(([start, end]: Edge) => (
          <Arrow
            start={`V-${start}`}
            end={`V-${end}`}
            key={`${start.concat(`-${end}`)}`}
          />
        ))}
      </svg>

      {vertices?.map((vert, index) => (
        <motion.div
          onDragEnd={() => setUpdateCount(updateCount + 1)}
          drag
          dragMomentum={false}
          key={`${vert}`}
          className="vertice"
          id={`V-${vert}`}
          style={{
            top: `calc(30% + ${index * 3}rem)`,
            left: `calc(40%)`,
          }}
        >
          {vert}
        </motion.div>
      ))}
    </>
  );
}
