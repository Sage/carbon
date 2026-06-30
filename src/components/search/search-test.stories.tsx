import React, { useEffect, useRef, useState } from "react";
import Box from "../box";
import Search from ".";
import { SearchProps, SearchHandle, SearchListGroup } from "./search.component";
import Icon from "../icon";
import isChromatic from "../../../.storybook/isChromatic";

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

const listData: SearchListGroup[] = [
  {
    heading: "Recent searches",
    icon: <Icon type="clock" />,
    items: [
      { value: "recent-1", label: "term 1", labelPrefix: "Recent " },
      { value: "recent-2", label: "term 2", labelPrefix: "Recent " },
      { value: "recent-3", label: "term 3", labelPrefix: "Recent " },
    ],
  },
  {
    heading: "Suggested",
    icon: <Icon type="search" />,
    items: [
      { value: "suggested-1", label: "term 1", labelPrefix: "Suggested " },
      { value: "suggested-2", label: "term 2", labelPrefix: "Suggested " },
      { value: "suggested-3", label: "term 3", labelPrefix: "Suggested " },
      { value: "suggested-4", label: "term 4", labelPrefix: "Suggested " },
      { value: "suggested-5", label: "term 5", labelPrefix: "Suggested " },
    ],
  },
];

const OpenWithListDataStory = ({
  size,
}: {
  size: "small" | "medium" | "large";
}) => {
  const [value, setValue] = useState("");
  const [dismissed, setDismissed] = useState(false);

  const shouldOpen = isChromatic() || (value.length > 0 && !dismissed);

  return (
    <Box width="700px" p={4}>
      <Search
        size={size}
        inputWidth={75}
        open={shouldOpen}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setDismissed(false);
        }}
        onListItemSelect={(selected) => {
          setValue(selected);
          setDismissed(true);
        }}
        onClose={() => setDismissed(true)}
        listData={listData}
        aria-label={`Search with list data (${size})`}
      />
    </Box>
  );
};

export const OpenWithListDataSmall = () => (
  <OpenWithListDataStory size="small" />
);
OpenWithListDataSmall.storyName = "Open With List Data - Small";

export const OpenWithListDataMedium = () => (
  <OpenWithListDataStory size="medium" />
);
OpenWithListDataMedium.storyName = "Open With List Data - Medium";

export const OpenWithListDataLarge = () => (
  <OpenWithListDataStory size="large" />
);
OpenWithListDataLarge.storyName = "Open With List Data - Large";
