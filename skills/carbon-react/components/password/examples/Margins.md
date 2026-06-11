```tsx
export const Margins: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return <Password m={4} label="Password" value={state} onChange={setValue} />;
};
```