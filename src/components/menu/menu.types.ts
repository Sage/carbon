import { FlexboxProps, LayoutProps } from "styled-system";
import { TagProps } from "../../__internal__/utils/helpers/tags";

export type MenuType = "light" | "dark" | "white" | "black";

export interface MenuProps
  extends TagProps,
    Pick<
      LayoutProps,
      | "width"
      | "minWidth"
      | "maxWidth"
      | "overflow"
      | "overflowX"
      | "verticalAlign"
    >,
    FlexboxProps {
  /** Children elements */
  children: React.ReactNode;
  /** Defines the color scheme of the component */
  menuType?: MenuType;
}
