import React from "react";

import CarbonProvider from ".";
import Button from "../button";
import { sageTheme, mintTheme, baseTheme, noTheme } from "../../style/themes";

const AllThemes = () => {
  const themes = [sageTheme, mintTheme, baseTheme, noTheme];

  return (
    <>
      {themes.map((theme) => (
        <React.Fragment key={theme.name}>
          <h3>{theme.name}</h3>
          <CarbonProvider theme={theme}>
            <Button buttonType="primary">Button</Button>
          </CarbonProvider>
        </React.Fragment>
      ))}
    </>
  );
};

export default AllThemes;

export const SageTheme = () => {
  return (
    <CarbonProvider theme={sageTheme}>
      <Button buttonType="primary">Button</Button>
    </CarbonProvider>
  );
};

export const MintTheme = () => {
  return (
    <CarbonProvider theme={mintTheme}>
      <Button buttonType="primary">Button</Button>
    </CarbonProvider>
  );
};
