```tsx
export const DefaultWithCustomDataTags: Story = () => {
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
        cancelButtonDataProps={{
          "data-element": "bang",
          "data-role": "wallop",
        }}
        confirmButtonDataProps={{
          "data-element": "bar",
          "data-role": "wiz",
        }}
      >
        Content
      </Confirm>
    </>
  );
};
```