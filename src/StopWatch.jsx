import "./App.css";
import React, { useEffect, useReducer } from "react";
import { printTime } from "./utils/printTime";
import LapRow from "./components/LapRow";
import LapTimer from "./components/LapTimer";
import EmptyRows from "./components/EmptyRows";
import { timerReducer, TimerActions, initialTimer } from "./timerReducer";

function StopWatch() {
  const [timer, dispatch] = useReducer(timerReducer, initialTimer);

  const start = () => dispatch({ type: TimerActions.START });
  const stop = () => dispatch({ type: TimerActions.STOP });
  const reset = () => dispatch({ type: TimerActions.RESET });
  const saveLap = () => {
    if (timer.isRunning) {
      dispatch({
        type: TimerActions.SAVE_LAP,
      });
    }
  };

  useEffect(() => {
    if (timer.isRunning) {
      const timerID = setInterval(
        () =>
          dispatch({
            type: TimerActions.RUN,
          }),
        16
      );

      return () => {
        clearInterval(timerID);
      };
    }
  }, [timer.isRunning]);

  //to be removed via direct ref and conditions to dispatches in a var
  const startStopClasses = !timer.isRunning ? "start" : "stop";
  const startStopHandler = !timer.isRunning ? start : stop;
  const startStopLabel = !timer.isRunning ? "Start" : "Stop";

  const lapResetClasses = !timer.isRunning && timer.startTime ? "reset" : "lap";
  const lapResetHandler = !timer.isRunning && timer.startTime ? reset : saveLap;
  const lapResetLabel = !timer.isRunning && timer.startTime ? "Reset" : "Lap";

  return (
    <div className="App">
      <div className="top">
        <div className="digits">
          <p>{printTime(timer.totalTime)}</p>
        </div>
        <div className="buttons">
          <button className={lapResetClasses} onClick={lapResetHandler}>
            {lapResetLabel}
          </button>
          <button className={startStopClasses} onClick={startStopHandler}>
            {startStopLabel}
          </button>
        </div>
      </div>
      <div className="bottom">
        <table>
          <tbody>
            {timer.startTime ? (
              <LapTimer
                lapTime={timer.currentLapTime}
                lapNumber={timer.lapTimes.length}
              />
            ) : null}
            <LapRow timerState={timer} />
            <EmptyRows lapsLength={timer.lapTimes.length} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StopWatch;
