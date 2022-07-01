import * as React from "react";

export interface ModalContextProps {
  value?: {
    isInModal?: boolean;
    isAnimationComplete?: boolean;
    triggerRefocusFlag?: boolean;
  };
  ref?: React.MutableRefObject<React.ReactNode>;
}

export interface ModalProps {
  /** Modal content */
  children?: React.ReactNode;
  /** The ARIA role to be applied to the modal */
  ariaRole?: string;
  /** Determines if the Esc Key closes the modal */
  disableEscKey?: boolean;
  /** Determines if the Dialog can be closed */
  disableClose?: boolean;
  /** Determines if the background is disabled when the modal is open */
  enableBackgroundUI?: boolean;
  /** A custom close event handler */
  onCancel?: (ev: React.KeyboardEvent<HTMLElement>) => void;
  /** Sets the open state of the modal */
  open: boolean;
  /** Transition time */
  timeout?: number;
}

declare const ModelContext: React.Context<ModalContextProps>;
declare function Modal(props: ModalProps): JSX.Element;

export { ModalContext };
export default Modal;
