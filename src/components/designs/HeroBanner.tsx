import React from "react";
import { Vortex } from "../ui/vortex";

export function HeroBanner() {
  return (
    <div className="psHeroContainer">
      <Vortex
        backgroundColor="black"
        className="psHeroVortex"
      >
        <h2 className="psHeroText">
          My name is Parth Sinha
        </h2>
        <p className="psHeroPara">
            I'm a CS student diving into AI & ML, dreaming of GPU wizardry with CUDA and kernel programming—because CPUs just aren't 'core' enough!
        </p>
        <div className="psHeroButtonContainer">
          <a href="/projects" className="psHeroButton">
            Projects
          </a>
          <button className="psHeroButton2">Watch trailer</button>
        </div>
      </Vortex>
    </div>
  );
}
