import * as React from 'react';
export interface LinkProps {
  as?: "primary" | "secondary",
  disabled?: boolean,
  theme?: string,
  size?: string,
  subtext?: any
}
declare const Link: React.Component<LinkProps, {}>;
export default Link;
