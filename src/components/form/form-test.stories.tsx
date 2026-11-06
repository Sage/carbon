import React, { useState } from "react";
import { StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import isChromatic from "../../../.storybook/isChromatic";
import allModes from "../../../.storybook/modes";

import Form, { FormProps } from ".";
import Button from "../button/__next__";
import Box from "../box";
import Textbox from "../textbox";
import Textarea from "../textarea";
import Fieldset from "../fieldset";
import DateInput from "../date";
import Dialog from "../dialog";
import DateRange from "../date-range";
import { Select, MultiSelect, Option, FilterableSelect } from "../select";
import { RadioButton, RadioButtonGroup } from "../radio-button";
import { Checkbox, CheckboxGroup } from "../checkbox";
import Switch from "../switch";
import Decimal from "../decimal";
import { SimpleColorPicker, SimpleColor } from "../simple-color-picker";
import NumeralDate from "../numeral-date";
import Divider from "../divider";
import Password from "../password";
import Search from "../search";
import { Time } from "../time";
import TextEditor from "../text-editor";
import CarbonProvider from "../carbon-provider";
import Typography from "../typography";
import Link from "../link";

const defaultOpenState = isChromatic();

const renderTextboxes = (count: number, keyPrefix: string) =>
  Array.from({ length: count }).map((_, index) => (
    <Textbox
      key={`${keyPrefix}-${index + 1}`}
      label="Textbox"
      value=""
      onChange={() => {}}
    />
  ));

export default {
  title: "Form/Test",
  component: Form,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
    themeProvider: { chromatic: { theme: "sage" } },
  },
  args: {
    onSubmit: (ev: React.FormEvent) => {
      ev.preventDefault();
      action("onSubmit")(ev);
    },
  },
};

type StoryType = StoryObj<typeof Form>;

const formOutlineStyle: React.CSSProperties = {
  border:
    "var(--global-borderwidth-xs) solid var(--container-standard-border-default)",
  padding: "var(--global-space-layout-2-xs)",
};

const formBoundaryStyle: React.CSSProperties = {
  ...formOutlineStyle,
  maxWidth: "600px",
};

