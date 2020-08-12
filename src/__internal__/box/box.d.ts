import * as React from 'react';

type SpacingOptions = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface BoxProps {
  /** Box content */
  children: React.ReactNode;
  /** Margin, integer mulitplied by base spacing constant (8) */
  m?: SpacingOptions;
  /** Margin top, integer mulitplied by base spacing constant (8) */
  mt?: SpacingOptions;
  /** Margin bottom, integer mulitplied by base spacing constant (8) */
  mb?: SpacingOptions;
  /** Margin right, integer mulitplied by base spacing constant (8) */
  mr?: SpacingOptions;
  /** Margin left, integer mulitplied by base spacing constant (8) */
  ml?: SpacingOptions;
  /** Margin right and left, integer mulitplied by base spacing constant (8) */
  mx?: SpacingOptions;
  /** Margin top and bottom, integer mulitplied by base spacing constant (8) */
  my?: SpacingOptions;
  /** Padding, integer mulitplied by base spacing constant (8) */
  p?: SpacingOptions;
  /** Padding top, integer mulitplied by base spacing constant (8) */
  pt?: SpacingOptions;
  /** Padding bottom, integer mulitplied by base spacing constant (8) */
  pb?: SpacingOptions;
  /** Padding right, integer mulitplied by base spacing constant (8) */
  pr?: SpacingOptions;
  /** Padding left, integer mulitplied by base spacing constant (8) */
  pl?: SpacingOptions;
  /** Padding right and left, integer mulitplied by base spacing constant (8) */
  px?: SpacingOptions;
  /** Padding top and bottom, integer mulitplied by base spacing constant (8) */
  py?: SpacingOptions;
}

declare const Box: React.ComponentClass<BoxProps>;

export default Box;
