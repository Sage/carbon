import React from "react";
import Tabs, { Tab, TabList, TabPanel } from "./tabs.component";
import Typography from "../../typography";
import I18nProvider from "../../i18n-provider";
import { enGB } from "../../../locales";

const DefaultTabsComponent = ({ numberOfTabs = 3, ...args }) => {
  return (
    <I18nProvider
      locale={{
        tabs: {
          ...enGB.tabs,
          scrollLeftText: () => "foo",
          scrollRightText: () => "bar",
        },
      }}
    >
      <Tabs {...args}>
        <TabList ariaLabel="Sample Tabs">
          {Array.from({ length: numberOfTabs }, (_, index) => (
            <Tab
              key={`tab-${index + 1}`}
              id={`tab-${index + 1}`}
              controls={`tab-panel-${index + 1}`}
              label={`Tab ${index + 1}`}
            />
          ))}
        </TabList>
        {Array.from({ length: numberOfTabs }, (_, index) => (
          <TabPanel
            key={`tab-panel-${index + 1}`}
            id={`tab-panel-${index + 1}`}
            tabId={`tab-${index + 1}`}
          >
            <Typography>{`Content ${index + 1}`}</Typography>
          </TabPanel>
        ))}
      </Tabs>
    </I18nProvider>
  );
};

export default DefaultTabsComponent;
