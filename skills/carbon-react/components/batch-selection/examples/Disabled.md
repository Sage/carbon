```tsx
export const Disabled: Story = () => {
  return (
    <BatchSelection selectedCount={4} disabled>
      <IconButton onClick={() => {}}>
        <Icon type="csv" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="bin" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="pdf" />
      </IconButton>
      <Button iconType="home" mr="3px">
        Button
      </Button>
      <Link icon="admin">This is a link</Link>
      <Link icon="admin" onClick={() => {}}>
        This is actually a button but looks like a link
      </Link>
    </BatchSelection>
  );
};
```