```tsx
export const CharacterCounter: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password
      label="Password"
      value={state}
      characterLimit={10}
      onChange={setValue}
    />
  );
};
```