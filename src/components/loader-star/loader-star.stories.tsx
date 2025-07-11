import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import LoaderStar from "./loader-star.component";

const meta: Meta<typeof LoaderStar> = {
  title: "Loader Star",
  component: LoaderStar,
  argTypes: {},
  parameters: { chromatic: { disableSnapshot: true } },
};

export default meta;
type Story = StoryObj<typeof LoaderStar>;

export const Default: Story = () => {
  return <LoaderStar />;
};
Default.storyName = "Default";
