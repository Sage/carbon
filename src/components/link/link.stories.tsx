import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import Link from ".";
import Box from "../box";
import Typography from "../typography";

const blackBackground: React.CSSProperties = {
  padding: "var(--global-space-layout-2-xs)",
  display: "flex",
  flexDirection: "row",
  gap: "var(--global-space-layout-s)",
  backgroundColor: "rgb(0, 0, 0)",
};

const meta: Meta<typeof Link> = {
  title: "Link",
  component: Link,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Playground: Story = {
  render: (args) => <Link {...args}>{args.children}</Link>,
  args: {
    children: "This is a link",
    href: "https://carbon.sage.com",
    underline: "always",
    isSkipLink: false,
    icon: undefined,
    iconAlign: "left",
    variant: "typical",
    linkSize: "medium",
    inverse: false,
    bold: false,
    target: undefined,
    rel: undefined,
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
Playground.storyName = "Playground";

export const AsSkipLink: Story = () => {
  return (
    <>
      <Link href="#main-content" isSkipLink />
      <nav aria-label="Primary navigation">
        <Link href="/products">Products</Link>{" "}
        <Link href="/support">Support</Link>
      </nav>
      <main id="main-content" tabIndex={-1}>
        <h2>Main content</h2>
        <p>The skip link moves focus directly to this content.</p>
      </main>
    </>
  );
};
AsSkipLink.storyName = "As Skip Link";

export const LinkSize: Story = {
  render: (args) => (
    <>
      <Typography>
        <Link linkSize="medium" {...args}>
          This is a medium link
        </Link>
      </Typography>
      <Typography>
        <Link linkSize="large" {...args}>
          This is a large link
        </Link>
      </Typography>
    </>
  ),
  args: {
    href: "https://carbon.sage.com",
  },
  decorators: [
    (Story) => (
      <Box display="flex" flexDirection="row" gap={4}>
        <Story />
      </Box>
    ),
  ],
};

export const Bold: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: "This is a bold link",
    bold: true,
  },
};

export const Variants: Story = {
  render: (args) => (
    <>
      <Typography>
        <Link variant="typical" {...args}>
          This is a typical link
        </Link>
      </Typography>
      <Typography>
        <Link variant="negative" {...args}>
          This is a negative link
        </Link>
      </Typography>
      <Typography>
        <Link variant="subtle" {...args}>
          This is a subtle link
        </Link>
      </Typography>
    </>
  ),
  args: {
    href: "https://carbon.sage.com",
  },
  decorators: [
    (Story) => (
      <Box display="flex" flexDirection="row" gap={4}>
        <Story />
      </Box>
    ),
  ],
};

export const Inverse: Story = {
  render: (args) => (
    <>
      <Typography>
        <Link variant="typical" {...args}>
          This is an inverse typical link
        </Link>
      </Typography>
      <Typography>
        <Link variant="negative" {...args}>
          This is an inverse negative link
        </Link>
      </Typography>
      <Typography>
        <Link variant="subtle" {...args}>
          This is an inverse subtle link
        </Link>
      </Typography>
    </>
  ),
  args: {
    href: "https://carbon.sage.com",
    inverse: true,
  },
  decorators: [
    (Story) => (
      <div style={blackBackground}>
        <Story />
      </div>
    ),
  ],
};

export const WithOnClick: Story = () => {
  return (
    <Link onClick={() => {}}>
      This is actually a button but looks like a link
    </Link>
  );
};
WithOnClick.storyName = "With On Click";
