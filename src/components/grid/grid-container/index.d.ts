import GridItem from '../grid-item';

export interface GridContainerProps {
  /** Defines the Components to be rendered within the GridContainer. Requires a GridItem */
  children: typeof GridItem | Array<typeof GridItem>;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default margin */
  m?: string | number;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default margin-left */
  ml?: string | number;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default margin-right */
  mr?: string | number;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default margin-top */
  mt?: string | number;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default padding-bottom */
  mb?: string | number;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default horizontal margins */
  mx?: string | number;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default vertical margins */
  my?: string | number;
  /** Any valid CSS value to override default grid-gap */
  gridGap?: string;
}
