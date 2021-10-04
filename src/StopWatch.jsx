import "./App.css";
import React, { useEffect, useReducer } from "react";
import { printTime, timeElapsed } from "./utils/printTime";
import { indexOfMinMax } from "./utils/findMinMax";
import LapRow from "./components/LapRow";
import LapTimer from "./components/LapTimer";
import EmptyRows from "./components/EmptyRows";
import { timerReducer, TimerActions, initialTimer } from "./timerReducer";

function StopWatch() {
  const [state, dispatch] = useReducer(timerReducer, initialTimer);

  const start = () => dispatch({ type: TimerActions.START });
  const stop = () => dispatch({ type: TimerActions.STOP });
  const reset = () => dispatch({ type: TimerActions.RESET });
  const lap = () => {
    if (state.isRunning) {
      dispatch({ type: TimerActions.SAVE_LAP });
    }
  };

  useEffect(() => {
    if (state.isRunning) {
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
  }, [state.isRunning]);

  return (
    <div className="App">
      <div className="top">
        <div className="digits">
          <p>{printTime(state.totalTime)}</p>
        </div>
        <div className="buttons">
          {!state.isRunning && state.startTime ? (
            //prettier config parens
            <button className="reset" onClick={reset}>
              Reset
            </button>
          ) : (
            <button className="lap" onClick={lap}>
              Lap
            </button>
          )}
          {!state.isRunning ? (
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
            {state.startTime ? (
              <LapTimer
                lapTime={state.currentLapTime}
                lapNumber={state.lapTimes.length}
              />
            ) : null}
            <LapRow timerState={state} />
            <EmptyRows lapsLength={state.lapTimes.length} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StopWatch;

// if (state.lapTimes.length > 1) {
//   setMinMaxIndex(indexOfMinMax(state.lapTimes));
// }
