import * as React from "react";

export interface ModalProps {
  /** The ARIA role to be applied to the modal */
  ariaRole?: string;
  /** Determines if the Esc Key closes the modal */
  disableEscKey?: boolean;
  /** Determines if the background is disabled when the modal is open */
  enableBackgroundUI?: boolean;
  /** A custom close event handler */
  onCancel?: (ev: React.KeyboardEvent<HTMLElement>) => void;
  /** Sets the open state of the modal */
  open: boolean;
}

declare class Modal<T extends ModalProps> extends React.Component<T, {}> {}

export default Modal;
