```tsx
export const Disabled: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password disabled label="Password" value={state} onChange={setValue} />
  );
};
```