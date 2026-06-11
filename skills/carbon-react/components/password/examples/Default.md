```tsx
export const Default: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return <Password label="Password" value={state} onChange={setValue} />;
};
```