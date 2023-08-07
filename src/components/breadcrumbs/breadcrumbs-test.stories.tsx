import React from "react";
import { Breadcrumbs, BreadcrumbsProps } from ".";
import { Crumb, CrumbProps } from "./crumb";

export default {
  title: "Breadcrumbs/Test",
  includeStories: ["DefaultCrumb"],
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

export const Default = (props: Partial<BreadcrumbsProps>) => {
  return (
    <Breadcrumbs {...props}>
      <Crumb href="#">Breadcrumb 1</Crumb>
      <Crumb href="#">Breadcrumb 2</Crumb>
      <Crumb href="#">Breadcrumb 3</Crumb>
      <Crumb href="#" isCurrent>
        Current Page
      </Crumb>
    </Breadcrumbs>
  );
};

export const DefaultCrumb = (props: Partial<CrumbProps>) => {
  return (
    <Breadcrumbs>
      <Crumb href="#" {...props}>
        Breadcrumb 1
      </Crumb>
    </Breadcrumbs>
  );
};

Default.storyName = "default";
DefaultCrumb.storyName = "single crumb";
