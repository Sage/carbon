```tsx
export const Default: Story = () => {
  const [state, setState] = useState("");

  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Textbox
      label="Textbox"
      value={state}
      onChange={setValue}
      placeholder="Textbox"
    />
  );
};
```