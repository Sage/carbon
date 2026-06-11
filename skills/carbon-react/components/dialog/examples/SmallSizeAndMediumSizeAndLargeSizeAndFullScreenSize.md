```tsx
export const SmallSize: Story = {
  ...DefaultStory,
  name: "Size: Small (540px)",
  args: {
    ...DefaultStory.args,
    size: "small",
  },
};

export const MediumSize: Story = {
  ...DefaultStory,
  name: "Size: Medium (850px) - Default",
  args: {
    ...DefaultStory.args,
    size: "medium",
  },
};

export const LargeSize: Story = {
  ...DefaultStory,
  name: "Size: Large (1080px)",
  args: {
    ...DefaultStory.args,
    size: "large",
  },
};

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