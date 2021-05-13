import * as React from "react";

export interface MountInAppProps {
  /** Children elements */
  children?: React.ReactNode;
  /** ID of the element in which the children components will be rendered. */
  targetId?: string;
}

declare class MountInApp extends React.Component<MountInAppProps> {}

export default MountInApp;
