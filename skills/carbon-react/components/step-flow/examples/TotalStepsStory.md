```tsx
export const TotalStepsStory: Story = () => {
  return (
    <StepFlow
      category="Main goal"
      title="Step title"
      currentStep={5}
      totalSteps={8}
      showProgressIndicator
      titleVariant="h2"
    />
  );
};
```