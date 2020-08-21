import * as React from 'react';

export interface EntityHeaderProps {
  /** Entity title  */
  title?: string;
  /** Title font-size */
  fontSize?: 14 | 16;
  /** Additional adornments like Icon or Pill components to be rendered next to title  */
  adornments?: React.ReactNode;
  /** ActionPopover to be rendered on the far right side of EntityHeader   */
  menu?: React.ReactNode;
}

declare const EntityHeader: React.FunctionComponent<EntityHeaderProps>;
export default EntityHeader;
