```tsx
export const Confirm: StoryObj = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog
        open={open}
        title="Is this a Title?"
        subtitle="A Subtitle"
        size="extra-small"
        showCloseIcon={false}
      >
        <>
          This is an example of a Dialog acting as a Confirm dialog.
          <Box mt="var(--spacing600)" display="flex" justifyContent="flex-end">
            <Button ml="var(--spacing110)" onClick={() => setOpen(false)}>
              Yes
            </Button>
            <Button
              buttonType="primary"
              destructive
              ml="var(--spacing110)"
              onClick={() => setOpen(false)}
            >
              No
            </Button>
          </Box>
        </>
      </Dialog>
    </>
  );
};
```