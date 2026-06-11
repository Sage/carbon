```tsx
export const WithFieldHelp: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Textbox
      label="Textbox"
      value={state}
      onChange={setValue}
      fieldHelp="Help"
    />
  );
};
```