```tsx
export const MultipleEditors: Story = () => {
  return (
    <Box mx={2} my={0}>
      <TextEditor labelText="Text Editor One" namespace="rte-one" />
      <TextEditor labelText="Text Editor Two" namespace="rte-two" />
    </Box>
  );
};
```