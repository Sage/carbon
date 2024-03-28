import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";

import Search, { SearchEvent } from ".";
import Box from "../box";
import Button from "../button";
import I18nProvider from "../i18n-provider/i18n-provider.component";

export const VALIDATIONS = ["error", "warning", "info"] as const;

export const Default: ComponentStory<typeof Search> = () => {
  return (
    <Box m={1}>
      <Search placeholder="Search..." defaultValue="" />
    </Box>
  );
};

export const Controlled: ComponentStory<typeof Search> = () => {
  const [value, setValue] = useState("");
  return (
    <Box m={1}>
      <Button onClick={() => setValue("")}>Clear value</Button>
      <Button onClick={() => setValue("test value")} ml={2}>
        Set value
      </Button>
      <Search
        id="test"
        name="test"
        placeholder="Search..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
        searchButton
      />
    </Box>
  );
};

export const WithSearchButton: ComponentStory<typeof Search> = () => {
  return (
    <Box m={1}>
      <Search
        defaultValue="Here is some text"
        searchButton
        searchButtonAriaLabel="search button aria label"
      />
    </Box>
  );
};

export const WithSearchButtonPropTextOverride: ComponentStory<
  typeof Search
> = () => {
  return (
    <Box m={1}>
      <Search
        defaultValue="Here is some text"
        searchButton="Find"
        searchButtonAriaLabel="search button aria label"
      />
    </Box>
  );
};

export const WithSearchButtonLocaleOverride: ComponentStory<
  typeof Search
> = () => {
  return (
    <Box m={1}>
      <I18nProvider locale={{ search: { searchButtonText: () => "Find" } }}>
        <Search
          defaultValue="Here is some text"
          searchButton
          searchButtonAriaLabel="search button aria label"
        />
      </I18nProvider>
    </Box>
  );
};

export const DefaultWithColourBackground: ComponentStory<
  typeof Search
> = () => {
  return (
    <Box m={1}>
      <Search placeholder="Search..." defaultValue="" />
    </Box>
  );
};

export const WithSearchButtonAndColourBackground: ComponentStory<
  typeof Search
> = () => {
  return (
    <Box m={1}>
      <Search
        placeholder="Search..."
        defaultValue="Here is some text"
        searchButton
      />
    </Box>
  );
};

export const CustomWidthUsingPx: ComponentStory<typeof Search> = () => {
  return (
    <Box m={1}>
      <Search placeholder="Search..." defaultValue="" searchWidth="375px" />
    </Box>
  );
};

export const WithSearchButtonAndCustomWidthUsingPx: ComponentStory<
  typeof Search
> = () => {
  return (
    <Box m={1}>
      <Search
        defaultValue="Here is some text"
        searchButton
        searchWidth="375px"
      />
    </Box>
  );
};

export const CustomWidthUsingPercentage: ComponentStory<typeof Search> = () => {
  return (
    <Box m={1}>
      <Search placeholder="Search..." defaultValue="" searchWidth="70%" />
    </Box>
  );
};

export const WithSearchButtonAndCustomWidthUsingPercentage: ComponentStory<
  typeof Search
> = () => {
  return (
    <Box m={1}>
      <Search defaultValue="Here is some text" searchButton searchWidth="70%" />
    </Box>
  );
};

export const WithCustomMaxWidth: ComponentStory<typeof Search> = () => {
  return (
    <Box m={1}>
      <Search defaultValue="Here is some text" searchButton maxWidth="50%" />
    </Box>
  );
};

export const WithAltStyling: ComponentStory<typeof Search> = () => {
  return (
    <Box width="700px" height="108px" p={4} backgroundColor="#000000">
      <Search
        placeholder="Search..."
        defaultValue="Here is some text"
        searchButton
        variant="dark"
      />
    </Box>
  );
};

export const WithAltStylingAndNoButton: ComponentStory<typeof Search> = () => {
  return (
    <Box width="700px" height="108px" p={4} backgroundColor="#000000">
      <Search placeholder="Search..." defaultValue="" variant="dark" />
    </Box>
  );
};

type Validation = "error" | "warning" | "info";

export const ValidationsStringComponent: ComponentStory<typeof Search> = () => {
  const [state, setState] = useState({
    error: "<foo>",
    warning: "<foo>",
    info: "<foo>",
  });

  const handleChange = (validation: Validation) => (e: SearchEvent) => {
    setState({ ...state, [validation]: e.target.value });
  };

  return (
    <>
      {VALIDATIONS.map((validationType) => (
        <Box key={`${validationType}-string-component`}>
          <Search
            value={state[validationType]}
            onChange={handleChange(validationType)}
            searchButton
            {...{ [validationType]: "Invalid characters" }}
          />
        </Box>
      ))}
    </>
  );
};

export const ValidationsStringWithTooltipPositionOverridenComponent: ComponentStory<
  typeof Search
> = () => {
  const [state, setState] = useState({
    error: "<foo>",
    warning: "<foo>",
    info: "<foo>",
  });

  const handleChange = (validation: Validation) => (e: SearchEvent) => {
    setState({ ...state, [validation]: e.target.value });
  };

  return (
    <>
      {VALIDATIONS.map((validationType) => (
        <Box key={`${validationType}-string-component`}>
          <Search
            value={state[validationType]}
            onChange={handleChange(validationType)}
            searchButton
            {...{ [validationType]: "Invalid characters" }}
            tooltipPosition="bottom"
          />
        </Box>
      ))}
    </>
  );
};

export const ValidationsBoolean: ComponentStory<typeof Search> = () => {
  const [state, setState] = useState({
    error: "<foo>",
    warning: "<foo>",
    info: "<foo>",
  });

  const handleChange = (validation: Validation) => (e: SearchEvent) => {
    setState({ ...state, [validation]: e.target.value });
  };

  return (
    <>
      {VALIDATIONS.map((validationType) => (
        <Box key={`${validationType}-boolean-component`}>
          <Search
            value={state[validationType]}
            searchButton
            onChange={handleChange(validationType)}
            {...{ [validationType]: true }}
          />
        </Box>
      ))}
    </>
  );
};
