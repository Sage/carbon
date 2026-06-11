```tsx
export const VariousGroups: Story = () => {
  const [state, setState] = useState({
    "2-2-3": "1231231",
    "1-2-4": "1231231",
    "3-2-2": "1231231",
    "3-1-3": "1231231",
  });

  const handleChange = (group: string) => (e: CustomEvent) => {
    setState({ ...state, [group]: e.target.value.rawValue });
  };

  return [
    [2, 2, 3],
    [1, 2, 4],
    [3, 2, 2],
    [3, 1, 3],
  ].map((group) => (
    <GroupedCharacter
      label="GroupedCharacter"
      value={state[group.join("-") as keyof typeof state]}
      onChange={handleChange(group.join("-"))}
      groups={group}
      separator="-"
      key={group.join("-")}
      mb={1}
    />
  ));
};
```