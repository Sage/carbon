```tsx
export const Empty: Story = () => {
  const [state, setState] = useState("");
  const setValue = (ev: DateChangeEvent) => {
    setState(ev.target.value.formattedValue);
  };
  return (
    <>
      <Box mb={2}>
        <Button onClick={() => setState("")}>Set empty date</Button>
        <Button onClick={() => setState("01/04/2019")} ml={2}>
          Set 2019-04-01
        </Button>
      </Box>
      <DateInput
        label="Date"
        name="dateinput"
        value={state}
        onChange={setValue}
        allowEmptyValue
      />
    </>
  );
};
```