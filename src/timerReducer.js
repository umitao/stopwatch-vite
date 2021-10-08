import { timeElapsed } from "./utils/printTime";

export const initialTimer = {
  isRunning: false,
  startTime: 0,
  totalTime: 0,
  currentLapStart: 0,
  currentLapTime: 0,
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
    case TimerActions.RUN:
      return {
        ...state,
        totalTime: timeElapsed(state.startTime),
        currentLapTime: timeElapsed(state.currentLapStart),
      };
    case TimerActions.START:
      return {
        ...state,
        isRunning: !state.isRunning,
        startTime: Date.now() - state.totalTime,
        currentLapStart: Date.now() - state.currentLapTime,
      };
    case TimerActions.STOP:
      return { ...state, isRunning: !state.isRunning };
    case TimerActions.RESET:
      return initialTimer;
    case TimerActions.SAVE_LAP:
      return {
        ...state,
        lapTimes: [state.currentLapTime, ...state.lapTimes],
        currentLapStart: Date.now(),
        currentLapTime: 0,
      };
    default:
      throw new Error("Unrecognized action");
  }
}
