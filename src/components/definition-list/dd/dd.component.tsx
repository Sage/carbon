import React, { useContext } from "react";
import { SpaceProps } from "styled-system";
import { StyledDd } from "../definition-list.style";
import DlContext from "../__internal__/dl.context";

export interface DdProps extends SpaceProps {
  /** Prop for what will render in the `<Dd></Dd>` tags */
  children: React.ReactNode;
}

const Dd = ({ children, ...rest }: DdProps) => {
  const { mb } = rest;
  const { asSingleColumn, ddTextAlign } = useContext(DlContext);
  return (
    <StyledDd
      data-element="dd"
      asSingleColumn={asSingleColumn}
      ddTextAlign={ddTextAlign}
      mb={mb || 2}
      {...rest}
    >
      {children}
    </StyledDd>
  );
};

Dd.displayName = "Dd";
export default Dd;
