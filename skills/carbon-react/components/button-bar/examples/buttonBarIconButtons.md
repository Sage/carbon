```tsx
export const buttonBarIconButtons: Story = () => {
  return (
    <ButtonBar ml={2} mt={2}>
      <IconButton onClick={() => {}}>
        <Icon type="csv" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="pdf" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="bin" />
      </IconButton>
    </ButtonBar>
  );
};
```