import * as React from "react";
import Page from "./page/page";
import { ThemeObject } from "../../style/themes/base";

export interface PagesProps {
  /** [legacy] Custom className */
  className?: string;
  /** The selected tab on page load */
  initialpageIndex?: number | string;
  pageIndex?: number | string;
  /** Individual tabs */
  children?: React.ReactNode[] | React.ReactNode;
  /** Controls which transition to use. */
  transition?: string;
}

declare class Pages extends React.Component<PagesProps> {}
declare function PagesWithTheme(
  props: PagesProps & { theme: ThemeObject }
): JSX.Element;

export default Pages;
export { PagesWithTheme as Pages, Page };
