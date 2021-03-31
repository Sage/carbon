import * as React from "react";

interface ActionToolbarChildProps {
  disabled?: boolean;
  selected?: boolean;
  total?: number;
}

export interface ActionToolbarProps {
  /** The actions to display in the toolbar */
  actions: object;
  /** A custom class name for the component. */
  className?: string;
  /** A function to return child components for the action toolbar. */
  children?: (props: ActionToolbarChildProps) => React.ReactElement;
}

declare class ActionToolbar extends React.Component<ActionToolbarProps> {}

export default ActionToolbar;
