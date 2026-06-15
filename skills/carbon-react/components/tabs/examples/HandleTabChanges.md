```tsx
export const HandleTabChanges: Story = ({ ...args }) => {
  const [newUrl, setNewUrl] = useState("");
  const handleTabChange = useCallback((tabId: string) => {
    setNewUrl(`${window.location}?tabId=${tabId}`);
  }, []);

  return (
    <>
      <Tabs {...args}>
        <TabList ariaLabel="Sample Tabs" onTabChange={handleTabChange}>
          <Tab
            id="tab-1--default"
            controls="tab-panel-1--default"
            label="Tab One"
          />
          <Tab
            id="tab-2--default"
            controls="tab-panel-2--default"
            label="Tab Two"
          />
          <Tab
            id="tab-3--default"
            controls="tab-panel-3--default"
            label="Tab Three"
          />
        </TabList>
        <TabPanel id="tab-panel-1--default" tabId="tab-1--default">
          <Typography>Content 1</Typography>
        </TabPanel>
        <TabPanel id="tab-panel-2--default" tabId="tab-2--default">
          <Typography>Content 2</Typography>
        </TabPanel>
        <TabPanel id="tab-panel-3--default" tabId="tab-3--default">
          <Typography>Content 3</Typography>
        </TabPanel>
      </Tabs>

      <p>URL for tab: {newUrl || "No tab change detected"}</p>
    </>
  );
};
```