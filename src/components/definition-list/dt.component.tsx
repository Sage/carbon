import React, { useContext } from "react";
import { SpaceProps } from "styled-system";
import { StyledDt } from "./definition-list.style";
import DlContext from "./__internal__/dl.context";

export interface DtProps extends SpaceProps {
  /** Prop for what will render in the `<Dd></Dd>` tags */
  children: React.ReactNode;
}

const Dt = ({ children, ...rest }: DtProps) => {
  const { asSingleColumn, dtTextAlign } = useContext(DlContext);
  const { mb, pr } = rest;
  return (
    <StyledDt
      data-element="dt"
      mb={mb || asSingleColumn ? undefined : 2}
      pr={pr || asSingleColumn ? undefined : 3}
      dtTextAlign={dtTextAlign}
      asSingleColumn={asSingleColumn}
      {...rest}
    >
      {children}
    </StyledDt>
  );
};

Dt.displayName = "Dt";
export default Dt;
