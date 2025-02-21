import React, { useContext } from "react";
import { SpaceProps } from "styled-system";
import { StyledDt } from "../definition-list.style";
import DlContext from "../__internal__/dl.context";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

export interface DtProps extends SpaceProps, TagProps {
  /** Prop for what will render in the `<Dd></Dd>` tags */
  children: React.ReactNode;
}

const Dt = ({ children, ...rest }: DtProps) => {
  const { asSingleColumn, dtTextAlign } = useContext(DlContext);
  const { mb, pr } = rest;
  return (
    <StyledDt
      data-element="dt"
      data-role="dt"
      mb={mb || asSingleColumn ? undefined : 2}
      pr={pr || asSingleColumn ? undefined : 3}
      dtTextAlign={dtTextAlign}
      asSingleColumn={asSingleColumn}
      {...rest}
      {...tagComponent("dt", rest)}
    >
      {children}
    </StyledDt>
  );
};

Dt.displayName = "Dt";
export default Dt;
