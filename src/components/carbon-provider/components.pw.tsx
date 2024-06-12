import React from "react";
import { sageTheme, baseTheme, noTheme } from "../../style/themes";
import Button from "../button";

import CarbonProvider from ".";

const AllThemes = () => {
  const themes = [sageTheme, baseTheme, noTheme];

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
