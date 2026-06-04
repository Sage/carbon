```tsx
export const ShowProgressIndicatorStory: Story = () => {
  return (
    <StepFlow
      category="Main goal"
      title="Step title"
      currentStep={1}
      totalSteps={6}
      showProgressIndicator
      titleVariant="h2"
    />
  );
};
```