const timeElapsed = (time) => {
  return Date.now() - time;
};

const printTime = (time) => {
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hundredths = Math.floor((time / 10) % 100);

  const padNumber = (number) => number.toString().padStart(2, "0");
  return `${padNumber(minutes)}:${padNumber(seconds)}.${padNumber(hundredths)}`;
};

export { timeElapsed, printTime };

//Does the dom element load with correct time string?

//Does the dom element start counting when I hit "Start"?

//Does the first lap appear and start running when I hit "Start"?

//Do buttons show up correctly?

//Does "Reset" button works as expected? Resets the main timer && lap timer, deletes all lap data & rows and related state.

//Does "Stop" button freeze time and the lap?

//Does "Start" button -when paused- starts the stopwatch again from where it was?

//Is there a limit to laps?

// import { render, fireEvent } from "@testing-library/react";
// import "@testing-library/jest-dom";

// test("loads and displays greeting", async () => {});
