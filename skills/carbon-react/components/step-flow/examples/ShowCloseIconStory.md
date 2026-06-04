```tsx
export const ShowCloseIconStory: Story = () => {
  return (
    <StepFlow
      category="Main goal"
      title="Step title"
      currentStep={1}
      totalSteps={6}
      showCloseIcon
      onDismiss={() => ""}
      titleVariant="h2"
    />
  );
};
```