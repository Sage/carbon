import type { Meta, StoryObj } from "@storybook/react-vite";
import Preview from "./__internal__/preview/preview.component";
import isChromatic from "../../../.storybook/isChromatic";

const renderedInChromatic = isChromatic();

const meta: Meta<typeof Preview> = {
  title: "Tokens Wrapper",
  component: Preview,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Interactive theme preview tool for white-label customisation. Adjust brand colours to see real-time updates across all Carbon components. The overrides use the TokensWrapper component to apply brand colours globally.",
      },
    },
    chromatic: { disableSnapshot: false },
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const LightMode: Story = {
  args: {
    modeOverride: "light",
  },
  parameters: {
    docs: {
      description: {
        story: "Preview light mode.",
      },
    },
  },
};

export const DarkMode: Story = {
  args: {
    modeOverride: "dark",
  },
  parameters: {
    docs: {
      description: {
        story: "Preview dark mode.",
      },
    },
  },
};

export const LightModeOverrides: Story = {
  args: {
    modeOverride: "light",
    isWhiteLabel: true,
    isChromatic: renderedInChromatic,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Preview and customise brand colours for light mode. All components will update in real-time as you adjust the primary colour and its variants.",
      },
    },
  },
};

export const DarkModeOverrides: Story = {
  args: {
    modeOverride: "dark",
    isWhiteLabel: true,
    isChromatic: renderedInChromatic,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Preview and customise brand colours for dark mode. Adjust the dark mode primary colours and see how they affect component styling across the entire design system.",
      },
    },
  },
};
