```tsx
export const Default: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Alert</Button>
      <Alert
        onCancel={() => setIsOpen(false)}
        title="Title"
        disableEscKey={false}
        height=""
        subtitle="Subtitle"
        showCloseIcon
        size="extra-small"
        open={isOpen}
      >
        This is an example of an alert
      </Alert>
    </>
  );
};
```