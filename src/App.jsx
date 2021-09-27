import "./App.css";
import React, { useState, useEffect } from "react";

const convertTimeToString = (time) => {
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hundredths = Math.floor((time / 10) % 100);

  const padNumber = (number) => number.toString().padStart(2, "0");
  return `${padNumber(minutes)}:${padNumber(seconds)}.${padNumber(hundredths)}`;
};

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState({
    startTime: 0,
    totalTime: 0,
    currentLapTime: 0,
  });
  const [lapTimes, setLapTimes] = useState([]);

  const timeElapsed = (time) => {
    return Date.now() - time;
  };

  const start = () => {
    setIsRunning(true);
    if (isPaused) {
      setTimer({ ...timer, startTime: Date.now() - timer.totalTime, currentLapTime: Date.now() - timer.currentLapTime});
      setIsPaused(false);
    } else {
      setTimer({ ...timer, startTime: Date.now(), currentLapTime: Date.now()});
    }
  };

  const stop = () => {
    setIsRunning(false);
    setIsPaused(true);
    // setTimer({
    //   ...timer,
    //   pauseTime: Date.now(),
    // });
  };

  const reset = () => {
    setIsPaused(false);
    setTimer({
      ...timer,
      startTime: 0,
      totalTime: 0,
      currentLapTime: 0,
    });
    const emptyLapsArray = [];
    setLapTimes(emptyLapsArray) 
  };

  const lap = () => {
    const currentLap = timer.currentLapTime;
    setLapTimes(() => [...lapTimes, currentLap])
    setTimer({...timer, currentLapTime: 0})
  };

  useEffect(() => {
    if (isRunning) {
      const timerID = setInterval(() => {
        setTimer({
          ...timer,
          totalTime: timeElapsed(timer.startTime),
          currentLapTime: timeElapsed(timer.currentLapTime),
        });
      }, 10);

      return () => {
        clearInterval(timerID);
      };
    }

  }, [isRunning]);

  return (
    <div className="App">
      <div className="top">
        <div className="digits">
          <p>{convertTimeToString(timer.totalTime)}</p>
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
              <td>Lap {!lapTimes.length ? 1 : lapTimes.length}</td>
              <td>{convertTimeToString(timer.currentLapTime)}</td>
            </tr>
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
