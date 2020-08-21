import * as React from 'react';

export interface EntityProps {
  /** Header of the Entity component */
  header?: React.ReactNode;
  /** Content of the Entity component */
  content?: React.ReactNode;
}

declare const Entity: React.FunctionComponent<EntityProps>;
export default Entity;
