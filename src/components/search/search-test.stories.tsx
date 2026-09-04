import React, { useEffect, useRef, useState } from "react";
import { StoryObj } from "@storybook/react-vite";
import Box from "../box";
import Search from ".";
import { SearchProps, SearchHandle, SearchListGroup } from "./search.component";
import Icon from "../icon";
import Portrait from "../portrait";
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
        error="Error message above"
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
        error="Error message above"
        aria-label="Inverse with label, input hint and error"
      />
    </Box>

    <Box p={4}>
      <Search
        onChange={() => {}}
        value="Default with label, input hint and error"
        label="Search"
        inputHint="Input hint"
        error="Error message below"
        validationMessagePositionTop={false}
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
        error="Error message below"
        validationMessagePositionTop={false}
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
    icon: <Icon type="refresh_clock" />,
    items: [
      { value: "Recent term 1", label: "Recent term 1" },
      { value: "Recent term 2", label: "Recent term 2" },
      { value: "Recent term 3", label: "Recent term 3" },
    ],
  },
  {
    heading: "Suggested",
    icon: <Icon type="search" />,
    items: [
      { value: "Suggested term 1", label: "Suggested term 1" },
      { value: "Suggested term 2", label: "Suggested term 2" },
      { value: "Suggested term 3", label: "Suggested term 3" },
      { value: "Suggested term 4", label: "Suggested term 4" },
      { value: "Suggested term 5", label: "Suggested term 5" },
    ],
  },
];

const listDataWithContentVariants: SearchListGroup[] = [
  {
    heading: "Recent searches",
    icon: <Icon type="refresh_clock" />,
    items: [
      {
        value: "Search result with bolded search term",
        label: "Search result with bolded search term",
        leading: <Icon type="image" />,
      },
      {
        value: "Search result with bolded search term",
        label: "Search result with bolded search term",
        leading: <Portrait size="XS" initials="AB" />,
      },
      {
        value: "Search result with bolded search term",
        label: "Search result with bolded search term",
        subtext: "Subtext",
      },
      {
        value: "Search result with bolded search term",
        label: "Search result with bolded search term",
        labelPrefix: "prefix: ",
      },
    ],
  },
];

const OpenWithListDataStory = ({
  size,
  listData: storyListData = listData,
}: {
  size: "small" | "medium" | "large";
  listData?: SearchListGroup[];
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
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setValue("");
            setDismissed(true);
          }
        }}
        onFocus={() => setDismissed(false)}
        onListItemSelect={(selected) => {
          setValue(selected);
          setDismissed(true);
        }}
        onClose={() => setDismissed(true)}
        listData={storyListData}
        aria-label={`Search with list data (${size})`}
      />
    </Box>
  );
};

export const OpenWithListDataSmall = () => (
  <OpenWithListDataStory size="small" listData={listDataWithContentVariants} />
);
OpenWithListDataSmall.storyName = "Open With List Data - Small";

export const OpenWithListDataMedium = () => (
  <OpenWithListDataStory size="medium" listData={listDataWithContentVariants} />
);
OpenWithListDataMedium.storyName = "Open With List Data - Medium";

export const OpenWithListDataLarge = () => (
  <OpenWithListDataStory size="large" listData={listDataWithContentVariants} />
);
OpenWithListDataLarge.storyName = "Open With List Data - Large";

export const WithLabelInputHintAndDropdown = () => {
  const minQueryLength = 2;
  const [value, setValue] = useState("");
  const [dismissed, setDismissed] = useState(false);

  const shouldOpen =
    isChromatic() ||
    (value.length >= minQueryLength && listData.length > 0 && !dismissed);

  return (
    <Box width="700px" p={4}>
      <Search
        label="Search"
        inputHint="Hint text (optional)."
        inputWidth={75}
        open={shouldOpen}
        minQueryLength={minQueryLength}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setDismissed(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setValue("");
            setDismissed(true);
          }
        }}
        onFocus={() => setDismissed(false)}
        onListItemSelect={(selected) => {
          setValue(selected);
          setDismissed(true);
        }}
        onClose={() => setDismissed(true)}
        listData={listData}
        aria-label="Search with label, input hint and dropdown"
      />
    </Box>
  );
};
WithLabelInputHintAndDropdown.storyName = "With Label, Input Hint and Dropdown";
WithLabelInputHintAndDropdown.parameters = {
  chromatic: { disableSnapshot: true },
};

export const OpenWithListDataCustomHeight = () => {
  const [value, setValue] = useState("term");
  const [dismissed, setDismissed] = useState(false);

  const shouldOpen = isChromatic() || (value.length > 0 && !dismissed);

  return (
    <Box width="700px" p={4}>
      <Search
        label="Search"
        inputWidth={75}
        open={shouldOpen}
        maxHeight="400px"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setDismissed(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setValue("");
            setDismissed(true);
          }
        }}
        onFocus={() => setDismissed(false)}
        onListItemSelect={(selected) => {
          setValue(selected);
          setDismissed(true);
        }}
        onClose={() => setDismissed(true)}
        listData={listData}
        aria-label="Search with list data and custom height"
      />
    </Box>
  );
};
OpenWithListDataCustomHeight.storyName = "Open With List Data - Custom Height";

type Story = StoryObj<typeof Search>;

// Documentation regression stories moved from the public docs.

export const DocumentationDefault: Story = () => {
  const [value, setValue] = useState("");

  return <Search value={value} onChange={(e) => setValue(e.target.value)} />;
};
DocumentationDefault.storyName = "DocumentationDefault";

