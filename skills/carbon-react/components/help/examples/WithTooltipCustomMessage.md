```tsx
export const WithTooltipCustomMessage: Story = () => {
  return (
    <Box m={64}>
      <Help>
        <Icon type="add" color="red" />
        <Icon type="add" color="green" />
        <Icon type="add" color="blue" /> Some <em>helpful</em> text goes here
      </Help>
    </Box>
  );
};
```