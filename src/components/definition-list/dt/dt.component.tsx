import React from "react";
import { SpaceProps } from "styled-system";
import { StyledDt } from "../definition-list.style";
import { useDlContext } from "../__internal__/dl.context";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

export interface DtProps extends SpaceProps, TagProps {
  /** Prop for what will render in the `<Dd></Dd>` tags */
  children: React.ReactNode;
}

const Dt = ({ children, pr, ...rest }: DtProps) => {
  const { asSingleColumn, dtTextAlign } = useDlContext();
  return (
    <StyledDt
      data-element="dt"
      data-role="dt"
      dtTextAlign={dtTextAlign}
      asSingleColumn={asSingleColumn}
      pr={pr ?? (asSingleColumn ? undefined : 3)}
      {...rest}
      {...tagComponent("dt", rest)}
    >
      <div data-element="dt-content">{children}</div>
    </StyledDt>
  );
};

Dt.displayName = "Dt";
export default Dt;
