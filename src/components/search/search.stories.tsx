import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";

import Search, { SearchEvent } from ".";
import Box from "../box";
import Button from "../button";

export const VALIDATIONS = ["error", "warning", "info"] as const;

export const Default: ComponentStory<typeof Search> = () => {
  return <Search placeholder="Search..." defaultValue="" />;
};

export const Controlled: ComponentStory<typeof Search> = () => {
  const [value, setValue] = useState("");
  return (
    <div>
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
    </div>
  );
};

export const WithSearchButton: ComponentStory<typeof Search> = () => {
  return (
    <Search
      defaultValue="Here is some text"
      searchButton
      searchButtonAriaLabel="search button aria label"
    />
  );
};

export const DefaultWithColourBackground: ComponentStory<
  typeof Search
> = () => {
  return <Search placeholder="Search..." defaultValue="" />;
};
export const WithSearchButtonAndColourBackground: ComponentStory<
  typeof Search
> = () => {
  return (
    <Search
      placeholder="Search..."
      defaultValue="Here is some text"
      searchButton
    />
  );
};

export const CustomWidthUsingPx: ComponentStory<typeof Search> = () => {
  return <Search placeholder="Search..." defaultValue="" searchWidth="375px" />;
};

export const WithSearchButtonAndCustomWidthUsingPx: ComponentStory<
  typeof Search
> = () => {
  return (
    <Search defaultValue="Here is some text" searchButton searchWidth="375px" />
  );
};

export const CustomWidthUsingPercentage: ComponentStory<typeof Search> = () => {
  return <Search placeholder="Search..." defaultValue="" searchWidth="70%" />;
};

export const WithSearchButtonAndCustomWidthUsingPercentage: ComponentStory<
  typeof Search
> = () => {
  return (
    <Search defaultValue="Here is some text" searchButton searchWidth="70%" />
  );
};

export const WithCustomMaxWidth: ComponentStory<typeof Search> = () => {
  return (
    <Search defaultValue="Here is some text" searchButton maxWidth="50%" />
  );
};

export const WithAltStyling: ComponentStory<typeof Search> = () => {
  return (
    <Box width="700px" height="108px">
      <div
        style={{
          padding: "32px",
          backgroundColor: "#003349",
        }}
      >
        <Search
          placeholder="Search..."
          defaultValue="Here is some text"
          searchButton
          variant="dark"
        />
      </div>
    </Box>
  );
};

export const WithAltStylingAndNoButton: ComponentStory<typeof Search> = () => {
  return (
    <Box width="700px" height="108px">
      <div
        style={{
          padding: "32px",
          backgroundColor: "#003349",
        }}
      >
        <Search placeholder="Search..." defaultValue="" variant="dark" />
      </div>
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
        <div key={`${validationType}-string-component`}>
          <Search
            value={state[validationType]}
            onChange={handleChange(validationType)}
            searchButton
            {...{ [validationType]: "Invalid characters" }}
          />
        </div>
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
        <div key={`${validationType}-string-component`}>
          <Search
            value={state[validationType]}
            onChange={handleChange(validationType)}
            searchButton
            {...{ [validationType]: "Invalid characters" }}
            tooltipPosition="bottom"
          />
        </div>
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
        <div key={`${validationType}-boolean-component`}>
          <Search
            value={state[validationType]}
            searchButton
            onChange={handleChange(validationType)}
            {...{ [validationType]: true }}
          />
        </div>
      ))}
    </>
  );
};
