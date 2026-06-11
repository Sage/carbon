```tsx
export const HTMLButtonType: Story = () => {
  return (
    <Box width="80px" display={"flex"} gap={2}>
      <Button type="button">Button</Button>
      <Button type="reset">Reset</Button>
      <Button type="submit">Submit</Button>
    </Box>
  );
};
```