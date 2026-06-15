```tsx
export const WithMargin: Story = () => {
  const [state, setState] = useState("transparent");

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  const colors = [
    { color: "transparent", label: "transparent" },
    { color: "#0073C1", label: "blue" },
    { color: "#582C83", label: "purple" },
  ];

  return (
    <SimpleColorPicker
      name="with-margin"
      legend="Legend"
      onChange={onChange}
      value={state}
      m={4}
    >
      {colors.map(({ color, label }) => (
        <SimpleColor value={color} key={color} aria-label={label} />
      ))}
    </SimpleColorPicker>
  );
};
```