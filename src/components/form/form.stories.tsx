import React, { useEffect, useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import isChromatic from "../../../.storybook/isChromatic";

import Form, { FormProps, RequiredFieldsIndicator } from ".";
import Button from "../button/__next__";
import Box from "../box";
import DateInput from "../date";
import Dialog from "../dialog";
import Divider from "../divider";
import Fieldset from "../fieldset";
import Link from "../link";
import Message from "../message";
import { Checkbox } from "../checkbox";
import { RadioButton, RadioButtonGroup } from "../radio-button";
import { MultiSelect, Option, Select } from "../select";
import Sidebar from "../sidebar";
import Switch from "../switch";
import Textarea from "../textarea";
import Textbox from "../textbox";
import Typography from "../typography";

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
});

const blockSpacing = "var(--global-space-layout-xs)";
const buttonGap = "var(--global-space-comp-m)";

const defaultOpenState = isChromatic();

const meta: Meta<typeof Form> = {
  title: "Form",
  component: Form,
  subcomponents: { RequiredFieldsIndicator },
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
    themeProvider: { chromatic: { theme: "sage" } },
    controls: { disable: true },
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Composition: Story = {
  render: function Render(args) {
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [contactMethod, setContactMethod] = useState("");
    const [newsletter, setNewsletter] = useState(false);

    return (
      <Form {...args}>
        <Typography variant="h1" mb={blockSpacing}>
          Personal details
        </Typography>
        <Typography weight="medium" mb={blockSpacing}>
          Fields marked <RequiredFieldsIndicator as="span" />
          are required
        </Typography>
        <Message
          variant="warning"
          title="Check the information"
          mb={blockSpacing}
        >
          Confirm that the contact details are up to date.
        </Message>
        <Fieldset
          legend="Contact details"
          legendHint="The information that will be displayed on your invoices and contact lists."
          mb={blockSpacing}
        >
          <Textbox
            label="Email address"
            required
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <Textbox
            label="Telephone number"
            required
            value={telephone}
            onChange={(ev) => setTelephone(ev.target.value)}
          />
        </Fieldset>
        <Divider
          type="horizontal"
          aria-hidden
          mt="var(--global-space-none)"
          mb={blockSpacing}
        />
        <Fieldset
          legend="Preferences"
          legendHint="Choose how you would like us to contact you."
          mb={blockSpacing}
        >
          <Select
            id="preferred-contact-method"
            label="Preferred contact method"
            value={contactMethod}
            onChange={(ev) => setContactMethod(ev.target.value)}
          >
            <Option text="Email" value="email" />
            <Option text="Telephone" value="telephone" />
          </Select>
          <Checkbox
            label="Send me product updates"
            checked={newsletter}
            onChange={(ev) => setNewsletter(ev.target.checked)}
          />
        </Fieldset>
        <Box
          display="flex"
          gap={buttonGap}
          justifyContent="flex-end"
          width="100%"
        >
          <Button variant="default" variantType="subtle">
            Cancel
          </Button>
          <Button variant="default" variantType="tertiary">
            Save draft
          </Button>
          <Button variant="default" variantType="secondary">
            Preview
          </Button>
          <Button variant="default" variantType="primary" type="submit">
            Save changes
          </Button>
        </Box>
      </Form>
    );
  },
};
Composition.storyName = "Composition";

export const WithFieldsets: Story = {
  render: (args) => (
    <Form {...args}>
      <RequiredFieldsIndicator mb={blockSpacing}>
        Indicates required information
      </RequiredFieldsIndicator>
      <Fieldset legend="Name" required mb={blockSpacing}>
        <Textbox label="First name" value="" onChange={() => {}} />
        <Textbox label="Last name" value="" onChange={() => {}} />
      </Fieldset>
      <Fieldset
        legend="Address"
        legendHint="Use the address where you receive post"
        mb={blockSpacing}
      >
        <Textbox label="Address line 1" value="" onChange={() => {}} />
        <Textbox label="Town or city" value="" onChange={() => {}} />
        <Textbox label="Postcode" value="" onChange={() => {}} />
      </Fieldset>
      <Box
        display="flex"
        gap={buttonGap}
        justifyContent="flex-end"
        width="100%"
      >
        <Button variant="default" variantType="primary" type="submit">
          Save
        </Button>
      </Box>
    </Form>
  ),
};
WithFieldsets.storyName = "With Fieldsets";

export const InDialog: Story = {
  render: function Render(args) {
    const [isOpen, setIsOpen] = useState(defaultOpenState);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
        <Dialog
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          title="Contact details"
          footer={
            <Box
              display="flex"
              gap={buttonGap}
              justifyContent="flex-end"
              width="100%"
            >
              <Button
                variant="default"
                variantType="subtle"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                variantType="primary"
                type="submit"
                form="form-in-dialog"
              >
                Save
              </Button>
            </Box>
          }
        >
          <Form {...args} id="form-in-dialog">
            <RequiredFieldsIndicator mb={blockSpacing}>
              Indicates required information
            </RequiredFieldsIndicator>
            <Fieldset legend="Personal details" required mb={blockSpacing}>
              <Textbox label="First name" value="" onChange={() => {}} />
              <Textbox label="Last name" value="" onChange={() => {}} />
            </Fieldset>
            <Fieldset legend="Contact details" required mb={blockSpacing}>
              <Textbox label="Email address" value="" onChange={() => {}} />
              <Textbox label="Telephone number" value="" onChange={() => {}} />
            </Fieldset>
            {/* resets the spacing the deprecated `fieldSpacing` prop still applies by default */}
            <Fieldset
              legend="Address"
              legendHint="Use the address where you receive post"
              mb="var(--global-space-none)"
            >
              <Textbox label="Address line 1" value="" onChange={() => {}} />
              <Textbox label="Town or city" value="" onChange={() => {}} />
              <Textbox label="Postcode" value="" onChange={() => {}} />
            </Fieldset>
          </Form>
        </Dialog>
      </>
    );
  },
};
InDialog.storyName = "In Dialog";

