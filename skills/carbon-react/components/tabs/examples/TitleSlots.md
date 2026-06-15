```tsx
export const TitleSlots: Story = ({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1--slots" controls="tab-panel-1--slots" label="No Slots" />
        <Tab
          id="tab-2--slots"
          controls="tab-panel-2--slots"
          label="Left slot"
          leftSlot={<Icon type="home" />}
        />
        <Tab
          id="tab-3--slots"
          controls="tab-panel-3--slots"
          label="Right slot"
          rightSlot={<Pill>Label</Pill>}
        />
        <Tab
          id="tab-4--slots"
          controls="tab-panel-4--slots"
          label="Both slots"
          leftSlot={<Icon type="home" />}
          rightSlot={<Pill>Label</Pill>}
        />
      </TabList>
      <TabPanel id="tab-panel-1--slots" tabId="tab-1--slots">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2--slots" tabId="tab-2--slots">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3--slots" tabId="tab-3--slots">
        <Typography>Content 3</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-4--slots" tabId="tab-4--slots">
        <Typography>Content 4</Typography>
      </TabPanel>
    </Tabs>
  );
};
```