```tsx
export const WithRequired: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password required label="Password" value={state} onChange={setValue} />
  );
};
```