export const InSidebar: Story = {
  render: function Render(args) {
    const [isOpen, setIsOpen] = useState(defaultOpenState);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Sidebar</Button>
        <Sidebar
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          header="Contact details"
          footer={
            <Box
              display="flex"
              gap={buttonGap}
              justifyContent="flex-end"
              width="100%"
            >
              <Button
                variant="default"
                variantType="subtle"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                variantType="primary"
                type="submit"
                form="form-in-sidebar"
              >
                Save
              </Button>
            </Box>
          }
        >
          <Form {...args} id="form-in-sidebar">
            <RequiredFieldsIndicator mb={blockSpacing}>
              Indicates required information
            </RequiredFieldsIndicator>
            {/* resets the spacing the deprecated `fieldSpacing` prop still applies by default */}
            <Fieldset
              legend="Contact details"
              required
              mb="var(--global-space-none)"
            >
              <Textbox label="Email address" value="" onChange={() => {}} />
              <Textbox label="Telephone number" value="" onChange={() => {}} />
            </Fieldset>
          </Form>
        </Sidebar>
      </>
    );
  },
};
InSidebar.storyName = "In Sidebar";

export const ValidationSummary: Story = {
  render: function Render(args) {
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitCount, setSubmitCount] = useState(0);
    const firstSummaryLinkRef = useRef<HTMLAnchorElement | HTMLButtonElement>(
      null,
    );

    const errorEntries = Object.entries(errors);

    useEffect(() => {
      if (submitCount && errorEntries.length) {
        firstSummaryLinkRef.current?.focus();
      }
      // focus only after each submit attempt, not while the user edits fields
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitCount]);

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      const nextErrors: Record<string, string> = {};
      if (!email) nextErrors["validation-email"] = "Enter an email address";
      if (!telephone)
        nextErrors["validation-telephone"] = "Enter a telephone number";

      setErrors(nextErrors);
      setSubmitCount((count) => count + 1);

      if (!Object.keys(nextErrors).length) {
        args.onSubmit?.(ev);
      }
    };

    return (
      <Form {...args} onSubmit={handleSubmit}>
        <Typography variant="h1" mb={blockSpacing}>
          Contact details
        </Typography>
        {errorEntries.length > 0 && (
          <Message variant="error" title="There is a problem" mb={blockSpacing}>
            <Typography variant="ul" m={0}>
              {errorEntries.map(([fieldId, message], index) => (
                <Typography as="li" key={fieldId}>
                  <Link
                    ref={index === 0 ? firstSummaryLinkRef : undefined}
                    href={`#${fieldId}`}
                    onClick={(ev) => {
                      ev.preventDefault();
                      document.getElementById(fieldId)?.focus();
                    }}
                  >
                    {message}
                  </Link>
                </Typography>
              ))}
            </Typography>
          </Message>
        )}
        <RequiredFieldsIndicator mb={blockSpacing}>
          Indicates required information
        </RequiredFieldsIndicator>
        <Fieldset legend="Contact details" required mb={blockSpacing}>
          <Textbox
            id="validation-email"
            label="Email address"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            error={errors["validation-email"]}
          />
          <Textbox
            id="validation-telephone"
            label="Telephone number"
            value={telephone}
            onChange={(ev) => setTelephone(ev.target.value)}
            error={errors["validation-telephone"]}
          />
        </Fieldset>
        <Box
          display="flex"
          gap={buttonGap}
          justifyContent="flex-end"
          width="100%"
        >
          <Button variant="default" variantType="subtle">
            Cancel
          </Button>
          <Button variant="default" variantType="primary" type="submit">
            Save changes
          </Button>
        </Box>
      </Form>
    );
  },
};
ValidationSummary.storyName = "Validation Summary";
// Shown above the example, outside the story source, so the copyable code stays clean
ValidationSummary.decorators = [
  (StoryToRender) => (
    <>
      <Typography mb={blockSpacing}>
        To see the summary, select <strong>Save changes</strong> without filling
        in the fields.
      </Typography>
      <StoryToRender />
    </>
  ),
];

