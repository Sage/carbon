```tsx
export const WithTooltip: Story = () => {
  return (
    <IconButton aria-label="icon-button" onClick={() => {}}>
      <Icon type="home" tooltipMessage="Hey I'm a tooltip!" />
    </IconButton>
  );
};
```