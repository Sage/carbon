import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

import mintTheme from "../../style/themes/mint";

const CarbonProvider = ({ children, theme = mintTheme }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
CarbonProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object,
};

export default CarbonProvider;
