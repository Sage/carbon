import { Meta, StoryObj } from "@storybook/react-vite";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import MenuItem from "./menu-item.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps(
  {
    flexBox: true,
    layout: true,
    padding: true,
  },
  undefined,
  [
    "height",
    "minHeight",
    "maxHeight",
    "size",
    "display",
    "overflowY",
    "overflowX",
    "overflow",
    "verticalAlign",
  ],
);

const meta: Meta<typeof MenuItem> = {
  title: "Menu Item",
  component: MenuItem,
  tags: ["!dev"],
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

export const Default: Story = {
  args: {
    children: [],
  },
};
