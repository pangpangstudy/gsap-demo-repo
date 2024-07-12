import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "./App.css";
import PageCover from "./components/PageCover";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <div className="min-h-screen">
      <PageCover />
    </div>
  );
};

export default App;
