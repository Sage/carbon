import React from "react";

import CarbonProvider from ".";
import Button from "../button";
import {
  sageTheme,
  mintTheme,
  aegeanTheme,
  baseTheme,
  noTheme,
} from "../../style/themes";

const AllThemes = () => {
  const themes = [sageTheme, mintTheme, aegeanTheme, baseTheme, noTheme];

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
