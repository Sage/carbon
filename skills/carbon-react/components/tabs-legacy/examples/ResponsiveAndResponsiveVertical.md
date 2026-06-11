```tsx
export const Responsive: Story = () => {
  const tabsData = Array(20)
    .fill(0)
    .map((_, index) => ({
      tabId: `tab-${index + 1}`,
      title: `Tab ${index + 1}`,
      key: `tab-${index + 1}`,
      content: `Content for tab ${index + 1}`,
    }));

  return (
    <Box p="4px">
      <Tabs align="left" position="top">
        {tabsData.map((tabData) => (
          <Tab role="tab" {...tabData} key={tabData.key}>
            {tabData.content}
          </Tab>
        ))}
      </Tabs>
    </Box>
  );
};

export const ResponsiveVertical: Story = () => {
  const tabsData = Array(20)
    .fill(0)
    .map((_, index) => ({
      tabId: `tab-${index + 1}`,
      title: `Tab ${index + 1}`,
      key: `tab-${index + 1}`,
      content: `Content for tab ${index + 1}`,
    }));

  return (
    <Box p="4px">
      <Tabs align="left" position="left">
        {tabsData.map((tabData) => (
          <Tab role="tab" {...tabData} key={tabData.key}>
            {tabData.content}
          </Tab>
        ))}
      </Tabs>
    </Box>
  );
};
```