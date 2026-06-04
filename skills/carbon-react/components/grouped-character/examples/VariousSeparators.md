```tsx
export const VariousSeparators: Story = () => {
  const [state, setState] = useState({
    ".": "1231231",
    ",": "1231231",
    ", ": "1231231",
    " ": "1231231",
    "-": "1231231",
    "/": "1231231",
    "|": "1231231",
  });

  const handleChange = (separator: string) => (e: CustomEvent) => {
    setState({ ...state, [separator]: e.target.value.rawValue });
  };

  return ([".", ",", " ", "-", "/", "|"] as const).map((separator) => (
    <GroupedCharacter
      label="GroupedCharacter"
      value={state[separator]}
      onChange={handleChange(separator)}
      groups={[2, 2, 3]}
      separator={separator}
      key={separator}
    />
  ));
};
```