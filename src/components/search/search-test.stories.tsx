import React, { useEffect, useRef, useState } from "react";
import Box from "../box";
import Search from ".";
import { SearchProps, SearchHandle } from "./search.component";
import {
  MenuItem,
  MenuItemDivider,
  MenuItemHeading,
  MenuItemLabel,
  MenuItemLeading,
  MenuItemSubtext,
} from "../../__internal__/popover-menu";
import Icon from "../icon";

const defaultSearchControlsInclude = [
  "value",
  "aria-label",
  "searchButtonAriaLabel",
  "id",
  "name",
  "label",
  "inputHint",
  "size",
  "inputWidth",
  "maxWidth",
  "error",
  "inverse",
  "labelInline",
  "required",
  "triggerOnClear",
];

const defaultSearchArgTypes = {
  inputWidth: {
    control: {
      type: "range" as const,
      min: 0,
      max: 100,
      step: 1,
    },
  },
  maxWidth: {
    control: { type: "text" as const },
  },
  size: {
    options: ["small", "medium", "large"],
    control: { type: "select" as const },
  },
  error: {
    options: ["false", "true", "message"],
    mapping: {
      false: false,
      true: true,
      message: "Error message",
    },
    control: { type: "select" as const },
    labels: {
      false: "false",
      true: "true",
      message: "Error message",
    },
  },
  inverse: {
    control: { type: "boolean" as const },
  },
  labelInline: {
    control: { type: "boolean" as const },
  },
  required: {
    control: { type: "boolean" as const },
  },
  triggerOnClear: {
    control: { type: "boolean" as const },
  },
};

const defaultSearchArgs: Partial<SearchProps> = {
  value: "",
  "aria-label": "Search",
  searchButtonAriaLabel: "Search",
  id: "search_id",
  name: "search_name",
  label: "",
  inputHint: "",
  size: "medium",
  inputWidth: undefined,
  maxWidth: "",
  error: false,
  inverse: false,
  labelInline: false,
  required: false,
  triggerOnClear: false,
};

export default {
  title: "Search/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: false,
    },
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

const DefaultTestStory = (args: SearchProps) => {
  const { value: initialValue = "", onChange, ...rest } = args;

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const search = (
    <Search
      {...rest}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChange?.(e);
      }}
    />
  );

  if (rest.inverse) {
    return (
      <Box p={3} backgroundColor="#000000">
        {search}
      </Box>
    );
  }

  return search;
};

export const Default = (args: SearchProps) => <DefaultTestStory {...args} />;
Default.storyName = "Default";
Default.parameters = {
  chromatic: { disableSnapshot: true },
  controls: {
    expanded: true,
    include: defaultSearchControlsInclude,
  },
};
Default.argTypes = defaultSearchArgTypes;
Default.args = defaultSearchArgs;

const AutoFocusSearch = (props: React.ComponentProps<typeof Search>) => {
  const ref = useRef<SearchHandle>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return <Search ref={ref} {...props} />;
};

export const HoverAndFocusStyling = () => (
  <>
    <Box mb={4} width="700px" p={4}>
      <Search
        placeholder="Search..."
        onChange={() => {}}
        value=""
        aria-label="Search default"
        data-role="search-default"
      />
    </Box>
    <Box width="700px" p={4} backgroundColor="#000000">
      <Search
        placeholder="Search..."
        onChange={() => {}}
        value=""
        inverse
        aria-label="Search inverse"
        data-role="search-inverse"
      />
    </Box>

    <Box mb={4} width="700px" p={4}>
      <AutoFocusSearch
        placeholder="Search..."
        onChange={() => {}}
        value=""
        aria-label="Search input"
      />
    </Box>
    <Box width="700px" p={4}>
      <Search
        placeholder="Search..."
        onChange={() => {}}
        value=""
        aria-label="Search button"
        data-role="search-button-focus"
      />
    </Box>
  </>
);
HoverAndFocusStyling.storyName = "Hover & Focus Styling";
HoverAndFocusStyling.parameters = {
  pseudo: {
    hover: [
      "[data-role='search-default'] .search-button",
      "[data-role='search-inverse'] .search-button",
    ],
    focus: "[data-role='search-button-focus'] .search-button",
  },
};

