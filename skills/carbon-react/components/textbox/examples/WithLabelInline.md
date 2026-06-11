```tsx
export const WithLabelInline: Story = () => {
  const [state, setState] = useState("");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Textbox
      label="Textbox"
      labelInline
      value={state}
      onChange={setValue}
      placeholder="Textbox"
    />
  );
};
```