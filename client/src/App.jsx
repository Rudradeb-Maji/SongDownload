import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BarmanMusic from "./pages/BarmanMusic";
import SwagataMobile from "./pages/SwagataMobile";
import SongLists from "./pages/SongLists";
import Ppclub from "./pages/Ppclub";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/barmanmusicdownloader" element={<BarmanMusic/>}/>
        <Route path="/swagatamobiledownloader" element={<SwagataMobile/>}/>
        <Route path="/djppclubdownloader" element={<Ppclub/>}/>
        <Route path="/songlists" element={<SongLists/>}/>
      </Routes>
    </div>
  );
};

export default App;
