import React, { useState } from "react";
import {
  Select,
  Option,
  OptionGroupHeader,
} from "../../../../src/components/select";
import Box from "../../box";
import Icon from "../../icon";
import Portrait from "../../portrait";
import Typography from "../../typography";

export default {
  component: Select,
  title: "Select/Test",
  parameters: {
    info: { disable: true },
    themeProvider: {
      chromatic: {
        theme: "sage",
      },
    },
    chromatic: {
      disableSnapshot: true,
    },
    controls: {
      exclude: [
        "onChange",
        "onChangeDeferred",
        "onListScrollBottom",
        "onOpen",
        "onBlur",
        "onClick",
        "onFocus",
        "onKeyDown",
        "onMouseDown",
        "iconOnClick",
        "iconOnMouseDown",
        "children",
        "value",
        "defaultValue",
        "tableHeader",
        "multiColumn",
        "leftChildren",
        "as",
      ],
    },
  },
  argTypes: {
    error: {
      control: {
        type: "text",
      },
    },
    warning: {
      control: {
        type: "text",
      },
    },
    info: {
      control: {
        type: "text",
      },
    },
    fieldHelp: {
      control: {
        type: "text",
      },
    },
  },
};

const chromaticOptions = [
  <Option key="amber" text="Amber" value="amber" />,
  <Option key="black" text="Black" value="black" />,
  <Option key="blue" text="Blue" value="blue" />,
  <Option key="brown" text="Brown" value="brown" />,
  <Option key="green" text="Green" value="green" />,
  <Option key="orange" text="Orange" value="orange" />,
];

const truncatedOptionText =
  "A very long selected option that should truncate rather than expand the input";
const testPrefix = "<prefix>";

export const ChromaticSnapshotDropdownClosed = () => {
  return (
    <Box
      p={4}
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))"
      gap="32px 16px"
    >
      <Select
        required
        name="snapshot-typical"
        id="snapshot-typical"
        label="Typical — small"
        size="small"
        inputHint="Tests label, required indicator, hint and prefix"
        prefix={testPrefix}
        value="amber"
        onChange={() => {}}
      >
        {chromaticOptions}
      </Select>
      <Select
        name="snapshot-error"
        id="snapshot-error"
        label="Error state — medium"
        prefix={testPrefix}
        error="Tests the error message and error input styling"
        value="black"
        onChange={() => {}}
      >
        {chromaticOptions}
      </Select>
      <Select
        name="snapshot-warning"
        id="snapshot-warning"
        label="Warning state — large"
        size="large"
        prefix={testPrefix}
        warning="Tests the warning message and warning input styling"
        value="blue"
        onChange={() => {}}
      >
        {chromaticOptions}
      </Select>
      <Select
        name="snapshot-inline"
        id="snapshot-inline"
        label="Inline label — medium"
        labelInline
        prefix={testPrefix}
        value="amber"
        onChange={() => {}}
      >
        {chromaticOptions}
      </Select>
      <Select
        name="snapshot-truncated"
        id="snapshot-truncated"
        label="Truncated selected text — medium"
        maxWidth="240px"
        prefix={testPrefix}
        value="long"
        onChange={() => {}}
      >
        <Option key="long" text={truncatedOptionText} value="long" />
        {chromaticOptions}
      </Select>
      <Select
        name="snapshot-readonly"
        id="snapshot-readonly"
        label="Read-only state — medium"
        readOnly
        prefix={testPrefix}
        value="black"
        onChange={() => {}}
      >
        {chromaticOptions}
      </Select>
      <Select
        name="snapshot-disabled"
        id="snapshot-disabled"
        label="Disabled state — medium"
        disabled
        prefix={testPrefix}
        value="blue"
        onChange={() => {}}
      >
        {chromaticOptions}
      </Select>
      <Select
        name="snapshot-subtle"
        id="snapshot-subtle"
        label="Subtle variant — medium"
        variant="subtle"
        prefix={testPrefix}
        value="amber"
        onChange={() => {}}
      >
        {chromaticOptions}
      </Select>
      <Select
        name="snapshot-subtle-disabled"
        id="snapshot-subtle-disabled"
        label="Subtle disabled — medium"
        variant="subtle"
        disabled
        prefix={testPrefix}
        value="black"
        onChange={() => {}}
      >
        {chromaticOptions}
      </Select>
    </Box>
  );
};
ChromaticSnapshotDropdownClosed.storyName =
  "Chromatic Snapshot - Dropdown Closed";
