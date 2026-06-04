```tsx
export const WithFieldHelp: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password
      fieldHelp="help"
      label="Password"
      value={state}
      onChange={setValue}
    />
  );
};
```