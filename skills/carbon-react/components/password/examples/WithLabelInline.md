```tsx
export const WithLabelInline: Story = () => {
  const [state, setState] = useState("Password");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <Password labelInline label="Password" value={state} onChange={setValue} />
  );
};
```