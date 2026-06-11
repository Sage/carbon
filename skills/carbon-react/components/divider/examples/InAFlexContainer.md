```tsx
export const InAFlexContainer: Story = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height={24}>
      <Icon type="home" />
      <Divider h={16} />
      <Icon type="settings" />
      <Divider h={16} />
      <Icon type="add" />
      <Divider h={16} />
      <Icon type="minus" />
      <Divider h={16} />
      <Icon type="info" />
      <Divider h={16} />
      <Icon type="warning" />
      <Divider h={16} />
      <Icon type="chevron_up" />
      <Divider h={16} />
      <Icon type="chevron_down" />
      <Divider h={16} />
      <Icon type="edit" />
    </Box>
  );
};
```