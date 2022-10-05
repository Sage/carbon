import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";
import Box from "../box";
import Button from "../button";
import Search from ".";
import { SearchEvent } from "./search.component";

export const Default: ComponentStory<typeof Search> = () => (
  <Search placeholder="Search..." defaultValue="" />
);

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

export const WithSearchButton: ComponentStory<typeof Search> = () => (
  <Search defaultValue="Here is some text" searchButton />
);

export const WithCustomWidth: ComponentStory<typeof Search> = () => (
  <Search defaultValue="Here is some text" searchButton searchWidth="375px" />
);

export const DarkVariant: ComponentStory<typeof Search> = () => (
  <Box width="700px" height="108px">
    <div style={{ padding: "32px", backgroundColor: "#003349" }}>
      <Search
        placeholder="Search..."
        defaultValue="Here is some text"
        variant="dark"
      />
    </div>
  </Box>
);

export const ValidationsString: ComponentStory<typeof Search> = () => {
  const [state, setState] = useState<{
    error: string;
    warning: string;
    info: string;
  }>({
    error: "<foo>",
    warning: "<foo>",
    info: "<foo>",
  });
  const handleChange = (validation: string) => (event: SearchEvent) => {
    setState({ ...state, [validation]: event.target.value });
  };
  const validationTypes: ("error" | "warning" | "info")[] = [
    "error",
    "warning",
    "info",
  ];

  return (
    <>
      {validationTypes.map((validationType) => (
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

export const ValidationsStringWithTooltipBottom: ComponentStory<
  typeof Search
> = () => {
  const [state, setState] = useState<{
    error: string;
    warning: string;
    info: string;
  }>({
    error: "<foo>",
    warning: "<foo>",
    info: "<foo>",
  });
  const handleChange = (validation: string) => (event: SearchEvent) => {
    setState({ ...state, [validation]: event.target.value });
  };
  const validationTypes: ("error" | "warning" | "info")[] = [
    "error",
    "warning",
    "info",
  ];

  return (
    <>
      {validationTypes.map((validationType) => (
        <div key={`${validationType}-string-component`}>
          <Search
            value={state[validationType]}
            onChange={handleChange(validationType)}
            searchButton
            tooltipPosition="bottom"
            {...{ [validationType]: "Invalid characters" }}
          />
        </div>
      ))}
    </>
  );
};

ValidationsStringWithTooltipBottom.parameters = {
  chromatic: { disable: true },
};

export const ValidationsBoolean: ComponentStory<typeof Search> = () => {
  const [state, setState] = useState<{
    error: string;
    warning: string;
    info: string;
  }>({
    error: "<foo>",
    warning: "<foo>",
    info: "<foo>",
  });
  const handleChange = (validation: string) => (event: SearchEvent) => {
    setState({ ...state, [validation]: event.target.value });
  };
  const validationTypes: ("error" | "warning" | "info")[] = [
    "error",
    "warning",
    "info",
  ];

  return (
    <>
      {validationTypes.map((validationType) => (
        <div key={`${validationType}-string-component`}>
          <Search
            value={state[validationType]}
            onChange={handleChange(validationType)}
            searchButton
            {...{ [validationType]: true }}
          />
        </div>
      ))}
    </>
  );
};
