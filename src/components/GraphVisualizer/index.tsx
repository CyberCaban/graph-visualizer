import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Arrow from "../Arrow";
import type { Edge } from "../../utils/types";

export default function GraphVisualizer() {
  const [vertices, setVertices] = useState<String[]>();
  const [edges, setEdges] = useState<Edge[]>();
  const [updateArrow, setUpdateArrow] = useState(0);

  useEffect(() => {
    const handleStorage = () => {
      const { edges, vertices } = window.localStorage;
      setVertices(JSON.parse(vertices));
      setEdges(JSON.parse(edges));
      console.log(JSON.parse(edges));
    };
    const update = () => setUpdateArrow(updateArrow + 1);

    window.addEventListener("storage", handleStorage);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    setUpdateArrow(updateArrow + 1);
  }, [edges, vertices]);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
        key={updateArrow}
      >
        {edges?.map(([start, end]: Edge) => (
          <Arrow start={`V-${start}`} end={`V-${end}`} key={`${start}`} />
        ))}
      </svg>

      {vertices?.map((vert, index) => (
        <motion.div
          // onDrag={(e, info) => setC(c + 1)}
          onDragEnd={(e, info) => setUpdateArrow(updateArrow + 1)}
          drag
          dragMomentum={false}
          key={`${vert}`}
          className="vertice"
          id={`V-${vert}`}
          style={{
            width: "3rem",
            height: "3rem",
            backgroundColor: "blanchedalmond",
            userSelect: "none",
            color: "black",
            textAlign: "center",
            borderRadius: "50%",
            top: `calc(30% + ${index * 3}rem)`,
            left: `calc(40% + ${10}rem)`,
            position: "absolute",
          }}
        >
          {vert}
        </motion.div>
      ))}
    </>
  );
}
