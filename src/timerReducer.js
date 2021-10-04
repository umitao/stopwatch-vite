import { timeElapsed } from "./utils/printTime";
import { indexOfMinMax } from "./utils/findMinMax";

export const initialTimer = {
  isRunning: false,
  startTime: 0,
  totalTime: 0,
  currentLapStart: 0,
  currentLapTime: 0,
  minIndex: 0,
  maxIndex: 0,
  lapTimes: [],
};

export const TimerActions = {
  START: "START",
  STOP: "STOP",
  RESET: "RESET",
  SAVE_LAP: "SAVE_LAP",
  RUN: "RUN",
};

export function timerReducer(state, action) {
  switch (action.type) {
    case "RUN":
      return {
        ...state,
        totalTime: timeElapsed(state.startTime),
        currentLapTime: timeElapsed(state.currentLapStart),
      };
    case "START":
      return {
        ...state,
        isRunning: !state.isRunning,
        startTime: Date.now() - state.totalTime,
        currentLapStart: Date.now() - state.currentLapTime,
      };
    case "STOP":
      return { ...state, isRunning: !state.isRunning };
    case "RESET":
      return initialTimer;
    case "SAVE_LAP":
      const newIndex = indexOfMinMax(state.lapTimes);
      return {
        ...state,
        lapTimes: [state.currentLapTime, ...state.lapTimes],
        currentLapStart: Date.now(),
        currentLapTime: 0,
        ...newIndex,
      };
    default:
      throw new Error();
  }
}
