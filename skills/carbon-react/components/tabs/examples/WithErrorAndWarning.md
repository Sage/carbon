```tsx
export const WithErrorAndWarning: Story = ({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab
          id="tab-1--validation"
          controls="tab-panel-1--validation"
          label="Default"
        />
        <Tab
          id="tab-2--validation"
          controls="tab-panel-2--validation"
          label="Error"
          error
        />
        <Tab
          id="tab-3--validation"
          controls="tab-panel-3--validation"
          label="Warning"
          warning
        />
      </TabList>

      <TabPanel id="tab-panel-1--validation" tabId={"tab-1--validation"}>
        Content 1
      </TabPanel>

      <TabPanel id="tab-panel-2--validation" tabId={"tab-2--validation"}>
        Content 2
      </TabPanel>

      <TabPanel id="tab-panel-3--validation" tabId={"tab-3--validation"}>
        Content 3
      </TabPanel>
    </Tabs>
  );
};
```