```tsx
export const ProgrammaticFocus: Story = ({ ...args }) => {
  const tabsHandle = useRef<TabsHandle>(null);

  return (
    <>
      <Tabs {...args}>
        <TabList ariaLabel="Sample Tabs" ref={tabsHandle}>
          <Tab
            id="tab-1--programmatic"
            controls="tab-panel-1--programmatic"
            label="Tab One"
          />
          <Tab
            id="tab-2--programmatic"
            controls="tab-panel-2--programmatic"
            label="Tab Two"
          />
          <Tab
            id="tab-3--programmatic"
            controls="tab-panel-3--programmatic"
            label="Tab Three"
          />
        </TabList>
        <TabPanel id="tab-panel-1--programmatic" tabId="tab-1--programmatic">
          <Typography>Content 1</Typography>
        </TabPanel>
        <TabPanel id="tab-panel-2--programmatic" tabId="tab-2--programmatic">
          <Typography>Content 2</Typography>
        </TabPanel>
        <TabPanel id="tab-panel-3--programmatic" tabId="tab-3--programmatic">
          <Typography>Content 3</Typography>
        </TabPanel>
      </Tabs>
      <Box mt={2} display={"flex"} gap={2}>
        <Button
          buttonType="primary"
          onClick={() => tabsHandle.current?.focusTab("tab-1--programmatic")}
        >
          Focus Tab 1
        </Button>
        <Button
          buttonType="primary"
          onClick={() => tabsHandle.current?.focusTab("tab-2--programmatic")}
        >
          Focus Tab 2
        </Button>
        <Button
          buttonType="primary"
          onClick={() => tabsHandle.current?.focusTab("tab-3--programmatic")}
        >
          Focus Tab 3
        </Button>
      </Box>
    </>
  );
};
```