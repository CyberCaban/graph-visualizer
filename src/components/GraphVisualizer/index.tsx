import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Arrow from "../Arrow";

export default function GraphVisualizer() {
  const [vertices, setVertices] = useState<String[]>();
  const [edges, setEdges] = useState<String[]>();

  useEffect(() => {
    const handleStorage = () => {
      const { edges, vertices } = window.localStorage;
      setVertices(JSON.parse(vertices));
      setEdges(JSON.parse(edges));
      console.log(JSON.parse(vertices));
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  });

  return (
    <>
      {vertices?.map((vert, index) => (
        <motion.div
          onDrag={(e, info) => console.log(info)}
          onDragEnd={(e, info) => console.log(info.point)}
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
            top: `calc(30% + ${index * 4}rem)`,
            left: "40%",
            position: "absolute",
          }}
        >
          <Arrow start="V-B" end="V-A" />
          {vert}
        </motion.div>
      ))}
    </>
  );
}
