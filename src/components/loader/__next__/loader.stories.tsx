import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Box from "../../box";

import Loader, { LoaderProps } from ".";

import Button from "../../button/button.component";

const meta: Meta<typeof Loader> = {
  title: "Loader",
  component: Loader,
  parameters: { chromatic: { disabledSnapshot: false } },
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

export const HasMotion: Story = {
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
HasMotion.storyName = "Has Motion";

export const InsideButtons: Story = {
  render: () => (
    <>
      <Box height="50px">
        <Button m={2} buttonType="primary" onClick={() => {}}>
          <Loader
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
