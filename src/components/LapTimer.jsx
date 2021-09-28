import React from 'react'
import { printTime } from '../utils/printTime'

export default function LapTimer({timer, lapTimes}) {

  return (
    <tr>
      <td>Lap {!lapTimes.length ? 1 : lapTimes.length + 1}</td>
      <td>{printTime(timer.currentLapTime)}</td>
    </tr>
  )
}
