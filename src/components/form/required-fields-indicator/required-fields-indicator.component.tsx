import React from "react";
import styled from "styled-components";
import { margin, MarginProps } from "styled-system";
import applyBaseTheme from "../../../style/themes/apply-base-theme";
import StyledTypography from "../../typography/typography.style";

export interface RequiredIndicatorProps extends MarginProps {
  children: React.ReactNode;
}

const StyledIndicatorContainer = styled.div.attrs(applyBaseTheme)`
  ${margin}

  ${StyledTypography} {
    color: var(--colorsUtilityYin090);
  }
  ::after {
    content: "*";
    color: var(--colorsSemanticNegative500);
    font-weight: 500;
    margin-left: var(--spacing050);
  }
`;

export default ({ children, ...rest }: RequiredIndicatorProps) => (
  <StyledIndicatorContainer {...rest}>{children}</StyledIndicatorContainer>
);
