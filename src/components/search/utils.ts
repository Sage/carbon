import { SearchProps } from ".";

export const defaultSearchControlsInclude = [
  "value",
  "aria-label",
  "searchButtonAriaLabel",
  "id",
  "name",
  "placeholder",
  "label",
  "inputHint",
  "size",
  "searchWidth",
  "maxWidth",
  "error",
  "warning",
  "inverse",
  "triggerOnClear",
];

export const defaultSearchArgTypes = {
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
  warning: {
    options: ["false", "true", "message"],
    mapping: {
      false: false,
      true: true,
      message: "Warning message",
    },
    control: { type: "select" as const },
    labels: {
      false: "false",
      true: "true",
      message: "Warning message",
    },
  },
  inverse: {
    control: { type: "boolean" as const },
  },
  triggerOnClear: {
    control: { type: "boolean" as const },
  },
};

export const defaultSearchArgs: Partial<SearchProps> = {
  value: "",
  "aria-label": "Search",
  searchButtonAriaLabel: "Search",
  id: "search_id",
  name: "search_name",
  placeholder: "Search...",
  label: "",
  inputHint: "",
  size: "medium",
  searchWidth: "",
  maxWidth: "",
  error: false,
  warning: false,
  inverse: false,
  triggerOnClear: false,
};
