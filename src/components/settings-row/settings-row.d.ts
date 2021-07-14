import * as React from "react";

export interface SettingsRowProps {
  /**  The CSS classes to apply to the component. */
  className?: string;
  /**  A title for this group of settings. */
  title?: string;
  /**  A string or JSX object that provides a short description about the group of settings. */
  description?: React.ReactNode;
  /** Shows a divider below the component. */
  divider?: boolean;
}

declare function SettingsRow(props: React.PropsWithChildren<SettingsRowProps>): JSX.Element;

export default SettingsRow;
