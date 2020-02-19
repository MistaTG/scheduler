import React, { useState } from 'react';

function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      // Not sure if this is implemented correctly either, passes the test But I feel like it should still be adding mode to the history
      // history.pop();
      const popHistory = history;
      popHistory.pop();
      setHistory([...popHistory]);
    } else {
      setHistory([...history, mode]);
    }
    setMode(newMode);
  }

  function back() {
    
    if (history.length === 1) {
      setMode(history[0]);
    } else {
      setMode(history[history.length - 1]);
      const popHistory = history;
      popHistory.pop();
      setHistory([...popHistory]);
    }
  }
  
  return { mode, transition, back } ;
}
 
export default useVisualMode;