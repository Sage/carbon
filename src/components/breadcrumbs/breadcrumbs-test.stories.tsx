import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Breadcrumbs, Crumb } from ".";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
});

const meta: Meta<typeof Breadcrumbs> = {
  title: "Breadcrumbs/Test",
  component: Breadcrumbs,
  subcomponents: { Crumb },
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const WhenFocusedCrumbBecomesCurrent: Story = ({ ...args }) => {
  const [current, setCurrent] = React.useState(false);

  return (
    <>
      <Breadcrumbs {...args}>
        <Crumb href="#bar" onClick={() => setCurrent(true)} isCurrent={current}>
          Crumb{current ? "" : " not"} current
        </Crumb>
      </Breadcrumbs>

      <div id="bar">Container</div>
    </>
  );
};
WhenFocusedCrumbBecomesCurrent.storyName = "when focused crumb becomes current";
