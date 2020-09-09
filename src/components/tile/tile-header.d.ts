import * as React from 'react';
import TileHeader from './tile-header.component';

export interface TileHeaderProps {
  /** main content of `TileHeader` */
  title: string;
  /** if true `TileHeader` will hide the content */
  collapsable?: boolean;
  /** the content of `TileHeader`. With `collapsable` prop this will be hidden part */
  children?: React.ReactNode;
}

declare const TileHeader: React.ComponentType<TileHeaderProps>;

export default TileHeader;
