```tsx
export const InOverflowHiddenContainer: Story = () => (
  <Accordion title="Heading">
    <Box p={4}>
      <SplitButton size="large" subtext="subtext" text="Split button">
        <Button size="large">Button 1</Button>
        <Button size="large">Button 2</Button>
        <Button size="large">Button 3</Button>
      </SplitButton>
    </Box>
  </Accordion>
);
```