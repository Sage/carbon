import React from "react";
import styled from "styled-components";
import { margin, MarginProps } from "styled-system";
import applyBaseTheme from "../../../style/themes/apply-base-theme";

export interface RequiredIndicatorProps extends MarginProps {
  /** Content to be displayed alongside the required fields indicator */
  children?: React.ReactNode;
}

export const RequiredFieldsIndicator = ({
  children,
  ...rest
}: RequiredIndicatorProps) => {
  const StyledIndicatorContainer = styled.div.attrs(applyBaseTheme)`
    ${margin}

    color: var(--input-labelset-label-default);
    font: var(--global-font-static-comp-medium-m);

    ::before {
      content: "*";
      color: var(--input-labelset-label-required);
      font: var(--global-font-static-comp-medium-m);
      margin-right: var(--global-space-comp-xs);
    }
  `;

  return (
    <StyledIndicatorContainer {...rest}>{children}</StyledIndicatorContainer>
  );
};

export default RequiredFieldsIndicator;
