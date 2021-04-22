import { useState, useRef, useCallback, useMemo } from "react";

const useInputBehaviour = (blockGroupBehaviour) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [hasMouseOver, setHasMouseOver] = useState(false);

  const inputRef = useRef(null);

  const onFocus = useCallback(() => setHasFocus(true), []);

  const onBlur = useCallback(() => setHasFocus(false), []);

  const assignInput = useCallback((input) => {
    inputRef.current = input.current;
  }, []);

  const onMouseEnter = useCallback(() => setHasMouseOver(true), []);

  const onMouseLeave = useCallback(() => setHasMouseOver(false), []);

  const contextValue = useMemo(
    () => ({
      hasFocus,
      hasMouseOver,
      onFocus: blockGroupBehaviour ? undefined : onFocus,
      onBlur: blockGroupBehaviour ? undefined : onBlur,
      onMouseEnter: blockGroupBehaviour ? undefined : onMouseEnter,
      onMouseLeave: blockGroupBehaviour ? undefined : onMouseLeave,
      inputRef: assignInput,
    }),
    [
      hasFocus,
      hasMouseOver,
      onFocus,
      onBlur,
      blockGroupBehaviour,
      onMouseEnter,
      onMouseLeave,
      assignInput,
    ]
  );

  return contextValue;
};

export default useInputBehaviour;
