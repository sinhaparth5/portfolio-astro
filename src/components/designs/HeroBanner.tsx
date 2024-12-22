import React from "react";
import { Vortex } from "../ui/vortex";

export function HeroBanner() {
  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[30rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center dm-sans-bold">
          My name is Parth Sinha
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center dm-sans-normal">
            I'm a CS student diving into AI & ML, dreaming of GPU wizardry with CUDA and kernel programming—because CPUs just aren't 'core' enough!
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <a href="/projects" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset] dm-sans-normal">
            Projects
          </a>
          <button className="px-4 py-2  text-white dm-sans-normal">Watch trailer</button>
        </div>
      </Vortex>
    </div>
  );
}
