import React from "react";
import { printTime } from "../utils/printTime";

export default function LapTimer({ lapTime, lapNumber }) {
  return (
    <tr>
      <td>Lap {!lapNumber ? 1 : lapNumber + 1}</td>
      <td>{printTime(lapTime)}</td>
    </tr>
  );
}
