import GridItem from '../grid-item';

export interface GridContainerProps {
  /** Defines the Components to be rendered within the GridContainer. Requires a GridItem */
  children: typeof GridItem | Array<typeof GridItem>;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default padding */
  p?: string | number;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default padding-left */
  pl?: string | number;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default padding-right */
  pr?: string | number;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default padding-top */
  pt?: string | number;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default padding-bottom */
  pb?: string | number;
  /**
   * Any valid CSS value or a number to be multiplied by base spacing unit (8).
   * Overrides default horizontal paddings
   */
  px?: string | number;
  /**
   * Any valid CSS value or a number to be multiplied by base spacing unit (8).
   * Overrides default vertical paddings
   */
  py?: string | number;
  /** Any valid CSS value to override default grid-gap */
  gridGap?: string;
}
