```tsx
export const ReadOnly: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Textbox
      label="Textbox"
      readOnly
      value={state}
      onChange={setValue}
      placeholder="Textbox"
    />
  );
};
```