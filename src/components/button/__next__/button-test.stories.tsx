import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Button, { ButtonProps } from ".";
import Box from "../../box";
import Form from "../../form";
import Textbox from "../../textbox";
import { action } from "@storybook/addon-actions";
import Typography from "../../typography";
import Icon from "../../icon";
import DefaultDecorator from "../../../../.storybook/utils/default-decorator";

const meta: Meta<typeof Button> = {
  title: "Button/Test",
  component: Button,
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    children: "Button",
    disabled: false,
    fullWidth: false,
    inverse: false,
    noWrap: true,
    size: "medium",
    type: "button",
    variant: "default",
    variantType: "primary",
  },
  decorators: (StoryToRender) => (
    <Box minHeight="80px" p={2}>
      <StoryToRender />
    </Box>
  ),
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = ({ ...args }: ButtonProps) => {
  return <Button {...args}>Button</Button>;
};
Playground.storyName = "Playground";

export const AsASubmitButton: Story = () => {
  const [textboxValue, setTextboxValue] = useState("");
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
    };

    alert(`Form submitted with textbox value: ${target.username.value}`);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      saveButton={<Button type="submit">Submit</Button>}
    >
      <Textbox
        name="username"
        onChange={(e) => setTextboxValue(e.target.value)}
        value={textboxValue}
        label="Username"
      />
    </Form>
  );
};
AsASubmitButton.storyName = "As A Submit Button";

export const BlurHandler: Story = () => {
  return <Button onBlur={action("Blur event fired")}>Button</Button>;
};
BlurHandler.storyName = "Blur Handler";

export const FocusHandler: Story = () => {
  return <Button onFocus={action("Focus event fired")}>Button</Button>;
};
FocusHandler.storyName = "Focus Handler";

export const ARIA: Story = () => {
  const [showSROnly, setShowSROnly] = useState(false);
  return (
    <main>
      <h1>Supported ARIA attributes</h1>
      <Button onClick={() => setShowSROnly((prev) => !prev)}>
        {`${showSROnly ? "Hide" : "Show"} screen-reader-only content`}
      </Button>
      <h2>aria-label</h2>
      <p>
        Will read out the value of `aria-label` in place of the actual child
        content
      </p>
      <Typography
        screenReaderOnly={!showSROnly}
        id="label-descriptor"
        backgroundColor="#ddd"
        padding={showSROnly ? 1 : 0}
      >
        Close (not read directly from this container, added via attribute. Just
        shown for complete-ness.)
      </Typography>
      <Button aria-label="Close">X</Button>

      <h2>aria-labelledby</h2>
      <p>
        Will read out the content of the element with the ID defined in
        `aria-labelledby` in place of the actual child content
      </p>
      <Typography
        screenReaderOnly={!showSROnly}
        id="labelledby-descriptor"
        backgroundColor="#ddd"
        padding={showSROnly ? 1 : 0}
      >
        Return to the home page
      </Typography>
      <Button aria-labelledby="labelledby-descriptor">
        <Icon type="home" />
      </Button>

      <h2>aria-describedby</h2>
      <p>
        Will read out the content of the element with the ID defined in
        `aria-describedby` alongside the actual child content
      </p>
      <Typography
        screenReaderOnly={!showSROnly}
        id="describedby-descriptor"
        backgroundColor="#ddd"
        padding={showSROnly ? 1 : 0}
      >
        Select the font faces and sizes to be used on this page
      </Typography>
      <Button aria-describedby="describedby-descriptor">Fonts</Button>
    </main>
  );
};
ARIA.storyName = "ARIA attributes";

