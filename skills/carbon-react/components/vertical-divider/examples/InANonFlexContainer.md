```tsx
export const InANonFlexContainer: Story = () => {
  return (
    <Box display="inline-block" width={620} height="auto" my={0} mx={180}>
      <Icon type="home" />
      <VerticalDivider displayInline />
      <Icon type="settings" />
      <VerticalDivider displayInline />
      <Icon type="add" />
      <VerticalDivider displayInline />
      <Icon type="minus" />
      <VerticalDivider displayInline />
      <Icon type="info" />
      <VerticalDivider displayInline />
      <Icon type="warning" />
      <VerticalDivider displayInline />
      <Icon type="chevron_up" />
      <VerticalDivider displayInline />
      <Icon type="chevron_down" />
      <VerticalDivider displayInline />
      <Icon type="edit" />
    </Box>
  );
};
```