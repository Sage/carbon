```tsx
export const FullScreenSize: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const buttonRef = useRef<ButtonHandle>(null);

  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(true)}>
        Open Dialog
      </Button>
      <Dialog
        size="fullscreen"
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setTimeout(() => buttonRef.current?.focusButton(), 0);
        }}
        title="Title"
        subtitle="Subtitle"
        footer={<Buttons />}
      >
        {dialogContent}
      </Dialog>
    </>
  );
};
```