export const AllSizesVariantsTypes: Story = () => {
  return (
    <main>
      <Box display="flex" flexDirection="row" gap={3}>
        <Box display="flex" flexDirection="column">
          <h2>Text</h2>
          <br />
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            p={1}
            backgroundColor="#DDDDDD"
          >
            <h3>Typical/Default</h3>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button variant="default" variantType="primary" size="small">
                Primary Small
              </Button>
              <Button variant="default" variantType="primary" size="medium">
                Primary Medium
              </Button>
              <Button variant="default" variantType="primary" size="large">
                Primary Large
              </Button>
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button variant="default" variantType="secondary" size="small">
                Secondary Small
              </Button>
              <Button variant="default" variantType="secondary" size="medium">
                Secondary Medium
              </Button>
              <Button variant="default" variantType="secondary" size="large">
                Secondary Large
              </Button>
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button variant="default" variantType="tertiary" size="small">
                Tertiary Small
              </Button>
              <Button variant="default" variantType="tertiary" size="medium">
                Tertiary Medium
              </Button>
              <Button variant="default" variantType="tertiary" size="large">
                Tertiary Large
              </Button>
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button variant="default" variantType="subtle" size="small">
                Subtle Small
              </Button>
              <Button variant="default" variantType="subtle" size="medium">
                Subtle Medium
              </Button>
              <Button variant="default" variantType="subtle" size="large">
                Subtle Large
              </Button>
            </Box>

            <h3>Destructive</h3>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button variant="destructive" variantType="primary" size="small">
                Primary Small
              </Button>
              <Button variant="destructive" variantType="primary" size="medium">
                Primary Medium
              </Button>
              <Button variant="destructive" variantType="primary" size="large">
                Primary Large
              </Button>
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button
                variant="destructive"
                variantType="secondary"
                size="small"
              >
                Secondary Small
              </Button>
              <Button
                variant="destructive"
                variantType="secondary"
                size="medium"
              >
                Secondary Medium
              </Button>
              <Button
                variant="destructive"
                variantType="secondary"
                size="large"
              >
                Secondary Large
              </Button>
            </Box>

            <h3>Gradient</h3>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button variant="gradient" variantType="secondary" size="small">
                Primary Small
              </Button>
              <Button variant="gradient" variantType="secondary" size="medium">
                Primary Medium
              </Button>
              <Button variant="gradient" variantType="secondary" size="large">
                Primary Large
              </Button>
            </Box>

            <h3>XS Variant</h3>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button variant="default" variantType="secondary" size="xs">
                XS Secondary
              </Button>
              <Button variant="default" variantType="tertiary" size="xs">
                XS Tertiary
              </Button>
              <Button variant="default" variantType="subtle" size="xs">
                XS Subtle
              </Button>
            </Box>

            <h3>Inverse</h3>
            <Box
              display="flex"
              flexDirection="row"
              gap={1}
              backgroundColor="#333333"
              p={1}
            >
              <Button
                variant="default"
                variantType="primary"
                size="small"
                inverse
              >
                Primary Small
              </Button>
              <Button
                variant="default"
                variantType="primary"
                size="medium"
                inverse
              >
                Primary Medium
              </Button>
              <Button
                variant="default"
                variantType="primary"
                size="large"
                inverse
              >
                Primary Large
              </Button>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              gap={1}
              backgroundColor="#333333"
              p={1}
            >
              <Button
                variant="default"
                variantType="secondary"
                size="small"
                inverse
              >
                Secondary Small
              </Button>
              <Button
                variant="default"
                variantType="secondary"
                size="medium"
                inverse
              >
                Secondary Medium
              </Button>
              <Button
                variant="default"
                variantType="secondary"
                size="large"
                inverse
              >
                Secondary Large
              </Button>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              gap={1}
              backgroundColor="#333333"
              p={1}
            >
              <Button
                variant="default"
                variantType="tertiary"
                size="small"
                inverse
              >
                Tertiary Small
              </Button>
              <Button
                variant="default"
                variantType="tertiary"
                size="medium"
                inverse
              >
                Tertiary Medium
              </Button>
              <Button
                variant="default"
                variantType="tertiary"
                size="large"
                inverse
              >
                Tertiary Large
              </Button>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              gap={1}
              backgroundColor="#333333"
              p={1}
            >
              <Button
                variant="default"
                variantType="subtle"
                size="small"
                inverse
              >
                Subtle Small
              </Button>
              <Button
                variant="default"
                variantType="subtle"
                size="medium"
                inverse
              >
                Subtle Medium
              </Button>
              <Button
                variant="default"
                variantType="subtle"
                size="large"
                inverse
              >
                Subtle Large
              </Button>
            </Box>
          </Box>
        </Box>

        <Box display="flex" flexDirection="column">
          <h2>Text & Icon</h2>
          <br />
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            p={1}
            backgroundColor="#DDDDDD"
          >
            <h3>Typical/Default</h3>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button variant="default" variantType="primary" size="small">
                <>
                  <Icon type="alert" />
                  Primary Small
                </>
              </Button>
              <Button variant="default" variantType="primary" size="medium">
                <>
                  <Icon type="alert" />
                  Primary Medium
                </>
              </Button>
              <Button variant="default" variantType="primary" size="large">
                <>
                  <Icon type="alert" />
                  Primary Large
                </>
              </Button>
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button variant="default" variantType="secondary" size="small">
                <>
                  <Icon type="alert" />
                  Secondary Small
                </>
              </Button>
              <Button variant="default" variantType="secondary" size="medium">
                <>
                  <Icon type="alert" />
                  Secondary Medium
                </>
              </Button>
              <Button variant="default" variantType="secondary" size="large">
                <>
                  <Icon type="alert" />
                  Secondary Large
                </>
              </Button>
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button variant="default" variantType="tertiary" size="small">
                <>
                  <Icon type="alert" />
                  Tertiary Small
                </>
              </Button>
              <Button variant="default" variantType="tertiary" size="medium">
                <>
                  <Icon type="alert" />
                  Tertiary Medium
                </>
              </Button>
              <Button variant="default" variantType="tertiary" size="large">
                <>
                  <Icon type="alert" />
                  Tertiary Large
                </>
              </Button>
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button variant="default" variantType="subtle" size="small">
                <>
                  <Icon type="alert" />
                  Subtle Small
                </>
              </Button>
              <Button variant="default" variantType="subtle" size="medium">
                <>
                  <Icon type="alert" />
                  Subtle Medium
                </>
              </Button>
              <Button variant="default" variantType="subtle" size="large">
                <>
                  <Icon type="alert" />
                  Subtle Large
                </>
              </Button>
            </Box>

            <h3>Destructive</h3>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button variant="destructive" variantType="primary" size="small">
                <>
                  <Icon type="alert" />
                  Primary Small
                </>
              </Button>
              <Button variant="destructive" variantType="primary" size="medium">
                <>
                  <Icon type="alert" />
                  Primary Medium
                </>
              </Button>
              <Button variant="destructive" variantType="primary" size="large">
                <>
                  <Icon type="alert" />
                  Primary Large
                </>
              </Button>
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button
                variant="destructive"
                variantType="secondary"
                size="small"
              >
                <>
                  <Icon type="alert" />
                  Secondary Small
                </>
              </Button>
              <Button
                variant="destructive"
                variantType="secondary"
                size="medium"
              >
                <>
                  <Icon type="alert" />
                  Secondary Medium
                </>
              </Button>
              <Button
                variant="destructive"
                variantType="secondary"
                size="large"
              >
                <>
                  <Icon type="alert" />
                  Secondary Large
                </>
              </Button>
            </Box>

            <h3>Gradient</h3>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button variant="gradient" variantType="secondary" size="small">
                <>
                  <Icon type="alert" />
                  Secondary Small
                </>
              </Button>
              <Button variant="gradient" variantType="secondary" size="medium">
                <>
                  <Icon type="alert" />
                  Secondary Medium
                </>
              </Button>
              <Button variant="gradient" variantType="secondary" size="large">
                <>
                  <Icon type="alert" />
                  Secondary Large
                </>
              </Button>
            </Box>

            <h3>XS Variant</h3>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button variant="default" variantType="secondary" size="xs">
                <>
                  <Icon type="alert" />
                  XS Secondary
                </>
              </Button>
              <Button variant="default" variantType="tertiary" size="xs">
                <>
                  <Icon type="alert" />
                  XS Tertiary
                </>
              </Button>
              <Button variant="default" variantType="subtle" size="xs">
                <>
                  <Icon type="alert" />
                  XS Subtle
                </>
              </Button>
            </Box>
          </Box>
        </Box>

        <Box display="flex" flexDirection="column">
          <h2>Icon-Only</h2>
          <br />
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            p={1}
            backgroundColor="#DDDDDD"
          >
            <h3>Typical/Default</h3>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button variant="default" variantType="primary" size="small">
                <Icon type="alert" />
              </Button>
              <Button variant="default" variantType="primary" size="medium">
                <Icon type="alert" />
              </Button>
              <Button variant="default" variantType="primary" size="large">
                <Icon type="alert" />
              </Button>
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button variant="default" variantType="secondary" size="small">
                <Icon type="alert" />
              </Button>
              <Button variant="default" variantType="secondary" size="medium">
                <Icon type="alert" />
              </Button>
              <Button variant="default" variantType="secondary" size="large">
                <Icon type="alert" />
              </Button>
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button variant="default" variantType="tertiary" size="small">
                <Icon type="alert" />
              </Button>
              <Button variant="default" variantType="tertiary" size="medium">
                <Icon type="alert" />
              </Button>
              <Button variant="default" variantType="tertiary" size="large">
                <Icon type="alert" />
              </Button>
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button variant="default" variantType="subtle" size="small">
                <Icon type="alert" />
              </Button>
              <Button variant="default" variantType="subtle" size="medium">
                <Icon type="alert" />
              </Button>
              <Button variant="default" variantType="subtle" size="large">
                <Icon type="alert" />
              </Button>
            </Box>

            <h3>Destructive</h3>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button variant="destructive" variantType="primary" size="small">
                <Icon type="alert" />
              </Button>
              <Button variant="destructive" variantType="primary" size="medium">
                <Icon type="alert" />
              </Button>
              <Button variant="destructive" variantType="primary" size="large">
                <Icon type="alert" />
              </Button>
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button
                variant="destructive"
                variantType="secondary"
                size="small"
              >
                <Icon type="alert" />
              </Button>
              <Button
                variant="destructive"
                variantType="secondary"
                size="medium"
              >
                <Icon type="alert" />
              </Button>
              <Button
                variant="destructive"
                variantType="secondary"
                size="large"
              >
                <Icon type="alert" />
              </Button>
            </Box>

            <h3>Gradient</h3>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button variant="gradient" variantType="secondary" size="small">
                <Icon type="alert" />
              </Button>
              <Button variant="gradient" variantType="secondary" size="medium">
                <Icon type="alert" />
              </Button>
              <Button variant="gradient" variantType="secondary" size="large">
                <Icon type="alert" />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </main>
  );
};
AllSizesVariantsTypes.storyName = "All Size, Variants and Types";
AllSizesVariantsTypes.parameters = {
  chromatic: { disableSnapshot: false },
};

