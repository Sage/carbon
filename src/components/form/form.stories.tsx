import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import isChromatic from "../../../.storybook/isChromatic";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Form, { FormProps, RequiredFieldsIndicator } from ".";
import Button from "../button";
import Box from "../box";
import Textbox from "../textbox";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Textarea from "../textarea";
import Dialog from "../dialog";
import DateInput, { DateChangeEvent } from "../date";
import { Select, MultiSelect, Option } from "../select";
import { RadioButton, RadioButtonGroup } from "../radio-button";
import { Checkbox } from "../checkbox";
import Hr from "../hr";
import Switch from "../switch";
import InlineInputs from "../inline-inputs";
import Typography from "../typography";
import Link from "../link";

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
});

const defaultOpenState = isChromatic();

const meta: Meta<typeof Form> = {
  title: "Form",
  component: Form,
  args: {
    onSubmit: (ev: React.FormEvent) => {
      ev.preventDefault();
      action("onSubmit")(ev);
    },
  },
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    controls: { disable: true },
  },
  decorators: [
    (Story) => (
      <>
        {defaultOpenState ? (
          <Box width="100%" height={900}>
            <Story />
          </Box>
        ) : (
          <Story />
        )}
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Form>;

export const WithFooterNode: Story = (args: FormProps) => {
  const footerNode = (
    <Box>
      <Typography>
        This is the footer text that will be added to provide information about
        the form content.
      </Typography>
      <Link icon="placeholder" href="#">
        This is a link
      </Link>
    </Box>
  );

  return (
    <Form {...args} footerChildren={footerNode}>
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
    </Form>
  );
};
WithFooterNode.storyName = "With footer node";
WithFooterNode.parameters = {
  chromatic: { viewports: [1200, 320] },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const DefaultWithStickyFooter: Story = (args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={<Button>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    stickyFooter
  >
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
  </Form>
);
DefaultWithStickyFooter.storyName = "Default with sticky footer";
DefaultWithStickyFooter.parameters = {
  chromatic: { viewports: [1200, 320] },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const StickyFooterVariant: Story = (args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={<Button>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    stickyFooter
    stickyFooterVariant="grey"
  >
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
  </Form>
);
StickyFooterVariant.storyName = "Sticky footer with grey variant";
StickyFooterVariant.parameters = {
  chromatic: { viewports: [1200, 320] },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const WithFullWidthButtons: Story = (args: FormProps) => (
  <CarbonProvider validationRedesignOptIn>
    <Form
      {...args}
      fullWidthButtons
      stickyFooter
      leftSideButtons={<Button fullWidth>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit" fullWidth>
          Save
        </Button>
      }
      errorCount={3}
      warningCount={2}
    >
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
    </Form>
  </CarbonProvider>
);
WithFullWidthButtons.storyName = "With Full Width Buttons";
WithFullWidthButtons.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
};

export const FieldSpacing: Story = (args: FormProps) => {
  const [state, setState] = useState("");

  const setValue = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setState(ev.target.value);
  };

  return (
    <Form
      {...args}
      leftSideButtons={<Button>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      fieldSpacing={5}
    >
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textarea
        label="Textarea with Character Limit"
        characterLimit={50}
        value={state}
        onChange={setValue}
      />
    </Form>
  );
};
FieldSpacing.storyName = "Field Spacing";

export const OverrideFieldSpacing: Story = (args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={<Button>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
  >
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" mb={7} />
    <Textbox label="Textbox" />
  </Form>
);
OverrideFieldSpacing.storyName = "Override field spacing";

export const WithErrorsSummary: Story = (args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={<Button>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    errorCount={1}
  >
    <Textbox label="Textbox" />
  </Form>
);
WithErrorsSummary.storyName = "With Errors Summary";
WithErrorsSummary.parameters = {
  chromatic: { viewports: [1200, 900, 320] },
};

export const WithWarningsSummary: Story = (args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={<Button>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    warningCount={1}
  >
    <Textbox label="Textbox" />
  </Form>
);
WithWarningsSummary.storyName = "With Warnings Summary";
WithWarningsSummary.parameters = {
  chromatic: { viewports: [1200, 900, 320] },
};

export const WithBothErrorsAndWarningsSummary: Story = (args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={<Button>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    errorCount={2}
    warningCount={2}
  >
    <Textbox label="Textbox" />
  </Form>
);
WithBothErrorsAndWarningsSummary.storyName =
  "With Both Errors and Warnings Summary";
WithBothErrorsAndWarningsSummary.parameters = {
  chromatic: { viewports: [1200, 900, 320] },
};

export const WithAdditionalButtons: Story = (args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={
      <>
        <Button>Other</Button>
        <Button>Cancel</Button>
      </>
    }
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    rightSideButtons={
      <>
        <Button>Reset</Button>
        <Button>Other</Button>
      </>
    }
  >
    <Textbox label="Textbox" />
  </Form>
);
WithAdditionalButtons.storyName = "With Additional Buttons";

export const WithButtonsAlignedToTheLeft: Story = (args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={
      <>
        <Button>Other</Button>
        <Button>Cancel</Button>
      </>
    }
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    rightSideButtons={
      <>
        <Button>Reset</Button>
        <Button>Other</Button>
      </>
    }
    buttonAlignment="left"
  >
    <Textbox label="Textbox" />
  </Form>
);
WithButtonsAlignedToTheLeft.storyName = "With Buttons Aligned to the Left";

export const WithBothOptionalOrRequired: Story = (args: FormProps) => (
  <Box m={1}>
    <RequiredFieldsIndicator mb={2}>
      <Typography variant="b">Fill in all fields marked with</Typography>
    </RequiredFieldsIndicator>
    <Form
      {...args}
      leftSideButtons={<Button>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
    >
      <Textbox label="Textbox" required />
      <Select
        name="simple-required"
        id="simple-required"
        label="Simple Select"
        required
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
      <MultiSelect
        name="multi-optional"
        id="multi-optional"
        label="Multi Select"
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </MultiSelect>
      <MultiSelect
        name="multi-required"
        id="multi-required"
        label="Multi Select"
        required
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </MultiSelect>
      <RadioButtonGroup
        name="radio group optional"
        legend="RadioGroup"
        value="group-1-input-1"
        onChange={() => "RADIO CHANGE"}
      >
        <RadioButton
          id="group-1-input-1"
          value="group-1-input-1"
          label="Radio Option 1"
          labelWidth={10}
        />
        <RadioButton
          id="group-1-input-2"
          value="group-1-input-2"
          label="Radio Option 2"
          labelWidth={10}
        />
      </RadioButtonGroup>
      <RadioButtonGroup
        name="radio group required"
        legend="RadioGroup"
        value="group-2-input-2"
        onChange={() => "RADIO CHANGE"}
        required
      >
        <RadioButton
          id="group-2-input-1"
          value="group-2-input-1"
          label="Radio Option 1"
          labelWidth={10}
        />
        <RadioButton
          id="group-2-input-2"
          value="group-2-input-2"
          label="Radio Option 2"
          labelWidth={10}
        />
      </RadioButtonGroup>
      <Checkbox name="checkbox" label="Checkbox" required />
    </Form>
  </Box>
);
WithBothOptionalOrRequired.storyName = "WithBothOptionalOrRequired";
WithBothOptionalOrRequired.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
};

export const InDialog = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Form
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={<Button buttonType="primary">Submit</Button>}
        >
          <Textbox label="Textbox" />
        </Form>
      </Dialog>
    </>
  );
};
InDialog.storyName = "In Dialog";

export const InDialogWithStickyFooter = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [date, setDate] = useState("04/04/2019");
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Form
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={<Button buttonType="primary">Submit</Button>}
          stickyFooter
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <Textbox key={`textbox-${index + 1}`} label="Textbox" />
          ))}
          <DateInput
            label="Date"
            name="dateinput"
            value={date}
            onChange={(ev: DateChangeEvent) =>
              setDate(ev.target.value.formattedValue)
            }
            disablePortal
          />
          <Select
            name="simple-disabled-portal"
            id="simple-disabled-portal"
            label="Simple Select - disabled portal"
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </Select>
          <MultiSelect
            name="multi-disabled-portal"
            id="multi-disabled-portal"
            label="Multi Select - disabled portal"
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </MultiSelect>
          <Select name="simple" id="simple" label="Simple Select">
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </Select>
          <MultiSelect name="multi" id="multi" label="Multi Select">
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </MultiSelect>
          {Array.from({ length: 10 }).map((_, index) => (
            <Textbox key={`textbox-${index + 1}`} label="Textbox" />
          ))}
        </Form>
      </Dialog>
    </>
  );
};
InDialogWithStickyFooter.storyName = "In Dialog with Sticky Footer";
InDialogWithStickyFooter.parameters = {
  chromatic: { viewports: [1200, 320] },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const InDialogFullScreen = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        fullscreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Box p="0px 40px">
          <Form
            leftSideButtons={
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            }
            saveButton={<Button buttonType="primary">Submit</Button>}
          >
            <Textbox label="Textbox" />
          </Form>
        </Box>
      </Dialog>
    </>
  );
};
InDialogFullScreen.storyName = "In Dialog Full Screen";

export const InDialogFullScreenWithStickyFooter = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [date, setDate] = useState("04/04/2019");
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        fullscreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Form
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={<Button buttonType="primary">Submit</Button>}
          stickyFooter
        >
          {Array.from({ length: 15 }).map((_, index) => (
            <Textbox key={`textbox-${index + 1}`} label="Textbox" />
          ))}
          <DateInput
            label="Date"
            name="dateinput"
            value={date}
            onChange={(ev: DateChangeEvent) =>
              setDate(ev.target.value.formattedValue)
            }
          />
          <Select name="simple" id="simple" label="label">
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </Select>
          {Array.from({ length: 15 }).map((_, index) => (
            <Textbox key={`textbox-${index + 1}`} label="Textbox" />
          ))}
        </Form>
      </Dialog>
    </>
  );
};
InDialogFullScreenWithStickyFooter.storyName =
  "In Dialog Full Screen with Sticky Footer";
