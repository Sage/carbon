import React from "react";
import { SpaceProps } from "styled-system";
import { StyledDl } from "./definition-list.style";
import { DlProvider } from "./__internal__/dl.context";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

type ElementAlignment = "left" | "center" | "right";

export interface DlProps extends SpaceProps, TagProps {
  /** HTML id attribute of the input */
  id?: string;
  /** prop to render children. */
  children: React.ReactNode;
  /** This value will specify the width of the `StyledDtDiv` as a percentage. The remaining space will be taken up
    by the `StyledDdDiv`. This prop has no effect when `asSingleColumn` is set.
  */
  w?: number;
  /** Render the DefinitionList as a single column */
  asSingleColumn?: boolean;
  /** This string will specify the text align styling of the `<dt></dt>`. */
  dtTextAlign?: ElementAlignment;
  /** This string will specify the text align styling of the `<dd></dd>`. */
  ddTextAlign?: ElementAlignment;
}

const Dl = ({
  children,
  w = 50,
  dtTextAlign = "right",
  ddTextAlign = "left",
  asSingleColumn = false,
  ...rest
}: DlProps) => {
  return (
    <StyledDl
      w={w}
      asSingleColumn={asSingleColumn}
      {...rest}
      {...tagComponent("dl", rest)}
    >
      <DlProvider value={{ asSingleColumn, dtTextAlign, ddTextAlign }}>
        {children}
      </DlProvider>
    </StyledDl>
  );
};

Dl.displayName = "Dl";
export default Dl;
