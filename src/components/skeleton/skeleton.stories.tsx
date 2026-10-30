import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Skeleton from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Skeleton> = {
  title: "Skeleton",
  component: Skeleton,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  argTypes: {
    ...styledSystemProps,
    shape: {
      options: ["rectangle-moderate", "rectangle-curved", "circle"],
      control: { type: "radio" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {
  render: (args) => {
    return <Skeleton {...args} />;
  },
  args: {
    lines: [
      [
        { height: "40px", shape: "circle" },
        { height: "21px", shape: "rectangle-curved" },
      ],
      { preset: "paragraph", width: "100%" },
      { preset: "paragraph", width: "90%" },
      { preset: "paragraph", width: "80%" },
      { height: "32px", width: "200px", shape: "rectangle-curved" },
    ],
    disableAnimation: false,
  },
};
Playground.storyName = "Playground";

export const WithLines: Story = () => {
  return (
    <Skeleton
      lines={[
        { preset: "paragraph" },
        { preset: "paragraph" },
        { preset: "paragraph" },
        { preset: "paragraph" },
        { preset: "paragraph" },
        { preset: "paragraph" },
      ]}
    />
  );
};
WithLines.storyName = "With Lines";

export const DynamicWidths: Story = () => {
  return (
    <Skeleton
      lines={[
        { preset: "paragraph", width: "100%" },
        { preset: "paragraph", width: "95%" },
        { preset: "paragraph", width: "100%" },
        { preset: "paragraph", width: "80%" },
        { preset: "paragraph", width: "60%" },
      ]}
    />
  );
};
DynamicWidths.storyName = "Dynamic Widths";

export const PresetHeights: Story = () => {
  return (
    <>
      <Skeleton mb={3} lines={[{ preset: "h1" }]} />
      <Skeleton mb={3} lines={[{ preset: "h2" }]} />
      <Skeleton mb={3} lines={[{ preset: "h3" }]} />
      <Skeleton mb={3} lines={[{ preset: "h4" }]} />
      <Skeleton mb={3} lines={[{ preset: "paragraph" }]} />
      <Skeleton
        lines={[{ preset: "button", width: "120px" }]}
        shape="rectangle-curved"
      />
    </>
  );
};
PresetHeights.storyName = "Preset Heights";

export const Shapes: Story = () => {
  return (
    <>
      <Skeleton
        mb={3}
        shape="rectangle-moderate"
        lines={[{ height: "40px", width: "200px" }]}
      />
      <Skeleton
        mb={3}
        shape="rectangle-curved"
        lines={[{ height: "40px", width: "200px" }]}
      />
      <Skeleton shape="circle" lines={[{ height: "80px" }]} />
    </>
  );
};
Shapes.storyName = "Shapes";

export const CustomDimensions: Story = () => {
  return (
    <Skeleton
      shape="rectangle-moderate"
      lines={[{ height: "100px", width: "300px" }]}
    />
  );
};
CustomDimensions.storyName = "Custom Dimensions";

export const DisableAnimation: Story = () => {
  return (
    <Skeleton
      disableAnimation
      lines={[
        { preset: "paragraph" },
        { preset: "paragraph" },
        { preset: "paragraph" },
        { preset: "paragraph" },
      ]}
    />
  );
};
DisableAnimation.storyName = "Disable Animation";

export const TypicalUsage: Story = () => {
  return (
    <div style={{ width: "400px" }}>
      <Skeleton
        mb={4}
        lines={[
          { preset: "h2", width: "70%" },
          { preset: "h2", width: "50%" },
        ]}
      />
      <Skeleton
        lines={[
          { preset: "paragraph", width: "100%" },
          { preset: "paragraph", width: "95%" },
          { preset: "paragraph", width: "100%" },
          { preset: "paragraph", width: "60%" },
        ]}
      />
    </div>
  );
};
TypicalUsage.storyName = "Typical Usage";

export const DesignReference: Story = () => {
  return (
    <div style={{ width: "500px" }}>
      <Skeleton
        lines={[
          [
            { height: "40px", shape: "circle" },
            { height: "21px", shape: "rectangle-curved" },
          ],
          { preset: "paragraph", width: "100%" },
          { preset: "paragraph", width: "90%" },
          { preset: "paragraph", width: "80%" },
          { height: "32px", width: "200px", shape: "rectangle-curved" },
        ]}
      />
    </div>
  );
};
DesignReference.storyName = "Design Reference";

export const PrototypeComparison: Story = () => {
  const line = (width: string) => ({
    height: "16px",
    width,
    shape: "rectangle-curved" as const,
  });

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "462px",
        padding: "12px",
        boxSizing: "border-box",
        backgroundColor: "#f2f5f6",
      }}
    >
      <div
        style={{
          padding: "24px",
          border: "1px solid #ccd6db",
          borderRadius: "24px",
          backgroundColor: "#ffffff",
        }}
      >
        <Skeleton
          lines={[
            {
              height: "32px",
              width: "200px",
              shape: "rectangle-curved",
            },
          ]}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            marginTop: "32px",
            padding: "16px 0 40px",
            borderTop: "1px solid #ccd6db",
            borderBottom: "1px solid #ccd6db",
          }}
        >
          <Skeleton lines={[line("100px"), line("70px")]} />
          <Skeleton
            lines={[
              line("120px"),
              line("120px"),
              line("70px"),
              line("70px"),
              line("120px"),
            ]}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            padding: "16px 0 36px",
            borderBottom: "1px solid #ccd6db",
          }}
        >
          <Skeleton lines={[line("70px"), line("100px"), line("70px")]} />
          <Skeleton lines={[line("150px"), line("150px"), line("150px")]} />
        </div>

        <div style={{ paddingTop: "16px" }}>
          <Skeleton lines={[line("150px")]} />
        </div>
      </div>
    </div>
  );
};
PrototypeComparison.storyName = "Prototype Comparison";
