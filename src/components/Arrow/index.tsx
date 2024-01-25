import { useEffect, useState } from "react";
import { getElement } from "../../utils";
import type { refType } from "../../utils/types";
import { useScroll } from "framer-motion";

type ArrowProps = {
  start: refType;
  end: refType;
};

const Arrow: React.FC<ArrowProps> = (props: ArrowProps) => {
  const [dest, setDest] = useState<{ start: HTMLElement; end: HTMLElement }>();
  const [d, setD] = useState<string>();
  let start: HTMLElement;
  let end: HTMLElement;
  //   setDest({ start, end });
  useEffect(() => {
    start = getElement(props.start);
    end = getElement(props.end);
    console.log(start);
    console.log(end);
    // setD(
    //   `l ${start?.getBoundingClientRect().x.toFixed(0)} ${start
    //     ?.getBoundingClientRect()
    //     .y.toFixed(0)}`
    // );
    setD(`M 0 0 L 20 20`);
  }, []);

  useEffect(() => {}, [dest]);

  return (
    <div
      style={{
        position: "absolute",
        // left: "300px",
        zIndex: "0",
        outline: "1px solid lime",
      }}
    >
      <svg width={30} height={30} overflow="auto" x={400}>
        <path d={d} stroke="red" strokeWidth={10}></path>
      </svg>
    </div>
  );
};

export default Arrow;
