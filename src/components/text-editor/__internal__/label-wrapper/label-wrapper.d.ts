import * as React from "react";

export interface LabelWrapperProps {
  children: React.ReactNode;
  onClick: () => void;
}

declare function LabelWrapper(props: LabelWrapperProps): JSX.Element;

export default LabelWrapper;
