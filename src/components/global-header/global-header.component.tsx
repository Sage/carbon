import React from "react";
import styled, { css } from "styled-components";
import { PaddingProps, FlexboxProps } from "styled-system";
import { ThemeObject } from "../../style/themes/base";
import { baseTheme } from "../../style/themes";
import StyledNavigationBar, {
  StyledNavigationBarProps,
} from "../navigation-bar/navigation-bar.style";
import Box from "../box";

export interface GlobalHeaderProps extends PaddingProps, FlexboxProps {
  /** Child elements */
  children?: React.ReactNode;
  /** Logo to render */
  logo?: React.ReactNode;
}

interface StyledGlobalHeaderProps extends StyledNavigationBarProps {
  theme?: ThemeObject;
}
const StyledGlobalHeader = styled(StyledNavigationBar).attrs(({ theme }) => ({
  theme: theme || /* istanbul ignore next */ baseTheme,
}))<StyledGlobalHeaderProps>`
  ${({ theme }) => css`
    z-index: ${theme.zIndex.globalNav};
  `}
`;

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
    <StyledGlobalHeader
      aria-label="Global Header"
      data-component="global-header"
      navigationType="black"
      orientation="top"
      offset="0px"
      position="fixed"
      {...rest}
    >
      {logo && (
        <StyledLogo data-element="global-header-logo-wrapper">
          {logo}
        </StyledLogo>
      )}
      {children}
    </StyledGlobalHeader>
  );
};

GlobalHeader.displayName = "GlobalHeader";
export default GlobalHeader;
