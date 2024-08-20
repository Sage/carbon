import React from "react";
import { Breadcrumbs, BreadcrumbsProps } from ".";
import { Crumb, CrumbProps } from "./crumb";

export default {
  title: "Breadcrumbs/Test",
  includeStories: ["DefaultCrumb", "WhenFocusedCrumbBecomesCurrent"],
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
    isDarkBackground: {
      control: {
        type: "boolean",
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

export const WhenFocusedCrumbBecomesCurrent = () => {
  const [current, setCurrent] = React.useState(false);

  return (
    <>
      <Breadcrumbs>
        <Crumb href="#bar" onClick={() => setCurrent(true)} isCurrent={current}>
          Crumb{current ? "" : " not"} current
        </Crumb>
      </Breadcrumbs>

      <div id="bar">Container</div>
    </>
  );
};

Default.storyName = "default";
DefaultCrumb.storyName = "single crumb";
WhenFocusedCrumbBecomesCurrent.storyName = "when focused crumb becomes current";
