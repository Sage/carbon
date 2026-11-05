import React, { useEffect } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";

import Box from "../../box";

import Loader, { LoaderProps } from ".";

import Button from "../../button/button.component";

const darkGreyBackground: React.CSSProperties = {
  padding: "var(--global-space-layout-3-xs)",
  backgroundColor: "rgb(28, 28, 28)",
};

const meta: Meta<typeof Loader> = {
  title: "Loader",
  component: Loader,
  parameters: { chromatic: { disableSnapshot: true } },
  argTypes: {
    loaderType: {
      options: ["standalone", "ring", "star"],
      control: { type: "radio" },
    },
    variant: {
      options: [
        "typical",
        "ai",
        "stacked",
        "inline",
        "ai-stacked",
        "ai-inline",
      ],
      control: { type: "select" },
    },
    size: {
      options: ["extra-small", "small", "medium", "large"],
      control: { type: "radio" },
    },
    inverse: {
      control: "boolean",
    },
    showLabel: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loader>;

const variantsByLoaderType: Record<
  NonNullable<LoaderProps["loaderType"]>,
  LoaderProps["variant"][]
> = {
  standalone: ["typical", "ai"],
  ring: ["stacked", "inline", "ai-stacked", "ai-inline"],
  star: [],
} as const;

const LoaderPlayground = (args: LoaderProps) => {
  const [, updateArgs] = useArgs<LoaderProps>();
  const variants = variantsByLoaderType[args.loaderType ?? "standalone"];

  useEffect(() => {
    if (variants.includes(args.variant)) {
      return;
    }

    updateArgs({ variant: variants[0] });
  }, [args.variant, updateArgs, variants]);

  return (
    <Loader
      {...args}
      variant={variants.includes(args.variant) ? args.variant : variants[0]}
    />
  );
};

export const Playground: Story = {
  render: (args: LoaderProps) => (
    <Box>
      <LoaderPlayground {...args} />
    </Box>
  ),
  args: {
    loaderType: "standalone",
    variant: "typical",
    size: "medium",
    inverse: false,
    showLabel: true,
    loaderLabel: "Loading",
    hasMotion: true,
    isTracked: false,
    animationTime: 3,
    isSuccess: false,
    isError: false,
  },
  decorators: [
    (Story, { args }) => (
      <Box
        p={2}
        backgroundColor={
          args.inverse
            ? "var(--mode-color-generic-bg-inverse-nought)"
            : "var(--mode-color-generic-bg-nought)"
        }
      >
        <Story />
      </Box>
    ),
  ],
};

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
    <div style={darkGreyBackground}>
      <Loader loaderType="standalone" variant="typical" inverse />
    </div>
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
    <div style={darkGreyBackground}>
      <Loader loaderType="standalone" variant="ai" inverse />
    </div>
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
    <div style={darkGreyBackground}>
      <Loader loaderType="ring" variant="stacked" inverse />
    </div>
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
    <div style={darkGreyBackground}>
      <Loader loaderType="ring" variant="inline" inverse />
    </div>
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
    <div style={darkGreyBackground}>
      <Loader loaderType="ring" variant="ai-inline" inverse />
    </div>
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
Playground.storyName = "Playground";

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
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
            inverse
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
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
            inverse
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
