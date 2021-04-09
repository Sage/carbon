import * as React from "react";
import { IconTypes } from "../../utils/helpers/options-helper/options-helper";

export interface LinkProps {
  /** Classes to apply to the component. */
  className?: string;
  /** The disabled state of the link. */
  disabled?: boolean;
  /** An href for an anchor tag. */
  href?: string;
  /** An icon to display next to the link. */
  icon?: IconTypes;
  /** Which side of the link to the render the link. */
  iconAlign?: "left" | "right";
  /** Function called when the mouse is clicked. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Function called when a key is pressed. */
  onKeyDown?: React.KeyboardEventHandler<HTMLAnchorElement> | React.KeyboardEventHandler<HTMLButtonElement>;
  /** Function called when a mouse down event triggers. */
  onMouseDown?: React.MouseEventHandler<HTMLAnchorElement> | React.MouseEventHandler<HTMLButtonElement>;
  /** Whether to include the link in the tab order of the page */
  tabbable?: boolean;
  /** A message to display as a tooltip to the link. */
  tooltipMessage?: string;
  /** Positions the tooltip with the link. */
  tooltipPosition?: "bottom" | "left" | "right" | "top";
  /** Child content to render in the link. */
  children?: React.ReactNode;
  /** Target property in which link should open ie: _blank, _self, _parent, _top */
  target?: string;
  /** Aria label for accessibility purposes */
  ariaLabel?: string;
  /** Allows to create skip link */
  isSkipLink?: boolean;
  /** allows to set rel property in <a> tag */
  rel?: string;
}

declare class InternalLink extends React.Component<LinkProps> {}
declare function Link(props: LinkProps & React.RefAttributes<HTMLLinkElement>): JSX.Element;

export { InternalLink };
export default Link;
