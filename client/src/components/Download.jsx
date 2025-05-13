import axios from "axios";
import React, { useState } from "react";

const Download = ({ songs, website }) => {
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const downloadSong = async () => {
    try {
        const response = await axios.post(
          `http://localhost:3000/download/downloadall`,
          {
            website:website,
            songId:13857 ,
          }
        );
        
        setLink(response.data.message)
    //   for (const song of songs) {
    //     const response = await axios.post(
    //       `http://localhost:3000/download/downloadall`,
    //       {
    //         website: website,
    //         songId: song.downloadId,
    //         songTitle: song.title,
    //         artist: song.artist,
    //       }
    //     );
    //     setMessage(response.data.message);
    //   }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <a className="hover:bg-amber-500 rounded-md p-2 mt-2 cursor-pointer border-1 border-zinc-700" href={link} download="Dj">Download</a>
    </div>
  );
};

export default Download;
