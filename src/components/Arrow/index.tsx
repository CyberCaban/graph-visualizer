import { useEffect, useState } from "react";
import { getElement } from "../../utils";
import type { ArrowProps } from "../../utils/types";

const Arrow: React.FC<ArrowProps> = (props: ArrowProps) => {
  const [Props] = useState({
    stroke: props.color || "red",
    strokeWidth: props.strokeWidth || 5,
    fill: props.fill || "red",
    headScale: props.headScale || 1.5,
    headShow: !!props.showHead,
  });
  const [st, setSt] = useState({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  });
  const [headSt, setHeadSt] = useState({
    posX: 0,
    posY: 0,
    rotation: 0,
  });
  let start: HTMLElement;
  let end: HTMLElement;
  const headSize = { x: 10.61, y: 15.56 };

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

    setSt({
      startX,
      startY,
      endX,
      endY,
    });

    if (Props.headShow) {
      let dx = endX - startX;
      let dy = endY - startY;
      let xSign = dx > 0 ? 1 : -1;
      let ySign = dy > 0 ? 1 : -1;
      let absDx = Math.abs(dx);
      let absDy = Math.abs(dy);
      let angle = Math.atan(absDy / absDx);
      angle *= ySign;
      if (xSign < 0) angle = (Math.PI - angle * xSign) * xSign;

      setHeadSt({
        posX: startX + dx / 2,
        posY: startY + dy / 2,
        rotation: (angle * 180) / Math.PI,
      });
    }
  }, []);

  return (
    <>
      <path
        d={`M ${st.startX} ${st.startY} L ${st.endX} ${st.endY}`}
        stroke={Props.stroke}
        strokeWidth={Props.strokeWidth}
      />
      {Props.headShow && (
        <g
          transform={`translate(${headSt.posX}, ${headSt.posY}) rotate(${headSt.rotation}) scale(${Props.headScale})`}
        >
          <path
            d="m2.828 15.555 7.777-7.779L2.828 0 0 2.828l4.949 4.948L0 12.727l2.828 2.828z"
            stroke="white"
            fill={Props.fill}
          />
        </g>
      )}
    </>
  );
};

export default Arrow;