export const InverseVariants: Story = () => {
  return (
    <Box
      backgroundColor="#333"
      p={2}
      display={"flex"}
      flexDirection={"column"}
      gap={2}
    >
      <Button variant="default" variantType="primary" inverse>
        Button
      </Button>
      <Button variant="default" variantType="secondary" inverse>
        Button
      </Button>
      <Button variant="default" variantType="tertiary" inverse>
        Button
      </Button>
      <Button variant="default" variantType="subtle" inverse>
        Button
      </Button>
    </Box>
  );
};
InverseVariants.storyName = "Inverse Variants";
InverseVariants.parameters = {
  chromatic: { disableSnapshot: false },
};

const FocusAndHoverStateButtons = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Box display="flex" gap={2}>
      <Button data-role="primary" variantType="primary">
        Primary
      </Button>
      <Button data-role="secondary" variantType="secondary">
        Secondary
      </Button>
      <Button data-role="tertiary" variantType="tertiary">
        Tertiary
      </Button>
      <Button data-role="subtle" variantType="subtle">
        Subtle
      </Button>
    </Box>
    <Box display="flex" gap={2}>
      <Button
        data-role="primary-destructive"
        variantType="primary"
        variant="destructive"
      >
        Primary Destructive
      </Button>
      <Button
        data-role="secondary-destructive"
        variantType="secondary"
        variant="destructive"
      >
        Secondary Destructive
      </Button>
      <Button data-role="gradient-secondary" variant="gradient">
        Gradient Secondary
      </Button>
    </Box>
    <Box display="flex" gap={2}>
      <Button data-role="secondary-xs" variantType="secondary" size="xs">
        Secondary
      </Button>
      <Button data-role="tertiary-xs" variantType="tertiary" size="xs">
        Tertiary
      </Button>
      <Button data-role="subtle-xs" variantType="subtle" size="xs">
        Subtle
      </Button>
    </Box>
  </Box>
);

export const FocusStates: Story = {
  render: () => <FocusAndHoverStateButtons />,
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
FocusStates.storyName = "Focus States";
FocusStates.parameters = {
  pseudo: {
    focus:
      "[data-role='primary'], [data-role='secondary'], [data-role='tertiary'], [data-role='subtle'], [data-role='primary-destructive'], [data-role='secondary-destructive'], [data-role='gradient-secondary'], [data-role='secondary-xs'], [data-role='tertiary-xs'], [data-role='subtle-xs']",
  },
};

export const HoverStates: Story = {
  render: () => <FocusAndHoverStateButtons />,
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
HoverStates.storyName = "Hover States";
HoverStates.parameters = {
  pseudo: {
    hover:
      "[data-role='primary'], [data-role='secondary'], [data-role='tertiary'], [data-role='subtle'], [data-role='primary-destructive'], [data-role='secondary-destructive'], [data-role='gradient-secondary'], [data-role='secondary-xs'], [data-role='tertiary-xs'], [data-role='subtle-xs']",
  },
};
