```tsx
export const DefaultStory: Story = {
  render: (args: DecimalProps) => {
    const [state, setState] = useState("0.01");
    const setValue = ({ target }: CustomEvent) => {
      setState(target.value.rawValue);
    };
    return <Decimal {...args} value={state} onChange={setValue} />;
  },
  args: { label: "Decimal" },
  name: "Default",
};
```