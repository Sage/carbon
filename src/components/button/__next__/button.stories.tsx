import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Button, { ButtonProps } from ".";

const meta: Meta<typeof Button> = {
  title: "Button",
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
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = (args: ButtonProps) => {
  return <Button {...args} />;
};
Default.storyName = "Default";

export const AllVariations: Story = (args: ButtonProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "24px",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
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
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h1>Destructive</h1>
        <h2>Primary</h2>
        <>
          <Button {...args} variant="destructive" variantType="primary" />
        </>
        <h2>Secondary</h2>
        <>
          <Button {...args} variant="destructive" variantType="secondary" />
        </>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h1>AI</h1>
        <h2>Primary</h2>
        <>
          <Button {...args} variant="ai" variantType="primary" />
        </>
      </div>
    </div>
  );
};
AllVariations.storyName = "All Variations";
