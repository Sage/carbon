```tsx
export const VerticalOrientation: Story = ({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab
          id="tab-1--vertical"
          controls="tab-panel-1--vertical"
          label="Tab One"
        />
        <Tab
          id="tab-2--vertical"
          controls="tab-panel-2--vertical"
          label="Tab Two"
        />
        <Tab
          id="tab-3--vertical"
          controls="tab-panel-3--vertical"
          label="Tab Three"
        />
      </TabList>
      <TabPanel id="tab-panel-1--vertical" tabId="tab-1--vertical">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2--vertical" tabId="tab-2--vertical">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3--vertical" tabId="tab-3--vertical">
        <Typography>Content 3</Typography>
      </TabPanel>
    </Tabs>
  );
};
```