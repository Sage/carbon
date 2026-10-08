import React from "react";
import { StoryObj } from "@storybook/react-vite";
import Box, { BoxProps } from ".";

const greenBackground: React.CSSProperties = {
  width: "fit-content",
  backgroundColor: "rgb(0, 125, 90)",
  color: "rgb(255, 255, 255)",
};

const deprecatedPropsMatrix: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 240px)",
  gap: "var(--global-space-layout-xs)",
  padding: "var(--global-space-layout-xs)",
  backgroundColor: "rgb(242, 245, 246)",
};

const deprecatedPropCard: React.CSSProperties = {
  minHeight: "152px",
  padding: "var(--global-space-layout-2-xs)",
  backgroundColor: "rgb(255, 255, 255)",
  border: "1px solid rgb(204, 214, 219)",
};

const deprecatedPropLabel: React.CSSProperties = {
  display: "block",
  marginBottom: "var(--global-space-layout-2-xs)",
  fontWeight: 700,
};

const whiteText: React.CSSProperties = {
  color: "rgb(255, 255, 255)",
};

const greenExampleContent: React.CSSProperties = {
  padding: "var(--global-space-layout-2-xs)",
  backgroundColor: "rgb(0, 125, 90)",
  color: "rgb(255, 255, 255)",
};

const tallScrollContent: React.CSSProperties = {
  ...greenExampleContent,
  height: "180px",
};

export default {
  title: "Box/Test",
  includeStories: ["Default", "DeprecatedProps"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    boxSizing: {
      options: ["content-box", "border-box"],
      control: {
        type: "select",
      },
    },
    overflowWrap: {
      options: ["break-word", "anywhere"],
      control: {
        type: "select",
      },
    },
    gap: {
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      control: {
        type: "select",
      },
    },
    columnGap: {
      control: {
        type: "text",
      },
    },
    rowGap: {
      control: {
        type: "text",
      },
    },
  },
};

export const Default = (props: Partial<BoxProps>) => {
  return (
    <Box m={3}>
      <div style={greenBackground}>
        <Box p={3} width={400} height={400} data-element="box" {...props}>
          This is some sample text
        </Box>
      </div>
    </Box>
  );
};

Default.storyName = "default";

export const DeprecatedProps: StoryObj<typeof Box> = {
  render: () => (
    <>
      <style>{`
        [data-element="deprecated-tab-index"]:focus {
          outline: 3px solid rgb(0, 96, 70);
          outline-offset: 2px;
        }

        [data-element="deprecated-box-shadow"],
        [data-element="deprecated-border-radius"] {
          background-color: rgb(0, 125, 90);
          color: rgb(255, 255, 255);
        }

        [data-element="deprecated-scroll-variant"] {
          scrollbar-gutter: stable;
        }
      `}</style>
      <div style={deprecatedPropsMatrix}>
        <div style={deprecatedPropCard}>
          <span style={deprecatedPropLabel}>tabIndex</span>
          <Box data-element="deprecated-tab-index" tabIndex={0} p={2}>
            This Box is focused using tabIndex.
          </Box>
        </div>

        <div style={deprecatedPropCard}>
          <span style={deprecatedPropLabel}>color</span>
          <Box color="rgb(0, 96, 70)" p={2}>
            This text uses the color prop.
          </Box>
        </div>

        <div style={deprecatedPropCard}>
          <span style={deprecatedPropLabel}>bg</span>
          <Box bg="rgb(0, 125, 90)" p={2}>
            <span style={whiteText}>This background uses the bg prop.</span>
          </Box>
        </div>

        <div style={deprecatedPropCard}>
          <span style={deprecatedPropLabel}>backgroundColor</span>
          <Box backgroundColor="rgb(0, 96, 70)" p={2}>
            <span style={whiteText}>
              This background uses the backgroundColor prop.
            </span>
          </Box>
        </div>

        <div style={deprecatedPropCard}>
          <span style={deprecatedPropLabel}>boxShadow</span>
          <Box
            data-element="deprecated-box-shadow"
            boxShadow="boxShadow100"
            m={1}
            p={2}
          >
            This Box uses the boxShadow prop.
          </Box>
        </div>

        <div style={deprecatedPropCard}>
          <span style={deprecatedPropLabel}>borderRadius</span>
          <Box
            data-element="deprecated-border-radius"
            borderRadius="borderRadius400"
            p={2}
          >
            This Box uses the borderRadius prop.
          </Box>
        </div>

        <div style={deprecatedPropCard}>
          <span style={deprecatedPropLabel}>opacity</span>
          <Box opacity="60%">
            <div style={greenExampleContent}>
              This Box uses the opacity prop.
            </div>
          </Box>
        </div>

        <div style={deprecatedPropCard}>
          <span style={deprecatedPropLabel}>scrollVariant</span>
          <Box
            data-element="deprecated-scroll-variant"
            scrollVariant="dark"
            height="96px"
            overflowY="scroll"
            width="100%"
          >
            <div style={tallScrollContent}>
              This content makes the deprecated scrollbar visible.
            </div>
          </Box>
        </div>
      </div>
    </>
  ),
  play: async ({ canvasElement }) => {
    const tabIndexExample = canvasElement.querySelector<HTMLElement>(
      '[data-element="deprecated-tab-index"]',
    );
    tabIndexExample?.focus();
  },
  parameters: {
    chromatic: { disableSnapshot: false, viewports: [1200] },
  },
};

DeprecatedProps.storyName = "Deprecated props snapshot matrix";
