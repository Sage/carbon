```tsx
export const ReadOnly: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password readOnly label="Password" value={state} onChange={setValue} />
  );
};
```