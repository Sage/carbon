import * as React from "react";

export interface ConfirmProps {
  // ** A custom event handler when a confirmation takes place */
  onConfirm: () => void;
  // ** Customise the confirm button label */
  confirmLabel?: string;
  // ** Customise the cancel button label */
  cancelLabel?: string;
  /** Apply destructive style to the buttons */
  destructive?: boolean;
  /** Defines an Icon type within the button (see Icon for options) */
  iconType?: "error" | "warning";
  /** Makes cancel button disabled */
  disableCancel?: boolean;
  /** Makes confirm button disabled */
  disableConfirm?: boolean;
  /** Allows to setup buttonType into cancel button */
  cancelButtonType?: "primary" | "secondary" | "tertiary";
  /** Adds isLoading state into confirm button */
  isLoadingConfirm?: boolean;
}

declare class Confirm extends React.Component<ConfirmProps> {}

export default Confirm;