export const Playground: Story = {
  render: function Render(args) {
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [additionalInformation, setAdditionalInformation] = useState("");
    const [date, setDate] = useState("");
    const [contactMethod, setContactMethod] = useState("");
    const [contactPreference, setContactPreference] = useState("");
    const [productUpdates, setProductUpdates] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitCount, setSubmitCount] = useState(0);
    const firstSummaryLinkRef = useRef<HTMLAnchorElement | HTMLButtonElement>(
      null,
    );

    const errorEntries = Object.entries(errors);

    useEffect(() => {
      if (submitCount && errorEntries.length) {
        firstSummaryLinkRef.current?.focus();
      }
      // focus only after each submit attempt, not while the user edits fields
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitCount]);

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      const nextErrors: Record<string, string> = {};

      if (!email) nextErrors["playground-email"] = "Enter an email address";
      if (!telephone)
        nextErrors["playground-telephone"] = "Enter a telephone number";
      if (!additionalInformation)
        nextErrors["playground-additional-information"] =
          "Enter additional information";
      if (!date) nextErrors["playground-date"] = "Enter a date";
      if (!contactMethod)
        nextErrors["playground-contact-method"] =
          "Select a preferred contact method";
      if (!contactPreference)
        nextErrors["playground-contact-preference-email"] =
          "Select how we should contact you";
      if (!productUpdates)
        nextErrors["playground-product-updates"] =
          "Confirm whether you want product updates";

      setErrors(nextErrors);
      setSubmitCount((count) => count + 1);

      if (!Object.keys(nextErrors).length) {
        args.onSubmit?.(ev);
      }
    };

    const reset = () => {
      setEmail("");
      setTelephone("");
      setAdditionalInformation("");
      setDate("");
      setContactMethod("");
      setContactPreference("");
      setProductUpdates(false);
      setEmailNotifications(false);
      setErrors({});
      setSubmitCount(0);
    };

    return (
      <Form {...args} onSubmit={handleSubmit}>
        <Typography variant="h1" mb={blockSpacing}>
          Interactive form playground
        </Typography>
        <Typography mb={blockSpacing}>
          Submit the form empty to test validation, error-summary links, and
          focus management. Complete the fields to test the successful submit
          path.
        </Typography>
        {errorEntries.length > 0 && (
          <Message variant="error" title="There is a problem" mb={blockSpacing}>
            <Typography variant="ul" m={0}>
              {errorEntries.map(([fieldId, message], index) => (
                <Typography as="li" key={fieldId}>
                  <Link
                    ref={index === 0 ? firstSummaryLinkRef : undefined}
                    href={`#${fieldId}`}
                    onClick={(ev) => {
                      ev.preventDefault();
                      document.getElementById(fieldId)?.focus();
                    }}
                  >
                    {message}
                  </Link>
                </Typography>
              ))}
            </Typography>
          </Message>
        )}
        <RequiredFieldsIndicator mb={blockSpacing}>
          Indicates required information
        </RequiredFieldsIndicator>
        <Fieldset legend="Contact details" required mb={blockSpacing}>
          <Textbox
            id="playground-email"
            label="Email address"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            error={errors["playground-email"]}
          />
          <Textbox
            id="playground-telephone"
            label="Telephone number"
            value={telephone}
            onChange={(ev) => setTelephone(ev.target.value)}
            error={errors["playground-telephone"]}
          />
          <Textarea
            id="playground-additional-information"
            label="Additional information"
            value={additionalInformation}
            onChange={(ev) => setAdditionalInformation(ev.target.value)}
            error={errors["playground-additional-information"]}
          />
        </Fieldset>
        <Fieldset legend="Contact preferences" required mb={blockSpacing}>
          <DateInput
            id="playground-date"
            label="Preferred contact date"
            required
            value={date}
            onChange={(ev) => setDate(ev.target.value.formattedValue)}
            error={errors["playground-date"]}
          />
          <Select
            id="playground-contact-method"
            label="Preferred contact method"
            value={contactMethod}
            onChange={(ev) => setContactMethod(ev.target.value)}
            error={errors["playground-contact-method"]}
          >
            <Option text="Select a contact method" value="" />
            <Option text="Email" value="email" />
            <Option text="Telephone" value="telephone" />
          </Select>
        </Fieldset>
        <RadioButtonGroup
          id="playground-contact-preference"
          name="playground-contact-preference"
          legend="How should we contact you?"
          required
          value={contactPreference}
          onChange={(ev) => setContactPreference(ev.target.value)}
          error={errors["playground-contact-preference-email"]}
          mb={blockSpacing}
        >
          <RadioButton
            id="playground-contact-preference-email"
            value="email"
            label="Email"
          />
          <RadioButton
            id="playground-contact-preference-telephone"
            value="telephone"
            label="Telephone"
          />
        </RadioButtonGroup>
        <Fieldset legend="Preferences" mb={blockSpacing}>
          <Checkbox
            id="playground-product-updates"
            label="Send me product updates"
            required
            checked={productUpdates}
            onChange={(ev) => setProductUpdates(ev.target.checked)}
            error={errors["playground-product-updates"]}
          />
          <Switch
            id="playground-email-notifications"
            label="Email notifications"
            checked={emailNotifications}
            onChange={(ev) => setEmailNotifications(ev.target.checked)}
          />
        </Fieldset>
        <Box
          display="flex"
          gap={buttonGap}
          justifyContent="flex-end"
          width="100%"
        >
          <Button variant="default" variantType="secondary" onClick={reset}>
            Reset
          </Button>
          <Button variant="default" variantType="primary" type="submit">
            Save changes
          </Button>
        </Box>
      </Form>
    );
  },
};
Playground.storyName = "Playground";

