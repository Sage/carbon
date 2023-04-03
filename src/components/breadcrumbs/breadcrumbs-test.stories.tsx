import React from "react";
import { Breadcrumbs } from ".";
import { Crumb } from "./crumb";

export default {
  title: "Breadcrumbs/Test",
  includeStories: "DefaultCrumb",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    isCurrent: {
      control: {
        type: "boolean",
      },
    },
    href: {
      control: {
        type: "text",
      },
    },
  },
};

export const Default = ({ ...args }) => {
  return (
    <Breadcrumbs {...args}>
      <Crumb href="#">Breadcrumb 1</Crumb>
      <Crumb href="#">Breadcrumb 2</Crumb>
      <Crumb href="#">Breadcrumb 3</Crumb>
      <Crumb href="#" isCurrent>
        Current Page
      </Crumb>
    </Breadcrumbs>
  );
};

export const DefaultCrumb = ({ ...args }) => {
  return (
    <Breadcrumbs>
      <Crumb href="#" {...args}>
        Breadcrumb 1
      </Crumb>
    </Breadcrumbs>
  );
};

Default.storyName = "default";
DefaultCrumb.storyName = "default crumb";
