import React, { useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs, Tab, TabList, TabPanel } from ".";
import type { TabsHandle, TabsProps } from ".";
import Box from "../../box";
import Button from "../../button/__next__";
import Icon from "../../icon";
import Pill from "../../pill";
import Typography from "../../typography";
import Form from "../../form";
import Textbox from "../../textbox";

const lightGreyBackground: React.CSSProperties = {
  padding: "var(--global-space-layout-xs)",
  backgroundColor: "rgb(244, 245, 246)",
};

const MAX_PLAYGROUND_TABS = 20;
const playgroundTabIds = Array.from(
  { length: MAX_PLAYGROUND_TABS },
  (_, index) => `tab-${index + 1}--playground`,
);

type PlaygroundArgs = TabsProps & {
  tabCount: number;
  tabSubtext: string;
  tabLeftSlot: boolean;
  tabRightSlot: boolean;
  tabValidation: "none" | "error" | "warning";
};

const meta: Meta<PlaygroundArgs> = {
  title: "Tabs",
  component: Tabs,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    (StoryToRender) => (
      <div style={lightGreyBackground}>
        <StoryToRender />
      </div>
    ),
  ],
  argTypes: {
    orientation: {
      options: ["horizontal", "vertical"],
      control: { type: "radio" },
    },
    size: {
      options: ["medium", "large"],
      control: { type: "radio" },
    },
    selectedTabId: {
      options: playgroundTabIds,
      control: { type: "select" },
    },
    tabCount: {
      description:
        "Number of tabs to render. Increase it to see the responsive overflow behaviour.",
      control: { type: "number", min: 1, max: MAX_PLAYGROUND_TABS },
    },
    tabSubtext: {
      description: "Sets the `subtext` prop on each tab.",
      control: "text",
      table: { category: "Tab" },
    },
    tabLeftSlot: {
      description: "Renders an icon in the `leftSlot` of each tab.",
      control: "boolean",
      table: { category: "Tab" },
    },
    tabRightSlot: {
      description: "Renders a pill in the `rightSlot` of each tab.",
      control: "boolean",
      table: { category: "Tab" },
    },
    tabValidation: {
      description: "Sets the `error` or `warning` prop on the tab.",
      options: ["none", "error", "warning"],
      control: { type: "radio" },
      table: { category: "Tab" },
    },
  },
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  render: ({
    tabCount,
    tabSubtext,
    tabLeftSlot,
    tabRightSlot,
    tabValidation,
    ...tabsArgs
  }) => {
    const tabIds = playgroundTabIds.slice(0, tabCount);

    return (
      <Tabs key={tabsArgs.selectedTabId} {...tabsArgs}>
        <TabList ariaLabel="Playground Tabs">
          {tabIds.map((id, index) => (
            <Tab
              key={id}
              id={id}
              controls={`tab-panel-${index + 1}--playground`}
              label={`Tab ${index + 1}`}
              subtext={tabSubtext || undefined}
              leftSlot={tabLeftSlot ? <Icon type="home" /> : undefined}
              rightSlot={tabRightSlot ? <Pill>Label</Pill> : undefined}
              error={index === 0 && tabValidation === "error"}
              warning={index === 0 && tabValidation === "warning"}
            />
          ))}
        </TabList>
        {tabIds.map((id, index) => (
          <TabPanel
            key={id}
            id={`tab-panel-${index + 1}--playground`}
            tabId={id}
          >
            <Typography m={2}>{`Content ${index + 1}`}</Typography>
          </TabPanel>
        ))}
      </Tabs>
    );
  },
  args: {
    orientation: "horizontal",
    size: "medium",
    selectedTabId: playgroundTabIds[0],
    tabCount: 3,
    tabSubtext: "",
    tabLeftSlot: false,
    tabRightSlot: false,
    tabValidation: "none",
  },
  parameters: {
    controls: {
      exclude: ["children", "labelledBy"],
    },
  },
};

export const WithErrorAndWarningInForm: Story = {
  render: () => (
    <Tabs>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1--form" controls="tab-panel-1--form" label="Default" />
        <Tab id="tab-2--form" controls="tab-panel-2--form" label="Error" />
        <Tab id="tab-3--form" controls="tab-panel-3--form" label="Warning" />
      </TabList>
      <TabPanel id="tab-panel-1--form" tabId="tab-1--form">
        <Form>
          <Textbox label="Textbox" value="" onChange={() => {}} />
        </Form>
      </TabPanel>
      <TabPanel id="tab-panel-2--form" tabId="tab-2--form">
        <Form>
          <Textbox
            label="Textbox"
            value=""
            onChange={() => {}}
            error="Textbox must not be blank"
          />
        </Form>
      </TabPanel>
      <TabPanel id="tab-panel-3--form" tabId="tab-3--form">
        <Form>
          <Textbox
            label="Textbox"
            value=""
            onChange={() => {}}
            warning="Textbox must not be blank"
          />
        </Form>
      </TabPanel>
    </Tabs>
  ),
};

export const ProgrammaticFocus: Story = {
  render: () => {
    const tabsHandle = useRef<TabsHandle>(null);
    const tabIds = ["tab-1--focus", "tab-2--focus", "tab-3--focus"];

    return (
      <>
        <Tabs>
          <TabList ariaLabel="Sample Tabs" ref={tabsHandle}>
            {tabIds.map((id, index) => (
              <Tab
                key={id}
                id={id}
                controls={`tab-panel-${index + 1}--focus`}
                label={`Tab ${index + 1}`}
              />
            ))}
          </TabList>
          {tabIds.map((id, index) => (
            <TabPanel key={id} id={`tab-panel-${index + 1}--focus`} tabId={id}>
              <Typography m={2}>{`Content ${index + 1}`}</Typography>
            </TabPanel>
          ))}
        </Tabs>
        <Box mt={2} display="flex" gap={2}>
          {tabIds.map((id, index) => (
            <Button key={id} onClick={() => tabsHandle.current?.focusTab(id)}>
              {`Focus Tab ${index + 1}`}
            </Button>
          ))}
        </Box>
      </>
    );
  },
};

export const HandleTabChanges: Story = {
  render: () => {
    const [newUrl, setNewUrl] = useState("");

    return (
      <>
        <Tabs>
          <TabList
            ariaLabel="Sample Tabs"
            onTabChange={(tabId) =>
              setNewUrl(`${window.location.href}?tabId=${tabId}`)
            }
          >
            <Tab
              id="tab-1--change"
              controls="tab-panel-1--change"
              label="Tab 1"
            />
            <Tab
              id="tab-2--change"
              controls="tab-panel-2--change"
              label="Tab 2"
            />
            <Tab
              id="tab-3--change"
              controls="tab-panel-3--change"
              label="Tab 3"
            />
          </TabList>
          <TabPanel id="tab-panel-1--change" tabId="tab-1--change">
            <Typography m={2}>Content 1</Typography>
          </TabPanel>
          <TabPanel id="tab-panel-2--change" tabId="tab-2--change">
            <Typography m={2}>Content 2</Typography>
          </TabPanel>
          <TabPanel id="tab-panel-3--change" tabId="tab-3--change">
            <Typography m={2}>Content 3</Typography>
          </TabPanel>
        </Tabs>
        <Typography>
          URL for tab: {newUrl || "No tab change detected"}
        </Typography>
      </>
    );
  },
};
