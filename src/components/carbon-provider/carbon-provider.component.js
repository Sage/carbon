import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

import mintTheme from "../../style/themes/mint";
import CarbonScopedTokensProvider from "../../style/design-tokens/carbon-scoped-tokens-provider";

export const NewValidationContext = createContext({
  validationRedesignOptIn: false,
});

const CarbonProvider = ({
  children,
  validationRedesignOptIn,
  theme = mintTheme,
}) => {
  const { validationRedesignOptIn: parentValidationRedesignOptIn } = useContext(
    NewValidationContext
  );

  return (
    <ThemeProvider theme={theme}>
      <CarbonScopedTokensProvider>
        <NewValidationContext.Provider
          value={{
            validationRedesignOptIn:
              parentValidationRedesignOptIn || validationRedesignOptIn,
          }}
        >
          {children}
        </NewValidationContext.Provider>
      </CarbonScopedTokensProvider>
    </ThemeProvider>
  );
};

CarbonProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object,
  validationRedesignOptIn: PropTypes.bool,
};

export default CarbonProvider;