export const RequiredFieldsIndicatorStory: Story = () => (
  <RequiredFieldsIndicator>
    Indicates required information
  </RequiredFieldsIndicator>
);
RequiredFieldsIndicatorStory.storyName = "Required Fields Indicator";

export const CustomRequiredFieldsIndicatorStory: Story = () => (
  <Box display="flex" flexDirection="column" gap={5}>
    <Box>
      <Typography variant="small" as="div" tint="alt" mb={1}>
        At the start
      </Typography>
      <RequiredFieldsIndicator>
        Indicates required information
      </RequiredFieldsIndicator>
    </Box>
    <Box>
      <Typography variant="small" as="div" tint="alt" mb={1}>
        In the middle of a sentence
      </Typography>
      <Typography weight="medium" mb={0}>
        Fields marked <RequiredFieldsIndicator as="span" />
        are required
      </Typography>
    </Box>
    <Box>
      <Typography variant="small" as="div" tint="alt" mb={1}>
        In another language
      </Typography>
      <Typography weight="medium" mb={0}>
        Los campos marcados con <RequiredFieldsIndicator as="span" />
        son obligatorios
      </Typography>
    </Box>
    <Box>
      <Typography variant="small" as="div" tint="alt" mb={1}>
        At the end of a sentence
      </Typography>
      <Typography weight="medium" mb={0}>
        Required fields are marked with <RequiredFieldsIndicator as="span" />
      </Typography>
    </Box>
    <Box maxWidth="280px">
      <Typography variant="small" as="div" tint="alt" mb={1}>
        At the start, wrapping onto several lines
      </Typography>
      <RequiredFieldsIndicator>
        Indicates information we need before we can process your application and
        contact you about it
      </RequiredFieldsIndicator>
    </Box>
    <Box maxWidth="280px">
      <Typography variant="small" as="div" tint="alt" mb={1}>
        In the middle, wrapping onto several lines
      </Typography>
      <Typography weight="medium" mb={0}>
        Fields marked <RequiredFieldsIndicator as="span" />
        must be completed before we can process your application
      </Typography>
    </Box>
    <Box maxWidth="280px">
      <Typography variant="small" as="div" tint="alt" mb={1}>
        At the end, wrapping onto several lines
      </Typography>
      <Typography weight="medium" mb={0}>
        Information we need before we can process your application is marked
        with <RequiredFieldsIndicator as="span" />
      </Typography>
    </Box>
  </Box>
);
CustomRequiredFieldsIndicatorStory.storyName =
  "Custom Required Fields Indicator";

