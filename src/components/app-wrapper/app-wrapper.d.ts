import * as React from "react";

export interface AppWrapperProps {
  /** Children elements */
  children?: React.ReactNode;
  /** Custom className */
  className?: string;
}

declare class AppWrapper extends React.Component<AppWrapperProps> {}

export default AppWrapper;
