import React from "react";
import { Tabs, Tab, TabList, TabPanel } from ".";
import type { TabsProps } from ".";

interface TabsComponentProps extends Omit<TabsProps, "children"> {
  numberOfTabs?: number;
}

export const TabsComponent = ({
  numberOfTabs = 3,
  ...props
}: TabsComponentProps) => (
  <Tabs {...props}>
    <TabList ariaLabel="Sample Tabs">
      {Array.from({ length: numberOfTabs }, (_, index) => (
        <Tab
          key={index}
          id={`tab-${index + 1}`}
          controls={`tab-panel-${index + 1}`}
          label={`Tab ${index + 1}`}
        />
      ))}
    </TabList>
    {Array.from({ length: numberOfTabs }, (_, index) => (
      <TabPanel
        key={index}
        id={`tab-panel-${index + 1}`}
        tabId={`tab-${index + 1}`}
      >
        {`Content ${index + 1}`}
      </TabPanel>
    ))}
  </Tabs>
);

export const TabsWithValidation = (props: Omit<TabsProps, "children">) => (
  <Tabs {...props}>
    <TabList ariaLabel="Sample Tabs">
      <Tab id="tab-1" controls="tab-panel-1" label="Tab 1" error />
      <Tab id="tab-2" controls="tab-panel-2" label="Tab 2" warning />
      <Tab id="tab-3" controls="tab-panel-3" label="Tab 3" />
    </TabList>
    <TabPanel id="tab-panel-1" tabId="tab-1">
      Content 1
    </TabPanel>
    <TabPanel id="tab-panel-2" tabId="tab-2">
      Content 2
    </TabPanel>
    <TabPanel id="tab-panel-3" tabId="tab-3">
      Content 3
    </TabPanel>
  </Tabs>
);
