```tsx
export const Sizes: Story = () => {
  return (
    <>
      {(["small", "medium", "large"] as const).map((size) => (
        <Icon type="add" size={size} key={size} />
      ))}
    </>
  );
};
```