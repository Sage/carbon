```tsx
export const HeaderSpacing: Story = () => {
  return (
    <Accordion
      title="Title"
      headerSpacing={{
        padding: "24px 0",
      }}
    >
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
      <Box my={2}>Content</Box>
    </Accordion>
  );
};
```