// import React from "react";
// import { useLocation } from "react-router-dom";
// import Download from "../components/Download";
// const SongLists = () => {
//   const location = useLocation();
//   const { songs, message } = location.state;
//   console.log(location.state);

//   return (
//     <>
//       <div className="h-screen w-full bg-zinc-950 flex flex-col items-center justify-center text-white ">
//         {message ? (
//           <p>{message}</p>
//         ) : (
//           <div className=" w-150 p-4 my-5 gap-2 flex flex-col  overflow-auto">
//             {songs.map((song, index) => {
//               return (
//                 <div className="w-full flex items-center gap-10">
//                   <div
//                     className="border-1 border-zinc-800 rounded-md p-2 text-amber-500"
//                     key={index}
//                   >
//                     <p>{song.title}</p>
//                   </div>
//                   <a
//                     className="hover:bg-amber-500 h-10 flex items-center justify-center rounded-md p-2 cursor-pointer border-1 border-zinc-700"
//                     href={song.downloadUrl}
//                     download="Dj"
//                   >
//                     Download
//                   </a>
//                   {/* <Download songs={songs} website={websiteName} /> */}
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SongLists;
// ..........................................................
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import CustomAudioPlayer from "../components/CustomAudioPlayer";

const SongLists = () => {
  const location = useLocation();
  const { songs, message } = location.state;

  const downloadRefs = useRef([]);
  downloadRefs.current = songs.map(
    (song, i) => downloadRefs.current[i] ?? React.createRef()
  );

  const handleDownloadAll = async () => {
    for (let i = 0; i < downloadRefs.current.length; i++) {
      if (downloadRefs.current[i]?.current) {
        downloadRefs.current[i].current.click();
        await new Promise((resolve) => setTimeout(resolve, 4000)); // 4000ms delay
      }
    }
  };
  return (
    <>
      <div className="h-screen w-full bg-zinc-950 flex flex-col items-center justify-center text-white">
        {message ? (
          <p>{message}</p>
        ) : (
          <>
            <div className="text-xl font-bold mt-3">
              Total <span className="text-amber-500">{songs.length}</span> songs
            </div>
            <div className="p-4 my-3 gap-2 flex flex-col overflow-auto">
              {songs.map((song, index) => {
                return (
                  <div className="" key={index}>
                    <div className="border-1 border-zinc-800 rounded-md p-2 text-amber-500  relative">
                      <p className=" text-white font-bold">{song.title}</p>
                      <p className="font-semibold text-amber-500">
                        {song.artist}
                      </p>
                      <div className="w-full flex justify-center items-center relative">
                        <audio
                          className="h-8 mt-2"
                          controls
                          src={song.downloadUrl}
                        ></audio>

                        {/* <CustomAudioPlayer audioUrl={song.downloadUrl}/> */}
                      </div>
                    </div>

                    <a
                      href={song.downloadUrl}
                      download={song.title}
                      ref={downloadRefs.current[index]}
                      className="hidden"
                    ></a>
                  </div>
                );
              })}
            </div>
            <button
              onClick={handleDownloadAll}
              className="bg-amber-500 cursor-pointer text-black p-2 rounded-md font-semibold shadow-md my-2"
            >
              ⬇️ Download All Songs
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default SongLists;

// import React from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const SongLists = () => {
//   const location = useLocation();
//   const { songs, message } = location.state;

//   const handleDownloadAll = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/download/downloadall",
//         {
//           songs: songs,
//         },
//         { responseType: "blob" }
//       ); // blob to get ZIP file

//       // Create a link element to download ZIP
//       console.log(response.data);
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "songs.zip");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       console.error("Download failed", error);
//     }
//   };

//   return (
//     <div className="h-screen w-full bg-zinc-950 flex flex-col items-center justify-center text-white">
//       {message ? (
//         <p>{message}</p>
//       ) : (
//         <>
//           <div className="p-4 my-3 gap-2 flex flex-col overflow-auto">
//             {songs.map((song, index) => {
//               return (
//                 <div className="" key={index}>
//                   <div className="border-1 border-zinc-800 rounded-md p-2 text-amber-500">
//                     <p className="text-white font-bold">{song.title}</p>
//                     <p className="font-semibold text-">{song.artist}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <button
//             onClick={handleDownloadAll}
//             className="cursor-pointer my-2 p-3 bg-amber-500 text-black rounded-md font-semibold"
//           >
//             ⬇️ Download All Songs as ZIP
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default SongLists;
