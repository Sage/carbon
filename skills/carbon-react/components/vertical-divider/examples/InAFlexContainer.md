```tsx
export const InAFlexContainer: Story = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height={24}>
      <Icon type="home" />
      <VerticalDivider h={16} />
      <Icon type="settings" />
      <VerticalDivider h={16} />
      <Icon type="add" />
      <VerticalDivider h={16} />
      <Icon type="minus" />
      <VerticalDivider h={16} />
      <Icon type="info" />
      <VerticalDivider h={16} />
      <Icon type="warning" />
      <VerticalDivider h={16} />
      <Icon type="chevron_up" />
      <VerticalDivider h={16} />
      <Icon type="chevron_down" />
      <VerticalDivider h={16} />
      <Icon type="edit" />
    </Box>
  );
};
```