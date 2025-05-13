import React from "react";
import { Link } from "react-router-dom";
import BarmanMusic from "./BarmanMusic";
import SwagataMobile from "./SwagataMobile";

const Home = () => {
  return (
    <div className="h-screen bg-zinc-950 flex items-center justify-center text-white">
      <div className="border-1 border-zinc-800 rounded-md flex gap-10 justify-center items-center flex-col w-80 p-2">
        <p className="font-bold text-2xl">Click on <span className="text-amber-500">website name</span></p>
        <div className="flex gap-5">
          <Link className="bg-amber-500 rounded-tl-none rounded-2xl p-2" to="/barmanmusicdownloader">Barmanmusic.com</Link>
          <Link className="bg-white rounded-tl-none rounded-2xl p-2 text-black" to="/swagatamobiledownloader">Swagatamobile.in</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
