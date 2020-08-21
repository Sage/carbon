import * as React from 'react';

export interface EntityContentProps {
  /** Content of the Entity component */
  children: React.ReactNode;
}

declare const EntityContent: React.FunctionComponent<EntityContentProps>;
export default EntityContent;
