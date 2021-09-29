import "./App.css";
import React, { useState, useEffect } from "react";
import { printTime, timeElapsed } from "./utils/printTime";
import { indexOfMinMax } from "./utils/findMinMax";
import LapRow from "./components/LapRow";
import LapTimer from "./components/LapTimer";
import { EmptyRows } from "./components/EmptyRows";

function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [lapTimes, setLapTimes] = useState([]);
  const [minMaxIndex, setMinMaxIndex] = useState({
    minIndex: 0,
    maxIndex: 0,
  });
  const [timer, setTimer] = useState({
    startTime: 0,
    totalTime: 0,
    currentLapStart: 0,
    currentLapTime: 0,
  });

  const start = () => {
    setIsRunning(true);
    if (isPaused) {
      setTimer({
        ...timer,
        startTime: Date.now() - timer.totalTime,
        currentLapStart: Date.now() - timer.currentLapTime,
      });
      setIsPaused(false);
    } else {
      setTimer({
        ...timer,
        startTime: Date.now(),
        currentLapStart: Date.now(),
      });
    }
  };

  const stop = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const reset = () => {
    setIsPaused(false);
    setTimer({
      ...timer,
      startTime: 0,
      totalTime: 0,
      currentLapStart: 0,
      currentLapTime: 0,
    });
    setLapTimes([]);
    setMinMaxIndex((prevState) => ({ ...prevState, minIndex: 0, maxIndex: 0 }));
  };

  const lap = () => {
    if (isRunning) {
      const currentLap = timer.currentLapTime;
      const newLapTimes = lapTimes;
      newLapTimes.unshift(currentLap);
      setLapTimes([...newLapTimes]);
      setTimer((prevState) => ({
        ...prevState,
        currentLapStart: Date.now(),
        currentLapTime: 0,
      }));
      if (lapTimes.length > 1) {
        setMinMaxIndex(indexOfMinMax(lapTimes));
      }
    }
  };

  useEffect(() => {
    if (isRunning) {
      const timerID = setInterval(() => {
        setTimer((prevState) => ({
          ...prevState,
          totalTime: timeElapsed(prevState.startTime),
          currentLapTime: timeElapsed(prevState.currentLapStart),
        }));
      }, 16.6);

      return () => {
        clearInterval(timerID);
      };
    }
  }, [isRunning]);

  return (
    <div className="App">
      <div className="top">
        <div className="digits">
          <p>{printTime(timer.totalTime)}</p>
        </div>
        <div className="buttons">
          {isPaused ? (
            <button className="reset" onClick={reset}>
              Reset
            </button>
          ) : (
            <button className="lap" onClick={lap}>
              Lap
            </button>
          )}
          {!isRunning ? (
            <button className="start" onClick={start}>
              Start
            </button>
          ) : (
            <button className="stop" onClick={stop}>
              Stop
            </button>
          )}
        </div>
      </div>
      <div className="bottom">
        <table>
          <tbody>
            {timer.startTime ? (
              <LapTimer
                lapTime={timer.currentLapTime}
                lapNumber={lapTimes.length}
              />
            ) : null}
            <LapRow lapTimes={lapTimes} minMaxIndex={minMaxIndex} />
            <EmptyRows lapsLength={lapTimes.length} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StopWatch;
