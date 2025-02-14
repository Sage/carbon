import React from "react";
import styled from "styled-components";
import { PaddingProps, FlexboxProps } from "styled-system";
import Box from "../box";
import NavigationBar from "../navigation-bar";
import { TagProps } from "../../__internal__/utils/helpers/tags";

export interface GlobalHeaderProps
  extends PaddingProps,
    FlexboxProps,
    TagProps {
  /** Child elements */
  children?: React.ReactNode;
  /** Logo to render */
  logo?: React.ReactNode;
}

const StyledLogo = styled(Box)`
  display: flex;
  align-items: center;
  margin-left: var(--spacing200);
  margin-right: var(--spacing300);

  & > * {
    max-height: 100%;
  }

  @media (min-width: 600px) {
    margin-left: var(--spacing300);
  }
  @media (min-width: 960px) {
    margin-left: var(--spacing400);
  }
  @media (min-width: 1260px) {
    margin-left: var(--spacing500);
  }
`;

const GlobalHeader = ({ children, logo, ...rest }: GlobalHeaderProps) => {
  return (
    <NavigationBar isGlobal {...rest}>
      {logo && (
        <StyledLogo data-element="global-header-logo-wrapper">
          {logo}
        </StyledLogo>
      )}
      {children}
    </NavigationBar>
  );
};

GlobalHeader.displayName = "GlobalHeader";
export default GlobalHeader;
