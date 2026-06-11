```tsx
export const Default: Story = () => {
  const [state, setState] = useState("transparent");
  const colors = [
    { color: "transparent", label: "transparent" },
    { color: "#0073C1", label: "blue" },
    { color: "#582C83", label: "purple" },
    { color: "#E96400", label: "orange" },
    { color: "#99ADB6", label: "gray" },
    { color: "#C7384F", label: "flush mahogany" },
    { color: "#004500", label: "dark green" },
    { color: "#FFB500", label: "yellow" },
    { color: "#335C6D", label: "dark blue" },
    { color: "#00DC00", label: "light blue" },
  ];

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <SimpleColorPicker
      name="picker-default-example"
      legend="Legend"
      onChange={onChange}
      value={state}
    >
      {colors.map(({ color, label }) => (
        <SimpleColor value={color} key={color} aria-label={label} id={color} />
      ))}
    </SimpleColorPicker>
  );
};
```