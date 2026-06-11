```tsx
export const InputHint: Story = () => {
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
      inputHint="Hint text (optional)."
    />
  );
};
```