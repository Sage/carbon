// eslint-disable-next-line no-restricted-imports
import { layout, styleFn } from "styled-system";

/*
 * styled-system/layout allows users to use a width, height, minWidth, maxWidth, minHeight, maxHeight,
 * size, display, verticalAlign, overflow, overflowX and overflowY props most of which are usually not needed.
 * That's why the purpose of this function is to pass only the`width` prop to the `layout` function.
 */

export default ({ width }: Record<string, unknown>): styleFn =>
  layout({ width });
