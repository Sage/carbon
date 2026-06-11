```tsx
export const SageTheme: Story = () => {
  return (
    <CarbonProvider theme={sageTheme}>
      <Button buttonType="primary">Button</Button>
    </CarbonProvider>
  );
};
```