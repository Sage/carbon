import * as React from "react";

export interface ToolbarProps {
  activeControls: object;
  /** Additional elements to be rendered, e.g. Save and Cancel Button */
  toolbarElements?: React.ReactNode;
  setInlineStyle: (args: number) => any;
  setBlockStyle: (args: number) => any;
}

declare function Toolbar(props: ToolbarProps): JSX.Element;

export default Toolbar;