ChromaticSnapshotDropdownClosed.parameters = {
  chromatic: { disableSnapshot: false },
};

export const ChromaticSnapshotDropdownOpen = () => {
  const [value, setValue] = useState("select");

  return (
    <Box height={800} p={4}>
      <Select
        autoFocus
        openOnFocus
        name="snapshot-complex-compositions"
        id="snapshot-complex-compositions"
        label="Complex option compositions — dropdown open"
        listMaxHeight={800}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        <Option text="Select an option" value="select" />
        <OptionGroupHeader label="Basic options" icon="settings" />
        <Option text="Text only" value="1" />
        <Option
          text="Leading icon"
          value="2"
          leading={<Icon type="favourite" />}
        />
        <Option text="Prefix" value="3" prefix="New " />
        <OptionGroupHeader>
          <Icon type="individual" /> <h4>Composed options</h4>
        </OptionGroupHeader>
        <Option text="Subtext" value="4" subtext="Some helpful subtext" />
        <Option
          text="Leading icon and prefix"
          value="5"
          leading={<Icon type="favourite" />}
          prefix="New "
        />
        <Option
          text="Leading icon, prefix and subtext"
          value="6"
          leading={<Icon type="individual" />}
          prefix="Team"
          subtext="A complete metadata combination"
          divider
        />
        <Option
          text="Disabled option"
          value="7"
          disabled
          subtext="Unavailable choices remain visible"
        />
        <Option text="Custom child content" value="8" divider>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="strong">Custom child content</Typography>
            <Typography color="secondary" variant="small">
              Status: active
            </Typography>
          </Box>
        </Option>
        <Option
          text="Icon, portrait, prefix and subtext"
          value="9"
          leading={
            <>
              <Icon type="individual" />
              <Portrait initials="JD" size="XS" />
            </>
          }
          prefix="Owner "
          subtext="Jane Doe · Product team"
        />
      </Select>
    </Box>
  );
};
ChromaticSnapshotDropdownOpen.storyName = "Chromatic Snapshot - Dropdown Open";
ChromaticSnapshotDropdownOpen.parameters = {
  chromatic: { disableSnapshot: false },
};

const selectOptions = [
  <Option key="option-1" text="Option 1" value="1" />,
  <Option key="option-2" text="Option 2" value="2" />,
  <Option key="option-3" text="Option 3" value="3" />,
  <Option key="option-4" text="Option 4" value="4" />,
  <Option key="option-5" text="Option 5" value="5" />,
  <Option key="option-6" text="Option 6" value="6" />,
];

const sharedSelectProps = {
  required: true,
  inputHint: "Hint text",
  prefix: testPrefix,
};

const sizes = ["medium", "small", "large"] as const;

export const DropdownSimple = () => {
  const [value, setValue] = useState("1");

  return (
    <Box
      p={4}
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))"
      gap="24px 16px"
    >
      {sizes.map((size) => (
        <Select
          key={`simple-${size}`}
          {...sharedSelectProps}
          name={`simple-${size}`}
          id={`simple-${size}`}
          label={`Default — ${size}`}
          size={size}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        >
          {selectOptions}
        </Select>
      ))}
      {sizes.map((size) => (
        <Select
          key={`simple-error-${size}`}
          {...sharedSelectProps}
          name={`simple-error-${size}`}
          id={`simple-error-${size}`}
          label={`Error — ${size}`}
          size={size}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          error="Error message (fix is required)"
        >
          {selectOptions}
        </Select>
      ))}
      {sizes.map((size) => (
        <Select
          key={`simple-warning-${size}`}
          {...sharedSelectProps}
          name={`simple-warning-${size}`}
          id={`simple-warning-${size}`}
          label={`Warning — ${size}`}
          size={size}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          warning="Caution message (fix is optional)"
        >
          {selectOptions}
        </Select>
      ))}
      {sizes.map((size) => (
        <Select
          key={`simple-readonly-${size}`}
          {...sharedSelectProps}
          name={`simple-readonly-${size}`}
          id={`simple-readonly-${size}`}
          label={`Read-only — ${size}`}
          size={size}
          value="2"
          onChange={() => {}}
          readOnly
        >
          {selectOptions}
        </Select>
      ))}
      {sizes.map((size) => (
        <Select
          key={`simple-disabled-${size}`}
          {...sharedSelectProps}
          name={`simple-disabled-${size}`}
          id={`simple-disabled-${size}`}
          label={`Disabled — ${size}`}
          size={size}
          value="3"
          onChange={() => {}}
          disabled
        >
          {selectOptions}
        </Select>
      ))}
    </Box>
  );
};
DropdownSimple.storyName = "Dropdown: simple";

