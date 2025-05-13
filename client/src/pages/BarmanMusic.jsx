import React from "react";
import GetSong from "../components/GetSong";

const BarmanMusic = () => {
 const siteName = "Barmanmusic.com"
 const route = "barmanmusic"
  return (
    <>
    <GetSong siteName={siteName} route={route}/>
    </>
  );
};

export default BarmanMusic;
