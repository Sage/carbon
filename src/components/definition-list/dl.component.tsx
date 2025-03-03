import React from "react";
import { SpaceProps } from "styled-system";
import { StyledDl } from "./definition-list.style";
import DlContext, { DlContextProps } from "./__internal__/dl.context";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

export interface DlProps extends SpaceProps, DlContextProps, TagProps {
  /** HTML id attribute of the input */
  id?: string;
  /** prop to render children. */
  children: React.ReactNode;
  /** This value will specify the width of the `StyledDtDiv` as a percentage. The remaining space will be taken up
    by the `StyledDdDiv`. This prop has no effect when `asSingleColumn` is set.
  */
  w?: number;
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
      <DlContext.Provider value={{ asSingleColumn, dtTextAlign, ddTextAlign }}>
        {children}
      </DlContext.Provider>
    </StyledDl>
  );
};

Dl.displayName = "Dl";
export default Dl;
