```tsx
export const WithCustomLabelWidthAndInputWidth: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Textbox
      label="Textbox"
      value={state}
      onChange={setValue}
      labelInline
      labelWidth={50}
      inputWidth={50}
    />
  );
};
```