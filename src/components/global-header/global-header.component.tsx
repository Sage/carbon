import React from "react";
import styled from "styled-components";
import { PaddingProps, FlexboxProps } from "styled-system";
import NavigationBar from "../navigation-bar";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import { GlobalHeaderProvider } from "./__internal__/global-header.context";
import useLocale from "../../hooks/__internal__/useLocale";

export interface GlobalHeaderProps
  extends PaddingProps,
    FlexboxProps,
    TagProps {
  /** Child elements */
  children?: React.ReactNode;
  /** Logo to render */
  logo?: React.ReactNode;
}

const StyledLogo = styled.div`
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
  const locale = useLocale();
  return (
    <NavigationBar
      variant="black"
      orientation="top"
      offset="0px"
      position="fixed"
      ariaLabel={locale.globalHeader.ariaLabel()}
      data-component="global-header"
      {...rest}
    >
      {logo && (
        <StyledLogo data-element="global-header-logo-wrapper">
          {logo}
        </StyledLogo>
      )}
      <GlobalHeaderProvider>{children}</GlobalHeaderProvider>
    </NavigationBar>
  );
};

GlobalHeader.displayName = "GlobalHeader";
export default GlobalHeader;
