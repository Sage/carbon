```tsx
export const CategoryStory: Story = () => {
  return (
    <StepFlow
      category="Main goal"
      title="Step title"
      currentStep={1}
      totalSteps={6}
      titleVariant="h2"
    />
  );
};
```