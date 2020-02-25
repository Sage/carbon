import * as React from 'react';

export interface ActionPopoverProps {
  /** FlatTableHead and FlatTableBody */
  children: React.ReactNode;
  /** If true, the header does not scroll with the content */
  hasStickyHead?: boolean;
}

declare const ActionPopover: React.FunctionComponent<ActionPopoverProps>;

export default ActionPopover;