export const DeprecatedFieldSpacingDefaultOnEveryInput: StoryType = (
  args: FormProps,
) => (
  <CarbonProvider validationRedesignOptIn>
    <div style={formBoundaryStyle}>
      <Form
        {...args}
        leftSideButtons={
          <Button variant="default" variantType="subtle">
            Cancel
          </Button>
        }
        saveButton={
          <Button variant="default" variantType="primary" type="submit">
            Save
          </Button>
        }
      >
        <Box>
          {/* Keeps the character count with its Textbox, so the gap goes below the count */}
          <div style={{ marginBottom: "var(--global-space-layout-xs)" }}>
            <Textbox
              onChange={() => {}}
              value=""
              label="Textbox"
              characterLimit={100}
              mb={0}
            />
          </div>
          <Decimal label="Decimal" onChange={() => {}} value="" />
          <Password label="Password" onChange={() => {}} value="" />
          <Fieldset legend="Fieldset">
            <Textbox onChange={() => {}} value="" label="Textbox in Fieldset" />
            <Checkbox
              label="Checkbox in Fieldset"
              onChange={() => {}}
              checked={false}
            />
            <Select
              name="fieldset-select"
              id="fieldset-select"
              label="Select in Fieldset"
              onChange={() => {}}
              value=""
            >
              <Option text="Amber" value="1" />
              <Option text="Black" value="2" />
              <Option text="Blue" value="3" />
            </Select>
          </Fieldset>
          <Divider type="horizontal" />
          <Time
            value={{
              hours: "",
              minutes: "",
            }}
            onChange={() => {}}
            legend="Time"
          />
          <NumeralDate
            legend="Numeral Date"
            onChange={() => {}}
            value={{ dd: "", mm: "", yyyy: "" }}
          />
          <RadioButtonGroup
            name="legend"
            legend="RadioButtonGroup"
            onChange={() => {}}
            value="group-1-input-1"
          >
            <RadioButton
              id="group-1-input-1"
              value="group-1-input-1"
              label="Radio Option 1"
            />
            <RadioButton
              id="group-1-input-2"
              value="group-1-input-2"
              label="Radio Option 2"
            />
          </RadioButtonGroup>
          <Checkbox label="Checkbox" checked={false} onChange={() => {}} />
          <CheckboxGroup legend="Checkbox Group">
            <Checkbox label="Checkbox-1" checked={false} onChange={() => {}} />
            <Checkbox label="Checkbox-2" checked={false} onChange={() => {}} />
          </CheckboxGroup>
          <DateInput name="date" label="Date" value="" onChange={() => {}} />
          <DateRange
            name="date-range"
            startLabel="Start Date"
            endLabel="End Date"
            value={["", ""]}
            onChange={() => {}}
          />
          <Search value="" onChange={() => {}} />
          <Select
            name="simple-select"
            id="simple-select"
            label="Simple Select"
            value=""
            onChange={() => {}}
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
          </Select>
          <FilterableSelect
            name="filterable-select"
            id="filterable-select"
            label="Filterable Select"
            value=""
            onChange={() => {}}
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
          </FilterableSelect>
          <MultiSelect
            name="multi-select"
            id="multi-select"
            label="Multi Select"
            value={[]}
            onChange={() => {}}
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
          </MultiSelect>
          <Textarea
            label="Textarea"
            name="textarea"
            characterLimit={100}
            value=""
            onChange={() => {}}
          />
          <TextEditor labelText="Text Editor" characterLimit={100} />
          <SimpleColorPicker
            name="simple-color-picker"
            legend="Simple Color Picker"
            value=""
            onChange={() => {}}
          >
            {[
              { color: "transparent", label: "transparent" },
              { color: "#0073C1", label: "blue" },
              { color: "#582C83", label: "purple" },
            ].map(({ color, label }) => (
              <SimpleColor
                value={color}
                key={color}
                aria-label={label}
                id={color}
              />
            ))}
          </SimpleColorPicker>
          <Switch
            name="switch"
            label="Switch"
            onChange={() => {}}
            checked={false}
          />
        </Box>
      </Form>
    </div>
  </CarbonProvider>
);

DeprecatedFieldSpacingDefaultOnEveryInput.storyName =
  "Deprecated fieldSpacing default on every input type";
DeprecatedFieldSpacingDefaultOnEveryInput.parameters = {
  themeProvider: {
    chromatic: { theme: "sage" },
  },
  chromatic: {
    disableSnapshot: false,
  },
};

export const FullWidthButtonsWrap = (args: FormProps) => {
  return (
    <div style={formOutlineStyle}>
      <Form
        {...args}
        fullWidthButtons
        leftSideButtons={
          <Button variant="default" variantType="subtle" fullWidth>
            Cancel
          </Button>
        }
        saveButton={
          <Button
            variant="default"
            variantType="primary"
            type="submit"
            fullWidth
          >
            Save
          </Button>
        }
        rightSideButtons={
          <Button variant="default" variantType="secondary" fullWidth>
            Other
          </Button>
        }
        errorCount={1}
        warningCount={2}
      >
        <Textbox onChange={() => {}} value="" label="Textbox" />
        <Textbox onChange={() => {}} value="" label="Textbox" />
      </Form>
    </div>
  );
};

FullWidthButtonsWrap.storyName =
  "Footer: fullWidthButtons on large and small screens";
