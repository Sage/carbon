import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { action } from "@storybook/addon-actions";
import Link, { LinkProps } from "./link.component";
import Box from "../box";
import GlobalHeader from "../global-header";
import Typography from "../typography";

import carbonLogo from "../../../logo/carbon-logo.png";

const meta: Meta<typeof Link> = {
  title: "Link/Test",
  component: Link,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    onClick: {
      control: {
        type: "boolean",
      },
    },
    children: {
      control: {
        type: "text",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

const getBackgroundColor = (inverse?: boolean) =>
  inverse ? "#000000" : "transparent";

export const Default: Story = {
  render: ({ inverse, onClick, children, ...args }: LinkProps) => (
    <Box p={4} backgroundColor={getBackgroundColor(inverse)}>
      <Link
        onClick={onClick ? action("click") : undefined}
        inverse={inverse}
        {...args}
      >
        {children}
      </Link>
    </Box>
  ),
  args: {
    children: "Link",
    href: "#",
    target: "_blank",
  },
};

export const AllVariantsWithIcons: Story = {
  render: (args) => (
    <>
      <Box p={2} display="flex" flexDirection="row" gap={4}>
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
      </Box>
      <Box
        p={2}
        display="flex"
        flexDirection="row"
        gap={4}
        backgroundColor="#000"
      >
        <Typography>
          <Link variant="typical" inverse {...args}>
            This is a typical link
          </Link>
        </Typography>
        <Typography>
          <Link variant="negative" inverse {...args}>
            This is a negative link
          </Link>
        </Typography>
        <Typography>
          <Link variant="subtle" inverse {...args}>
            This is a subtle link
          </Link>
        </Typography>
      </Box>
    </>
  ),
  args: {
    href: "https://carbon.sage.com",
    icon: "settings",
  },
};

export const FlexContainer = () => {
  const link = (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="flex-end"
      alignItems="center"
      width="60px"
      height="40px"
      bg="red"
      mx={5}
    >
      <Link icon="close" variant="neutral" />
    </Box>
  );
  return (
    <div
      style={{
        margin: "64px",
        width: "fit-content",
        padding: "8px",
      }}
    >
      {link}
    </div>
  );
};
FlexContainer.parameters = { chromatic: { disableSnapshot: false } };

export const LinkComponentWithAnImage = () => {
  const Logo = () => <img src={carbonLogo} alt="Logo" height={25} />;
  return (
    <GlobalHeader>
      <Box display="flex" alignItems="center" mr={2}>
        <Link
          href="#"
          onClick={() => {
            alert("clicked");
          }}
        >
          <Logo />
        </Link>
      </Box>
    </GlobalHeader>
  );
};

export const LinkThatWraps: Story = {
  render: (args) => (
    <Box padding="25px" width="250px" backgroundColor="--colorsUtilityMajor025">
      <Typography>We&apos;ll be sorry to see you go</Typography>
      <Typography lineHeight="150%">
        If your subscription isn&apos;t quite right, we can help you{" "}
        <Link
          href="http://carbon.sage.com"
          target="_blank"
          icon="settings"
          {...args}
        >
          find one that suits your business needs (new tab)
        </Link>
      </Typography>
    </Box>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
};
