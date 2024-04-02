import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box";
import Button from "../button";
import Search, { SearchEvent } from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Search> = {
  title: "Search",
  component: Search,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

const VALIDATIONS = ["error", "warning", "info"] as const;

export const Default: Story = () => {
  return <Search placeholder="Search..." defaultValue="" />;
};
Default.storyName = "Default";

export const Controlled: Story = () => {
  const [value, setValue] = useState("");
  return (
    <>
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
    </>
  );
};
Controlled.storyName = "Controlled";

export const WithSearchButton: Story = () => {
  return (
    <Search
      defaultValue="Here is some text"
      searchButton
      searchButtonAriaLabel="search button aria label"
    />
  );
};
WithSearchButton.storyName = "With Search Button";

export const DefaultWithColourBackground: Story = () => {
  return <Search placeholder="Search..." defaultValue="" />;
};
DefaultWithColourBackground.storyName = "Default with Colour Background";
DefaultWithColourBackground.decorators = [
  (MyStory) => (
    <div
      style={{
        padding: "40px 32px",
        backgroundColor: "#e6ebed",
      }}
    >
      <MyStory />
    </div>
  ),
];
DefaultWithColourBackground.parameters = {
  docs: { canvas: { layout: "fullscreen" } },
};

export const WithSearchButtonAndColourBackground: Story = () => {
  return (
    <Search
      placeholder="Search..."
      defaultValue="Here is some text"
      searchButton
    />
  );
};
WithSearchButtonAndColourBackground.storyName =
  "With Search Button and Colour Background";
WithSearchButtonAndColourBackground.decorators = [
  (MyStory) => (
    <div
      style={{
        padding: "40px 32px",
        backgroundColor: "#e6ebed",
      }}
    >
      <MyStory />
    </div>
  ),
];
WithSearchButtonAndColourBackground.parameters = {
  docs: { canvas: { layout: "fullscreen" } },
};

export const CustomWidthUsingPx: Story = () => {
  return <Search placeholder="Search..." defaultValue="" searchWidth="375px" />;
};
CustomWidthUsingPx.storyName = "Custom Width Using Px";

export const WithSearchButtonAndCustomWidthUsingPx: Story = () => {
  return (
    <Search defaultValue="Here is some text" searchButton searchWidth="375px" />
  );
};
WithSearchButtonAndCustomWidthUsingPx.storyName =
  "With Search Button and Custom Width Using Px";

export const CustomWidthUsingPercentage: Story = () => {
  return <Search placeholder="Search..." defaultValue="" searchWidth="70%" />;
};
CustomWidthUsingPercentage.storyName = "Custom Width Using Percentage";

export const WithSearchButtonAndCustomWidthUsingPercentage: Story = () => {
  return (
    <Search defaultValue="Here is some text" searchButton searchWidth="70%" />
  );
};
WithSearchButtonAndCustomWidthUsingPercentage.storyName =
  "With Search Button and Custom Width Using Percentage";

export const WithCustomMaxWidth: Story = () => {
  return (
    <Search defaultValue="Here is some text" searchButton maxWidth="50%" />
  );
};
WithCustomMaxWidth.storyName = "With Custom Max Width";

export const WithAltStyling: Story = () => {
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
WithAltStyling.storyName = "With Alt Styling";

export const WithAltStylingAndNoButton: Story = () => {
  return (
    <Box width="700px" height="108px">
      <Box p={32} backgroundColor="#003349">
        <Search placeholder="Search..." defaultValue="" variant="dark" />
      </Box>
    </Box>
  );
};
WithAltStylingAndNoButton.storyName = "With Alt Styling and No Button";

type Validation = "error" | "warning" | "info";

export const ValidationsStringComponent: Story = () => {
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
ValidationsStringComponent.storyName = "Validations - String";

export const ValidationsStringWithTooltipPositionOverridenComponent: Story = () => {
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
ValidationsStringWithTooltipPositionOverridenComponent.storyName =
  "Validations - String with Tooltip Position Overriden";

export const ValidationsBoolean: Story = () => {
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
ValidationsBoolean.storyName = "Validations - Boolean";
