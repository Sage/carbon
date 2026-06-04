```tsx
export const Sizes: Story = () => {
  const [state, setState] = useState({
    small: "1231231",
    medium: "1231231",
    large: "1231231",
  });

  const handleChange =
    (size: "small" | "medium" | "large") => (e: CustomEvent) => {
      setState({ ...state, [size]: e.target.value.rawValue });
    };

  return (["small", "medium", "large"] as const).map((size) => (
    <GroupedCharacter
      key={`GroupedCharacter - ${size}`}
      label={`GroupedCharacter - ${size}`}
      value={state[size]}
      onChange={handleChange(size)}
      groups={[2, 2, 3]}
      separator="-"
      size={size}
      mb={2}
    />
  ));
};
```