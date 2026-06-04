```tsx
export const Shapes: Story = () => {
  return (
    <>
      <Preview mb={2} loading shape="rectangle" />
      <Preview mb={2} loading shape="rectangle-round" />
      <Preview loading shape="circle" />
    </>
  );
};
```