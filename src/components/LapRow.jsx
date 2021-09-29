import React from "react";
import { printTime } from "../utils/printTime";
import { markMinMax } from "../utils/findMinMax";

const LapRow = ({ lapTimes, minMaxIndex }) => (
  <>
    {lapTimes.map((lapTime, index) => (
      <tr
        key={lapTimes.length - index}
        className={markMinMax(minMaxIndex, index)}
      >
        <td>{`Lap ${lapTimes.length - index}`}</td>
        <td>{printTime(lapTime)}</td>
      </tr>
    ))}
  </>
);

export default LapRow;

// lapTimes.length > 1 ? markMinMax(minMaxIndex, index) : null
