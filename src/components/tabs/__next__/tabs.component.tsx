import React, { useRef } from "react";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import guid from "../../../__internal__/utils/helpers/guid";
import { TabsProvider } from "./__internal__/contexts/tabs.context";
import { StyledTabs } from "./tabs.style";

export interface TabsProps extends TagProps {
  /** The tab list to be rendered within this set of tabs  */
  children?: React.ReactNode;
  /** The label associated with this set of tabs, for assistive technologies */
  labelledBy?: string;
  /** The orientation of the tabs */
  orientation?: "horizontal" | "vertical";
  /** The pre-selected tab to show e.g when restoring from URL  */
  selectedTabId?: string;
  /** The size of the tabs to use */
  size?: "medium" | "large";
}

export const Tabs = ({
  children,
  labelledBy = "",
  orientation = "horizontal",
  selectedTabId,
  size = "medium",
  ...rest
}: TabsProps) => {
  const id = useRef(guid());

  return (
    <TabsProvider
      labelledBy={labelledBy}
      orientation={orientation}
      selectedTabId={selectedTabId}
      size={size}
    >
      <StyledTabs
        id={`tabs-container-${id.current}`}
        $orientation={orientation}
        {...tagComponent("tabs", rest)}
      >
        {children}
      </StyledTabs>
    </TabsProvider>
  );
};

export default Tabs;
