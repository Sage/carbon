import React from "react";
import { action } from "storybook/actions";
import { ICONS } from "../icon/icon-config";
import { LINK_ALIGNMENTS, LINK_POSITIONS, LINK_VARIANTS } from "./link.config";
import Link, { LinkProps } from "./link.component";
import Box from "../box";

export default {
  title: "Link/Test",
  includeStories: ["DefaultStory", "FlexContainer"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    icon: {
      options: ["", ...ICONS],
      control: {
        type: "select",
      },
    },
    iconAlign: {
      options: LINK_ALIGNMENTS,
      control: {
        type: "select",
      },
    },
    tooltipPosition: {
      options: LINK_POSITIONS,
      control: {
        type: "select",
      },
    },
    variant: {
      options: LINK_VARIANTS,
      control: {
        type: "select",
      },
    },
  },
};

interface LinkStoryProps extends LinkProps {
  hasOnClick: boolean;
}

export const DefaultStory = ({
  hasOnClick,
  children,
  href,
  variant,
  isDarkBackground,
  ...args
}: LinkStoryProps) => {
  const backgroundColor = isDarkBackground ? "#000000" : "transparent";
  const link = (
    <Link
      onClick={hasOnClick ? action("click") : undefined}
      href={href}
      variant={variant}
      isDarkBackground={isDarkBackground}
      {...args}
    >
      {children}
    </Link>
  );
  return (
    <div
      style={{
        margin: "64px",
        backgroundColor,
        width: "fit-content",
        padding: "8px",
      }}
    >
      {link}
    </div>
  );
};

DefaultStory.storyName = "default";
DefaultStory.args = {
  children: "Link",
  disabled: false,
  href: "",
  icon: "",
  iconAlign: "left",
  tooltipMessage: "",
  tooltipPosition: "bottom",
  hasOnClick: false,
  target: "_blank",
  variant: "default",
  isDarkBackground: false,
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

export const LinkComponent = (props: LinkProps) => {
  return (
    <div
      style={{
        margin: "100px",
      }}
    >
      <Link href="#foo" target="_blank" rel="noreferrer noopener" {...props}>
        This is a link
      </Link>
    </div>
  );
};
