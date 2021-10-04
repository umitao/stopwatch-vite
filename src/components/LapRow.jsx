import React from "react";
import { printTime } from "../utils/printTime";
import { indexOfMinMax, markMinMax } from "../utils/findMinMax";

const LapRow = ({ timerState }) => (
  <>
    {timerState.lapTimes.map((lapTime, index) => {
      const newIndex = indexOfMinMax(timerState.lapTimes);
      const bestWorstLap = markMinMax(newIndex, index);

      return (
        <tr key={timerState.lapTimes.length - index} className={bestWorstLap}>
          <td>{`Lap ${timerState.lapTimes.length - index}`}</td>
          <td>{printTime(lapTime)}</td>
        </tr>
      );
    })}
  </>
);

export default LapRow;
