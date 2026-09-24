import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import Box from "../../box";
import Button from "../../button/button.component";

import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";

import Loader, { LoaderProps } from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Loader> = {
  title: "Loader/Test",
  component: Loader,
  argTypes: {
    ...styledSystemProps,
    size: {
      control: { type: "select" },
      options: ["extra-small", "small", "medium", "large"],
    },
    variant: {
      control: { type: "select" },
      options: [
        "typical",
        "ai",
        "stacked",
        "inline",
        "ai-stacked",
        "ai-inline",
      ],
    },
    loaderLabel: {
      control: { type: "text" },
    },
    hasMotion: {
      control: { type: "boolean" },
    },
    isTracked: {
      control: { type: "boolean" },
    },
    animationTime: {
      control: { type: "number" },
    },
    inverse: {
      control: { type: "boolean" },
    },
    loaderType: {
      control: { type: "select" },
      options: ["standalone", "star", "ring"],
      defaultValue: "dots",
    },
  },
  args: {
    loaderType: "standalone",
  },
  parameters: {
    chromatic: { disableSnapshot: false },
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  render: (args: LoaderProps) => (
    <Box>
      <Loader {...args} />
    </Box>
  ),
};
Default.storyName = "Default";

export const Sizes: Story = {
  render: () => (
    <>
      <h2>Standalone Sizes</h2>
      <Box>
        <Loader loaderType="standalone" size="small" />
      </Box>
      <Box>
        <Loader loaderType="standalone" size="medium" />
      </Box>
      <Box>
        <Loader loaderType="standalone" size="large" />
      </Box>
      <h2>Ring Sizes</h2>
      <Box>
        <Loader loaderType="ring" size="extra-small" />
      </Box>
      <Box>
        <Loader loaderType="ring" size="small" />
      </Box>
      <Box>
        <Loader loaderType="ring" size="medium" />
      </Box>
      <Box>
        <Loader loaderType="ring" size="large" />
      </Box>
    </>
  ),
};
Sizes.storyName = "Sizes";

export const Variants: Story = {
  render: () => (
    <>
      <h2>Standalone Typical</h2>
      <Box>
        <Loader loaderType="standalone" variant="typical" />
      </Box>
      <h2>Standalone Typical Inversed</h2>
      <Box backgroundColor="#1c1c1c" p="8px">
        <Loader loaderType="standalone" variant="typical" inverse />
      </Box>
      <h2>Standalone AI</h2>
      <Box>
        <Loader loaderType="standalone" variant="ai" />
      </Box>
      <h2>Standalone AI Inversed</h2>
      <Box backgroundColor="#1c1c1c" p="8px">
        <Loader loaderType="standalone" variant="ai" inverse />
      </Box>
      <h2>Ring Stacked</h2>
      <Box>
        <Loader loaderType="ring" variant="stacked" />
      </Box>
      <h2>Ring Stacked Inversed</h2>
      <Box backgroundColor="#1c1c1c" p="8px">
        <Loader loaderType="ring" variant="stacked" inverse />
      </Box>
      <h2>Ring Inline</h2>
      <Box>
        <Loader loaderType="ring" variant="inline" />
      </Box>
      <h2>Ring Inline Inversed</h2>
      <Box backgroundColor="#1c1c1c" p="8px">
        <Loader loaderType="ring" variant="inline" inverse />
      </Box>
      <h2>Ring AI Stacked</h2>
      <Box>
        <Loader loaderType="ring" variant="ai-stacked" />
      </Box>
      <h2>Ring AI Inline</h2>
      <Box>
        <Loader loaderType="ring" variant="ai-inline" />
      </Box>
      <h2>Ring AI Stacked Inversed</h2>
      <Box backgroundColor="#1c1c1c" p="8px">
        <Loader loaderType="ring" variant="ai-stacked" inverse />
      </Box>
      <h2>Ring AI Inline Inversed</h2>
      <Box backgroundColor="#1c1c1c" p="8px">
        <Loader loaderType="ring" variant="ai-inline" inverse />
      </Box>
    </>
  ),
};
Variants.storyName = "Variants";

export const TrackedStates: Story = {
  render: () => (
    <>
      <h2>Is Tracked</h2>
      <Box>
        <Loader loaderType="ring" isTracked />
      </Box>
      <h2>Tracked Error State</h2>
      <Box>
        <Loader loaderType="ring" isTracked isError />
      </Box>
      <h2>Tracked Success State</h2>
      <Box>
        <Loader loaderType="ring" isTracked isSuccess />
      </Box>
    </>
  ),
};
TrackedStates.storyName = "Tracked States";

export const InsideButtons: Story = {
  render: () => (
    <>
      <Box height="50px">
        <Button m={2} buttonType="gradient-grey" onClick={() => {}}>
          <Loader
            loaderType="ring"
            variant="ai-inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="primary" onClick={() => {}}>
          <Loader
            inverse
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="secondary" onClick={() => {}}>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="tertiary" onClick={() => {}}>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="primary" destructive onClick={() => {}}>
          <Loader
            inverse
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="secondary" onClick={() => {}} destructive>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="tertiary" onClick={() => {}} destructive>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="gradient-grey" onClick={() => {}}>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="gradient-white" onClick={() => {}}>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
    </>
  ),
};
InsideButtons.storyName = "Inside Buttons";

// Documentation regression stories moved from the public docs.

export const DocumentationDefault: Story = {
  render: (args: LoaderProps) => (
    <Box>
      <Loader {...args} />
    </Box>
  ),
};
DocumentationDefault.storyName = "DocumentationDefault";

export const Standalone: Story = {
  render: () => (
    <Box>
      <Loader loaderType="standalone" />
    </Box>
  ),
};
Standalone.storyName = "Standalone";

export const Ring: Story = {
  render: () => (
    <Box>
      <Loader loaderType="ring" />
    </Box>
  ),
};
Ring.storyName = "Ring";

export const Star: Story = {
  render: () => (
    <Box>
      <Loader loaderType="star" />
    </Box>
  ),
};
Star.storyName = "Star";

export const StandaloneSizes: Story = {
  render: () => (
    <>
      <Box>
        <Loader loaderType="standalone" size="small" />
      </Box>
      <Box>
        <Loader loaderType="standalone" size="medium" />
      </Box>
      <Box>
        <Loader loaderType="standalone" size="large" />
      </Box>
    </>
  ),
};
StandaloneSizes.storyName = "Standalone Sizes";

export const RingSizes: Story = {
  render: () => (
    <>
      <Box>
        <Loader loaderType="ring" size="extra-small" />
      </Box>
      <Box>
        <Loader loaderType="ring" size="small" />
      </Box>
      <Box>
        <Loader loaderType="ring" size="medium" />
      </Box>
      <Box>
        <Loader loaderType="ring" size="large" />
      </Box>
    </>
  ),
};
RingSizes.storyName = "Ring Sizes";

export const StandaloneTypicalVariant: Story = {
  render: () => (
    <Box>
      <Loader loaderType="standalone" variant="typical" />
    </Box>
  ),
};
StandaloneTypicalVariant.storyName = "Standalone Typical Variant";

export const StandaloneTypicalVariantInversed: Story = {
  render: () => (
    <Box backgroundColor="#1c1c1c" p="8px">
      <Loader loaderType="standalone" variant="typical" inverse />
    </Box>
  ),
};
StandaloneTypicalVariantInversed.storyName =
  "Standalone Typical Variant Inversed";

export const StandaloneAiVariant: Story = {
  render: () => (
    <Box>
      <Loader loaderType="standalone" variant="ai" />
    </Box>
  ),
};
StandaloneAiVariant.storyName = "Standalone AI Variant";

export const StandaloneAiVariantInversed: Story = {
  render: () => (
    <Box backgroundColor="#1c1c1c" p="8px">
      <Loader loaderType="standalone" variant="ai" inverse />
    </Box>
  ),
};
StandaloneAiVariantInversed.storyName = "Standalone AI Variant Inversed";

export const RingStackedVariant: Story = {
  render: () => (
    <Box>
      <Loader loaderType="ring" variant="stacked" />
    </Box>
  ),
};
RingStackedVariant.storyName = "Ring Stacked Variant";

export const RingStackedVariantInversed: Story = {
  render: () => (
    <Box backgroundColor="#1c1c1c" p="8px">
      <Loader loaderType="ring" variant="stacked" inverse />
    </Box>
  ),
};
RingStackedVariantInversed.storyName = "Ring Stacked Variant Inversed";

export const RingInlineVariant: Story = {
  render: () => (
    <Box>
      <Loader loaderType="ring" variant="inline" />
    </Box>
  ),
};
RingInlineVariant.storyName = "Ring Inline Variant";

export const RingInlineVariantInversed: Story = {
  render: () => (
    <Box backgroundColor="#1c1c1c" p="8px">
      <Loader loaderType="ring" variant="inline" inverse />
    </Box>
  ),
};
RingInlineVariantInversed.storyName = "Ring Inline Variant Inversed";

export const RingAiStackedVariant: Story = {
  render: () => (
    <Box>
      <Loader loaderType="ring" variant="ai-stacked" />
    </Box>
  ),
};
RingAiStackedVariant.storyName = "Ring AI Stacked Variant";

export const RingAiInlineVariant: Story = {
  render: () => (
    <Box>
      <Loader loaderType="ring" variant="ai-inline" />
    </Box>
  ),
};
RingAiInlineVariant.storyName = "Ring AI Inline Variant";

export const RingAiInlineVariantInversed: Story = {
  render: () => (
    <Box backgroundColor="#1c1c1c" p="8px">
      <Loader loaderType="ring" variant="ai-inline" inverse />
    </Box>
  ),
};
RingAiInlineVariantInversed.storyName = "Ring AI Inline Variant Inversed";

export const RingIsTracked: Story = {
  render: () => (
    <Box>
      <Loader loaderType="ring" isTracked />
    </Box>
  ),
};
RingIsTracked.storyName = "Is Tracked";

export const ErrorState: Story = {
  render: () => (
    <Box>
      <Loader loaderType="ring" isTracked isError />
    </Box>
  ),
};
ErrorState.storyName = "Tracked Error State";

export const SuccessState: Story = {
  render: () => (
    <Box>
      <Loader loaderType="ring" isTracked isSuccess />
    </Box>
  ),
};
SuccessState.storyName = "Tracked Success State";

export const AnimationTime: Story = {
  render: () => (
    <Box>
      <Loader loaderType="ring" animationTime={3} mb={4} />
      <Loader loaderType="ring" animationTime={3} isTracked mb={4} />
      <Loader animationTime={3} />
    </Box>
  ),
};
AnimationTime.storyName = "Animation Time";

export const DisabledMotion: Story = {
  render: () => (
    <Box>
      <Loader loaderType="ring" animationTime={3} mb={4} hasMotion={false} />
      <Loader
        loaderType="ring"
        animationTime={3}
        isTracked
        mb={4}
        hasMotion={false}
      />
      <Loader animationTime={3} hasMotion={false} />
    </Box>
  ),
};
DisabledMotion.storyName = "Disabled Motion";
