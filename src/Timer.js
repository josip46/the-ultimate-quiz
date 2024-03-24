import { useEffect } from "react";

function Timer({ dispatch, timeRemaining }) {
  const mins = Math.floor(timeRemaining / 60);
  const secs = timeRemaining % 60;

  useEffect(
    function () {
      const interval = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(interval);
    },
    [dispatch]
  );

  return (
    <p className="timer">
      Time remaining: {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </p>
  );
}

export default Timer;
