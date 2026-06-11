```tsx
export const WithCustomRemoveButtonAriaLabel: Story = () => {
  const noop = () => {};
  return (
    <>
      <Pill onDelete={noop} ariaLabelOfRemoveButton="remove green">
        Green
      </Pill>
      <Pill onDelete={noop} ariaLabelOfRemoveButton="remove blue">
        Blue
      </Pill>
    </>
  );
};
```