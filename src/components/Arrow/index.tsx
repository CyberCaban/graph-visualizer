import { useEffect, useState } from "react";
import { getElement } from "../../utils";
import type { refType } from "../../utils/types";

type ArrowProps = {
  start: refType;
  end: refType;
  oriented?: boolean;
  stroke?: string;
  strokeWidth?: string | number;
  fill?: string;
  showHead?: boolean;
  headScale?: number;
};

const Arrow: React.FC<ArrowProps> = (props: ArrowProps) => {
  const [d, setD] = useState<string>();
  const [dHead, setDHead] = useState<string>();
  const [st, setSt] = useState({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    stroke: props.stroke || "red",
    strokeWidth: props.strokeWidth || 5,
    fill: props.fill || "blue",
    head: {
      show: props.showHead || true,
      posX: 0,
      posY: 0,
      rotation: 0,
      scale: props.headScale || 1,
    },
  });
  let start: HTMLElement;
  let end: HTMLElement;
  const headSize = { x: 10.61, y: 15.56 };

  useEffect(() => {
    start = getElement(props.start);
    end = getElement(props.end);
    // console.log(start.getBoundingClientRect());
    console.log(end.getBoundingClientRect());

    setSt((prev) => ({
      ...prev,
      startX:
        parseInt(start?.getBoundingClientRect().x.toFixed(0)) +
        parseInt(start?.getBoundingClientRect().width.toFixed(0)) / 2,
      startY:
        parseInt(start?.getBoundingClientRect().y.toFixed(0)) +
        parseInt(start?.getBoundingClientRect().height.toFixed(0)) / 2,
      endX:
        parseInt(end?.getBoundingClientRect().x.toFixed(0)) +
        parseInt(end?.getBoundingClientRect().width.toFixed(0)) / 2,
      endY:
        parseInt(end?.getBoundingClientRect().y.toFixed(0)) +
        parseInt(end?.getBoundingClientRect().height.toFixed(0)) / 2,
    }));

    if (st.head.show) {
      setSt((prev) => ({
        ...prev,
        head: {
          ...prev.head,
          posX: prev.startX + (prev.endX - prev.startX - headSize.x) / 2,
          posY: prev.startY + (prev.endY - prev.startY - headSize.y) / 2,
          rotation:
            (Math.atan(-(prev.endY - prev.startY) / (prev.endX - prev.startX)) *
              180) /
            Math.PI,
        },
      }));
    }
  }, []);

  useEffect(() => {
    setD(`M ${st.startX} ${st.startY} L ${st.endX} ${st.endY}`);
    setDHead(
      `translate(${st.head.posX}, ${st.head.posY}) rotate(${-st.head
        .rotation}) scale(${st.head.scale})`
    );

    const tan = -(st.endY - st.startY) / (st.endX - st.startX);
    console.log(tan);
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
