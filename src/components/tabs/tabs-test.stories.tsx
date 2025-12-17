import React, { useState } from "react";
import { Tabs as Tabs, Tab as Tab, TabsProps, TabProps } from ".";
import DrawerSidebarContext from "../drawer/__internal__/drawer-sidebar.context";
import Box from "../box";
import Form from "../form";
import Textbox from "../textbox";
import CarbonProvider from "../carbon-provider";
import { Checkbox } from "../checkbox";
import Pill from "../pill";
import Icon from "../icon";

export default {
  title: "Deprecated/Tabs/Test",
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

export const LegacyDefault = (args: TabsProps) => {
  return (
    <Tabs {...args}>
      <Tab tabId="tab-1" title="Tab 1" key="tab-1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2" key="tab-2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3" key="tab-3">
        Content for tab 3
      </Tab>
      <Tab tabId="tab-4" title="Tab 4" key="tab-4">
        Content for tab 4
      </Tab>
      <Tab tabId="tab-5" title="Tab 5" key="tab-5">
        Content for tab 5
      </Tab>
      <Tab
        tabId="tab-6"
        title="Tab 6"
        key="tab-6"
        href="https://carbon.sage.com/"
      />
    </Tabs>
  );
};

LegacyDefault.storyName = "Default";

export const ValidationPositionTop = () => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <Tabs position="top">
        <Tab tabId="tab-1" title="Tab 1" key="tab-1">
          <Textbox
            label="textbox"
            error="Error Message"
            m={2}
            onChange={() => {}}
            value=""
          />
        </Tab>
        <Tab tabId="tab-2" title="Tab 2" key="tab-2">
          <Textbox
            label="textbox"
            warning="Warning Message"
            m={2}
            onChange={() => {}}
            value=""
          />
        </Tab>
      </Tabs>
    </CarbonProvider>
  );
};
ValidationPositionTop.storyName = "Validation position top";
ValidationPositionTop.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const ValidationPositionLeft = () => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <Tabs position="left">
        <Tab tabId="tab-1" title="Tab 1" key="tab-1">
          <Textbox
            label="textbox"
            error="Error Message"
            m={2}
            onChange={() => {}}
            value=""
          />
        </Tab>
        <Tab tabId="tab-2" title="Tab 2" key="tab-2">
          <Textbox
            label="textbox"
            warning="Warning Message"
            m={2}
            onChange={() => {}}
            value=""
          />
        </Tab>
      </Tabs>
    </CarbonProvider>
  );
};
ValidationPositionLeft.storyName = "Validation position left";
ValidationPositionLeft.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const WithAdditionalTitleSiblingsRedesign = () => {
  const [errors, setErrors] = useState({
    one: true,
    two: false,
    three: false,
  });
  return (
    <CarbonProvider validationRedesignOptIn>
      <Box p="4px">
        <Tabs align="left" position="top">
          <Tab
            tabId="tab-1"
            title="Tab 1"
            key="tab-1"
            siblings={[
              <Pill size="S" pillRole="status" fill key="pill">
                12
              </Pill>,
              <Icon type="home" key="icon" />,
            ]}
            titlePosition="before"
          >
            <Checkbox
              label="Add error"
              error={errors.one}
              onChange={() => setErrors({ ...errors, one: !errors.one })}
              checked={errors.one}
              m={2}
            />
          </Tab>
          <Tab tabId="tab-2" title="Tab 2" key="tab-2" titlePosition="after">
            <Checkbox
              label="Add error"
              error={errors.two}
              checked={errors.two}
              onChange={() => setErrors({ ...errors, two: !errors.two })}
              m={2}
            />
          </Tab>
          <Tab
            tabId="tab-3"
            title="Tab 3"
            key="tab-3"
            siblings={[
              <Pill size="S" pillRole="status" fill key="pill">
                12
              </Pill>,
              <Icon type="home" key="icon" />,
            ]}
            titlePosition="after"
          >
            <Checkbox
              label="Add error"
              error={errors.three}
              checked={errors.three}
              onChange={() => setErrors({ ...errors, three: !errors.three })}
              m={2}
            />
          </Tab>
        </Tabs>
      </Box>
    </CarbonProvider>
  );
};
WithAdditionalTitleSiblingsRedesign.storyName =
  "Validation Additional Title Siblings";
