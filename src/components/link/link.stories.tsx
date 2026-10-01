import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import Link from ".";
import Box from "../box";
import { Menu, MenuItem } from "../menu";
import Typography from "../typography";

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

export const WithOnClick: Story = () => {
  return (
    <Link onClick={() => {}}>
      This is actually a button but looks like a link
    </Link>
  );
};
WithOnClick.storyName = "With On Click";
