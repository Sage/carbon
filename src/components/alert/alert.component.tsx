import React from "react";

import Dialog, { DialogProps } from "../dialog";

/**
 * @deprecated See the Carbon documentation for migration details.
 */
export const Alert = ({
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