FullWidthButtonsWrap.parameters = {
  chromatic: {
    disableSnapshot: false,
    modes: { lg: allModes.lg, xsm: allModes.xsm },
  },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const FooterProps = (args: FormProps) => (
  <Box display="flex" flexDirection="column" gap={2}>
    <div style={formOutlineStyle}>
      <Form
        {...args}
        leftSideButtons={
          <>
            <Button variant="default" variantType="subtle">
              Cancel
            </Button>
            <Button variant="default" variantType="secondary">
              Reset
            </Button>
          </>
        }
        saveButton={
          <Button variant="default" variantType="primary" type="submit">
            Save
          </Button>
        }
        buttonAlignment="left"
      >
        <Textbox onChange={() => {}} value="" label='buttonAlignment="left"' />
      </Form>
    </div>
    <div style={formOutlineStyle}>
      <Form
        {...args}
        footerChildren={
          <Box>
            <Typography>
              This is the footer text that will be added to provide information
              about the form content.
            </Typography>
            <Link icon="placeholder" href="#">
              This is a link
            </Link>
          </Box>
        }
      >
        <Textbox onChange={() => {}} value="" label="footerChildren" />
      </Form>
    </div>
    <div style={formOutlineStyle}>
      <Form
        {...args}
        leftSideButtons={
          <Button variant="default" variantType="subtle">
            Cancel
          </Button>
        }
        saveButton={
          <Button variant="default" variantType="primary" type="submit">
            Save
          </Button>
        }
        footerPadding={{ px: 8, py: 3 }}
      >
        <Textbox
          onChange={() => {}}
          value=""
          label="footerPadding={{ px: 8, py: 3 }}"
        />
      </Form>
    </div>
  </Box>
);

FooterProps.storyName =
  "Footer: buttonAlignment, footerChildren and footerPadding";
FooterProps.parameters = {
  chromatic: {
    disableSnapshot: false,
  },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const DeprecatedStickyFooterVariants = (args: FormProps) => (
  <Box display="flex" flexDirection="column" gap={2}>
    {(["light", "grey"] as const).map((variant) => (
      <div style={formOutlineStyle} key={variant}>
        <Form
          {...args}
          leftSideButtons={
            <Button variant="default" variantType="subtle">
              Cancel
            </Button>
          }
          saveButton={
            <Button variant="default" variantType="primary" type="submit">
              Save
            </Button>
          }
          stickyFooter
          stickyFooterVariant={variant}
        >
          <Textbox
            onChange={() => {}}
            value=""
            label={`stickyFooterVariant="${variant}"`}
          />
        </Form>
      </div>
    ))}
  </Box>
);

DeprecatedStickyFooterVariants.storyName =
  "Deprecated sticky footer: light and grey variants";
DeprecatedStickyFooterVariants.parameters = {
  chromatic: {
    disableSnapshot: false,
  },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const DeprecatedErrorAndWarningCountSummary = (args: FormProps) => (
  <Box display="flex" flexDirection="column" gap={2}>
    {[
      { label: "errorCount={1}", errorCount: 1 },
      { label: "warningCount={1}", warningCount: 1 },
      {
        label: "errorCount={2} warningCount={2}",
        errorCount: 2,
        warningCount: 2,
      },
    ].map(({ label, errorCount, warningCount }) => (
      <div style={formOutlineStyle} key={label}>
        <Form
          {...args}
          leftSideButtons={
            <Button variant="default" variantType="subtle">
              Cancel
            </Button>
          }
          saveButton={
            <Button variant="default" variantType="primary" type="submit">
              Save
            </Button>
          }
          errorCount={errorCount}
          warningCount={warningCount}
        >
          <Textbox onChange={() => {}} value="" label={label} />
        </Form>
      </div>
    ))}
  </Box>
);
DeprecatedErrorAndWarningCountSummary.storyName =
  "Deprecated error and warning count summary";
DeprecatedErrorAndWarningCountSummary.parameters = {
  chromatic: {
    disableSnapshot: false,
  },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const DeprecatedFieldSpacingWithOverride = (args: FormProps) => {
  const [state, setState] = useState("");

  const setValue = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(ev.target.value);
  };

  return (
    <div style={formOutlineStyle}>
      <Form
        {...args}
        leftSideButtons={
          <Button variant="default" variantType="subtle">
            Cancel
          </Button>
        }
        saveButton={
          <Button variant="default" variantType="primary" type="submit">
            Save
          </Button>
        }
        fieldSpacing={4}
      >
        <Textbox onChange={() => {}} value="" label="Textbox" />
        <Textbox
          onChange={() => {}}
          value=""
          label="Textbox with overridden spacing (mb={10})"
          mb={10}
        />
        <Textbox onChange={() => {}} value="" label="Textbox" />
        <Textarea
          label="Textarea with character count (spacing goes below the count)"
          characterLimit={50}
          value={state}
          onChange={setValue}
        />
      </Form>
    </div>
  );
};
DeprecatedFieldSpacingWithOverride.storyName =
  "Deprecated fieldSpacing with a per-field override";
DeprecatedFieldSpacingWithOverride.parameters = {
  chromatic: {
    disableSnapshot: false,
  },
  themeProvider: { chromatic: { theme: "sage" } },
};

// Gives Chromatic enough height to capture the open Dialog
const DialogSnapshotWrapper = ({ children }: { children: React.ReactNode }) =>
  defaultOpenState ? (
    <Box width="100%" height={900}>
      {children}
    </Box>
  ) : (
    <>{children}</>
  );

export const DeprecatedStickyFooterInDialog = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <DialogSnapshotWrapper>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Form
          leftSideButtons={
            <Button
              variant="default"
              variantType="subtle"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          }
          saveButton={
            <Button variant="default" variantType="primary">
              Submit
            </Button>
          }
          stickyFooter
        >
          {renderTextboxes(10, "top")}
          {renderTextboxes(10, "bottom")}
        </Form>
      </Dialog>
    </DialogSnapshotWrapper>
  );
};
DeprecatedStickyFooterInDialog.storyName = "Deprecated sticky footer in Dialog";
DeprecatedStickyFooterInDialog.parameters = {
  chromatic: {
    disableSnapshot: false,
    modes: { lg: allModes.lg, xsm: allModes.xsm },
  },
  themeProvider: { chromatic: { theme: "sage" } },
};

// Fixed-height scroll box, so the sticky footer stays pinned to its bottom
const scrollBoxStyle: React.CSSProperties = {
  ...formOutlineStyle,
  // Padding is set on the fields instead, so the sticky footer spans the full width
  padding: "var(--global-space-none)",
  height: "300px",
  overflowY: "auto",
};

export const DeprecatedStickyFooterDisabledOnSmallScreen = (
  args: FormProps,
) => (
  <Box display="flex" flexDirection="column" gap={2}>
    {[
      { label: "stickyFooter", disableStickyOnSmallScreen: false },
      {
        label: "stickyFooter + disableStickyOnSmallScreen",
        disableStickyOnSmallScreen: true,
      },
    ].map(({ label, disableStickyOnSmallScreen }) => (
      <div style={scrollBoxStyle} key={label}>
        <Form
          {...args}
          leftSideButtons={
            <Button variant="default" variantType="subtle">
              Cancel
            </Button>
          }
          saveButton={
            <Button variant="default" variantType="primary" type="submit">
              Save
            </Button>
          }
          stickyFooter
          disableStickyOnSmallScreen={disableStickyOnSmallScreen}
        >
          <Box p="var(--global-space-layout-2-xs)">
            <Textbox onChange={() => {}} value="" label={label} />
            {renderTextboxes(5, label)}
          </Box>
        </Form>
      </div>
    ))}
  </Box>
);
DeprecatedStickyFooterDisabledOnSmallScreen.storyName =
  "Deprecated sticky footer: disableStickyOnSmallScreen (320px)";
DeprecatedStickyFooterDisabledOnSmallScreen.globals = {
  viewport: { value: "xsm" },
};
DeprecatedStickyFooterDisabledOnSmallScreen.parameters = {
  chromatic: {
    disableSnapshot: false,
    modes: { xsm: allModes.xsm },
  },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const DeprecatedStickyFooterInFullScreenDialog = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <DialogSnapshotWrapper>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        size="fullscreen"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Form
          leftSideButtons={
            <Button
              variant="default"
              variantType="subtle"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          }
          saveButton={
            <Button variant="default" variantType="primary">
              Submit
            </Button>
          }
          stickyFooter
        >
          {renderTextboxes(15, "top")}
          {renderTextboxes(15, "bottom")}
        </Form>
      </Dialog>
    </DialogSnapshotWrapper>
  );
};
DeprecatedStickyFooterInFullScreenDialog.storyName =
  "Deprecated sticky footer in full-screen Dialog";
DeprecatedStickyFooterInFullScreenDialog.parameters = {
  chromatic: {
    disableSnapshot: false,
    modes: { lg: allModes.lg, xsm: allModes.xsm },
  },
  themeProvider: { chromatic: { theme: "sage" } },
};
