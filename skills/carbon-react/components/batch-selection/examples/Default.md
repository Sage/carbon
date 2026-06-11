```tsx
export const Default: Story = () => {
  return (
    <BatchSelection selectedCount={0}>
      <Button size="small" mx={1} buttonType="secondary">
        Select All 38 items
      </Button>
      <IconButton onClick={() => {}}>
        <Icon type="csv" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="bin" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="pdf" />
      </IconButton>
    </BatchSelection>
  );
};
```