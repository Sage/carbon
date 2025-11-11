import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Button, { ButtonProps } from ".";
import Box from "../../box";
import Form from "../../form";
import Textbox from "../../textbox";
import { action } from "@storybook/addon-actions";
import Typography from "../../typography";

const meta: Meta<typeof Button> = {
  title: "Button/Test",
  component: Button,
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    children: "Button",
    disabled: false,
    fullWidth: false,
    iconPosition: "left",
    inverse: false,
    loading: false,
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
        {showSROnly ? "Hide" : "Show"} screen-reader-only content
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
      <Button aria-labelledby="labelledby-descriptor" iconType="home" />

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

            <h3>AI</h3>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button variant="ai" variantType="secondary" size="small">
                Primary Small
              </Button>
              <Button variant="ai" variantType="secondary" size="medium">
                Primary Medium
              </Button>
              <Button variant="ai" variantType="secondary" size="large">
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
              <Button
                variant="default"
                variantType="primary"
                size="small"
                iconType="alert"
              >
                Primary Small
              </Button>
              <Button
                variant="default"
                variantType="primary"
                size="medium"
                iconType="alert"
              >
                Primary Medium
              </Button>
              <Button
                variant="default"
                variantType="primary"
                size="large"
                iconType="alert"
              >
                Primary Large
              </Button>
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button
                variant="default"
                variantType="secondary"
                size="small"
                iconType="alert"
              >
                Secondary Small
              </Button>
              <Button
                variant="default"
                variantType="secondary"
                size="medium"
                iconType="alert"
              >
                Secondary Medium
              </Button>
              <Button
                variant="default"
                variantType="secondary"
                size="large"
                iconType="alert"
              >
                Secondary Large
              </Button>
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button
                variant="default"
                variantType="tertiary"
                size="small"
                iconType="alert"
              >
                Tertiary Small
              </Button>
              <Button
                variant="default"
                variantType="tertiary"
                size="medium"
                iconType="alert"
              >
                Tertiary Medium
              </Button>
              <Button
                variant="default"
                variantType="tertiary"
                size="large"
                iconType="alert"
              >
                Tertiary Large
              </Button>
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button
                variant="default"
                variantType="subtle"
                size="small"
                iconType="alert"
              >
                Subtle Small
              </Button>
              <Button
                variant="default"
                variantType="subtle"
                size="medium"
                iconType="alert"
              >
                Subtle Medium
              </Button>
              <Button
                variant="default"
                variantType="subtle"
                size="large"
                iconType="alert"
              >
                Subtle Large
              </Button>
            </Box>

            <h3>Destructive</h3>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button
                variant="destructive"
                variantType="primary"
                size="small"
                iconType="alert"
              >
                Primary Small
              </Button>
              <Button
                variant="destructive"
                variantType="primary"
                size="medium"
                iconType="alert"
              >
                Primary Medium
              </Button>
              <Button
                variant="destructive"
                variantType="primary"
                size="large"
                iconType="alert"
              >
                Primary Large
              </Button>
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button
                variant="destructive"
                variantType="secondary"
                size="small"
                iconType="alert"
              >
                Secondary Small
              </Button>
              <Button
                variant="destructive"
                variantType="secondary"
                size="medium"
                iconType="alert"
              >
                Secondary Medium
              </Button>
              <Button
                variant="destructive"
                variantType="secondary"
                size="large"
                iconType="alert"
              >
                Secondary Large
              </Button>
            </Box>

            <h3>AI</h3>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button
                variant="ai"
                variantType="secondary"
                size="small"
                iconType="alert"
              >
                Secondary Small
              </Button>
              <Button
                variant="ai"
                variantType="secondary"
                size="medium"
                iconType="alert"
              >
                Secondary Medium
              </Button>
              <Button
                variant="ai"
                variantType="secondary"
                size="large"
                iconType="alert"
              >
                Secondary Large
              </Button>
            </Box>

            <h3>XS Variant</h3>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button
                variant="default"
                variantType="secondary"
                size="xs"
                iconType="alert"
              >
                XS Secondary
              </Button>
              <Button
                variant="default"
                variantType="tertiary"
                size="xs"
                iconType="alert"
              >
                XS Tertiary
              </Button>
              <Button
                variant="default"
                variantType="subtle"
                size="xs"
                iconType="alert"
              >
                XS Subtle
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
              <Button
                variant="default"
                variantType="primary"
                size="small"
                iconType="alert"
              />
              <Button
                variant="default"
                variantType="primary"
                size="medium"
                iconType="alert"
              />
              <Button
                variant="default"
                variantType="primary"
                size="large"
                iconType="alert"
              />
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button
                variant="default"
                variantType="secondary"
                size="small"
                iconType="alert"
              />
              <Button
                variant="default"
                variantType="secondary"
                size="medium"
                iconType="alert"
              />
              <Button
                variant="default"
                variantType="secondary"
                size="large"
                iconType="alert"
              />
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button
                variant="default"
                variantType="tertiary"
                size="small"
                iconType="alert"
              />
              <Button
                variant="default"
                variantType="tertiary"
                size="medium"
                iconType="alert"
              />
              <Button
                variant="default"
                variantType="tertiary"
                size="large"
                iconType="alert"
              />
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button
                variant="default"
                variantType="subtle"
                size="small"
                iconType="alert"
              />
              <Button
                variant="default"
                variantType="subtle"
                size="medium"
                iconType="alert"
              />
              <Button
                variant="default"
                variantType="subtle"
                size="large"
                iconType="alert"
              />
            </Box>

            <h3>Destructive</h3>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button
                variant="destructive"
                variantType="primary"
                size="small"
                iconType="alert"
              />
              <Button
                variant="destructive"
                variantType="primary"
                size="medium"
                iconType="alert"
              />
              <Button
                variant="destructive"
                variantType="primary"
                size="large"
                iconType="alert"
              />
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button
                variant="destructive"
                variantType="secondary"
                size="small"
                iconType="alert"
              />
              <Button
                variant="destructive"
                variantType="secondary"
                size="medium"
                iconType="alert"
              />
              <Button
                variant="destructive"
                variantType="secondary"
                size="large"
                iconType="alert"
              />
            </Box>

            <h3>AI</h3>
            <Box display="flex" flexDirection="row" gap={1}>
              <Button
                variant="ai"
                variantType="secondary"
                size="small"
                iconType="alert"
              />
              <Button
                variant="ai"
                variantType="secondary"
                size="medium"
                iconType="alert"
              />
              <Button
                variant="ai"
                variantType="secondary"
                size="large"
                iconType="alert"
              />
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

export const AIHoverStyling: Story = () => {
  return <Button variant="ai">Button</Button>;
};
AIHoverStyling.storyName = "AI Hover Styling";

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
