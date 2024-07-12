import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
type Props = {};
gsap.registerPlugin(ScrollTrigger);
function DropDown({}: Props) {
  const dropBox = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const dropBoxRect = dropBox.current?.getBoundingClientRect();
    const dropBoxBottomToViewportTop = dropBoxRect?.bottom;
    console.log(dropBoxBottomToViewportTop);
    const ctx = gsap.context(() => {
      gsap.from(dropBox.current, {
        y: -dropBoxBottomToViewportTop! || window.innerHeight,
        duration: 1.5,
        ease: "bounce",
        scrollTrigger: {
          trigger: ".trigger",
          start: "top top",
          end: "bottom top",
          markers: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div
          ref={dropBox}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-sky-700 text-center leading-[5rem] text-white"
        >
          Pang
        </div>
      </div>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="trigger w-40 h-40 bg-black">Pang</div>
      </div>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-40 h-40 bg-black">Pang</div>
      </div>
    </>
  );
}

export default DropDown;
