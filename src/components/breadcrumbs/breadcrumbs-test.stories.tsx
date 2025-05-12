import React from "react";
import { userEvent, within } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";

import { Breadcrumbs, BreadcrumbsProps } from ".";
import { Crumb, CrumbProps } from "./crumb";

export default {
  title: "Breadcrumbs/Test",
  includeStories: [
    "DefaultCrumb",
    "WhenFocusedCrumbBecomesCurrent",
    "BreadcrumbFocused",
  ],
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

// Play Functions

const meta: Meta<typeof Breadcrumbs> = {
  title: "Breadcrumbs",
  component: Breadcrumbs,
};

export { meta };

type Story = StoryObj<typeof Breadcrumbs>;

export const DefaultBreadcrumbComponent = () => {
  return (
    <Breadcrumbs aria-label="Default breadcrumbs">
      <Crumb>Breadcrumb 1</Crumb>
    </Breadcrumbs>
  );
};

export const BreadcrumbFocused: Story = {
  render: () => <DefaultBreadcrumbComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const crumb = canvas.getByTestId("link-anchor");

    await userEvent.click(crumb);
  },
  decorators: [
    (StoryToRender) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <StoryToRender />
      </div>
    ),
  ],
};

BreadcrumbFocused.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
  pseudo: { focus: true },
};
