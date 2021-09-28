import "./App.css";
import React, { useState, useEffect } from "react";
import {printTime, timeElapsed} from "./utils/printTime";
import LapRow  from './components/LapRow'

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [lapTimes, setLapTimes] = useState([]);
  const [timer, setTimer] = useState({
    startTime: 0,
    totalTime: 0,
    currentLapStart: 0,
    currentLapTime: 0
  });

  const start = () => {
    setIsRunning(true);
    if (isPaused) {
      setTimer({ ...timer, startTime: Date.now() - timer.totalTime, currentLapStart: Date.now() - timer.currentLapTime});
      setIsPaused(false);
    } else {
      setTimer({ ...timer, startTime: Date.now(), currentLapStart: Date.now()});
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
      currentLapTime: 0
    });
    const emptyLapsArray = [];
    setLapTimes(emptyLapsArray) 
  };

  const lap = () => {
    if (isRunning) {
      const currentLap = timer.currentLapTime;
      const newLapTimes = lapTimes;
      newLapTimes.unshift(currentLap)
      setLapTimes([...newLapTimes])
      setTimer((prevState) => ({ ...prevState, currentLapStart: Date.now(), currentLapTime: 0 }))
      
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
      }, 100);

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
            <tr>
              <td>Lap {!lapTimes.length ? 1 : lapTimes.length + 1}</td>
              <td>{printTime(timer.currentLapTime)}</td>
            </tr>
            <LapRow lapTimes={lapTimes}/>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;



// if (isPaused) {
//   const resumeTimer = () =>
//     setTimer({ ...timer, startTime: timer.startTime + timer.totalTime });
// }

// useEffect(() => {
//   if (isRunning) {
//     const lapTimer = setInterval(() => {
//       setTimer({ ...timer, currentLapTime: timeElapsed(timer.startTime) });
//     });
//     return () => {
//       clearInterval(lapTimer);
//     };
//   }
// }, [timer.currentLapTime]);

// setTimer({
//   ...timer,
//   pauseTime: Date.now(),
// });