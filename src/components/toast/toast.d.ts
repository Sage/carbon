import * as React from "react";

export interface ToastPropTypes {
  children: React.FunctionComponent | React.ComponentClass;
  variant?: string;
  as?: string;
  className?: string;
  id?: string;
  "data-component"?: string;
  open?: boolean;
  onDismiss?: () => void;
  timeout?: string | number;
  isCenter?: boolean;
  targetPortalId?: string;
  maxWidth?: string;
}

declare class Toast extends React.Component<ToastPropTypes> {}

export default Toast;
