import { useLayoutEffect, useRef } from "react";

export interface FixtureResetElement extends HTMLButtonElement {
  resetBenchmarkFixture?: () => void;
}

/** Exposes fixture state preparation without Playwright's click waits. */
const useFixtureReset = (reset: () => void) => {
  const callback = useRef(reset);
  callback.current = reset;
  const buttonRef = useRef<FixtureResetElement>(null);

  useLayoutEffect(() => {
    const button = buttonRef.current;
    if (!button) return undefined;
    button.resetBenchmarkFixture = () => {
      // Match the starting focus established by clicking the reset button.
      button.focus();
      callback.current();
    };
    return () => {
      delete button.resetBenchmarkFixture;
    };
  }, []);

  return buttonRef;
};

export default useFixtureReset;
