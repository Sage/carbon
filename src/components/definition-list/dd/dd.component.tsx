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
  /** Supplementary element, such as a Pill or Link, rendered to the right of the description. */
  rightChildren?: React.ReactNode;
}

const Dd = ({ children, rightChildren, ...rest }: DdProps) => {
  const { asSingleColumn, ddTextAlign } = useDlContext();
  return (
    <StyledDd
      data-element="dd"
      data-role="dd"
      asSingleColumn={asSingleColumn}
      ddTextAlign={ddTextAlign}
      {...rest}
      {...tagComponent("dd", rest)}
    >
      <div data-element="dd-content">{children}</div>
      {rightChildren && (
        <div data-element="dd-right-children" data-role="dd-right-children">
          {rightChildren}
        </div>
      )}
    </StyledDd>
  );
};

Dd.displayName = "Dd";
export default Dd;
