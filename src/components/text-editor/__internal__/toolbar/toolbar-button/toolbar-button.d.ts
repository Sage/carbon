import * as React from 'react';

export interface ToolbarButtonProps {
  ariaLabel: string;
  children: React.ReactNode;
  activated: boolean;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  onMouseDown: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseOver: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLElement>) => void;
  tooltipVisible?: boolean;
}

declare const ToolbarButton: React.FunctionComponent<ToolbarButtonProps>;

export default ToolbarButton;
