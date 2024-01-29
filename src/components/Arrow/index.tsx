import { useEffect, useState } from "react";
import { getElement } from "../../utils";
import type { ArrowProps, ArrowState } from "../../utils/types";

const Arrow: React.FC<ArrowProps> = (props: ArrowProps) => {
  const [d, setD] = useState<string>();
  const [dHead, setDHead] = useState<string>();
  const [st, setSt] = useState<ArrowState>({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    stroke: props.color || "red",
    strokeWidth: props.strokeWidth || 5,
    fill: props.fill || "blue",
    head: {
      show: !!props.showHead,
      posX: 0,
      posY: 0,
      rotation: 0,
      scale: props.headScale || 1,
    },
  });
  let start: HTMLElement;
  let end: HTMLElement;
  const headSize = { x: 10.61, y: 15.56 };
  // console.log(props.showHead);

  useEffect(() => {
    start = getElement(props.start);
    end = getElement(props.end);
    const startX =
      parseInt(start?.getBoundingClientRect().x.toFixed(0)) +
      parseInt(start?.getBoundingClientRect().width.toFixed(0)) / 2;
    const startY =
      parseInt(start?.getBoundingClientRect().y.toFixed(0)) +
      parseInt(start?.getBoundingClientRect().height.toFixed(0)) / 2;
    const endX =
      parseInt(end?.getBoundingClientRect().x.toFixed(0)) +
      parseInt(end?.getBoundingClientRect().width.toFixed(0)) / 2;
    const endY =
      parseInt(end?.getBoundingClientRect().y.toFixed(0)) +
      parseInt(end?.getBoundingClientRect().height.toFixed(0)) / 2;

    setSt((prev) => ({
      ...prev,
      startX,
      startY,
      endX,
      endY,
    }));

    if (st.head.show) {
      let dx = endX - startX;
      let dy = endY - startY;
      let xSign = dx > 0 ? 1 : -1;
      let ySign = dy > 0 ? 1 : -1;
      let absDx = Math.abs(dx);
      let absDy = Math.abs(dy);
      let angle = Math.atan(absDy / absDx);
      angle *= ySign;
      if (xSign < 0) angle = (Math.PI - angle * xSign) * xSign;
      // console.log(angle);

      setSt((prev) => ({
        ...prev,
        head: {
          ...prev.head,
          posX: startX + (dx - headSize.x) / 2,
          posY: startY + (dy - headSize.y) / 2,
          rotation: (angle * 180) / Math.PI,
        },
      }));
    }
  }, []);

  useEffect(() => {
    setD(`M ${st.startX} ${st.startY} L ${st.endX} ${st.endY}`);
    setDHead(
      `translate(${st.head.posX}, ${st.head.posY}) rotate(${st.head.rotation}) scale(${st.head.scale})`
    );
  }, [st]);

  return (
    <>
      <path d={d} stroke={st.stroke} strokeWidth={st.strokeWidth} />
      {st.head.show && (
        <g transform={dHead}>
          <path
            d="m2.828 15.555 7.777-7.779L2.828 0 0 2.828l4.949 4.948L0 12.727l2.828 2.828z"
            stroke={st.stroke}
            fill={st.fill}
          />
        </g>
      )}
    </>
  );
};

export default Arrow;
