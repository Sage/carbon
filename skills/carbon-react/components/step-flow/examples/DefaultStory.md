```tsx
export const DefaultStory: Story = () => {
  return (
    <StepFlow
      title="Step title"
      titleVariant="h2"
      currentStep={1}
      totalSteps={6}
    />
  );
};
```