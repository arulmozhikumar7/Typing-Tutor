import React, { useEffect, useRef } from "react";
import { words } from "../data/words";
import Notification from "../assets/notification-sound.mp3";
import useStore from "../context/store";
const TextInput = () => {
  const {
    text,
    setText,
    index,
    setIndex,
    isRunning,
    count,
    points,
    setPoints,
  } = useStore();
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
      <div className="flex flex-col items-center justify-center m-5 gap-y-8">
        <h1
          className="text-3xl font-bold text-center "
          onCopy={(e) => e.preventDefault()}
        >
          {words[index]}
        </h1>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type here"
          disabled={!isRunning || count === 0}
          onPaste={(e) => e.preventDefault()}
          className="w-full max-w-xs input input-bordered input-lg"
        />
        <audio src={Notification} ref={audioPlayer} />
      </div>
    </>
  );
};

export default TextInput;
