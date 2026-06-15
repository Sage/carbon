```tsx
export const Required: Story = () => {
  const [state, setState] = useState("transparent");

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <SimpleColorPicker
      legend="Legend"
      required
      onChange={onChange}
      value={state}
      name="picker-required-example"
    >
      {[
        { color: "transparent", label: "transparent" },
        { color: "#0073C1", label: "blue" },
        { color: "#582C83", label: "purple" },
      ].map(({ color, label }) => (
        <SimpleColor value={color} key={color} aria-label={label} id={color} />
      ))}
    </SimpleColorPicker>
  );
};
```