import * as React from "react";

export interface LabelWrapperProps {
  children: React.ReactNode;
  onClick: () => void;
}

declare const LabelWrapper: React.FunctionComponent<LabelWrapperProps>;

export default LabelWrapper;
