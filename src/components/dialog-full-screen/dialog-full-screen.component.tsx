import React from "react";

import Logger from "../../__internal__/utils/logger";
import Dialog, { DialogProps } from "../dialog/dialog.component";

let deprecatedDialogFullScreenTrigger = false;

export const DialogFullScreen = ({ ...props }: DialogProps) => {
  /* istanbul ignore else */
  if (!deprecatedDialogFullScreenTrigger) {
    deprecatedDialogFullScreenTrigger = true;
    Logger.deprecate(
      "`DialogFullscreen` has been deprecated and will soon be removed. Use `Dialog` with the `fullscreen` prop instead.",
    );
  }

  return <Dialog fullscreen {...props} />;
};

export default DialogFullScreen;
