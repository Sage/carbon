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
      <Box p={2} display="flex" flexDirection="row" gap={4}>
        <Typography>
          <Link variant="typical" linkSize="large" {...args}>
            This is a large typical link
          </Link>
        </Typography>
        <Typography>
          <Link variant="negative" linkSize="large" {...args}>
            This is a large negative link
          </Link>
        </Typography>
        <Typography>
          <Link variant="subtle" linkSize="large" {...args}>
            This is a large subtle link
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
      <Box
        p={2}
        display="flex"
        flexDirection="row"
        gap={4}
        backgroundColor="#000"
      >
        <Typography>
          <Link variant="typical" linkSize="large" inverse {...args}>
            This is a large typical link
          </Link>
        </Typography>
        <Typography>
          <Link variant="negative" linkSize="large" inverse {...args}>
            This is a large negative link
          </Link>
        </Typography>
        <Typography>
          <Link variant="subtle" linkSize="large" inverse {...args}>
            This is a large subtle link
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

export const AllVariantsOnHover: Story = {
  ...AllVariantsWithIcons,
  args: {
    href: "https://carbon.sage.com",
    icon: "settings",
    "data-role": "hover",
  },
  parameters: {
    pseudo: {
      hover: '[data-role="hover"] a',
    },
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
  const SvgLogo = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40px"
      height="25px"
      viewBox="0 0 769 433"
      data-role="sage-icon"
      role="img"
      aria-labelledby="sageLogoTitle"
    >
      <title id="sageLogoTitle">Sage Logo</title>
      <path
        fill="#00D639"
        fillRule="nonzero"
        d="M85.5.41c47.57 0 86.338 32.569 87.982 78.096l.038 1.384c.45 13.02-8.98 20.21-19.31 20.21-9.88 0-18.41-7.18-18.86-19.31-.45-26.05-22.45-45.36-50.3-45.36-26.05 0-45.8 18.41-45.8 43.56 0 27.116 18.044 39.276 55.44 53.023l3.587 1.31c39.89 14.641 75.693 32.479 75.693 83.527 0 45.36-35.48 81.73-84.87 81.73-48.5 0-88.47-34.13-88.47-80.38 0-28.74 13.92-48.95 27.39-48.95 11.68 0 18.86 7.63 18.86 17.96 0 2.332-.515 4.332-1.277 6.297l-.236.588-.249.589-.26.59-.41.892-1.16 2.461-.297.644-.297.659-.295.676-.291.694-.144.354-.282.726-.275.748c-1.219 3.423-2.157 7.602-2.157 13.272 0 28.74 23.35 47.15 49.85 47.15 27.84 0 46.25-19.31 46.25-42.66 0-27.59-16.967-39.864-52.094-52.728l-2.22-.805-3.544-1.265-2.541-.924-2.523-.933C32.651 149.377.63 130.343.63 82.14.63 36.798 36.717 1.13 84.062.42L85.5.41Zm195.98 298.18c-48.5 0-88.91-39.07-88.91-88.47 0-51.19 40.86-89.36 90.26-89.36 52.99 0 90.26 39.52 90.26 93.41v65.56c0 11.23-8.98 18.86-19.31 18.86-10.78 0-19.76-7.63-19.76-18.86v-64.22c0-35.48-20.21-59.73-52.09-59.73-28.29 0-50.74 23.8-50.74 54.34 0 28.29 22 52.54 49.85 52.54 3.162 0 5.777-.252 8.064-.602l.898-.145.866-.153.837-.159.811-.163 3.418-.721.726-.145.721-.134c1.558-.279 3.1-.468 4.769-.468 8.53 0 17.51 7.18 17.51 17.51-.01 13.78-16.3 20.966-37.535 21.108l-.645.002Zm202.26 133.82c-50.3 0-92.06-35.93-92.06-82.63 0-15.72 8.98-22.9 19.31-22.9 10.33 0 18.86 6.74 19.31 19.76.45 29.19 23.8 50.74 52.99 50.74 30.99 0 51.19-19.76 51.19-45.36 0-26.855-19.002-39.262-51.764-50.52l-2.157-.733c-.725-.244-1.456-.487-2.194-.73l-2.234-.73c-.75-.242-1.508-.484-2.271-.727-44.46-14.37-82.18-34.13-82.18-88.91 0-50.3 38.62-88.91 88.91-88.91 50.74 0 92.51 36.82 92.51 85.32 0 29.64-12.12 52.54-28.74 52.54-11.23 0-18.86-8.08-18.86-17.96 0-2.282.438-4.28 1.121-6.205l.224-.605.238-.603.125-.3.258-.6.134-.301.275-.602.43-.907 1.528-3.135.47-.992.312-.679.155-.346.307-.704.302-.722c.1-.244.199-.491.296-.742l.29-.764c1.422-3.873 2.515-8.6 2.515-15.023 0-30.99-24.25-51.64-53.44-51.64-28.29 0-50.74 21.56-50.74 49.85 0 31.561 22.444 45.089 59.493 57.553l3.734 1.244C536.01 278.672 573.1 296.95 573.1 348.44c0 46.678-36.528 83.233-87.802 83.959l-1.558.011Zm199.57-133.82c-50.3 0-91.61-39.52-91.61-88.91 0-49.4 39.97-88.91 89.36-88.91 49.85 0 87.57 34.58 87.57 78.59 0 17.06-12.12 27.39-31.88 27.39h-51.64c-10.33 0-17.96-7.18-17.96-16.62 0-8.98 7.63-16.17 17.96-16.17h38.62c3.59 0 6.29-1.8 6.29-5.39 0-13.02-16.62-33.23-47.6-33.23-28.74 0-52.09 24.7-52.09 54.34 0 30.09 23.8 53.89 53.44 53.89 15.017 0 25.601-3.913 33.931-8.295l1.122-.6c.185-.1.369-.201.551-.302l1.083-.605c.178-.1.355-.202.532-.303l1.045-.606 1.023-.604 1.001-.6 1.463-.889 2.347-1.434.91-.552.897-.536.882-.519c4.383-2.546 8.317-4.365 12.493-4.365 11.68 0 17.96 7.63 17.96 16.17 0 6.363-3.343 12.174-11.342 18.522l-.776.607-.804.61c-.273.203-.55.407-.833.613l-.862.617-.89.621a93.83 93.83 0 0 1-.457.312l-.936.628-.965.633c-.327.211-.658.424-.995.637-13.335 8.422-33.227 15.105-57.975 15.257l-.865.003Z"
      />
    </svg>
  );
  return (
    <>
      <GlobalHeader>
        <Box display="flex" alignItems="center" mr={2}>
          <Link
            href="#"
            onClick={() => {
              alert("clicked");
            }}
          >
            <Box display="flex" alignItems="center">
              <Logo />
            </Box>
          </Link>
        </Box>
      </GlobalHeader>
      <Box m={4} display="flex" flexDirection="row" gap={4}>
        <Link data-role="target" href="#">
          <Logo />
        </Link>
        <Link data-role="target" href="#">
          <SvgLogo />
        </Link>
      </Box>
    </>
  );
};
LinkComponentWithAnImage.parameters = {
  chromatic: {
    disableSnapshot: false,
  },
  pseudo: {
    focus: '[data-role="target"] a',
  },
};

export const LinkThatWraps: Story = {
  render: (args) => (
    <Box padding="25px" width="250px" backgroundColor="--colorsUtilityMajor025">
      <Typography>We&apos;ll be sorry to see you go</Typography>
      <Typography>
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

export const Disabled = () => {
  return <Link disabled>This is a disabled anchor link</Link>;
};
Disabled.storyName = "Disabled";

export const WithTooltip: Story = () => {
  return (
    <Link
      icon="settings"
      tooltipMessage="This is a tooltip message"
      href="#foo"
    >
      This is a link
    </Link>
  );
};
WithTooltip.storyName = "With Tooltip";
