```tsx
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
```