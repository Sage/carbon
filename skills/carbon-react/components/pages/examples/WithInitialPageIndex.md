```tsx
export const WithInitialPageIndex: Story = () => {
  const initialpageIndex = 1;
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [pageIndex, setPageIndex] = useState(
    Number(initialpageIndex) ? Number(initialpageIndex) : 0,
  );
  const [isDisabled, setIsDisabled] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
    setPageIndex(0);
  };
  const handleOpen = () => {
    setIsOpen(true);
    if (!initialpageIndex) {
      setPageIndex(0);
    } else setPageIndex(Number(initialpageIndex));
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
        <Pages initialpageIndex={initialpageIndex} pageIndex={pageIndex}>
          <Page title={<Heading title="My First Page" />}>
            <Button onClick={handleOnClick} disabled={isDisabled}>
              Go to second page
            </Button>
          </Page>
          <Page
            title={
              <Heading title="My Second Page" backLink={handleBackClick} />
            }
          >
            <Button onClick={handleOnClick} disabled={isDisabled}>
              Go to third page
            </Button>
          </Page>
          <Page
            title={<Heading title="My Third Page" backLink={handleBackClick} />}
          >
            Third Page
          </Page>
        </Pages>
      </Dialog>
    </>
  );
};
```