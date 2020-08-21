import * as React from 'react';

export interface EntityContentDividerProps {
  /** Margin right, given number will be multiplied by base spacing unit (8) */
  mr?: number;
  /** Margin left, given number will be multiplied by base spacing unit (8) */
  ml?: number;
}

declare const EntityContentDivider: React.FunctionComponent<EntityContentDividerProps>;
export default EntityContentDivider;
