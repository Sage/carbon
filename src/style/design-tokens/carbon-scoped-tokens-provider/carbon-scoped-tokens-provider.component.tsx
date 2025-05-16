import React, { useContext } from "react";
import styled from "styled-components";
import topModalContext from "../../../components/carbon-provider/__internal__/top-modal.context";
import { baseTheme } from "../../themes";
import { ThemeObject } from "../../themes/base";
import generateCssVariables from "../generate-css-variables.util";

const getZIndexToken = ({
  hasAdaptiveSidebarModalOpen,
  theme,
}: {
  hasAdaptiveSidebarModalOpen: boolean;
  theme: ThemeObject;
}) => {
  if (hasAdaptiveSidebarModalOpen) {
    return `--adaptive-sidebar-modal-open-zindex-reduced: ${theme.zIndex.smallOverlay};`;
  }

  return "";
};

/**
 *
 * Converts theme properties to css variables form and set them locally for
 * given scope
 *
 */
const StyledCarbonScopedTokensProvider = styled.div<
  ThemeObject & { hasAdaptiveSidebarModalOpen: boolean }
>`
  margin: 0;
  padding: 0;
  width: auto;
  display: inline;

  ${getZIndexToken}
  ${({ theme }) => generateCssVariables(theme.compatibility)}
`;

StyledCarbonScopedTokensProvider.defaultProps = {
  theme: baseTheme,
};

const CarbonScopedTokensProvider = ({
  children,
  hasAdaptiveSidebarModalOpen = false,
}: {
  children?: React.ReactNode;
  hasAdaptiveSidebarModalOpen?: boolean;
}) => {
  const { hasAdaptiveSidebarModalOpen: hasAdaptiveSidebarModalOpenContext } =
    useContext(topModalContext);

  return (
    <StyledCarbonScopedTokensProvider
      data-role="carbon-scoped-tokens-provider"
      hasAdaptiveSidebarModalOpen={
        hasAdaptiveSidebarModalOpen || hasAdaptiveSidebarModalOpenContext
      }
    >
      {children}
    </StyledCarbonScopedTokensProvider>
  );
};
CarbonScopedTokensProvider.displayName = "CarbonScopedTokensProvider";

export default CarbonScopedTokensProvider;
