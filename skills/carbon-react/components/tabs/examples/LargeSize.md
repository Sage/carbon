```tsx
export const LargeSize: Story = ({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab
          id="tab-1--large-size"
          controls="tab-panel-1--large-size"
          label="Tab One"
        />
        <Tab
          id="tab-2--large-size"
          controls="tab-panel-2--large-size"
          label="Tab Two"
        />
        <Tab
          id="tab-3--large-size"
          controls="tab-panel-3--large-size"
          label="Tab Three"
        />
      </TabList>
      <TabPanel id="tab-panel-1--large-size" tabId="tab-1--large-size">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2--large-size" tabId="tab-2--large-size">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3--large-size" tabId="tab-3--large-size">
        <Typography>Content 3</Typography>
      </TabPanel>
    </Tabs>
  );
};
```