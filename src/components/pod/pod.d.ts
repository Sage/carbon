import * as React from "react";

export interface PodProps {
  /** Enables/disables the border around the pod. */
  border?: boolean;
  /** Children elements */
  children?: React.ReactNode;
  /** Custom className */
  className?: string;
  /** Determines the padding around the pod */
  size?: "none" | "extra-small" | "small" | "medium" | "large" | "extra-large";
  /** Prop to apply a theme to the Pod */
  variant?: "primary" | "secondary" | "tertiary" | "tile" | "transparent";
  /** Title for the pod h4 element always shown */
  title?: string | React.ReactNode;
  /** Optional subtitle for the pod */
  subtitle?: string;
  /** Aligns the title to left, right or center */
  alignTitle?: "left" | "center" | "right";
  /** A component to render as a Pod footer */
  footer?: string | React.ReactNode;
  /** Supplies an edit action to the pod */
  onEdit?:
    | string
    | Record<string, unknown>
    | ((
        ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
      ) => void);
  /** Supplies a delete action to the pod */
  onDelete?: (
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
  /** Supplies an undo action to the pod in soft delete state. */
  onUndo?: (
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
  /** Sets soft delete state */
  softDelete?: boolean;
  /** Determines if the editable pod content should be full width */
  editContentFullWidth?: boolean;
  /** Determines if the edit button should be hidden until the user hovers over the content */
  displayEditButtonOnHover?: boolean;
  /** Determines if clicking the pod content calls the onEdit action */
  triggerEditOnContent?: boolean;
  /** Resets edit button styles to an older version */
  internalEditButton?: boolean;
  /** Sets Pod height, number is changed to pixels and string is passed as raw css value */
  height?: string | number;
}

declare function Pod(
  props: PodProps & React.RefAttributes<HTMLElement>
): JSX.Element;

export default Pod;
