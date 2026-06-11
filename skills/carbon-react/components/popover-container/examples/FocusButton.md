```tsx
export const FocusButton = () => {
  const [isPopOverOpen, setIsPopOverOpen] = useState(defaultOpenState);
  const ref = useRef<PopoverContainerHandle>(null);

  const handleCancel = () => {
    setIsPopOverOpen(false);
    ref.current?.focusButton();
  };

  return (
    <PopoverContainer
      p={0}
      ref={ref}
      containerAriaLabel="popover with form"
      open={isPopOverOpen}
      onOpen={() => setIsPopOverOpen(true)}
      onClose={() => setIsPopOverOpen(false)}
      renderOpenComponent={({ ...props }) => (
        <Button
          size="small"
          buttonType="secondary"
          iconType="settings"
          {...props}
        >
          popover
        </Button>
      )}
      renderCloseComponent={() => <></>}
    >
      <Form
        height="400px"
        onSubmit={() => {}}
        leftSideButtons={<Button onClick={() => handleCancel()}>Cancel</Button>}
        saveButton={
          <Button buttonType="primary" type="submit">
            Save
          </Button>
        }
        stickyFooter
      >
        <Box m={2}>
          <Textbox label="Textbox" onChange={() => {}} value="" />
          <Textbox label="Textbox" onChange={() => {}} value="" />
          <Textbox label="Textbox" onChange={() => {}} value="" />
          <Textbox label="Textbox" onChange={() => {}} value="" />
          <Textbox label="Textbox" onChange={() => {}} value="" />
          <Textbox label="Textbox" onChange={() => {}} value="" />
        </Box>
      </Form>
    </PopoverContainer>
  );
};
```