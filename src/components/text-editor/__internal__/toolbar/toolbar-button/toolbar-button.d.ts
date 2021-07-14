import * as React from "react";

export interface ToolbarButtonProps {
  ariaLabel?: string;
  children: React.ReactNode;
  activated?: boolean;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  onMouseDown: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseOver?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  tabbable?: boolean;
}

declare function ToolbarButton(props: ToolbarButtonProps & React.RefAttributes<HTMLButtonElement>): JSX.Element;

export default ToolbarButton;
