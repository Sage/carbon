import React from "react";
import { SpaceProps } from "styled-system";
import { StyledDd } from "../definition-list.style";
import { useDlContext } from "../__internal__/dl.context";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

export interface DdProps extends SpaceProps, TagProps {
  /** Prop for what will render in the `<Dd></Dd>` tags */
  children: React.ReactNode;
}

const Dd = ({ children, ...rest }: DdProps) => {
  const { mb } = rest;
  const { asSingleColumn, ddTextAlign } = useDlContext();
  return (
    <StyledDd
      data-element="dd"
      data-role="dd"
      asSingleColumn={asSingleColumn}
      ddTextAlign={ddTextAlign}
      mb={mb || 2}
      {...rest}
      {...tagComponent("dd", rest)}
    >
      {children}
    </StyledDd>
  );
};

Dd.displayName = "Dd";
export default Dd;
