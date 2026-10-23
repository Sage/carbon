import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import ModernisationWrapper from ".";
import TokensWrapper from "../tokens-wrapper";

const meta: Meta<typeof ModernisationWrapper> = {
  title: "Experimental/Modernisation Wrapper",
  component: ModernisationWrapper,
  parameters: {
    docs: {
      description: {
        component:
          "POC: reads @sage/design-tokens-fusion/json/modernisation.json and scopes its overrides to a div. Requires a package version containing this file. Base tokens must be provided by an ancestor TokensWrapper. Portals outside the div do not inherit these overrides.",
      },
    },
  },
  argTypes: {
    injectionMethod: {
      control: "radio",
      options: ["inline", "stylesheet"],
    },
  },
  decorators: [
    (Story) => (
      <TokensWrapper>
        <Story />
      </TokensWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ModernisationWrapper>;

const sampleStyle: React.CSSProperties = {
  padding: "24px",
  background: "var(--page-bg-default)",
  color: "var(--mode-color-generic-txt-severe)",
  border: "2px solid var(--container-standard-border-default)",
};

const sample = (
  <div style={sampleStyle}>
    <p>Page background and container border</p>
    <div
      style={{ padding: "16px", background: "var(--nav-primary-bg-default)" }}
    >
      Navigation background
    </div>
  </div>
);

export const Inline: Story = {
  args: { injectionMethod: "inline", children: sample },
  parameters: {
    docs: {
      description: {
        story:
          "Variables appear directly on the wrapper's style attribute. Simple to inspect and available during server rendering; declarations repeat on each instance and require inline styles to be allowed by CSP.",
      },
    },
  },
};

export const Stylesheet: Story = {
  args: { injectionMethod: "stylesheet", children: sample },
  parameters: {
    docs: {
      description: {
        story:
          "Variables live in a shared styled-components class. Reduces repeated markup and follows Carbon's styling approach. Server rendering and CSP use the application's styled-components stylesheet setup.",
      },
    },
  },
};

export const ScopedComparison: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
      <div>
        <h2>Base tokens</h2>
        {sample}
      </div>
      <div>
        <h2>Modernisation overrides</h2>
        <ModernisationWrapper {...args}>{sample}</ModernisationWrapper>
      </div>
    </div>
  ),
};
