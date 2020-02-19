import React, { useState } from 'react';

function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      // Not sure if this is implemented correctly either, passes the test But I feel like it should still be adding mode to the history
      history.pop();
      setHistory([...history]);
    } else {
      setHistory([...history, mode]);
    }
    setMode(newMode);
  }

  function back() {
    // Not sure why the test of making sure that one element is in the array passes when back is called passes.
    // if (history.length === 1) {
    //   setMode(history[0]);
    // } else {
      setMode(history[history.length - 1]);
      history.pop();
      setHistory([...history]);
    // }
  }
  
  return { mode, transition, back } ;
}
 
export default useVisualMode;