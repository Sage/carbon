import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

import mintTheme from "../../style/themes/mint";
import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider";

const CarbonProvider = ({ children, theme = mintTheme }) => (
  <ThemeProvider theme={theme}>
    <CarbonScopedTokensProvider>{children}</CarbonScopedTokensProvider>
  </ThemeProvider>
);

CarbonProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object,
};

export default CarbonProvider;
