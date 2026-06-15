```tsx
export const OverridingContentPadding: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [pageIndex, setPageIndex] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
    setPageIndex(0);
  };
  const handleOpen = () => {
    setIsOpen(true);
    setPageIndex(0);
  };
  const handleOnClick = () => {
    setIsDisabled(true);
    setPageIndex(pageIndex + 1);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);
  };
  const handleBackClick = (ev: { preventDefault: () => void }) => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);
    if (!isDisabled) {
      ev.preventDefault();
      setPageIndex(pageIndex - 1);
    }
  };
  return (
    <>
      <Button onClick={handleOpen}>Open Preview</Button>
      <Dialog fullscreen pagesStyling open={isOpen} onCancel={handleCancel}>
        <Pages pageIndex={pageIndex}>
          <Page p={0} title={<Heading title="My First Page" />}>
            <Button onClick={handleOnClick} disabled={isDisabled}>
              Go to Last page
            </Button>
          </Page>
          <Page
            p={0}
            title={<Heading title="My Last Page" backLink={handleBackClick} />}
          >
            <Button onClick={handleBackClick} disabled={isDisabled}>
              Go to First page
            </Button>
          </Page>
        </Pages>
      </Dialog>
    </>
  );
};
```