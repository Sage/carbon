```tsx
export const InputHint: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password
      inputHint="Hint text (optional)."
      label="Password"
      value={state}
      onChange={setValue}
    />
  );
};
```