export const WithLabelAndInputHint: Story = () => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Search
      label="Search"
      inputHint="Hint text (optional)."
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};
WithLabelAndInputHint.storyName = "With Label and Input Hint";

export const Sizes: Story = () => {
  const [valueS, setValueS] = useState("");
  const [valueM, setValueM] = useState("");
  const [valueL, setValueL] = useState("");
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Search
        label="Small"
        size="small"
        onChange={(e) => setValueS(e.target.value)}
        value={valueS}
      />
      <Search
        label="Medium"
        size="medium"
        onChange={(e) => setValueM(e.target.value)}
        value={valueM}
      />
      <Search
        label="Large"
        size="large"
        onChange={(e) => setValueL(e.target.value)}
        value={valueL}
      />
    </Box>
  );
};
Sizes.storyName = "Sizes";

export const SizesWithDropdown: Story = () => {
  const minQueryLength = 2;

  const recentItems = [
    { value: "Recent term 1", label: "Recent term 1" },
    { value: "Recent term 2", label: "Recent term 2" },
    { value: "Recent term 3", label: "Recent term 3" },
  ];

  const suggestedItems = [
    {
      value: "Suggested term 1",
      label: "Suggested term 1",
    },
    {
      value: "Suggested term 2",
      label: "Suggested term 2",
    },
    {
      value: "Suggested term 3",
      label: "Suggested term 3",
    },
    {
      value: "Suggested term 4",
      label: "Suggested term 4",
    },
    {
      value: "Suggested term 5",
      label: "Suggested term 5",
    },
  ];

  const [valueS, setValueS] = useState("");
  const [valueM, setValueM] = useState("");
  const [valueL, setValueL] = useState("");
  const [dismissedS, setDismissedS] = useState(false);
  const [dismissedM, setDismissedM] = useState(false);
  const [dismissedL, setDismissedL] = useState(false);

  const getListData = (val: string) => {
    const filteredRecent = recentItems.filter((item) =>
      item.label.toLowerCase().includes(val.toLowerCase()),
    );
    const filteredSuggested = suggestedItems.filter((item) =>
      item.label.toLowerCase().includes(val.toLowerCase()),
    );

    return [
      ...(filteredRecent.length > 0
        ? [
            {
              heading: "Recent searches",
              icon: <Icon type="refresh_clock" />,
              items: filteredRecent,
            },
          ]
        : []),
      ...(filteredSuggested.length > 0
        ? [
            {
              heading: "Suggested",
              icon: <Icon type="search" />,
              items: filteredSuggested,
            },
          ]
        : []),
    ];
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} height="450px">
      <Search
        label="Small"
        size="small"
        value={valueS}
        onChange={(e) => {
          setValueS(e.target.value);
          setDismissedS(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setValueS("");
            setDismissedS(true);
          }
        }}
        onFocus={() => setDismissedS(false)}
        open={
          valueS.length >= minQueryLength &&
          getListData(valueS).length > 0 &&
          !dismissedS
        }
        minQueryLength={minQueryLength}
        listData={getListData(valueS)}
        onListItemSelect={(val) => {
          setValueS(val);
          setDismissedS(true);
        }}
        onClose={() => setDismissedS(true)}
      />
      <Search
        label="Medium"
        size="medium"
        value={valueM}
        onChange={(e) => {
          setValueM(e.target.value);
          setDismissedM(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setValueM("");
            setDismissedM(true);
          }
        }}
        onFocus={() => setDismissedM(false)}
        open={
          valueM.length >= minQueryLength &&
          getListData(valueM).length > 0 &&
          !dismissedM
        }
        minQueryLength={minQueryLength}
        listData={getListData(valueM)}
        onListItemSelect={(val) => {
          setValueM(val);
          setDismissedM(true);
        }}
        onClose={() => setDismissedM(true)}
      />
      <Search
        label="Large"
        size="large"
        value={valueL}
        onChange={(e) => {
          setValueL(e.target.value);
          setDismissedL(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setValueL("");
            setDismissedL(true);
          }
        }}
        onFocus={() => setDismissedL(false)}
        open={
          valueL.length >= minQueryLength &&
          getListData(valueL).length > 0 &&
          !dismissedL
        }
        minQueryLength={minQueryLength}
        listData={getListData(valueL)}
        onListItemSelect={(val) => {
          setValueL(val);
          setDismissedL(true);
        }}
        onClose={() => setDismissedL(true)}
      />
    </Box>
  );
};
SizesWithDropdown.storyName = "Sizes with Dropdown";

export const CustomWidths: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Search
        label="searchWidth"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        inputWidth={25}
      />
      <Search
        label="maxWidth"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        maxWidth="75%"
      />
    </Box>
  );
};
CustomWidths.storyName = "Custom Widths";

export const Inverse: Story = () => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Box
      width="700px"
      display="flex"
      flexDirection="column"
      p={3}
      backgroundColor="#000000"
    >
      <Search
        label="Inverse"
        inputHint="Use this prop on darker backgrounds"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        inverse
      />
    </Box>
  );
};
Inverse.storyName = "Inverse";

export const LabelInline: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Search
        label="Search"
        labelInline
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <Search
        label="Search with hint"
        inputHint="Hint text (optional)."
        labelInline
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </Box>
  );
};
LabelInline.storyName = "Label Inline";
