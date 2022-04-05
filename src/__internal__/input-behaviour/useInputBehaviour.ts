import { useState, useRef, useCallback, useMemo } from "react";

export interface InputContextProps {
  hasFocus?: boolean;
  hasMouseOver?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onMouseDown?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  inputRef?: (input: { current: HTMLInputElement | null }) => void;
  ariaLabelledBy?: string;
}

const useInputBehaviour = (
  blockGroupBehaviour?: boolean
): InputContextProps => {
  const [hasFocus, setHasFocus] = useState(false);
  const [hasMouseOver, setHasMouseOver] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onFocus = useCallback(() => setHasFocus(true), []);

  const onBlur = useCallback(() => setHasFocus(false), []);

  const assignInput = useCallback(
    (input: { current: HTMLInputElement | null }) => {
      inputRef.current = input.current;
    },
    []
  );

  // use mouse down rather than click to accommodate click and drag events too
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
      onFocus: blockGroupBehaviour ? undefined : onFocus,
      onBlur: blockGroupBehaviour ? undefined : onBlur,
      onMouseDown,
      onMouseEnter: blockGroupBehaviour ? undefined : onMouseEnter,
      onMouseLeave: blockGroupBehaviour ? undefined : onMouseLeave,
      inputRef: assignInput,
    }),
    [
      hasFocus,
      hasMouseOver,
      onFocus,
      onBlur,
      onMouseDown,
      blockGroupBehaviour,
      onMouseEnter,
      onMouseLeave,
      assignInput,
    ]
  );

  return contextValue;
};

export default useInputBehaviour;
