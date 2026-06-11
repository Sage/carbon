```tsx
export const Sizes: Story = () => {
  const sizes: NumberProps["size"][] = ["small", "medium", "large"];
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <>
      {sizes.map((size) => (
        <Number
          key={`Number - ${size}`}
          label={`Number - ${size}`}
          value={state}
          onChange={setValue}
          size={size}
          mb={2}
        />
      ))}
    </>
  );
};
```