import * as React from "react";

export interface PortalProps {
  /** The content of the portal. */
  children?: React.ReactNode;
  className?: string;
  id?: string;
  /** Callback function triggered when parent element is scrolled or window resized. */
  onReposition?: () => void;
}

declare function Portal(props: PortalProps): JSX.Element;

export default Portal;
