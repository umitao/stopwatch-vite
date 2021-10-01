import React from "react";

export default function Button({ isRunning, classes, buttonFunction }) {
  console.log(classes);
  return (
    <div className="buttons">
      (
      <button className={classes} onClick={buttonFunction}>
        {classes[0].toUpperCase() + classes.slice(1)}
      </button>
      )
      {!isRunning ? (
        <button className="start" onClick={start}>
          Start
        </button>
      ) : (
        <button className="stop" onClick={stop}>
          Stop
        </button>
      )}
    </div>
  );
}
