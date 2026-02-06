import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Button, { ButtonProps } from "./button.component";
import Box from "../../box";
import Icon from "../../icon";
import Loader from "../../loader/__next__/loader.component";

const meta: Meta<typeof Button> = {
  title: "Button",
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

export const Default: Story = () => {
  return <Button>Button</Button>;
};
Default.storyName = "Default";

export const ButtonContent: Story = () => {
  return (
    <Box display={"flex"} gap={2}>
      <Button aria-label="Return to the home page">
        <Icon type="home" />
      </Button>
      <Button>
        <>
          <Icon type="home" />
          Return to the home page
        </>
      </Button>
      <Button>
        <>
          Return to the home page
          <Icon type="home" />
        </>
      </Button>
    </Box>
  );
};
ButtonContent.storyName = "Button Content";

export const ClickHandler: Story = () => {
  const [value, setValue] = useState(0);
  return (
    <Button onClick={() => setValue((p) => p + 1)}>
      Button Clicked {value} Times
    </Button>
  );
};
ClickHandler.storyName = "Click Handler";

export const Variations: Story = (args: ButtonProps) => {
  return (
    <Box display="flex" flexDirection="row" gap="24px" alignItems="flex-start">
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <h1>Default</h1>
        <h2>Primary</h2>
        <>
          <Button {...args} variant="default" variantType="primary" />
        </>
        <h2>Secondary</h2>
        <>
          <Button {...args} variant="default" variantType="secondary" />
        </>
        <h2>Tertiary</h2>
        <>
          <Button {...args} variant="default" variantType="tertiary" />
        </>
        <h2>Subtle</h2>
        <>
          <Button {...args} variant="default" variantType="subtle" />
        </>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <h1>Destructive</h1>
        <h2>Primary</h2>
        <>
          <Button {...args} variant="destructive" variantType="primary" />
        </>
        <h2>Secondary</h2>
        <>
          <Button {...args} variant="destructive" variantType="secondary" />
        </>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <h1>Gradient</h1>
        <h2>Secondary</h2>
        <>
          <Button {...args} variant="gradient" variantType="secondary" />
        </>
      </Box>
    </Box>
  );
};
Variations.storyName = "Variations";

export const Sizes: Story = () => {
  return (
    <Box display="flex" gap={3} flexDirection="row" alignItems={"flex-start"}>
      <Button size="xs">XS</Button>
      <Button size="small">Small</Button>
      <Button>Medium</Button>
      <Button size="large">Large</Button>
    </Box>
  );
};
Sizes.storyName = "Sizes";

export const Disabled: Story = () => {
  return <Button disabled>Button</Button>;
};
Disabled.storyName = "Disabled";

export const FullWidth: Story = () => {
  return (
    <Box width="500px" display={"flex"} flexDirection={"column"} gap={1}>
      <Button fullWidth>Full-Width Button</Button>
      <br />
      <br />
      <Button>Normal Button</Button>
    </Box>
  );
};
FullWidth.storyName = "Full-Width";

export const Inverse: Story = () => {
  return (
    <Box
      backgroundColor="#333"
      p={2}
      display="flex"
      flexDirection="row"
      gap={1}
    >
      <Button variant="default" variantType="primary" size="medium" inverse>
        Primary Medium
      </Button>
      <Button variant="default" variantType="secondary" size="medium" inverse>
        Secondary Medium
      </Button>
      <Button variant="default" variantType="tertiary" size="medium" inverse>
        Tertiary Medium
      </Button>
      <Button variant="default" variantType="subtle" size="medium" inverse>
        Subtle Medium
      </Button>
    </Box>
  );
};
Inverse.storyName = "Inverse";

export const Loading: Story = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      <Button>
        <Loader variant="inline" loaderType="ring" size="extra-small" />
      </Button>
      <Button>
        <Loader
          variant="inline"
          loaderType="ring"
          loaderLabel="Chargement..."
          size="extra-small"
        />
      </Button>
    </Box>
  );
};
Loading.storyName = "Loading";

export const WrappingText: Story = () => {
  return (
    <Box width="80px" display={"flex"} gap={2}>
      <Button noWrap>No Wrapping</Button>
      <Button noWrap={false}>With Wrapping</Button>
    </Box>
  );
};
WrappingText.storyName = "Wrapping Text";

export const HTMLButtonType: Story = () => {
  return (
    <Box width="80px" display={"flex"} gap={2}>
      <Button type="button">Button</Button>
      <Button type="reset">Reset</Button>
      <Button type="submit">Submit</Button>
    </Box>
  );
};
HTMLButtonType.storyName = "HTML Button Types";
