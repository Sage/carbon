```tsx
export const CurrentStepStory: Story = () => {
  return (
    <StepFlow
      category="Main goal"
      title="Step title"
      currentStep={5}
      totalSteps={6}
      showProgressIndicator
      titleVariant="h2"
    />
  );
};
```