import React from "react";
import { Tabs, Tab, TabsProps, TabProps } from ".";
import DrawerSidebarContext from "../drawer/__internal__/drawer-sidebar.context";
import Box from "../box";
import { allModes } from "../../../.storybook/modes";

export default {
  title: "Tabs/Test",
  includeStories: [
    "Default",
    "TabsInSidebar",
    "TabsInSidebarPositionedLeft",
    "WithHorizontalScrollbar",
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

export const WithHorizontalScrollbar = () => {
  return (
    <Tabs>
      {Array.from({ length: 30 }).map((_, index) => (
        <Tab
          tabId={`tab-${index + 1}`}
          title={`Tab ${index + 1}`}
          key={`tab-${index + 1}`}
        >
          Content for tab {index + 1}
        </Tab>
      ))}
    </Tabs>
  );
};

WithHorizontalScrollbar.storyName = "With horizontal scrollbar";
WithHorizontalScrollbar.parameters = {
  chromatic: {
    disableSnapshot: false,
    modes: {
      desktop: allModes.chromatic,
    },
  },
};
