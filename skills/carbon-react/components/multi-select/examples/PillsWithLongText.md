```tsx
export const PillsWithLongText: Story = () => {
  const [value, setValue] = useState<string[]>(["1"]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value as unknown as string[]);
  }

  return (
    <Box height={250} maxWidth="200px">
      <MultiSelect
        name="long-pill-text-wrapped"
        id="long-pill-text-wrapped"
        label="long pill text wrapped"
        wrapPillText
        value={value}
        onChange={onChangeHandler}
      >
        <Option text="Amber is the colour" value="1" />
        <Option text="Black is the colour" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
      </MultiSelect>
    </Box>
  );
};
```