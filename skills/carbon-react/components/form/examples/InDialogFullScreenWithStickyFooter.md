```tsx
export const InDialogFullScreenWithStickyFooter = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [date, setDate] = useState("04/04/2019");
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        fullscreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Form
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={<Button buttonType="primary">Submit</Button>}
          stickyFooter
        >
          {Array.from({ length: 15 }).map((_, index) => (
            <Textbox
              key={`textbox-${index + 1}`}
              label="Textbox"
              value=""
              onChange={() => {}}
            />
          ))}
          <DateInput
            label="Date"
            name="dateinput"
            value={date}
            onChange={(ev: DateChangeEvent) =>
              setDate(ev.target.value.formattedValue)
            }
          />
          <Select
            name="simple"
            id="simple"
            label="label"
            value="1"
            onChange={() => {}}
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </Select>
          {Array.from({ length: 15 }).map((_, index) => (
            <Textbox
              key={`textbox-${index + 1}`}
              label="Textbox"
              value=""
              onChange={() => {}}
            />
          ))}
        </Form>
      </Dialog>
    </>
  );
};
```