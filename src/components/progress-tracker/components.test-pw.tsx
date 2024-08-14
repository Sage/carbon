import React from "react";
import ProgressTracker, { ProgressTrackerProps } from ".";

const ProgressTrackerComponent = (props: ProgressTrackerProps) => {
  return <ProgressTracker progress={50} {...props} />;
};

export default ProgressTrackerComponent;
