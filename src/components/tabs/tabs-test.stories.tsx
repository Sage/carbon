import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within, expect } from "@storybook/test";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";

import { Tabs, Tab, TabsProps, TabProps } from ".";
import DrawerSidebarContext from "../drawer/__internal__/drawer-sidebar.context";
import Box from "../box";
import Form from "../form";

export default {
  title: "Tabs/Test",
  includeStories: [
    "Default",
    "TabsInSidebar",
    "TabsInSidebarPositionedLeft",
    "WithHorizontalScrollbarInsideForm",
    "TabsClick",
    "TabsKeyboardNav",
  ],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    align: {
      options: ["left", "right"],
      control: {
        type: "select",
      },
    },
    position: {
      options: ["top", "left"],
      control: {
        type: "select",
      },
    },
    borders: {
      options: ["off", "on", "no sides", "no left side", "no right side"],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["default", "large"],
      control: {
        type: "select",
      },
    },
    variant: {
      options: ["default", "alternate"],
      control: {
        type: "select",
      },
    },
  },
};

export const Default = (args: TabsProps) => {
  return (
    <Tabs {...args}>
      <Tab
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
        tabId="tab-1"
        title="Tab 1"
        key="tab-1"
      >
        Content for tab 1
      </Tab>
      <Tab
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
        tabId="tab-2"
        title="Tab 2"
        key="tab-2"
      >
        Content for tab 2
      </Tab>
      <Tab
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
        tabId="tab-3"
        title="Tab 3"
        key="tab-3"
      >
        Content for tab 3
      </Tab>
      <Tab
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
        tabId="tab-4"
        title="Tab 4"
        key="tab-4"
      >
        Content for tab 4
      </Tab>
      <Tab
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
        tabId="tab-5"
        title="Tab 5"
        key="tab-5"
      >
        Content for tab 5
      </Tab>
      <Tab
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
        tabId="tab-6"
        title="Tab 6"
        key="tab-6"
        href="https://carbon.sage.com/"
      />
    </Tabs>
  );
};

Default.storyName = "default";

export const TabsInSidebar = (
  props: Partial<TabsProps> & Partial<TabProps>,
) => {
  return (
    <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
      <Box p="4px">
        <Tabs align="left" position="top" {...props}>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-1"
            title="Tab 1"
            key="tab-1"
            {...props}
          >
            Content for tab 1
          </Tab>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-2"
            title="Tab 2"
            key="tab-2"
          >
            Content for tab 2
          </Tab>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-3"
            title="Tab 3"
            key="tab-3"
          >
            Content for tab 3
          </Tab>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-4"
            title="Tab 4"
            key="tab-4"
          >
            Content for tab 4
          </Tab>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-5"
            title="Tab 5"
            key="tab-5"
          >
            Content for tab 5
          </Tab>
        </Tabs>
      </Box>
    </DrawerSidebarContext.Provider>
  );
};

TabsInSidebar.storyName = "Tabs in sidebar";
TabsInSidebar.parameters = {
  info: { disable: true },
  chromatic: {
    disableSnapshot: false,
  },
};

export const TabsInSidebarPositionedLeft = (
  props: Partial<TabsProps> & Partial<TabProps>,
) => {
  return (
    <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
      <Box p="4px">
        <Tabs align="left" position="left" {...props}>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-1"
            title="Tab 1"
            key="tab-1"
            {...props}
          >
            Content for tab 1
          </Tab>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-2"
            title="Tab 2"
            key="tab-2"
          >
            Content for tab 2
          </Tab>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-3"
            title="Tab 3"
            key="tab-3"
          >
            Content for tab 3
          </Tab>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-4"
            title="Tab 4"
            key="tab-4"
          >
            Content for tab 4
          </Tab>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-5"
            title="Tab 5"
            key="tab-5"
          >
            Content for tab 5
          </Tab>
        </Tabs>
      </Box>
    </DrawerSidebarContext.Provider>
  );
};

TabsInSidebarPositionedLeft.storyName = "Tabs in sidebar positioned left";
TabsInSidebarPositionedLeft.parameters = {
  info: { disable: true },
  chromatic: {
    disableSnapshot: false,
  },
};

export const WithHorizontalScrollbarInsideForm = (args: TabsProps) => {
  const onSubmit = () => {};

  return (
    <Form onSubmit={onSubmit}>
      <Box
        margin="var(--spacing200)"
        display="flex"
        flexDirection="column"
        gap="var(--spacing200)"
        minWidth="320px"
        maxWidth="1024px"
      >
        <Tabs {...args}>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-1"
            title="Tab 1"
            key="tab-1"
          >
            Content for tab 1
          </Tab>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-2"
            title="Tab 2"
            key="tab-2"
          >
            Content for tab 2
          </Tab>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-3"
            title="Tab 3"
            key="tab-3"
          >
            Content for tab 3
          </Tab>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-4"
            title="Tab 4"
            key="tab-4"
          >
            Content for tab 4
          </Tab>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-5"
            title="Tab 5"
            key="tab-5"
          >
            Content for tab 5
          </Tab>
          <Tab
            errorMessage="error"
            warningMessage="warning"
            infoMessage="info"
            tabId="tab-6"
            title="Tab 6"
            key="tab-6"
            href="https://carbon.sage.com/"
          />
        </Tabs>
      </Box>
    </Form>
  );
};

WithHorizontalScrollbarInsideForm.storyName =
  "WithHorizontalScrollbarInsideForm";

// Play Functions
const meta: Meta<typeof Tabs> = {
  title: "Tabs",
  component: Tabs,
  parameters: { chromatic: { disableSnapshot: true } },
};

export { meta };

type Story = StoryObj<typeof Tabs>;

const TabsDefaultComponent = () => {
  return (
    <Tabs>
      <Tab
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
        tabId="tab-1"
        title="Tab 1"
        key="tab-1"
      >
        Content for tab 1
      </Tab>
      <Tab
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
        tabId="tab-2"
        title="Tab 2"
        key="tab-2"
      >
        Content for tab 2
      </Tab>
      <Tab
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
        tabId="tab-3"
        title="Tab 3"
        key="tab-3"
      >
        Content for tab 3
      </Tab>
      <Tab
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
        tabId="tab-4"
        title="Tab 4"
        key="tab-4"
      >
        Content for tab 4
      </Tab>
      <Tab
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
        tabId="tab-5"
        title="Tab 5"
        key="tab-5"
      >
        Content for tab 5
      </Tab>
      <Tab
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
        tabId="tab-6"
        title="Tab 6"
        key="tab-6"
        href="https://carbon.sage.com/"
      />
    </Tabs>
  );
};

export const TabsClick: Story = {
  render: () => <TabsDefaultComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("tab", { name: "Tab 2" }));
  },
};

export const TabsKeyboardNav: Story = {
  render: () => <TabsDefaultComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await userInteractionPause(300);
    await userEvent.keyboard("{arrowright}");
    await userInteractionPause(300);
    await userEvent.keyboard("{arrowright}");
    await userInteractionPause(300);
    await userEvent.keyboard("{arrowright}");
    await userInteractionPause(300);
    await userEvent.keyboard("{arrowright}");
    await userInteractionPause(300);
    await userEvent.keyboard("{arrowright}");

    await waitFor(() => {
      expect(canvas.getByRole("tab", { name: "Tab 6" })).toHaveFocus();
    });
  },
};
