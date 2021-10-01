import "./App.css";
import React, { useState, useEffect } from "react";
import { printTime, timeElapsed } from "./utils/printTime";
import { indexOfMinMax } from "./utils/findMinMax";
import LapRow from "./components/LapRow";
import LapTimer from "./components/LapTimer";
import EmptyRows from "./components/EmptyRows";

function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState({
    startTime: 0,
    totalTime: 0,
    currentLapStart: 0,
    currentLapTime: 0,
  });
  const [lapTimes, setLapTimes] = useState([]);
  const [minMaxIndex, setMinMaxIndex] = useState({
    minIndex: 0,
    maxIndex: 0,
  });

  const start = () => {
    setIsRunning(true);
    setTimer({
      ...timer,
      startTime: Date.now() - timer.totalTime,
      currentLapStart: Date.now() - timer.currentLapTime,
    });
  };

  const stop = () => setIsRunning(false);

  const reset = () => {
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
    //saveLap
    if (isRunning) {
      const currentLap = timer.currentLapTime;
      const newLapTimes = lapTimes;
      newLapTimes.unshift(currentLap);
      setTimer((prevState) => ({
        ...prevState,
        currentLapStart: Date.now(),
        currentLapTime: 0,
      }));
      console.log(...lapTimes);
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
      }, 16);

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
          {!isRunning && timer.startTime ? (
            //prettier config parens
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

// <Button
//           isRunning={isRunning}
//           classes={lapResetClasses}
//           buttonFunction={lapResetFn}
//         />
// const startOrStop = !isRunning ?
// const lapResetClasses = !isRunning && timer.startTime ? "reset" : "lap";
// const lapResetFn = isRunning ? lap : reset;
