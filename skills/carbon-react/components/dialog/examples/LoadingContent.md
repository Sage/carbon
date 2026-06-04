```tsx
export const LoadingContent: Story = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(defaultOpenState);

  const handleOpen = () => {
    setIsLoading(true);
    setIsOpen(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open Dialog</Button>
      <Dialog
        size="medium"
        open={isOpen}
        title="Dialog with dynamic content"
        onCancel={() => setIsOpen(false)}
      >
        {isLoading ? (
          <Loader loaderType="ring" />
        ) : (
          <>
            <Textbox
              label="Textbox 1"
              labelInline
              autoFocus
              value=""
              onChange={() => {}}
            />
            <Textbox
              label="Textbox 2"
              labelInline
              value=""
              onChange={() => {}}
            />
            <Textbox
              label="Textbox 3"
              labelInline
              value=""
              onChange={() => {}}
            />
            <Textbox
              label="Textbox 4"
              labelInline
              value=""
              onChange={() => {}}
            />
            <Textbox
              label="Textbox 5"
              labelInline
              value=""
              onChange={() => {}}
            />
            <Textbox
              label="Textbox 6"
              labelInline
              value=""
              onChange={() => {}}
            />
            <Textbox
              label="Textbox 7"
              labelInline
              value=""
              onChange={() => {}}
            />
          </>
        )}
      </Dialog>
    </>
  );
};
```