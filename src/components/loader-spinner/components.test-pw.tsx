import React from "react";
import { LoaderSpinner, LoaderSpinnerProps } from ".";

/** Concerns have been raised regarding playwright test flakiness due to animation
 * FE-6367 has been raised to investigate and fix these flaky tests. In the meantime
 * motion has been disabled on this test component.
 */
const LoaderSpinnerComponent = (props: Partial<LoaderSpinnerProps>) => (
  <LoaderSpinner hasMotion={false} {...props} />
);

export default LoaderSpinnerComponent;
