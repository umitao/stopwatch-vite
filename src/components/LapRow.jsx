import React from "react";
import { printTime } from "../utils/printTime";
import { indexOfMinMax, markMinMax } from "../utils/findMinMax";

const LapRow = ({ timerState }) => (
  <>
    {timerState.lapTimes.map((lapTime, index) => {
      const newIndex = indexOfMinMax(timerState.lapTimes);
      const bestWorstLap = markMinMax(newIndex, index);
      const lapNumber = timerState.lapTimes.length - index;
      return (
        <tr key={lapNumber} className={bestWorstLap}>
          <td>{`Lap ${lapNumber}`}</td>
          <td>{printTime(lapTime)}</td>
        </tr>
      );
    })}
  </>
);

export default LapRow;
