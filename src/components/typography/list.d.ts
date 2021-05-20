import * as React from "react";
import { TypographyProps } from "./typography";

declare function List(props: TypographyProps & React.HTMLProps<HTMLElement>): JSX.Element;
declare function ListItem(props: TypographyProps & React.HTMLProps<HTMLElement>): JSX.Element;

export { List, ListItem };
