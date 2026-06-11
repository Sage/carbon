```tsx
export const WithCustomMaxWidth: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password
      maxWidth="70%"
      label="Password"
      value={state}
      onChange={setValue}
    />
  );
};
```