import React from "react";
import tagComponent, {
  TagProps,
} from "../../../../__internal__/utils/helpers/tags";
import { useTabs } from "../__internal__/contexts/tabs.context";
import { TabProvider } from "../__internal__/contexts/tab.context";

export interface TabPanelProps extends TagProps {
  /** The content to be shown in the tab panel */
  children?: React.ReactNode;
  /** The ID of the tab panel */
  id: string;
  /** The ID of the controlling tab */
  tabId: string;
}

export const TabPanel = ({ children, id, tabId, ...rest }: TabPanelProps) => {
  const { activeTab } = useTabs();

  return (
    <TabProvider tabId={tabId} visible={tabId === activeTab}>
      <div
        id={id}
        role="tabpanel"
        aria-labelledby={tabId}
        {...tagComponent("tab-panel", rest)}
      >
        {children}
      </div>
    </TabProvider>
  );
};

export default TabPanel;
