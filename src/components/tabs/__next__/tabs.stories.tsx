import React, { useRef } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Tabs, Tab, TabList, TabPanel } from ".";
import Box from "../../box";
import Button from "../../button";
import Icon from "../../icon";
import Pill from "../../pill";
import Typography from "../../typography";
import Form from "../../form";
import Textbox from "../../textbox";
import { TabsHandle } from "./tabs.types";

const meta: Meta<typeof Tabs> = {
  title: "Tabs",
  component: Tabs,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  decorators: [
    (StoryToRender) => (
      <Box backgroundColor="#f2f5f6" p={3}>
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
        <Tab
          id="tab-1--default"
          controls="tab-panel-1--default"
          label="Tab One"
        />
        <Tab
          id="tab-2--default"
          controls="tab-panel-2--default"
          label="Tab Two"
        />
        <Tab
          id="tab-3--default"
          controls="tab-panel-3--default"
          label="Tab Three"
        />
      </TabList>
      <TabPanel id="tab-panel-1--default" tabId="tab-1--default">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2--default" tabId="tab-2--default">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3--default" tabId="tab-3--default">
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
        <Tab
          id="tab-1--large-size"
          controls="tab-panel-1--large-size"
          label="Tab One"
        />
        <Tab
          id="tab-2--large-size"
          controls="tab-panel-2--large-size"
          label="Tab Two"
        />
        <Tab
          id="tab-3--large-size"
          controls="tab-panel-3--large-size"
          label="Tab Three"
        />
      </TabList>
      <TabPanel id="tab-panel-1--large-size" tabId="tab-1--large-size">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2--large-size" tabId="tab-2--large-size">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3--large-size" tabId="tab-3--large-size">
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
        <Tab
          id="tab-1--vertical"
          controls="tab-panel-1--vertical"
          label="Tab One"
        />
        <Tab
          id="tab-2--vertical"
          controls="tab-panel-2--vertical"
          label="Tab Two"
        />
        <Tab
          id="tab-3--vertical"
          controls="tab-panel-3--vertical"
          label="Tab Three"
        />
      </TabList>
      <TabPanel id="tab-panel-1--vertical" tabId="tab-1--vertical">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2--vertical" tabId="tab-2--vertical">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3--vertical" tabId="tab-3--vertical">
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
            key={`tab-${index + 1}--overflow`}
            id={`tab-${index + 1}--overflow`}
            controls={`tab-panel-${index + 1}--overflow`}
            label={`Tab ${index + 1}`}
          />
        ))}
      </TabList>
      {Array.from({ length: tabCount }, (_, index) => (
        <TabPanel
          key={`tab-panel-${index + 1}--overflow`}
          id={`tab-panel-${index + 1}--overflow`}
          tabId={`tab-${index + 1}--overflow`}
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
        <Tab id="tab-1--slots" controls="tab-panel-1--slots" label="No Slots" />
        <Tab
          id="tab-2--slots"
          controls="tab-panel-2--slots"
          label="Left slot"
          leftSlot={<Icon type="home" />}
        />
        <Tab
          id="tab-3--slots"
          controls="tab-panel-3--slots"
          label="Right slot"
          rightSlot={<Pill>Label</Pill>}
        />
        <Tab
          id="tab-4--slots"
          controls="tab-panel-4--slots"
          label="Both slots"
          leftSlot={<Icon type="home" />}
          rightSlot={<Pill>Label</Pill>}
        />
      </TabList>
      <TabPanel id="tab-panel-1--slots" tabId="tab-1--slots">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2--slots" tabId="tab-2--slots">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3--slots" tabId="tab-3--slots">
        <Typography>Content 3</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-4--slots" tabId="tab-4--slots">
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

export const WithErrorAndWarning: Story = ({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab
          id="tab-1--validation"
          controls="tab-panel-1--validation"
          label="Default"
        />
        <Tab
          id="tab-2--validation"
          controls="tab-panel-2--validation"
          label="Error"
          error
        />
        <Tab
          id="tab-3--validation"
          controls="tab-panel-3--validation"
          label="Warning"
          warning
        />
      </TabList>

      <TabPanel id="tab-panel-1--validation" tabId={"tab-1--validation"}>
        Content 1
      </TabPanel>

      <TabPanel id="tab-panel-2--validation" tabId={"tab-2--validation"}>
        Content 2
      </TabPanel>

      <TabPanel id="tab-panel-3--validation" tabId={"tab-3--validation"}>
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
        <Tab
          id="tab-1--validation-form"
          controls="tab-panel-1--validation-form"
          label="Default"
        />
        <Tab
          id="tab-2--validation-form"
          controls="tab-panel-2--validation-form"
          label="Error"
        />
        <Tab
          id="tab-3--validation-form"
          controls="tab-panel-3--validation-form"
          label="Warning"
        />
      </TabList>

      <TabPanel
        id="tab-panel-1--validation-form"
        tabId={"tab-1--validation-form"}
      >
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

      <TabPanel
        id="tab-panel-2--validation-form"
        tabId={"tab-2--validation-form"}
      >
        <Form
          onSubmit={() => {}}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Textbox
            label="Textbox"
            onChange={() => {}}
            value=""
            error="Textbox must not be blank"
          />
        </Form>
      </TabPanel>

      <TabPanel
        id="tab-panel-3--validation-form"
        tabId={"tab-3--validation-form"}
      >
        <Form
          onSubmit={() => {}}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Textbox
            label="Textbox"
            onChange={() => {}}
            value=""
            warning="Textbox must not be blank"
          />
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
        <Tab
          id="tab-1--pre-selected"
          controls="tab-panel-1--pre-selected"
          label="Tab One"
        />
        <Tab
          id="tab-2--pre-selected"
          controls="tab-panel-2--pre-selected"
          label="Tab Two"
        />
        <Tab
          id="tab-3--pre-selected"
          controls="tab-panel-3--pre-selected"
          label="Tab Three"
        />
      </TabList>
      <TabPanel id="tab-panel-1--pre-selected" tabId="tab-1--pre-selected">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2--pre-selected" tabId="tab-2--pre-selected">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3--pre-selected" tabId="tab-3--pre-selected">
        <Typography>Content 3</Typography>
      </TabPanel>
    </Tabs>
  );
};
PreSelectedTab.storyName = "Pre-Selected Tab";
PreSelectedTab.args = {
  orientation: "horizontal",
  size: "medium",
  selectedTabId: "tab-3--pre-selected",
};

export const ProgrammaticFocus: Story = ({ ...args }) => {
  const tabsHandle = useRef<TabsHandle>(null);

  return (
    <>
      <Tabs {...args}>
        <TabList ariaLabel="Sample Tabs" ref={tabsHandle}>
          <Tab
            id="tab-1--programmatic"
            controls="tab-panel-1--programmatic"
            label="Tab One"
          />
          <Tab
            id="tab-2--programmatic"
            controls="tab-panel-2--programmatic"
            label="Tab Two"
          />
          <Tab
            id="tab-3--programmatic"
            controls="tab-panel-3--programmatic"
            label="Tab Three"
          />
        </TabList>
        <TabPanel id="tab-panel-1--programmatic" tabId="tab-1--programmatic">
          <Typography>Content 1</Typography>
        </TabPanel>
        <TabPanel id="tab-panel-2--programmatic" tabId="tab-2--programmatic">
          <Typography>Content 2</Typography>
        </TabPanel>
        <TabPanel id="tab-panel-3--programmatic" tabId="tab-3--programmatic">
          <Typography>Content 3</Typography>
        </TabPanel>
      </Tabs>
      <Box mt={2} display={"flex"} gap={2}>
        <Button
          buttonType="primary"
          onClick={() => tabsHandle.current?.focusTab("tab-1--programmatic")}
        >
          Focus Tab 1
        </Button>
        <Button
          buttonType="primary"
          onClick={() => tabsHandle.current?.focusTab("tab-2--programmatic")}
        >
          Focus Tab 2
        </Button>
        <Button
          buttonType="primary"
          onClick={() => tabsHandle.current?.focusTab("tab-3--programmatic")}
        >
          Focus Tab 3
        </Button>
      </Box>
    </>
  );
};
ProgrammaticFocus.storyName = "Focusing a Tab Programmatically";
ProgrammaticFocus.parameters = { chromatic: { disableSnapshot: true } };
