```tsx
export const Disabled: Story = () => {
  const [value, setValue] = useState<string[]>(["1", "3"]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value as unknown as string[]);
  }
  return (
    <MultiSelect
      aria-label="disabled"
      name="disabled"
      id="select-disabled"
      value={value}
      onChange={onChangeHandler}
      disabled
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
    </MultiSelect>
  );
};
```