import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Box from "../box";

import UnifiedLoader, { LoaderProps } from ".";

import Button from "../button/button.component";

const meta: Meta<typeof UnifiedLoader> = {
  title: "UnifiedLoader",
  component: UnifiedLoader,
  parameters: { chromatic: { disableSnapshot: true } },
};

export default meta;
type Story = StoryObj<typeof UnifiedLoader>;

export const Default: Story = {
  render: (args: LoaderProps) => (
    <Box>
      <UnifiedLoader {...args} />
    </Box>
  ),
};
Default.storyName = "Default";

export const Standalone: Story = {
  render: () => (
    <Box>
      <UnifiedLoader loaderType="standalone" />
    </Box>
  ),
};
Standalone.storyName = "Standalone";

export const Ring: Story = {
  render: () => (
    <Box>
      <UnifiedLoader loaderType="ring" />
    </Box>
  ),
};
Ring.storyName = "Ring";

export const Star: Story = {
  render: () => (
    <Box>
      <UnifiedLoader loaderType="star" />
    </Box>
  ),
};
Star.storyName = "Star";

export const StandaloneSizes: Story = {
  render: () => (
    <>
      <Box>
        <UnifiedLoader loaderType="standalone" size="small" />
      </Box>
      <Box>
        <UnifiedLoader loaderType="standalone" size="medium" />
      </Box>
      <Box>
        <UnifiedLoader loaderType="standalone" size="large" />
      </Box>
    </>
  ),
};
StandaloneSizes.storyName = "Standalone Sizes";

export const RingSizes: Story = {
  render: () => (
    <>
      <Box>
        <UnifiedLoader loaderType="ring" size="extra-small" />
      </Box>
      <Box>
        <UnifiedLoader loaderType="ring" size="small" />
      </Box>
      <Box>
        <UnifiedLoader loaderType="ring" size="medium" />
      </Box>
      <Box>
        <UnifiedLoader loaderType="ring" size="large" />
      </Box>
    </>
  ),
};
RingSizes.storyName = "Ring Sizes";

export const StandaloneTypicalVariant: Story = {
  render: () => (
    <Box>
      <UnifiedLoader loaderType="standalone" variant="typical" />
    </Box>
  ),
};
StandaloneTypicalVariant.storyName = "Standalone Typical Variant";

export const StandaloneTypicalVariantInversed: Story = {
  render: () => (
    <Box backgroundColor="#1c1c1c" p="8px">
      <UnifiedLoader loaderType="standalone" variant="typical" inverse />
    </Box>
  ),
};
StandaloneTypicalVariantInversed.storyName =
  "Standalone Typical Variant Inversed";

export const StandaloneAiVariant: Story = {
  render: () => (
    <Box>
      <UnifiedLoader loaderType="standalone" variant="ai" />
    </Box>
  ),
};
StandaloneAiVariant.storyName = "Standalone AI Variant";

export const StandaloneAiVariantInversed: Story = {
  render: () => (
    <Box backgroundColor="#1c1c1c" p="8px">
      <UnifiedLoader loaderType="standalone" variant="ai" inverse />
    </Box>
  ),
};
StandaloneAiVariantInversed.storyName = "Standalone AI Variant Inversed";

export const RingStackedVariant: Story = {
  render: () => (
    <Box>
      <UnifiedLoader loaderType="ring" variant="stacked" />
    </Box>
  ),
};
RingStackedVariant.storyName = "Ring Stacked Variant";

export const RingStackedVariantInversed: Story = {
  render: () => (
    <Box backgroundColor="#1c1c1c" p="8px">
      <UnifiedLoader loaderType="ring" variant="stacked" inverse />
    </Box>
  ),
};
RingStackedVariantInversed.storyName = "Ring Stacked Variant Inversed";

export const RingInlineVariant: Story = {
  render: () => (
    <Box>
      <UnifiedLoader loaderType="ring" variant="inline" />
    </Box>
  ),
};
RingInlineVariant.storyName = "Ring Inline Variant";

export const RingInlineVariantInversed: Story = {
  render: () => (
    <Box backgroundColor="#1c1c1c" p="8px">
      <UnifiedLoader loaderType="ring" variant="inline" inverse />
    </Box>
  ),
};
RingInlineVariantInversed.storyName = "Ring Inline Variant Inversed";

export const RingIsTracked: Story = {
  render: () => (
    <Box>
      <UnifiedLoader loaderType="ring" isTracked />
    </Box>
  ),
};
RingIsTracked.storyName = "Is Tracked";

export const ErrorState: Story = {
  render: () => (
    <Box>
      <UnifiedLoader loaderType="ring" isTracked isError />
    </Box>
  ),
};
ErrorState.storyName = "Tracked Error State";

export const SuccessState: Story = {
  render: () => (
    <Box>
      <UnifiedLoader loaderType="ring" isTracked isSuccess />
    </Box>
  ),
};
SuccessState.storyName = "Tracked Success State";

export const AnimationTime: Story = {
  render: () => (
    <Box>
      <UnifiedLoader loaderType="ring" animationTime={3} mb={4} />
      <UnifiedLoader loaderType="ring" animationTime={3} isTracked mb={4} />
      <UnifiedLoader animationTime={3} />
    </Box>
  ),
};
AnimationTime.storyName = "Animation Time";

export const HasMotion: Story = {
  render: () => (
    <Box>
      <UnifiedLoader
        loaderType="ring"
        animationTime={3}
        mb={4}
        hasMotion={false}
      />
      <UnifiedLoader
        loaderType="ring"
        animationTime={3}
        isTracked
        mb={4}
        hasMotion={false}
      />
      <UnifiedLoader animationTime={3} hasMotion={false} />
    </Box>
  ),
};
HasMotion.storyName = "Has Motion";

export const InsideButtons: Story = {
  render: () => (
    <>
      <Box height="50px">
        <Button m={2} buttonType="primary" onClick={() => {}}>
          <UnifiedLoader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
            isInsideTypicalButton
            isInsidePrimaryButton
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="secondary" onClick={() => {}}>
          <UnifiedLoader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
            isInsideTypicalButton
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="tertiary" onClick={() => {}}>
          <UnifiedLoader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
            isInsideTypicalButton
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="primary" onClick={() => {}} destructive>
          <UnifiedLoader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
            isInsideDestructiveButton
            isInsidePrimaryButton
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="secondary" onClick={() => {}} destructive>
          <UnifiedLoader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
            isInsideDestructiveButton
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="tertiary" onClick={() => {}} destructive>
          <UnifiedLoader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
            isInsideDestructiveButton
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="gradient-grey" onClick={() => {}}>
          <UnifiedLoader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
            isInsideTypicalButton
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="gradient-white" onClick={() => {}}>
          <UnifiedLoader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
            isInsideTypicalButton
          />
        </Button>
      </Box>
    </>
  ),
};

InsideButtons.storyName = "Inside Buttons";
