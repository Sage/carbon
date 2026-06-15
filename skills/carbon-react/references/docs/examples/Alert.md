```tsx
export const Alert: StoryObj = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog
        open={open}
        role="alertdialog"
        title="A Title"
        subtitle="A Subtitle"
        size="extra-small"
        height=""
        showCloseIcon
        disableEscKey={false}
        onCancel={() => setOpen(false)}
      >
        This is an example of a Dialog acting as an Alert dialog.
      </Dialog>
    </>
  );
};
```