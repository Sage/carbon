```tsx
export const TopModalOverride: Story = () => {
  const [isOpenAll, setIsOpenAll] = useState(defaultOpenState);
  const [isOpenDialogFullScreen, setIsOpenDialogFullScreen] = useState(true);
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const [isOpenDialog, setIsOpenDialog] = useState(true);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpenAll(true);
          setIsOpenDialogFullScreen(true);
          setIsOpenSidebar(true);
          setIsOpenDialog(true);
        }}
      >
        Open dialogs
      </Button>
      <Confirm
        open={isOpenDialogFullScreen && isOpenAll}
        onCancel={() => setIsOpenDialogFullScreen(false)}
        title="Confirm"
        onConfirm={() => {}}
      >
        <Textbox label="Confirm textbox" value="" onChange={() => {}} />
      </Confirm>
      <Sidebar
        open={isOpenSidebar && isOpenAll}
        onCancel={() => setIsOpenSidebar(false)}
        header="sidebar"
        topModalOverride
      >
        <Textbox label="Sidebar textbox" value="" onChange={() => {}} />
      </Sidebar>
      <Dialog
        open={isOpenDialog && isOpenAll}
        onCancel={() => setIsOpenDialog(false)}
        title="Dialog"
      >
        <Textbox label="Dialog textbox" value="" onChange={() => {}} />
      </Dialog>
    </>
  );
};
```