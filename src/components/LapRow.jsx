import React from "react";
import { printTime } from "../utils/printTime";
import { markMinMax } from "../utils/findMinMax";

const LapRow = ({ timerState }) => (
  <>
    {timerState.lapTimes.map((lapTime, index) => (
      <tr key={timerState.lapTimes.length - index}>
        <td>{`Lap ${timerState.lapTimes.length - index}`}</td>
        <td>{printTime(lapTime)}</td>
      </tr>
    ))}
  </>
);

export default LapRow;

// lapTimes.length > 1 ? markMinMax(minMaxIndex, index) : null
//className={markMinMax(minMaxIndex, index)}
