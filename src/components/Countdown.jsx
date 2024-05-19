import React, { useEffect, useRef } from "react";
import useStore from "../context/store";
const Countdown = () => {
  const { count, setCount, isRunning, setIsRunning } = useStore();

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && count > 0) {
      intervalRef.current = setInterval(() => {
        setCount(count - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, count]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCount(10);
  };

  return (
    <div>
      <div
        className={`text-5xl flex justify-center ${
          count < 4 ? "text-red-500" : "text-green-500"
        } m-5 `}
      >
        {count > 0 ? count : "Time's up!"}
      </div>
      <div className="grid grid-cols-5 gap-3">
        <button
          onClick={startTimer}
          disabled={isRunning}
          className="btn col-start-2"
        >
          Start
        </button>
        <button
          onClick={pauseTimer}
          disabled={!isRunning}
          className="btn col-start-3"
        >
          Pause
        </button>
        <button onClick={resetTimer} className="btn">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Countdown;
