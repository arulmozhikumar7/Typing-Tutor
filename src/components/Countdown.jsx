import React, { useEffect, useRef } from "react";
import useStore from "../context/store";

const Countdown = () => {
  const {
    count,
    setCount,
    isRunning,
    setIsRunning,
    setCurrentpoint,
    setPoints,
    currentpoint,
    points,
    best,
    setBest,
    user,
    saveHighScore,
  } = useStore();

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && count > 0) {
      intervalRef.current = setInterval(() => {
        setCount(count - 1);
      }, 1000);
    } else {
      if (count === 0) {
        console.log(points);
        setCurrentpoint(points);

        if (points > best) {
          setBest(points);
          if (user) {
            saveHighScore(user.uid, points);
          }
        }
        setPoints(0);
        document.getElementById("my_modal_3").showModal();
      }
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, count]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setCurrentpoint(points);
    setPoints(0);
    setCount(60);
  };

  return (
    <div>
      <div
        className={`flex justify-center  ${
          count < 11 ? "text-red-500" : "text-green-500"
        } m-5 `}
      >
        <span className="text-5xl countdown ">
          <span style={{ "--value": count }}></span>
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <button
          onClick={startTimer}
          disabled={isRunning || user ? false : true}
          className="col-start-2 btn"
        >
          Start
        </button>

        <button onClick={resetTimer} className="btn">
          Reset
        </button>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-lg font-bold">Time's up</h3>
          <p className="py-4">
            Your current speed: {currentpoint}{" "}
            <span className="tooltip tooltip-right" data-tip="words per minute">
              wpm
            </span>
          </p>
          <p className="py-4">
            Your best speed: {best}{" "}
            <span className="tooltip tooltip-right" data-tip="words per minute">
              wpm
            </span>
          </p>
        </div>
      </dialog>
    </div>
  );
};

export default Countdown;
