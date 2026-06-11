```tsx
export const WithCustomLayout: Story = () => {
  return (
    <Box p="4px">
      <Tabs align="left" position="left">
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
```