import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Tabs, Tab, TabList, TabPanel } from "./tabs";
import Box from "../../box";
import Icon from "../../icon";
import Pill from "../../pill";

const meta: Meta<typeof Tabs> = {
  title: "Tabs/New",
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const DefaultStory: Story = ({ ...args }) => {
  return (
    <Box backgroundColor="#ddd" p={3}>
      <Tabs {...args}>
        <TabList ariaLabel="Sample Tabs">
          <Tab id="tab-1" controls="tab-panel-1" index={0} label="Default" />
          <Tab
            id="tab-2"
            controls="tab-panel-2"
            index={1}
            label="Left slot"
            leftSlot={
              <Icon color="var(--colorsSemanticNegative500)" type="error" />
            }
          />
          <Tab
            id="tab-3"
            controls="tab-panel-3"
            index={2}
            label="Right slot"
            rightSlot={<Pill>Label</Pill>}
          />
          <Tab
            id="tab-4"
            controls="tab-panel-4"
            index={3}
            label="Both slots"
            leftSlot={
              <Icon color="var(--colorsSemanticNegative500)" type="error" />
            }
            rightSlot={<Pill>Label</Pill>}
          />
          <Tab
            id="tab-5"
            controls="tab-panel-5"
            index={4}
            label={
              <div
                style={{
                  color: "blue",
                  backgroundColor: "yellow",
                  display: "flex",
                  flexDirection: "row",
                  gap: "12px",
                }}
              >
                <span>Custom</span>
                <span>tab</span>
                <Icon type="question" />
                <span>title</span>
              </div>
            }
          />
          <Tab
            id="tab-6"
            controls="tab-panel-6"
            index={5}
            label={
              <div>
                <span>This is bad</span>
              </div>
            }
            leftSlot={
              <Icon color="var(--colorsSemanticNegative500)" type="error" />
            }
          />
        </TabList>
        <TabPanel id="tab-panel-1" labelledBy="tab-1" index={0}>
          Content 1
        </TabPanel>
        <TabPanel id="tab-panel-2" labelledBy="tab-2" index={1}>
          Content 2
        </TabPanel>
        <TabPanel id="tab-panel-3" labelledBy="tab-3" index={2}>
          Content 3
        </TabPanel>
        <TabPanel id="tab-panel-4" labelledBy="tab-4" index={3}>
          Content 4
        </TabPanel>
        <TabPanel id="tab-panel-5" labelledBy="tab-5" index={4}>
          Content 5
        </TabPanel>
        <TabPanel id="tab-panel-6" labelledBy="tab-6" index={5}>
          Content 6
        </TabPanel>
      </Tabs>
    </Box>
  );
};
DefaultStory.storyName = "Default";
DefaultStory.args = {
  colorMode: "light",
  orientation: "horizontal",
  size: "medium",
};
