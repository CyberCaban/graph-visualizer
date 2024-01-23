import { useEffect, useRef } from "react";

export default function Canvas() {
  const ref = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    const ctx = ref.current.getContext("2d");
    ctx?.moveTo(0, 0);
    ctx?.lineTo(200, 100);
    ctx?.stroke();
  });

  return (
    <>
      <canvas ref={ref} width={200} height={200}></canvas>
    </>
  );
}
