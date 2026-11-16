import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs, Tab, TabList, TabPanel } from ".";
import type { TabProps, TabsProps } from ".";
import Box from "../../box";
import Icon from "../../icon";
import Pill from "../../pill";
import Typography from "../../typography";

const lightGreyBackground: React.CSSProperties = {
  padding: "var(--global-space-layout-xs)",
  backgroundColor: "rgb(244, 245, 246)",
};

const meta: Meta<typeof Tabs> = {
  title: "Tabs/Test",
  component: Tabs,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  decorators: [
    (StoryToRender) => (
      <div style={lightGreyBackground}>
        <StoryToRender />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

type ExampleTab = Omit<TabProps, "id" | "controls">;

const TabsExample = ({
  idPrefix,
  tabs,
  ...args
}: TabsProps & { idPrefix: string; tabs: ExampleTab[] }) => (
  <Tabs {...args}>
    <TabList ariaLabel={`${idPrefix} tabs`}>
      {tabs.map((tabProps, index) => (
        <Tab
          key={`${idPrefix}-tab-${index + 1}`}
          id={`${idPrefix}-tab-${index + 1}`}
          controls={`${idPrefix}-panel-${index + 1}`}
          {...tabProps}
        />
      ))}
    </TabList>
    {tabs.map((_, index) => (
      <TabPanel
        key={`${idPrefix}-panel-${index + 1}`}
        id={`${idPrefix}-panel-${index + 1}`}
        tabId={`${idPrefix}-tab-${index + 1}`}
      >
        <Typography m={2}>{`Content ${index + 1}`}</Typography>
      </TabPanel>
    ))}
  </Tabs>
);

const variantTabs: ExampleTab[] = [
  { label: "Subtext", subtext: "Subtext" },
  { label: "Left slot", leftSlot: <Icon type="home" /> },
  { label: "Right slot", rightSlot: <Pill>Label</Pill> },
  {
    label: "All slots",
    subtext: "Subtext",
    leftSlot: <Icon type="home" />,
    rightSlot: <Pill>Label</Pill>,
  },
  { label: "Error", error: true },
  { label: "Warning", warning: true },
];

const overflowTabs: ExampleTab[] = Array.from({ length: 20 }, (_, index) => ({
  label: `Tab ${index + 1}`,
}));

export const AllVariants: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4}>
      {(["medium", "large"] as const).map((size) =>
        (["horizontal", "vertical"] as const).map((orientation) => (
          <TabsExample
            key={`${size}-${orientation}`}
            idPrefix={`${size}-${orientation}`}
            size={size}
            orientation={orientation}
            tabs={variantTabs}
          />
        )),
      )}
      <TabsExample
        idPrefix="active-error"
        selectedTabId="active-error-tab-5"
        tabs={variantTabs}
      />
      <TabsExample
        idPrefix="active-warning"
        selectedTabId="active-warning-tab-6"
        tabs={variantTabs}
      />
      <Box width="400px">
        <TabsExample idPrefix="overflow" tabs={overflowTabs} />
      </Box>
    </Box>
  ),
};

const validationTabs: ExampleTab[] = [
  { label: "Default" },
  { label: "Info", info: true },
  { label: "Warning", warning: true },
  { label: "Error", error: true },
];

export const FocusAndHover: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4}>
      <TabsExample idPrefix="hover" tabs={validationTabs} />
      {validationTabs.map((tab, index) => (
        <TabsExample
          key={`focus-${index + 1}`}
          idPrefix={`focus-${index + 1}`}
          tabs={[tab]}
        />
      ))}
    </Box>
  ),
  parameters: {
    pseudo: {
      hover: '[role="tab"]',
      focus: '[role="tab"][id^="focus-"]',
    },
  },
};
