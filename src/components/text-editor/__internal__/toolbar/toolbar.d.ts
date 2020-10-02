import * as React from 'react';

export interface ToolbarProps {
  activeControls: object;
  isDisabled?: boolean;
  onCancel?: () => void;
  onSave: () => void;
  setInlineStyle: (args: number) => any;
  setBlockStyle: (args: number) => any;
}

declare const Toolbar: React.FunctionComponent<ToolbarProps>;

export default Toolbar;
