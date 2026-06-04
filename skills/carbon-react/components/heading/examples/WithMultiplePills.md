```tsx
export const WithMultiplePills: Story = () => {
  return (
    <Heading
      title="This is a Title"
      pills={[
        <Pill mr={2} key="1">
          Pill 1
        </Pill>,
        <Pill mr={2} key="2" size="L">
          Pill 2
        </Pill>,
        <Pill mr={2} key="3" size="XL">
          Pill 3
        </Pill>,
      ]}
    />
  );
};
```