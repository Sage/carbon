import React from "react";
import { Tabs, Tab } from ".";
import Icon from "../icon";
import Pill from "../pill";

export const TabsWithLink = () => (
  <Tabs>
    <Tab tabId="tab-1" title="Tab 1" href="https://carbon.sage.com/">
      Content 1
    </Tab>
    <Tab tabId="tab-2" title="Tab 2">
      Content 2
    </Tab>
  </Tabs>
);

export const TabsWithTitleSiblings = () => (
  <Tabs>
    <Tab
      tabId="tab-1"
      title="Tab 1"
      siblings={[
        <Pill size="S" pillRole="status" fill key="pill">
          12
        </Pill>,
        <Icon type="home" key="icon" />,
      ]}
    >
      Content 1
    </Tab>
    <Tab
      tabId="tab-2"
      title="Tab 2"
      siblings={<Icon type="settings" />}
      titlePosition="after"
    >
      Content 2
    </Tab>
  </Tabs>
);
