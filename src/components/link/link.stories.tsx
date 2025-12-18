import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Link from ".";
import Box from "../box";
import { Menu, MenuItem } from "../menu";
import Typography from "../typography";

const meta: Meta<typeof Link> = {
  title: "Link",
  component: Link,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  render: (args) => <Link {...args}>{args.children}</Link>,
  args: {
    children: "This is an anchor link",
    href: "https://carbon.sage.com",
  },
};

export const WithUnderlineOnlyOnHover: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: "This is an anchor link with an underline applied on hover",
    underline: "hover",
  },
  parameters: { chromatic: { disableSnapshot: true } },
};

export const WithNoUnderline: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: "This is an anchor link with no underline",
    underline: "never",
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <>
      <Typography>
        <Link iconAlign="left" {...args}>
          Link with left icon
        </Link>
      </Typography>
      <Typography>
        <Link iconAlign="right" {...args}>
          Link with right icon
        </Link>
      </Typography>
    </>
  ),
  args: {
    href: "https://carbon.sage.com",
    icon: "settings",
  },
  decorators: [
    (Story) => (
      <Box display="flex" flexDirection="row" gap={4}>
        <Story />
      </Box>
    ),
  ],
};

export const AsSkipLink: Story = () => {
  return (
    <>
      <Link href="#main-content" isSkipLink />
      <Menu>
        <MenuItem href="#">Menu Item 1</MenuItem>
        <MenuItem href="#">Menu Item 2</MenuItem>
        <MenuItem href="#">Menu Item 3</MenuItem>
        <MenuItem href="#">Menu Item 4</MenuItem>
        <MenuItem href="#">Menu Item 5</MenuItem>
      </Menu>
      <Box py={2} id="main-content">
        <Typography mb={1} variant="h2">
          This is header of main content container
        </Typography>
        <Typography variant="p">
          Laborum anim magna pariatur ea mollit elit cillum exercitation irure
          consectetur. Lorem qui dolor reprehenderit reprehenderit ut ad. Esse
          magna aliquip ea culpa nulla laborum deserunt cupidatat ullamco fugiat
          in enim. Sunt velit tempor anim occaecat. Culpa ut consectetur sunt
          tempor eu est deserunt veniam. Voluptate commodo consequat ipsum
          aliquip elit aute pariatur occaecat eiusmod culpa dolore voluptate
          Lorem commodo. Consectetur anim exercitation esse irure est amet
          adipisicing cupidatat laborum non commodo id. Ex id nostrud aute
          deserunt. Qui non aute ea eu commodo anim labore dolor minim enim
          cillum eiusmod commodo ipsum. Consectetur ipsum consectetur Lorem
          tempor proident cillum eu minim. Adipisicing in nostrud sit Lorem ex
          aute tempor aliquip aute. Duis dolore laboris labore exercitation enim
          dolore anim occaecat anim laboris dolor ut. Lorem ullamco adipisicing
          duis aute non minim. Adipisicing consequat labore non aliquip anim.
        </Typography>
        <Link href="https://carbon.sage.com">Carbon Page</Link>
      </Box>
    </>
  );
};
AsSkipLink.storyName = "As Skip Link";
AsSkipLink.parameters = { chromatic: { disableSnapshot: true } };

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
      <Box p={2} display="flex" flexDirection="row" gap={4} bg="#000">
        <Story />
      </Box>
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
WithOnClick.parameters = { chromatic: { disableSnapshot: true } };
