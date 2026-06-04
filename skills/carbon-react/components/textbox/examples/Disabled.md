```tsx
export const Disabled: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Textbox
      inputIcon="calendar"
      label="Textbox"
      disabled
      value={state}
      onChange={setValue}
    />
  );
};
```