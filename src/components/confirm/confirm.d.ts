import * as React from "react";
import { IconType } from "../icon/icon-type";
import { ExplicitUnion } from "../../__internal__/utils/helpers/types";
import { DialogProps } from "../dialog";

export interface ConfirmProps extends DialogProps {
  /** Color variants for new business themes: "primary" | "secondary" | "tertiary" | "dashed" | "darkBackground" */
  cancelButtonType?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "dashed"
    | "darkBackground";
  /** Color variants for new business themes: "primary" | "secondary" | "tertiary" | "dashed" | "darkBackground" */
  confirmButtonType?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "dashed"
    | "darkBackground";
  /** Customise the cancel button label */
  cancelLabel?: string;
  /** Customise the confirm button label */
  confirmLabel?: string;
  /** Apply destructive style to the cancel button */
  cancelButtonDestructive?: boolean;
  /** Apply destructive style to the confirm button */
  confirmButtonDestructive?: boolean;
  /** Defines a cancel button Icon position related to the children: "before" | "after" */
  cancelButtonIconPosition?: "before" | "after";
  /** Defines an Icon type within the cancel button (see Icon for options) */
  cancelButtonIconType?: ExplicitUnion<IconType>;
  /** Defines a cancel button Icon position related to the children: "before" | "after" */
  confirmButtonIconPosition?: "before" | "after";
  /** Defines an Icon type within the confirm button (see Icon for options) */
  confirmButtonIconType?: ExplicitUnion<IconType>;
  /** Makes cancel button disabled */
  disableCancel?: boolean;
  /** Makes confirm button disabled */
  disableConfirm?: boolean;
  /** Defines an Icon type within the button (see Icon for options) */
  iconType?: "error" | "warning";
  /** Adds isLoading state into confirm button */
  isLoadingConfirm?: boolean;
  /** A custom event handler when a confirmation takes place */
  onConfirm: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

declare class Confirm extends React.Component<ConfirmProps> {}

export default Confirm;
