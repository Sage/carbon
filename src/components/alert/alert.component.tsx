import React from "react";

import Dialog, { DialogProps } from "../dialog";

export const Alert = ({
  children,
  size = "extra-small",
  topModalOverride,
  closeButtonDataProps,
  ...rest
}: DialogProps) => (
  <Dialog
    data-component="alert"
    role="alertdialog"
    size={size}
    topModalOverride={topModalOverride}
    closeButtonDataProps={closeButtonDataProps}
    {...rest}
  >
    {children}
  </Dialog>
);

export default Alert;
