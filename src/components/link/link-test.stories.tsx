import React from "react";
import { action } from "@storybook/addon-actions";
import { ComponentMeta } from "@storybook/react";
import { ICONS } from "../icon/icon-config";
import { LINK_ALIGNMENTS, LINK_POSITIONS, LINK_VARIANTS } from "./link.config";
import Link, { LinkProps } from "./link.component";
import Box from "../box";

export default {
  title: "Link/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    icon: {
      options: ["", ICONS],
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
} as ComponentMeta<typeof Link>;

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
    <Box m="64px" p="8px" backgroundColor={backgroundColor} width="fit-content">
      {link}
    </Box>
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
