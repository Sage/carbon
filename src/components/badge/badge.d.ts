import * as React from "react";

export interface BadgeProps {
  /** The badge will be added to this element */
  children: React.ReactNode;
  /** The number rendered in the badge component */
  counter: string | number;
  /** Callback fired when badge is clicked */
  onClick: () => void;
}

declare const Badge: React.FunctionComponent<BadgeProps>;

export default Badge;
