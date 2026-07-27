import type { Meta, StoryObj } from "@storybook/react-vite";

import ThemePreview from "./theme-preview.component";

const meta: Meta<typeof ThemePreview> = {
  title: "Theme Customization/White Label Preview",
  component: ThemePreview,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Interactive theme preview tool for white-label customization. Adjust brand colors to see real-time updates across all Carbon components. The overrides use the TokensWrapper component to apply brand colors globally.",
      },
    },
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
        story:
          "Preview and customize brand colors for light mode. All components will update in real-time as you adjust the primary color and its variants.",
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
        story:
          "Preview and customize brand colors for dark mode. Adjust the dark mode primary colors and see how they affect component styling across the entire design system.",
      },
    },
  },
};
