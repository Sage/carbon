import { useState, useRef, useCallback, useMemo } from "react";

export interface InputContextProps {
  hasFocus?: boolean;
  hasMouseOver?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onMouseDown?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  inputRef?: (input: {
    current: HTMLInputElement | HTMLTextAreaElement | null;
  }) => void;
}

const useInputBehaviour = (
  blockGroupBehaviour?: boolean,
): InputContextProps => {
  const [hasFocus, setHasFocus] = useState(false);
  const [hasMouseOver, setHasMouseOver] = useState(false);

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const onFocus = useCallback(() => setHasFocus(true), []);

  const onBlur = useCallback(() => setHasFocus(false), []);

  const assignInput = useCallback(
    (input: { current: HTMLInputElement | HTMLTextAreaElement | null }) => {
      inputRef.current = input.current;
    },
    [],
  );

  // use mouse down rather than click to accommodate click and drag events too
  const onMouseDown = useCallback(() => {
    requestAnimationFrame(() => {
      inputRef?.current?.focus({
        preventScroll: true,
      });
    });
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
    ],
  );

  return contextValue;
};

export default useInputBehaviour;
