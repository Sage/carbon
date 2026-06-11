```tsx
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
```