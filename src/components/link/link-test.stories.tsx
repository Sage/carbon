import React from "react";
import { action } from "@storybook/addon-actions";
import { ComponentMeta } from "@storybook/react";

import specialCharacters from "../../__internal__/utils/argTypes/specialCharacters";
import { ICONS } from "../icon/icon-config";
import { LINK_ALIGNMENTS, LINK_POSITIONS, LINK_VARIANTS } from "./link.config";
import Link, { LinkProps } from "./link.component";

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
    childrenSpecialCharacters: specialCharacters,
    hrefSpecialCharacters: specialCharacters,
  },
} as ComponentMeta<typeof Link>;

interface LinkStoryProps extends LinkProps {
  hasOnClick: boolean;
  childrenSpecialCharacters: string;
  hrefSpecialCharacters: string;
}

export const DefaultStory = ({
  hasOnClick,
  children,
  childrenSpecialCharacters,
  href,
  hrefSpecialCharacters,
  variant,
  isDarkBackground,
  ...args
}: LinkStoryProps) => {
  const backgroundColor = isDarkBackground ? "#000000" : "transparent";
  const link = (
    <Link
      onClick={hasOnClick ? action("click") : undefined}
      href={href || hrefSpecialCharacters}
      variant={variant}
      isDarkBackground={isDarkBackground}
      {...args}
    >
      {children || childrenSpecialCharacters}
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
  childrenSpecialCharacters: undefined,
  hrefSpecialCharacters: undefined,
  variant: "default",
  isDarkBackground: false,
};