export const RegressionMatrix = () => (
  <Box
    width="820px"
    display="grid"
    gridTemplateColumns="repeat(2, minmax(0, 1fr))"
    gap={3}
  >
    <Box p={4}>
      <Search
        onChange={() => {}}
        value="Default configuration"
        aria-label="Default configuration"
      />
    </Box>

    <Box p={4} backgroundColor="#000000">
      <Search
        onChange={() => {}}
        value="Inverse configuration"
        inverse
        aria-label="Inverse configuration"
      />
    </Box>

    <Box p={4}>
      <Search
        onChange={() => {}}
        value="Default with label and input hint"
        label="Search"
        inputHint="Input hint"
        aria-label="Default with label and input hint"
      />
    </Box>

    <Box p={4} backgroundColor="#000000">
      <Search
        onChange={() => {}}
        value="Inverse with label and input hint"
        inverse
        label="Search"
        inputHint="Input hint"
        aria-label="Inverse with label and input hint"
      />
    </Box>

    <Box p={4}>
      <Search
        onChange={() => {}}
        value="Default with label, input hint and error"
        label="Search"
        inputHint="Input hint"
        error="Error message"
        aria-label="Default with label, input hint and error"
      />
    </Box>

    <Box p={4} backgroundColor="#000000">
      <Search
        onChange={() => {}}
        value="Inverse with label, input hint and error"
        inverse
        label="Search"
        inputHint="Input hint"
        error="Error message"
        aria-label="Inverse with label, input hint and error"
      />
    </Box>

    <Box p={4}>
      <Search
        onChange={() => {}}
        value="Default with label inline and input hint"
        label="Search"
        inputHint="Input hint"
        labelInline
        aria-label="Default with label inline and input hint"
      />
    </Box>

    <Box p={4} backgroundColor="#000000">
      <Search
        onChange={() => {}}
        value="Inverse with label inline and input hint"
        inverse
        label="Search"
        inputHint="Input hint"
        labelInline
        aria-label="Inverse with label inline and input hint"
      />
    </Box>

    <Box p={4}>
      <Search
        onChange={() => {}}
        value="Default required with label and input hint"
        label="Search"
        inputHint="Input hint"
        required
        aria-label="Default required with label and input hint"
      />
    </Box>

    <Box p={4} backgroundColor="#000000">
      <Search
        onChange={() => {}}
        value="Inverse required with label and input hint"
        inverse
        label="Search"
        inputHint="Input hint"
        required
        aria-label="Inverse required with label and input hint"
      />
    </Box>
  </Box>
);
RegressionMatrix.storyName = "Regression Matrix";

export const OpenWithPopoverMenuContent = () => {
  const [value, setValue] = useState("Delta");
  const isOpen = value.length >= 3;

  return (
    <Box width="700px" p={4}>
      <Search
        open={isOpen}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search with open popover menu"
      >
        <MenuItem id="item-1">
          <MenuItemLeading selectedIcon={value === "Alpha"}>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="1: ">Alpha</MenuItemLabel>
          <MenuItemSubtext>Subtext</MenuItemSubtext>
        </MenuItem>
        <MenuItem id="item-2" selected={value === "Delta"}>
          <MenuItemLeading selectedIcon={value === "Delta"}>
            <Icon type="home" />
          </MenuItemLeading>
          <MenuItemLabel prefix="2: ">Delta</MenuItemLabel>
        </MenuItem>
        <MenuItemDivider />
        <MenuItemHeading text="More options">
          <MenuItem id="item-3">
            <MenuItemLabel>Extra</MenuItemLabel>
          </MenuItem>
        </MenuItemHeading>
      </Search>
    </Box>
  );
};
OpenWithPopoverMenuContent.storyName = "Open With Popover Menu Content";
