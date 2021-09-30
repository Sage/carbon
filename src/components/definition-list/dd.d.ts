import * as React from "react";
import { SpaceProps } from "styled-system";

export interface DdProps extends SpaceProps {
  /** Prop for what will render in the `<Dd></Dd>` tags */
  children: React.ReactNode;
}

declare function DdComponent(props: DdProps): JSX.Element;

export default DdComponent;
