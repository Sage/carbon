import React from "react";

import Dialog, { DialogProps } from "../dialog";

export const Alert = ({
  children,
  size = "extra-small",
  topModalOverride,
  ...rest
}: DialogProps) => (
  <Dialog
    data-component="alert"
    role="alertdialog"
    size={size}
    topModalOverride={topModalOverride}
    {...rest}
  >
    {children}
  </Dialog>
);

export default Alert;
