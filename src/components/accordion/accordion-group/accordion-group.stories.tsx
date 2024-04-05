import { Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import AccordionGroup from "./accordion-group.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof AccordionGroup> = {
  title: "AccordionGroup",
  component: AccordionGroup,
  tags: ["hideInSidebar"],
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof AccordionGroup>;

export const Default: Story = {
  args: {
    children: [],
  },
};
