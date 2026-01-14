import React from "react";
import { IconType } from "../icon";
import { TooltipPositions } from "../tooltip/tooltip.config";
import { HELP_POSITIONS } from "./help.config";
import { ICONS } from "../icon/icon-config";
import Help from "./help.component";

export default {
  title: "Help/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    tooltipFlipOverrides: {
      options: HELP_POSITIONS,
      control: {
        type: "select",
      },
    },
    tooltipPosition: {
      options: HELP_POSITIONS,
      control: {
        type: "select",
      },
    },
    type: {
      options: ICONS,
      control: {
        type: "select",
      },
    },
  },
};

interface HelpStoryProps {
  children?: string;
  href?: string;
  tooltipFlipOverrides?: TooltipPositions;
  tooltipPosition?: TooltipPositions;
  type?: IconType;
}

export const Default = ({
  children,
  href,
  tooltipFlipOverrides,
  ...args
}: HelpStoryProps) => {
  const flipOverrides = tooltipFlipOverrides
    ? [tooltipFlipOverrides]
    : undefined;
  return (
    <div style={{ margin: "200px" }}>
      <Help
        tooltipFlipOverrides={flipOverrides}
        // eslint-disable-next-line react/no-children-prop
        children={children}
        href={href}
        ariaLabel={children as string}
        value={children}
        {...args}
      />
    </div>
  );
};

Default.story = {
  name: "default",
  args: {
    children: "This is help text",
    tooltipPosition: "top",
    href: "http://www.sage.com",
    type: "help",
    tooltipBgColor: "",
    tooltipFontColor: "",
    tooltipFlipOverrides: "left",
  },
};
