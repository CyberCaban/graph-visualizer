import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import * as THREE from "three";

export default function Boxes() {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState<boolean>(false);

  useEffect(() => {}, []);
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 100 }}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <mesh
        ref={ref}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
      </mesh>
      <CameraControls makeDefault />
    </Canvas>
  );
}
