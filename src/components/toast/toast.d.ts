import * as React from "react";
import * as OptionsHelper from "../../utils/helpers/options-helper";

export interface ToastPropTypes {
  /** The rendered children of the component. */
  children: React.ReactNode;
  /** Customizes the appearance in the DLS theme */
  variant?: OptionsHelper.ColorTypes;
  /** Customizes the appearance in a legacy theme through colour (see the 'iconColorSets' for possible values) */
  as?: OptionsHelper.ColorTypes;
  /** Custom className */
  className?: string;
  /** Custom id  */
  id?: string;
  /** Component name */
  "data-component"?: string;
  /** Determines if the Toast is open. */
  open?: boolean;
  /** Callback for when dismissed. */
  onDismiss?: () => void;
  /** Time for Toast to remain on screen */
  timeout?: string | number;
  /** Centers the Toast on the screen */
  isCenter?: boolean;
  /** Target Portal ID where the Toast will render */
  targetPortalId?: string;
  /** Maximum toast width */
  maxWidth?: string;
}

declare class Toast extends React.Component<ToastPropTypes> {}

export default Toast;
