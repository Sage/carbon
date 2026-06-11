```tsx
export const Prefix: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password
      prefix="prefix"
      label="Password"
      value={state}
      onChange={setValue}
    />
  );
};
```