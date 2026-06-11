```tsx
export const InANonFlexContainer: Story = () => {
  return (
    <Box display="inline-block" width={620} height="auto" my={0} mx={180}>
      <Icon type="home" />
      <Divider displayInline />
      <Icon type="settings" />
      <Divider displayInline />
      <Icon type="add" />
      <Divider displayInline />
      <Icon type="minus" />
      <Divider displayInline />
      <Icon type="info" />
      <Divider displayInline />
      <Icon type="warning" />
      <Divider displayInline />
      <Icon type="chevron_up" />
      <Divider displayInline />
      <Icon type="chevron_down" />
      <Divider displayInline />
      <Icon type="edit" />
    </Box>
  );
};
```