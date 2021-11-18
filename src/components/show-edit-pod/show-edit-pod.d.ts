import * as React from "react";

export interface ShowEditPodProps {
  /** Enable/disable the border on the Pod. */
  border?: boolean;
  /** Controls which direction the form buttons align */
  buttonAlign?: string;
  /** Set to false to hide the cancel button */
  cancel?: boolean;
  /** Supply custom text for the cancel button */
  cancelText?: string;
  /** This component supports children. */
  children?: React.ReactNode;
  /** Classes to apply to the component. */
  className?: string;
  /** Supply custom text for the delete button */
  deleteText?: string;
  /** Define fields to be rendered in the edit state */
  editFields?: React.ReactNode;
  /** Allows developers to control the editing state manually. */
  editing?: boolean;
  /** Hide delete button in view mode. */
  hideDeleteButtonInViewMode?: boolean;
  /** Sets soft delete state. */
  softDelete?: boolean;
  /** A callback triggered when the form is cancelled */
  onCancel?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** A callback triggered when the delete action is clicked. */
  onDelete?: (
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
  /** A callback triggered when the undo action is clicked. */
  onUndo?: (
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
  /** Callback when edit button is clicked. */
  onEdit?: (
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
  // Props passed to Form
  /** A callback triggered after clicking the save button */
  onSave?: (ev: React.FormEvent<HTMLFormElement>) => void;
  /** Define a custom transition between show and edit states */
  transitionName?: string;
  /** Pod theme variant. */
  variant?: string;
  /** Supply custom text for the save button */
  saveText?: string;
  /** Can inform if the form is in a saving state (disables the save button) */
  saving?: boolean;
  /** Title to be displayed */
  title?: React.ReactNode;
}

declare function ShowEditPod(props: ShowEditPodProps): JSX.Element;

export default ShowEditPod;
