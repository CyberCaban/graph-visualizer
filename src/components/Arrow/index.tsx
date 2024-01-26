import { useEffect, useState } from "react";
import { getElement } from "../../utils";
import type { refType } from "../../utils/types";

type ArrowProps = {
  start: refType;
  end: refType;
  oriented?: boolean;
  stroke?: string;
  strokeWidth?: string | number;
};

const Arrow: React.FC<ArrowProps> = (props: ArrowProps) => {
  const [dest, setDest] = useState<{ start: HTMLElement; end: HTMLElement }>();
  const [d, setD] = useState<string>();
  const [st, setSt] = useState({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    stroke: props.stroke || "red",
    strokeWidth: props.strokeWidth || 5,
  });
  let start: HTMLElement;
  let end: HTMLElement;

  useEffect(() => {
    start = getElement(props.start);
    end = getElement(props.end);
    console.log(start.getBoundingClientRect());
    console.log(end);

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
  }, []);

  useEffect(() => {
    setD(`M ${st.startX} ${st.startY} L ${st.endX} ${st.endY}`);
  }, [st]);

  return <path d={d} stroke={st.stroke} strokeWidth={st.strokeWidth}></path>;
};

export default Arrow;
