```tsx
export const Required: Story = () => {
  const [state, setState] = useState("1231231");

  const setValue = ({ target }: CustomEvent) => {
    setState(target.value.rawValue);
  };

  return (
    <GroupedCharacter
      label="GroupedCharacter"
      value={state}
      onChange={setValue}
      groups={[2, 2, 3]}
      separator="-"
      required
    />
  );
};
```