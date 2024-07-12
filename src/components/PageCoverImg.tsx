import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ParallaxSections = () => {
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    sections.forEach((section, i) => {
      const bg = section.querySelector(".bg");

      // Assign random images to backgrounds
      bg.style.backgroundImage = `url(https://picsum.photos/1600/800?random=${i})`;

      const getRatio = (el) =>
        window.innerHeight / (window.innerHeight + el.offsetHeight);

      // Parallax effect
      gsap.fromTo(
        bg,
        {
          backgroundPosition: () =>
            i ? `50% ${-window.innerHeight * getRatio(section)}px` : "50% 0px",
        },
        {
          backgroundPosition: () =>
            `50% ${window.innerHeight * (1 - getRatio(section))}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: () => (i ? "top bottom" : "top top"),
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });
  }, []);

  return (
    <div>
      {[1, 2, 3, 4, 5].map((i) => (
        <section key={i}>
          <div className="bg"></div>
          <h1>Section {i}</h1>
        </section>
      ))}
    </div>
  );
};

export default ParallaxSections;
