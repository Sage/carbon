import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Tabs, Tab, TabList, TabPanel } from "./tabs.component";
import Box from "../box";
import Button from "../button";
import Icon from "../icon";
import Pill from "../pill";
import Typography from "../typography";
import Form from "../form";
import Textbox from "../textbox";

const meta: Meta<typeof Tabs> = {
  title: "Tabs",
  component: Tabs,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  decorators: [
    (StoryToRender) => (
      <Box backgroundColor="#ddd" p={3}>
        <StoryToRender />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const DefaultStory: Story = ({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="Tab One" />
        <Tab id="tab-2" controls="tab-panel-2" label="Tab Two" />
        <Tab id="tab-3" controls="tab-panel-3" label="Tab Three" />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2" tabId="tab-2">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3" tabId="tab-3">
        <Typography>Content 3</Typography>
      </TabPanel>
    </Tabs>
  );
};
DefaultStory.storyName = "Default";
DefaultStory.args = {
  orientation: "horizontal",
  size: "medium",
};

export const LargeSize: Story = ({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="Tab One" />
        <Tab id="tab-2" controls="tab-panel-2" label="Tab Two" />
        <Tab id="tab-3" controls="tab-panel-3" label="Tab Three" />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2" tabId="tab-2">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3" tabId="tab-3">
        <Typography>Content 3</Typography>
      </TabPanel>
    </Tabs>
  );
};
LargeSize.storyName = "Large Size";
LargeSize.args = {
  orientation: "horizontal",
  size: "large",
};

export const VerticalOrientation: Story = ({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="Tab One" />
        <Tab id="tab-2" controls="tab-panel-2" label="Tab Two" />
        <Tab id="tab-3" controls="tab-panel-3" label="Tab Three" />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2" tabId="tab-2">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3" tabId="tab-3">
        <Typography>Content 3</Typography>
      </TabPanel>
    </Tabs>
  );
};
VerticalOrientation.storyName = "Vertical Orientation";
VerticalOrientation.args = {
  orientation: "vertical",
  size: "medium",
};

export const TabOverflow: Story = ({ ...args }) => {
  const tabCount = 20;
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        {Array.from({ length: tabCount }, (_, index) => (
          <Tab
            key={`tab-${index + 1}`}
            id={`tab-${index + 1}`}
            controls={`tab-panel-${index + 1}`}
            label={`Tab ${index + 1}`}
          />
        ))}
      </TabList>
      {Array.from({ length: tabCount }, (_, index) => (
        <TabPanel
          key={`tab-panel-${index + 1}`}
          id={`tab-panel-${index + 1}`}
          tabId={`tab-${index + 1}`}
        >
          <Typography>{`Content ${index + 1}`}</Typography>
        </TabPanel>
      ))}
    </Tabs>
  );
};
TabOverflow.storyName = "Tab Overflow";
TabOverflow.args = {
  orientation: "horizontal",
  size: "medium",
};

export const TitleSlots: Story = ({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="No Slots" />
        <Tab
          id="tab-2"
          controls="tab-panel-2"
          label="Left slot"
          leftSlot={<Icon type="home" />}
        />
        <Tab
          id="tab-3"
          controls="tab-panel-3"
          label="Right slot"
          rightSlot={<Pill>Label</Pill>}
        />
        <Tab
          id="tab-4"
          controls="tab-panel-4"
          label="Both slots"
          leftSlot={<Icon type="home" />}
          rightSlot={<Pill>Label</Pill>}
        />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2" tabId="tab-2">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3" tabId="tab-3">
        <Typography>Content 3</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-4" tabId="tab-4">
        <Typography>Content 4</Typography>
      </TabPanel>
    </Tabs>
  );
};
TitleSlots.storyName = "Title Slots";
TitleSlots.args = {
  orientation: "horizontal",
  size: "medium",
};

export const CustomTitle: Story = ({ ...args }) => {
  const customHeader = (index: number) => {
    const colours = ["red", "green", "blue"];
    return (
      <div>
        <Typography variant="h5" color={colours[index]}>
          Tab {index}
        </Typography>
      </div>
    );
  };

  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label={customHeader(0)} />
        <Tab id="tab-2" controls="tab-panel-2" label={customHeader(1)} />
        <Tab id="tab-3" controls="tab-panel-3" label={customHeader(2)} />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2" tabId="tab-2">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3" tabId="tab-3">
        <Typography>Content 3</Typography>
      </TabPanel>
    </Tabs>
  );
};
CustomTitle.storyName = "Custom Title";
CustomTitle.args = {
  orientation: "horizontal",
  size: "medium",
};

export const WithErrorAndWarning: Story = ({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="Default" />
        <Tab id="tab-2" controls="tab-panel-2" label="Error" error />
        <Tab id="tab-3" controls="tab-panel-3" label="Warning" warning />
      </TabList>

      <TabPanel id="tab-panel-1" tabId={"tab-1"}>
        Content 1
      </TabPanel>

      <TabPanel id="tab-panel-2" tabId={"tab-2"}>
        Content 2
      </TabPanel>

      <TabPanel id="tab-panel-3" tabId={"tab-3"}>
        Content 3
      </TabPanel>
    </Tabs>
  );
};
WithErrorAndWarning.storyName = "With Error And Warning";
WithErrorAndWarning.args = {
  orientation: "horizontal",
  size: "medium",
};

export const WithErrorAndWarningInForm: Story = ({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="Default" />
        <Tab id="tab-2" controls="tab-panel-2" label="Error" />
        <Tab id="tab-3" controls="tab-panel-3" label="Warning" />
      </TabList>

      <TabPanel id="tab-panel-1" tabId={"tab-1"}>
        <Form
          onSubmit={() => {}}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Textbox label="Textbox" onChange={() => {}} value="" />
        </Form>
      </TabPanel>

      <TabPanel id="tab-panel-2" tabId={"tab-2"}>
        <Form
          onSubmit={() => {}}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Textbox label="Textbox" onChange={() => {}} value="" error />
        </Form>
      </TabPanel>

      <TabPanel id="tab-panel-3" tabId={"tab-3"}>
        <Form
          onSubmit={() => {}}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Textbox label="Textbox" onChange={() => {}} value="" warning />
        </Form>
      </TabPanel>
    </Tabs>
  );
};
WithErrorAndWarningInForm.storyName = "With Error And Warning In Form";
WithErrorAndWarningInForm.args = {
  orientation: "horizontal",
  size: "medium",
};

export const PreSelectedTab: Story = ({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1" controls="tab-panel-1" label="Tab One" />
        <Tab id="tab-2" controls="tab-panel-2" label="Tab Two" />
        <Tab id="tab-3" controls="tab-panel-3" label="Tab Three" />
      </TabList>
      <TabPanel id="tab-panel-1" tabId="tab-1">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2" tabId="tab-2">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3" tabId="tab-3">
        <Typography>Content 3</Typography>
      </TabPanel>
    </Tabs>
  );
};
PreSelectedTab.storyName = "Pre-Selected Tab";
PreSelectedTab.args = {
  orientation: "horizontal",
  size: "medium",
  selectedTabId: "tab-3",
};

export const UnitTestingMock = () => {
  return <Tab controls="" id="tab-1" label="Tab" />;
};
