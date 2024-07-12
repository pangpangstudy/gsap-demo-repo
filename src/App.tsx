import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "./App.css";
import PageCover from "./components/PageCover";
import ParallaxSections from "./components/PageCoverImg";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <div className="min-h-screen">
      {/* <PageCover /> */}
      <ParallaxSections />
    </div>
  );
};

export default App;
