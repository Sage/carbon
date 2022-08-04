import React from "react";
import { SpaceProps } from "styled-system";
import { StyledDd } from "./definition-list.style";

export interface DdProps extends SpaceProps {
  /** Prop for what will render in the `<Dd></Dd>` tags */
  children: React.ReactNode;
}

const Dd = ({ children, ...rest }: DdProps) => {
  const { mb } = rest;
  return (
    <StyledDd mb={mb || 2} {...rest}>
      {children}
    </StyledDd>
  );
};

export default Dd;
