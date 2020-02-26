import { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // The function that transitions between modes, if false is true it doesnt add the previous mode to the history
  function transition(mode, replace = false) {
    setMode(mode);
    replace
      ? setHistory(prev => [...prev])
      : setHistory(prev => [...prev, mode]);
  };

  // The function that will push you back to the last history, and set the new history
  function back() {
    if (history.length === 1) {
      setMode(history[0]);
    } else {
      const popHistory = [...history];
      popHistory.pop();
      setMode(popHistory[popHistory.length - 1]);
      setHistory([...popHistory]);
    };
  };

  return { mode, transition, back };
}
