import * as React from "react";
import { DialogProps } from "../dialog/dialog";

export interface ConfirmProps extends DialogProps {
  /** Allows to setup buttonType into cancel button */
  cancelButtonType?: "primary" | "secondary" | "tertiary";
  // ** Customise the cancel button label */
  cancelLabel?: string;
  // ** Customise the confirm button label */
  confirmLabel?: string;
  /** Apply destructive style to the buttons */
  destructive?: boolean;
  /** Makes cancel button disabled */
  disableCancel?: boolean;
  /** Makes confirm button disabled */
  disableConfirm?: boolean;
  /** Defines an Icon type within the button (see Icon for options) */
  iconType?: "error" | "warning";
  /** Adds isLoading state into confirm button */
  isLoadingConfirm?: boolean;
  // ** A custom event handler when a confirmation takes place */
  onConfirm: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

declare class Confirm extends React.Component<ConfirmProps> {}

export default Confirm;
