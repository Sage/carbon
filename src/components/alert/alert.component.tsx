import React from "react";

import Dialog, { DialogProps } from "../dialog";

/**
 * @deprecated Alert has been deprecated. See the Carbon documentation for migration details.
 */
const Alert = ({
  children,
  size = "extra-small",
  topModalOverride,
  closeButtonDataProps,
  ...rest
}: Omit<DialogProps, "data-component">) => (
  <Dialog
    role="alertdialog"
    size={size}
    topModalOverride={topModalOverride}
    closeButtonDataProps={closeButtonDataProps}
    {...rest}
    data-component="alert"
  >
    {children}
  </Dialog>
);

export default Alert;
