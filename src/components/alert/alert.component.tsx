import React from "react";

import Dialog, { DialogProps } from "../dialog";
import Logger from "../../__internal__/utils/logger";

let deprecationWarningTriggered = false;

export const Alert = ({
  children,
  size = "extra-small",
  topModalOverride,
  closeButtonDataProps,
  ...rest
}: Omit<DialogProps, "data-component">) => {
  if (!deprecationWarningTriggered) {
    Logger.deprecate(
      "The `Alert` component is deprecated and will soon be removed.",
    );
    deprecationWarningTriggered = true;
  }

  return (
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
};

export default Alert;