InDialogFullScreenWithStickyFooter.parameters = {
  chromatic: { viewports: [1200, 320] },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const FormAlignmentExample: Story = (args: FormProps) => {
  const [date, setDate] = useState("04/04/2019");
  return (
    <Form
      {...args}
      leftSideButtons={<Button>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      fieldSpacing={4}
    >
      <Textbox
        key="input-one"
        label="Field 1"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
        fieldHelp="This is some help text"
      />
      <Textbox
        key="input-two"
        label="Field 2"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
        labelSpacing={2}
      />
      <RadioButtonGroup
        name="legend"
        legend="Legend"
        legendInline
        legendWidth={10}
        legendSpacing={2}
        legendAlign="right"
        value="group-1-input-1"
        onChange={() => "RADIO CHANGE"}
      >
        <RadioButton
          id="group-1-input-1"
          value="group-1-input-1"
          label="Radio Option 1"
          labelWidth={10}
        />
        <RadioButton
          id="group-1-input-2"
          value="group-1-input-2"
          label="Radio Option 2"
          labelWidth={10}
        />
      </RadioButtonGroup>
      <DateInput
        name="date"
        label="Date picker"
        labelInline
        labelWidth={10}
        value={date}
        onChange={(ev: DateChangeEvent) =>
          setDate(ev.target.value.formattedValue)
        }
      />
      <RadioButtonGroup
        name="nolegend"
        legend="Legend above"
        ml="10%"
        value={"group-2-input-2"}
        onChange={() => "RADIO CHANGE"}
      >
        <RadioButton
          id="group-2-input-1"
          value="group-2-input-1"
          label="Radio Option 1"
          labelWidth={10}
        />
        <RadioButton
          id="group-2-input-2"
          value="group-2-input-2"
          label="Radio Option 2"
          labelWidth={10}
        />
      </RadioButtonGroup>
      <Textarea
        key="input-three"
        label="Field 3"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
        value=""
        onChange={() => {}}
      />
      <Checkbox name="checkbox1" label="Checkbox 1" ml="10%" />
      <Checkbox name="checkbox2" label="Checkbox 2" ml="10%" />
      <Box ml="10%" mr="60%">
        <Hr mb={7} />
      </Box>
      <Button buttonType="tertiary" ml="calc(10% - 24px)">
        Tertiary
      </Button>
      <Textbox
        key="input-four"
        label="Field 4"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
      />
      <Switch
        name="switch"
        label="Switch"
        labelInline
        labelWidth={10}
        labelSpacing={2}
        mb={4}
        checked
        onChange={() => "SWITCH CHANGE"}
      />
      <Textbox
        key="input-five"
        label="Field 5"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
      />
    </Form>
  );
};
FormAlignmentExample.storyName = "Form Alignment Example";

export const WithLabelsInline: Story = () => (
  <Form
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
  >
    <Textbox label="Textbox" labelInline labelWidth={30} />
    <InlineInputs
      label="Inline Inputs"
      gutter="none"
      labelWidth={30}
      labelId="inline-inputs"
    >
      <Textbox aria-labelledby="inline-inputs" />
      <Textbox aria-labelledby="inline-inputs" />
      <Select aria-labelledby="inline-inputs">
        <Option value="1" text="option 1" key="1" />
        <Option value="2" text="option 2" key="1" />
        <Option value="3" text="option 3" key="1" />
      </Select>
    </InlineInputs>
    <InlineInputs
      label="Inline Inputs with a gutter"
      gutter="large"
      labelWidth={30}
      labelId="inline-inputs-second"
    >
      <Textbox aria-labelledby="inline-inputs-second" />
      <Textbox aria-labelledby="inline-inputs-second" />
      <Select aria-labelledby="inline-inputs-second">
        <Option value="1" text="option 1" key="1" />
        <Option value="2" text="option 2" key="1" />
        <Option value="3" text="option 3" key="1" />
      </Select>
    </InlineInputs>
  </Form>
);
WithLabelsInline.storyName = "With Labels Inline";

export const WithCustomFooterPadding: Story = (args: FormProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="With custom footer padding"
      >
        <Form
          {...args}
          leftSideButtons={<Button>Cancel</Button>}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
          stickyFooter
          footerPadding={{ px: 8 }}
        >
          <Textbox label="Textbox" />
        </Form>
      </Dialog>
    </>
  );
};
WithCustomFooterPadding.storyName = "With Custom Footer Padding";
