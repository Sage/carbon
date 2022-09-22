import React from "react";

import Dialog, { DialogProps } from "../dialog";

export const Alert = ({
  children,
  size = "extra-small",
  ...rest
}: DialogProps) => (
  <Dialog data-component="alert" role="alertdialog" size={size} {...rest}>
    {children}
  </Dialog>
);

export default Alert;
