```tsx
export const TabOverflow: Story = ({ ...args }) => {
  const tabCount = 20;
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        {Array.from({ length: tabCount }, (_, index) => (
          <Tab
            key={`tab-${index + 1}--overflow`}
            id={`tab-${index + 1}--overflow`}
            controls={`tab-panel-${index + 1}--overflow`}
            label={`Tab ${index + 1}`}
          />
        ))}
      </TabList>
      {Array.from({ length: tabCount }, (_, index) => (
        <TabPanel
          key={`tab-panel-${index + 1}--overflow`}
          id={`tab-panel-${index + 1}--overflow`}
          tabId={`tab-${index + 1}--overflow`}
        >
          <Typography>{`Content ${index + 1}`}</Typography>
        </TabPanel>
      ))}
    </Tabs>
  );
};
```