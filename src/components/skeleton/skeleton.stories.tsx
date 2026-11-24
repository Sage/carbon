import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import Box from "../box";
import Divider from "../divider";
import { Tile } from "../tile";
import Skeleton from ".";

const meta: Meta<typeof Skeleton> = {
  title: "Skeleton",
  component: Skeleton,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  argTypes: {
    lines: {
      control: "object",
      description:
        "Describes the skeleton as rows. Use an object for one line or a nested array for lines that share a row. Defaults to one full-width paragraph-height line.",
      table: {
        type: { summary: "SkeletonRow[]" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {
  render: (args) => <Skeleton {...args} />,
  parameters: {
    controls: {
      include: ["lines", "disableAnimation"],
    },
  },
  args: {
    lines: [
      [
        { height: "48px", shape: "circle" },
        {
          height: "24px",
          width: "40%",
          shape: "rectangle-curved",
        },
      ],
      { preset: "paragraph", width: "100%" },
      { preset: "paragraph", width: "85%" },
      { preset: "paragraph", width: "65%" },
    ],
    disableAnimation: false,
  },
};
Playground.storyName = "Playground";

export const DisableAnimation: Story = {
  args: {
    disableAnimation: true,
    lines: [
      {
        height: "80px",
        width: "min(600px, 100%)",
        shape: "rectangle-curved",
      },
    ],
  },
};
DisableAnimation.storyName = "Disable Animation";

export const ComposedLayout: Story = () => {
  const line = (width: string) => ({
    height: "16px",
    width,
    shape: "rectangle-curved" as const,
  });

  return (
    <div
      style={{
        backgroundColor: "var(--container-standard-bg-alt)",
        boxSizing: "border-box",
        maxWidth: "462px",
        padding: "12px",
        width: "100%",
      }}
    >
      <Tile hasOutline p={3} roundness="curved">
        <Box width="100%">
          <Skeleton
            lines={[
              {
                height: "32px",
                width: "200px",
                shape: "rectangle-curved",
              },
            ]}
          />

          <Divider aria-hidden type="horizontal" mb="0px" mt={4} />

          <Box
            display="grid"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            pb={5}
            pt={2}
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
          </Box>

          <Divider aria-hidden type="horizontal" my="0px" />

          <Box
            display="grid"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            pb="36px"
            pt={2}
          >
            <Skeleton lines={[line("70px"), line("100px"), line("70px")]} />
            <Skeleton lines={[line("150px"), line("150px"), line("150px")]} />
          </Box>

          <Divider aria-hidden type="horizontal" my="0px" />

          <Box pt={2}>
            <Skeleton lines={[line("150px")]} />
          </Box>
        </Box>
      </Tile>
    </div>
  );
};
ComposedLayout.storyName = "Composed Layout";
