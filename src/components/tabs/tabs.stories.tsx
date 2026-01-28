import React, { useRef } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import Pill from "../pill";
import Icon from "../icon";
import Button from "../button";
import Box from "../box";
import { Tabs, Tab, TabsHandle } from ".";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Textbox from "../textbox";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Tabs> = {
  title: "Deprecated/Tabs",
  component: Tabs,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const DefaultStory: Story = () => (
  <Box p="4px">
    <Tabs renderHiddenTabs={false} align="left" position="top">
      <Tab error id="tab-1" title="Tab 1" key="tab-1">
        Content for tab 1
      </Tab>
      <Tab warning tabId="tab-2" title="Tab 2" key="tab-2">
        Content for tab 2
      </Tab>
      <Tab info tabId="tab-3" title="Tab 3" key="tab-3">
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
);
DefaultStory.storyName = "Default";

export const ProgrammaticFocus: Story = () => {
  const tabsHandle = useRef<TabsHandle>(null);

  return (
    <Box p="4px">
      <Tabs ref={tabsHandle} align="left" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
      <Button mt={5} onClick={() => tabsHandle.current?.focusTab("tab-4")}>
        Focus Tab 4
      </Button>
    </Box>
  );
};
ProgrammaticFocus.storyName = "Focusing a Tab Programmatically";
ProgrammaticFocus.parameters = { chromatic: { disableSnapshot: true } };

export const PositionedTopAlignedRight: Story = () => {
  return (
    <Box p="4px">
      <Tabs align="right" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
PositionedTopAlignedRight.storyName = "Positioned Top Aligned Right";

export const PositionedLeftAndAlignedLeft: Story = () => {
  return (
    <Box p="32px" bg="#f2f5f6">
      <Tabs align="left" position="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          <Box bg="white" p="32px" height="calc(100% - 64px)">
            Content for tab 1
          </Box>
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
PositionedLeftAndAlignedLeft.storyName = "Positioned Left Aligned Left";

export const PositionedLeftAndAlignedRight: Story = () => {
  return (
    <Box p="4px">
      <Tabs align="right" position="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
PositionedLeftAndAlignedRight.storyName = "Positioned Left Aligned Right";

export const WithLinkAsATab: Story = () => {
  return (
    <Box p="4px">
      <Tabs selectedTabId="tab-2" align="left" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
          href="https://carbon.sage.com/"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
      </Tabs>
    </Box>
  );
};
WithLinkAsATab.storyName = "With Link as a Tab";

export const WithSpecifiedTabVisible: Story = () => {
  return (
    <Box p="4px">
      <Tabs selectedTabId="tab-2" align="left" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
WithSpecifiedTabVisible.storyName = "With Specified Tab Visible";

export const WithoutExtendedDividingLine: Story = () => {
  return (
    <Box p="4px">
      <Tabs extendedLine={false} align="left" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
WithoutExtendedDividingLine.storyName = "Without Extended Dividing Line";

export const WithLargeTabsPositionedTop: Story = () => {
  return (
    <Box p="4px">
      <Tabs size="large" align="left" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
WithLargeTabsPositionedTop.storyName = "With Large Tabs Positioned Top";

export const WithLargeTabsPositionedLeft: Story = () => {
  return (
    <Box p="4px">
      <Tabs size="large" align="left" position="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
WithLargeTabsPositionedLeft.storyName = "With Large Tabs Positioned Left";

export const WithBordersPositionedTop: Story = () => {
  return (
    <Box p="4px">
      <Tabs borders="on" align="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
WithBordersPositionedTop.storyName = "With Borders Positioned Top";

export const WithNoSidesPositionedTop: Story = () => {
  return (
    <Box p="4px">
      <Tabs borders="no sides" align="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
WithNoSidesPositionedTop.storyName = "With No Sides Positioned Top";

export const WithBordersPositionedLeft: Story = () => {
  return (
    <Box p="4px">
      <Tabs borders="on" align="left" position="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
WithBordersPositionedLeft.storyName = "With Borders Positioned Left";

export const WithNoSidesPositionedLeft: Story = () => {
  return (
    <Box p="4px">
      <Tabs borders="no sides" align="left" position="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
};
WithNoSidesPositionedLeft.storyName = "With No Sides Positioned Left";

export const WithAdditionalTitleSiblings: Story = () => {
  return (
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
          Content for tab 1
        </Tab>
        <Tab tabId="tab-2" title="Tab 2" key="tab-2" titlePosition="after">
          Content for tab 2
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
          Content for tab 3
        </Tab>
      </Tabs>
    </Box>
  );
};
WithAdditionalTitleSiblings.storyName = "With Additional Title Siblings";

export const WithAdditionalTitleSiblingsSizeLarge: Story = () => {
  return (
    <Box p="4px">
      <Tabs size="large" align="left" position="top">
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
          Content for tab 1
        </Tab>
        <Tab tabId="tab-2" title="Tab 2" key="tab-2" titlePosition="after">
          Content for tab 2
        </Tab>
        <Tab
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
          siblings={[
            <Pill size="S" pillRole="status" fill key="pill">
              12
            </Pill>,
            <Icon type="settings" key="icon" />,
          ]}
          titlePosition="after"
        >
          Content for tab 3
        </Tab>
      </Tabs>
    </Box>
  );
};
WithAdditionalTitleSiblingsSizeLarge.storyName =
  "With Additional Title Siblings Size Large";

export const WithCustomLayout: Story = () => {
  return (
    <Box p="4px">
      <Tabs size="default" align="left" position="left">
        <Tab
          tabId="tab-1"
          key="tab-1"
          customLayout={
            <Box
              px={3}
              py={1}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              Tab 1
              <Box>
                <Icon type="settings" color="primary" />
                <Icon type="home" />
              </Box>
            </Box>
          }
        >
          Content for tab 1
        </Tab>
        <Tab
          tabId="tab-2"
          key="tab-2"
          customLayout={
            <Box
              px={3}
              py={1}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              Tab 2
              <Box>
                <Icon type="settings" color="primary" />
                <Icon type="home" />
              </Box>
            </Box>
          }
        >
          Content for tab 2
        </Tab>
        <Tab
          tabId="tab-3"
          key="tab-3"
          customLayout={
            <Box
              px={3}
              py={1}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              Tab 3
              <Box>
                <Icon type="settings" color="primary" />
                <Icon type="home" />
              </Box>
            </Box>
          }
        >
          Content for tab 3
        </Tab>
      </Tabs>
    </Box>
  );
};
WithCustomLayout.storyName = "With Custom Layout";

export const WithAlternateStyling: Story = () => {
  return (
    <Box p="4px">
      <Tabs variant="alternate" align="left" position="left">
        <Tab tabId="tab-1" title="Tab 1" key="tab-1">
          Content for tab 1
        </Tab>
        <Tab tabId="tab-2" title="Tab 2" key="tab-2">
          Content for tab 2
        </Tab>
        <Tab tabId="tab-3" title="Tab 3" key="tab-3">
          Content for tab 3
        </Tab>
      </Tabs>
    </Box>
  );
};
WithAlternateStyling.storyName = "With Alternate Styling";

export const WithHeaderWidth: Story = () => {
  return (
    <Box p="4px">
      <Tabs headerWidth="400px" align="left" position="left">
        <Tab
          tabId="tabs-1-tab-1"
          title="Very long title for Tab 1 without headerWidth prop it would be not well aligned with the second Tabs group"
          key="tabs-1-tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab tabId="tabs-1-tab-2" title="Tab 2" key="tabs-1-tab-2">
          Content for tab 2
        </Tab>
      </Tabs>
      <Tabs headerWidth="400px" align="left" position="left">
        <Tab tabId="tabs-2-tab-1" title="Tab 1" key="tabs-2-tab-1">
          Content for tab 1
        </Tab>
        <Tab tabId="tabs-2-tab-2" title="Tab 2" key="tabs-2-tab-2">
          Content for tab 2
        </Tab>
      </Tabs>
    </Box>
  );
};
WithHeaderWidth.storyName = "With Header Width";

export const WithCustomSpacing: Story = () => {
  return (
    <Box p="4px">
      <Tabs m={8} align="left" position="top">
        <Tab tabId="tab-1" title="Tab 1" key="tab-1" p={5}>
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
  );
};
WithCustomSpacing.storyName = "With Custom Spacing";

export const Responsive: Story = () => {
  const tabsData = Array(20)
    .fill(0)
    .map((_, index) => ({
      tabId: `tab-${index + 1}`,
      title: `Tab ${index + 1}`,
      key: `tab-${index + 1}`,
      content: `Content for tab ${index + 1}`,
    }));

  return (
    <Box p="4px">
      <Tabs align="left" position="top">
        {tabsData.map((tabData) => (
          <Tab role="tab" {...tabData} key={tabData.key}>
            {tabData.content}
          </Tab>
        ))}
      </Tabs>
    </Box>
  );
};
Responsive.storyName = "Responsive - Horizontal";

export const ResponsiveVertical: Story = () => {
  const tabsData = Array(20)
    .fill(0)
    .map((_, index) => ({
      tabId: `tab-${index + 1}`,
      title: `Tab ${index + 1}`,
      key: `tab-${index + 1}`,
      content: `Content for tab ${index + 1}`,
    }));

  return (
    <Box p="4px">
      <Tabs align="left" position="left">
        {tabsData.map((tabData) => (
          <Tab role="tab" {...tabData} key={tabData.key}>
            {tabData.content}
          </Tab>
        ))}
      </Tabs>
    </Box>
  );
};
ResponsiveVertical.storyName = "Responsive - Vertical";

export const WithValidationState = () => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <Tabs position="top">
        <Tab
          errorMessage="Tab Error Message"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          <Textbox
            label="Textbox"
            error="Error Message"
            m={2}
            onChange={() => {}}
            value=""
          />
        </Tab>
        <Tab
          warningMessage="Tab Warning Message"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          <Textbox
            label="Textbox"
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
WithValidationState.storyName = "With Validation State";
WithValidationState.parameters = {
  chromatic: { disableSnapshot: true },
};