export const DropdownInline = () => {
  const [value, setValue] = useState("1");

  return (
    <Box
      p={4}
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))"
      gap="24px 16px"
    >
      {sizes.map((size) => (
        <Select
          key={`inline-${size}`}
          {...sharedSelectProps}
          name={`inline-${size}`}
          id={`inline-${size}`}
          label={`Default inline — ${size}`}
          size={size}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          labelInline
        >
          {selectOptions}
        </Select>
      ))}
      {sizes.map((size) => (
        <Select
          key={`inline-error-${size}`}
          {...sharedSelectProps}
          name={`inline-error-${size}`}
          id={`inline-error-${size}`}
          label={`Error inline — ${size}`}
          size={size}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          labelInline
          error="Error message (fix is required)"
        >
          {selectOptions}
        </Select>
      ))}
      {sizes.map((size) => (
        <Select
          key={`inline-warning-${size}`}
          {...sharedSelectProps}
          name={`inline-warning-${size}`}
          id={`inline-warning-${size}`}
          label={`Warning inline — ${size}`}
          size={size}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          labelInline
          warning="Caution message (fix is optional)"
        >
          {selectOptions}
        </Select>
      ))}
      {sizes.map((size) => (
        <Select
          key={`inline-readonly-${size}`}
          {...sharedSelectProps}
          name={`inline-readonly-${size}`}
          id={`inline-readonly-${size}`}
          label={`Read-only inline — ${size}`}
          size={size}
          value="2"
          onChange={() => {}}
          labelInline
          readOnly
        >
          {selectOptions}
        </Select>
      ))}
      {sizes.map((size) => (
        <Select
          key={`inline-disabled-${size}`}
          {...sharedSelectProps}
          name={`inline-disabled-${size}`}
          id={`inline-disabled-${size}`}
          label={`Disabled inline — ${size}`}
          size={size}
          value="3"
          onChange={() => {}}
          labelInline
          disabled
        >
          {selectOptions}
        </Select>
      ))}
    </Box>
  );
};
DropdownInline.storyName = "Dropdown: inline";

const subtleSelectOptions = [
  <Option
    key="subtle-option-selected"
    text="Selected option>"
    value="selected"
  />,
  <Option key="subtle-option-alt" text="Option 2" value="option-2" />,
  <Option key="subtle-option-extra" text="Option 3" value="option-3" />,
  <Option key="subtle-option-4" text="Option 4" value="option-4" />,
  <Option key="subtle-option-5" text="Option 5" value="option-5" />,
  <Option key="subtle-option-6" text="Option 6" value="option-6" />,
];

export const DropdownSubtle = () => {
  const [value, setValue] = useState("selected");

  return (
    <Box p={4}>
      <Box
        p={4}
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))"
        gap="24px 16px"
      >
        {sizes.map((size) => (
          <Select
            key={`subtle-default-${size}`}
            name={`subtle-default-${size}`}
            id={`subtle-default-${size}`}
            label={`Subtle — ${size}`}
            size={size}
            variant="subtle"
            prefix={testPrefix}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          >
            {subtleSelectOptions}
          </Select>
        ))}
        {sizes.map((size) => (
          <Select
            key={`subtle-disabled-${size}`}
            name={`subtle-disabled-${size}`}
            id={`subtle-disabled-${size}`}
            label={`Subtle disabled — ${size}`}
            size={size}
            variant="subtle"
            prefix={testPrefix}
            value="selected"
            onChange={() => {}}
            disabled
          >
            {subtleSelectOptions}
          </Select>
        ))}
      </Box>
    </Box>
  );
};
DropdownSubtle.storyName = "Dropdown: subtle";

export const LocalRegressionCheck = () => {
  return (
      <Select label="Colour" onChange={() => {}} openOnFocus value="">
        <Option text="amber" value="amber" />
      </Select>
  );
};
LocalRegressionCheck.storyName = "Local regression check";
