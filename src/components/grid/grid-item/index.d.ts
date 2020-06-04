import * as React from 'react';
import { GridItem } from '..';

interface ResponsiveSettingsShape {
  alignSelf: string;
  colStart: string | number;
  colEnd: string | number;
  justifySelf: string;
  maxWidth: number;
  rowStart: string | number;
  rowEnd: string | number;
}

export interface GridItemProps {
  alignSelf: string;
  justifySelf: string;
  children: string;
  gridColumnStart: string | number;
  gridColumnEnd: string | number;
  gridRowStart: string | number;
  gridRowEnd: string | number;
  responsiveSettings: [ResponsiveSettingsShape];
}

declare const GridItemProps: React.FunctionComponent<GridItemProps>;

export default GridItem;