export const WithBothOptionalOrRequired: Story = (args: FormProps) => (
  <Form {...args}>
    <RequiredFieldsIndicator mb={blockSpacing}>
      Indicates required information
    </RequiredFieldsIndicator>
    <Fieldset legend="Your details" mb={blockSpacing}>
      <Textbox onChange={() => {}} value="" label="Textbox" required />
      <Select
        name="simple-required"
        id="simple-required"
        label="Simple Select"
        required
        value=""
        onChange={() => {}}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
      <MultiSelect
        name="multi-optional"
        id="multi-optional"
        label="Multi Select"
        value={[]}
        onChange={() => {}}
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
        value={[]}
        onChange={() => {}}
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
        />
        <RadioButton
          id="group-1-input-2"
          value="group-1-input-2"
          label="Radio Option 2"
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
        />
        <RadioButton
          id="group-2-input-2"
          value="group-2-input-2"
          label="Radio Option 2"
        />
      </RadioButtonGroup>
      <Checkbox
        name="checkbox"
        label="Checkbox"
        required
        checked={false}
        onChange={() => {}}
      />
    </Fieldset>
    <Box display="flex" gap={buttonGap} justifyContent="flex-end" width="100%">
      <Button variant="default" variantType="subtle">
        Cancel
      </Button>
      <Button variant="default" variantType="primary" type="submit">
        Save
      </Button>
    </Box>
  </Form>
);
WithBothOptionalOrRequired.storyName = "With Optional and Required Fields";
