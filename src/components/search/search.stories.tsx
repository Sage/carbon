import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box";
import Button from "../button";
import Search, { SearchEvent } from ".";
import I18nProvider from "../i18n-provider/i18n-provider.component";

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
    <Box m={1}>
      <Search
        defaultValue="Here is some text"
        searchButton
        searchButtonAriaLabel="search button aria label"
      />
    </Box>
  );
};
WithSearchButton.storyName = "With Search Button";

export const WithSearchButtonPropTextOverride: Story = () => {
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
WithSearchButtonPropTextOverride.storyName =
  "With Search Button text override via prop";

export const WithSearchButtonLocaleOverride: Story = () => {
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
WithSearchButtonLocaleOverride.storyName =
  "With Search Button text override via locale";

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
    <Box m={1}>
      <Search
        placeholder="Search..."
        defaultValue="Here is some text"
        searchButton
      />
    </Box>
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
    <Box m={1}>
      <Search
        defaultValue="Here is some text"
        searchButton
        searchWidth="375px"
      />
    </Box>
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
    <Box m={1}>
      <Search defaultValue="Here is some text" searchButton searchWidth="70%" />
    </Box>
  );
};
WithSearchButtonAndCustomWidthUsingPercentage.storyName =
  "With Search Button and Custom Width Using Percentage";

export const WithCustomMaxWidth: Story = () => {
  return (
    <Box m={1}>
      <Search defaultValue="Here is some text" searchButton maxWidth="50%" />
    </Box>
  );
};
WithCustomMaxWidth.storyName = "With Custom Max Width";

export const WithAltStyling: Story = () => {
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

export const ValidationsStringWithTooltipPositionOverridenComponent: Story =
  () => {
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

export const WhenCrossIconClicked: Story = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <Search
        id="test"
        name="test"
        placeholder="Search..."
        triggerOnClear
        // eslint-disable-next-line no-console
        onClick={(e) => console.log("clicked", e)}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        searchButton
      />
    </>
  );
};
WhenCrossIconClicked.storyName = "When cross icon clicked";
WhenCrossIconClicked.parameters = {
  chromatic: { disableSnapshot: true },
};
