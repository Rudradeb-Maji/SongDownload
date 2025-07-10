import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const GetSong = ({ siteName, route }) => {
  const navigateTo = useNavigate();
  const [artist, setArtist] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:3000/site/${route}`, {
        artist: artist,
      });

      setArtist("");
      if (response.data.data.length)
        navigateTo("/songlists", {
          state: {
            songs: response.data.data,
            message: "",
          },
        });
      else
        navigateTo("/songlists", {
          state: {
            songs: [],
            message: response.data.message,
          },
        });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen bg-zinc-950 flex items-center justify-center text-white">
        {loading ? (
          <p
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-500 px-4 py-2 text-sm leading-6 font-semibold text-white transition duration-150 ease-in-out hover:bg-indigo-400"
          >
            <svg
              className="mr-3 -ml-1 size-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading…
          </p>
        ) : (
          <div className="border-1 border-zinc-800 rounded-md flex gap-10 justify-center items-center flex-col w-90 p-3">
            <h2 className="text-3xl">
              Download from{" "}
              <span className="text-amber-500 font-bold">{siteName}</span> 🎧
            </h2>
            <form
              className="w-full flex gap-10 justify-center items-center flex-col"
              onSubmit={(e) => handleSubmit(e)}
            >
              <input
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                type="text"
                name=""
                id=""
                placeholder="Dj Rx Remix (Paharpur Se)"
                className="w-full p-2 outline-none border-1 border-zinc-500 rounded-md "
              />
              <button
                className="text-white cursor-pointer w-1/2 p-2 outline-none border-1 border-zinc-500 rounded-md hover:bg-amber-500 hover:text-black"
              >Get songs 🎧</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default GetSong;
