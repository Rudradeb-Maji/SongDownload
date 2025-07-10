import React, { useRef, useState } from "react";

const CustomAudioPlayer = ({ audioUrl }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="p-2 text-white rounded-md shadow-lg flex flex-col">
      <audio ref={audioRef} src={audioUrl} preload="auto" />
      <button
        onClick={togglePlay}
        className={`p-2 rounded-md ${
          isPlaying ? "bg-zinc-500" : "bg-amber-500"
        } font-semibold`}
      >
        {isPlaying ? "Pause ⏸️" : "Play ▶️"}
      </button>
    </div>
  );
};

export default CustomAudioPlayer;
