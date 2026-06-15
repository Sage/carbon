```tsx
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
```