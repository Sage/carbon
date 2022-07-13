import React from "react";
import styled, { css } from "styled-components";
import { PaddingProps, FlexboxProps } from "styled-system";
import { ThemeObject } from "style/themes/base";
import { baseTheme } from "../../style/themes";
import StyledNavigationBar from "../navigation-bar/navigation-bar.style";

export interface GlobalHeaderProps extends PaddingProps, FlexboxProps {
  /** Child elements */
  children?: React.ReactNode;
}

interface StyledGlobalHeaderProps {
  theme: ThemeObject;
}
const StyledGlobalHeader = styled(StyledNavigationBar)<StyledGlobalHeaderProps>`
  ${({ theme }) => css`
    z-index: ${theme.zIndex.globalNav};
  `}
`;

const GlobalHeader = ({ children, ...rest }: GlobalHeaderProps) => {
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
      {children}
    </StyledGlobalHeader>
  );
};

StyledGlobalHeader.defaultProps = {
  theme: baseTheme,
};

GlobalHeader.displayName = "GlobalHeader";
export default GlobalHeader;
