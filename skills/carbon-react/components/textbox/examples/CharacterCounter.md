```tsx
export const CharacterCounter: Story = () => {
  const [state, setState] = useState("Textbox");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Textbox
      label="Textbox"
      inputHint="Hint text (optional)."
      value={state}
      onChange={setValue}
      characterLimit={10}
    />
  );
};
```