WithAdditionalTitleSiblingsRedesign.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const LegacyResponsiveLarge = () => {
  const tabsData = Array(20)
    .fill(0)
    .map((_, index) => ({
      tabId: `tab-${index + 1}`,
      title: `Tab ${index + 1}`,
      key: `tab-${index + 1}`,
      content: `Content for tab ${index + 1}`,
      errorMessage: index === 5 ? "error" : undefined,
    }));

  return (
    <Box p="4px">
      <Tabs align="left" size="large" position="top">
        {tabsData.map((tabData) => (
          <Tab role="tab" {...tabData} key={tabData.key}>
            {tabData.content}
            {tabData.errorMessage && (
              <Checkbox
                label="Add error"
                error="error"
                onChange={() => {}}
                checked
              />
            )}
          </Tab>
        ))}
      </Tabs>
    </Box>
  );
};
LegacyResponsiveLarge.storyName = "Responsive Large with error";
LegacyResponsiveLarge.parameters = {
  chromatic: { disableSnapshot: false, viewports: [1200, 600] },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const TabsInSidebar = (
  props: Partial<TabsProps> & Partial<TabProps>,
) => {
  return (
    <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
      <Box p="4px">
        <Tabs align="left" position="top" {...props}>
          <Tab tabId="tab-1" title="Tab 1" key="tab-1" {...props}>
            Content for tab 1
          </Tab>
          <Tab tabId="tab-2" title="Tab 2" key="tab-2">
            Content for tab 2
          </Tab>
          <Tab tabId="tab-3" title="Tab 3" key="tab-3">
            Content for tab 3
          </Tab>
          <Tab tabId="tab-4" title="Tab 4" key="tab-4">
            Content for tab 4
          </Tab>
          <Tab tabId="tab-5" title="Tab 5" key="tab-5">
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
          <Tab tabId="tab-1" title="Tab 1" key="tab-1" {...props}>
            Content for tab 1
          </Tab>
          <Tab tabId="tab-2" title="Tab 2" key="tab-2">
            Content for tab 2
          </Tab>
          <Tab tabId="tab-3" title="Tab 3" key="tab-3">
            Content for tab 3
          </Tab>
          <Tab tabId="tab-4" title="Tab 4" key="tab-4">
            Content for tab 4
          </Tab>
          <Tab tabId="tab-5" title="Tab 5" key="tab-5">
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

export const LegacyWithHorizontalScrollbarInsideForm = (args: TabsProps) => {
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
          <Tab tabId="tab-1" title="Tab 1" key="tab-1">
            Content for tab 1
          </Tab>
          <Tab tabId="tab-2" title="Tab 2" key="tab-2">
            Content for tab 2
          </Tab>
          <Tab tabId="tab-3" title="Tab 3" key="tab-3">
            Content for tab 3
          </Tab>
          <Tab tabId="tab-4" title="Tab 4" key="tab-4">
            Content for tab 4
          </Tab>
          <Tab tabId="tab-5" title="Tab 5" key="tab-5">
            Content for tab 5
          </Tab>
          <Tab
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
LegacyWithHorizontalScrollbarInsideForm.storyName =
  "With Horizontal Scrollbar Inside Form";

export const TabsWithHref = (args: TabsProps) => (
  <Box
    margin="var(--spacing200)"
    display="flex"
    flexDirection="column"
    gap="var(--spacing200)"
    minWidth="320px"
    maxWidth="1024px"
  >
    <Tabs {...args}>
      <Tab tabId="tab-1" title="Tab 1" key="tab-1" href="#">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2" key="tab-2" href="#">
        Content for tab 2
      </Tab>
    </Tabs>
    <br />
    <Tabs {...args} position="left">
      <Tab tabId="tab-3" title="Tab 3" key="tab-3" href="#">
        Content for tab 3
      </Tab>
      <Tab tabId="tab-4" title="Tab 4" key="tab-4" href="#">
        Content for tab 4
      </Tab>
    </Tabs>
  </Box>
);
TabsWithHref.storyName = "Tabs as links (with href)";
TabsWithHref.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
