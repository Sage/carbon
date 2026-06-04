```tsx
export const ReadOnly: Story = () => {
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return <Number label="Number" value={state} onChange={setValue} readOnly />;
};
```