```tsx
export const AsAnImg: Story = () => {
  return (
    <>
      <Image m={3} ml={8} alt="Example alt text" src={pointSvg} />
      <Image m={3} ml={5} size="200px" alt="Example alt text" src={brushSvg} />
      <Image m={3} size="300px" alt="Example alt text" src={collaborateSvg} />
    </>
  );
};
```