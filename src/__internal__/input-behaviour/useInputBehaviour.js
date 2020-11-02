import { useState, useRef, useCallback, useMemo } from "react";

const useInputBehaviour = () => {
  const [hasFocus, setHasFocus] = useState(false);
  const [hasMouseOver, setHasMouseOver] = useState(false);

  const inputRef = useRef(null);

  const onFocus = useCallback(() => setHasFocus(true), []);

  const onBlur = useCallback(() => setHasFocus(false), []);

  const assignInput = useCallback((input) => {
    inputRef.current = input.current;
  }, []);

  // use mouse down rather than click to accomodate click and drag events too
  const onMouseDown = useCallback(() => {
    // use a zero timeout to ensure focus is applied even on click and drag events
    setTimeout(() => inputRef && inputRef.current && inputRef.current.focus());
  }, []);

  const onMouseEnter = useCallback(() => setHasMouseOver(true), []);

  const onMouseLeave = useCallback(() => setHasMouseOver(false), []);

  const contextValue = useMemo(
    () => ({
      hasFocus,
      hasMouseOver,
      onFocus,
      onBlur,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      inputRef: assignInput,
    }),
    [
      assignInput,
      onMouseDown,
      hasFocus,
      hasMouseOver,
      onBlur,
      onFocus,
      onMouseEnter,
      onMouseLeave,
    ]
  );

  return contextValue;
};

export default useInputBehaviour;
