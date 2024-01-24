import { useEffect, useState } from "react";
import {
  isDragActive,
  motion,
  useAnimation,
  useMotionValue,
} from "framer-motion";

export default function GraphVisualizer() {
  const [vertices, setVertices] = useState<String[]>();
  const [edges, setEdges] = useState<String[]>();
  const value = useMotionValue(0);

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
          //   onDrag={(e, info) => console.log(info)}
          onDragEnd={(e, info) => console.log(info.point)}
          drag
          dragMomentum={false}
          key={`${vert}`}
          className="vertice"
          style={{
            width: "3rem",
            height: "3rem",
            backgroundColor: "blanchedalmond",
            userSelect: "none",
            color: "black",
            textAlign: "center",
            borderRadius: "50%",
            top: `calc(30% + ${index * 3}rem)`,
            left: "40%",
            position: "absolute",
          }}
        >
          {vert}
        </motion.div>
      ))}
    </>
  );
}
