```tsx
export const PreSelectedTab: Story = ({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab
          id="tab-1--pre-selected"
          controls="tab-panel-1--pre-selected"
          label="Tab One"
        />
        <Tab
          id="tab-2--pre-selected"
          controls="tab-panel-2--pre-selected"
          label="Tab Two"
        />
        <Tab
          id="tab-3--pre-selected"
          controls="tab-panel-3--pre-selected"
          label="Tab Three"
        />
      </TabList>
      <TabPanel id="tab-panel-1--pre-selected" tabId="tab-1--pre-selected">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2--pre-selected" tabId="tab-2--pre-selected">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3--pre-selected" tabId="tab-3--pre-selected">
        <Typography>Content 3</Typography>
      </TabPanel>
    </Tabs>
  );
};
```