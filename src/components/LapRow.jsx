import React from "react";
import { printTime } from "../utils/printTime";

const LapRow = ({ lapTimes }) => (
  <>
  {lapTimes.map((lapTime, i) => 
      (
        <tr key={i}>
          <td>{`Lap ${lapTimes.length - i}`}</td>
          <td>{printTime(lapTime)}</td>
        </tr>
      )
    )
  }
  </>
)
export default LapRow;
