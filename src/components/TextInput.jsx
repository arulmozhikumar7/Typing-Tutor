import React, { useEffect, useState, useRef } from "react";
import { words } from "../data/words";
import Notification from "../assets/notification-sound.mp3";
import useStore from "../context/store";
const TextInput = () => {
  const [points, setPoints] = useState(0);
  const { text, setText, index, setIndex, isRunning, count } = useStore();
  const audioPlayer = useRef(null);

  const checkWord = () => {
    const typedWord = text.trim();
    if (words[index] === typedWord) {
      audioPlayer.current.play();
      setPoints(points + 1);
      setIndex(Math.floor(Math.random() * words.length));
      setText("");
    }
  };

  document.onkeydown = (e) => {
    if (e.key === "Enter") {
      checkWord();
    }
  };

  useEffect(() => {
    checkWord();
  }, [text]);

  return (
    <>
      <div className="flex justify-center items-center flex-col gap-y-8 m-5">
        <h1 className="text-3xl font-bold text-center  "> {words[index]}</h1>
        <p>{points}</p>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type here"
          disabled={!isRunning || count === 0}
          className="input input-bordered input-sm w-full max-w-xs"
        />
        <audio src={Notification} ref={audioPlayer} />
      </div>
    </>
  );
};

export default TextInput;
