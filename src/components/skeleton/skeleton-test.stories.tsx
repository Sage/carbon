import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { waitFor } from "storybook/test";

import Box from "../box";
import Typography from "../typography";
import Skeleton, { SkeletonRow } from ".";

const meta: Meta<typeof Skeleton> = {
  title: "Skeleton/Test",
  component: Skeleton,
  parameters: {
    chromatic: { disableSnapshot: false, viewports: [1200] },
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

const lines: SkeletonRow[] = [
  [
    { height: "48px", shape: "circle" },
    { height: "24px", width: "65%", shape: "rectangle-curved" },
  ],
  { preset: "h1", width: "85%" },
  { preset: "h3", width: "70%" },
  { preset: "paragraph", width: "100%" },
  { preset: "paragraph", width: "75%" },
  { preset: "button", width: "120px", shape: "rectangle-curved" },
  { height: "52px", width: "180px", shape: "rectangle-moderate" },
];

interface ScenarioProps {
  disableAnimation?: boolean;
  label: string;
  testRole: string;
}

const Scenario = ({ disableAnimation, label, testRole }: ScenarioProps) => (
  <Box>
    <Typography mb={2} variant="h4">
      {label}
    </Typography>
    <Box data-role={testRole}>
      <Skeleton
        aria-label={`${label} skeleton`}
        disableAnimation={disableAnimation}
        lines={lines}
      />
    </Box>
  </Box>
);

const freezeAnimationAt = async (
  canvasElement: HTMLElement,
  role: string,
  time: number,
) => {
  await waitFor(() => {
    const skeletonLines = Array.from(
      canvasElement.querySelectorAll<HTMLElement>(
        `[data-role="${role}"] [data-role="skeleton-line"]`,
      ),
    );

    const lineAnimations = skeletonLines.map((line) => line.getAnimations());

    if (
      skeletonLines.length === 0 ||
      lineAnimations.some((animations) => animations.length === 0)
    ) {
      throw new Error(`Skeleton animations are not ready for ${role}`);
    }

    lineAnimations.flat().forEach((animation) => {
      animation.pause();
      animation.currentTime = time;
      animation.commitStyles();
      animation.cancel();
    });
  });
};

export const AllChromaticScenarios: Story = {
  render: () => (
    <Box p={4}>
      <Typography mb={3} variant="h3">
        Animation frames
      </Typography>
      <Box
        display="grid"
        gap={4}
        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
      >
        <Scenario label="Start — 0 ms" testRole="animation-start" />
        <Scenario label="Mid-sweep — 1000 ms" testRole="animation-middle" />
        <Scenario label="Sweep complete — 2000 ms" testRole="animation-end" />
      </Box>

      <Typography mb={3} mt={5} variant="h3">
        Disabled animation
      </Typography>
      <Box maxWidth="360px">
        <Scenario
          disableAnimation
          label="Static gradient"
          testRole="animation-disabled"
        />
      </Box>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    await freezeAnimationAt(canvasElement, "animation-start", 0);
    await freezeAnimationAt(canvasElement, "animation-middle", 1000);
    await freezeAnimationAt(canvasElement, "animation-end", 2000);
  },
};

AllChromaticScenarios.storyName = "All Chromatic Scenarios";
