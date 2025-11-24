import React from "react";
import Logger from "../../__internal__/utils/logger";

import InternalModal, {
  type ModalProps as InternalModalProps,
} from "../../__internal__/modal";

let hasTriggeredWarning = false;

/** @deprecated `Modal` is deprecated. Please use `Dialog` instead. */
const Modal = (props: InternalModalProps) => {
  if (!hasTriggeredWarning) {
    hasTriggeredWarning = true;

    Logger.deprecate(
      "Carbon `Modal` is deprecated. Please use `Dialog` instead.",
    );
  }

  return <InternalModal {...props} />;
};

/** @deprecated `Modal` is deprecated. Please use `Dialog` instead. */
type ModalProps = InternalModalProps;

export default Modal;
export type { ModalProps };
