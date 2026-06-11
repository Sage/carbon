```tsx
export const Default: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Confirm</Button>
      <Confirm
        cancelButtonDestructive
        title="Are you sure?"
        subtitle="Subtitle"
        open={isOpen}
        onConfirm={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      >
        Content
      </Confirm>
    </>
  );
};
```