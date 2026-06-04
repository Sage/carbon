```tsx
export const TitleNodeStory: Story = () => {
  const titleNode = (
    <Box display="flex" alignItems="center">
      <Icon type="bin" />
      <StepFlowTitle titleString="Step title" />
    </Box>
  );

  return (
    <StepFlow
      title={titleNode}
      titleVariant="h2"
      currentStep={1}
      totalSteps={6}
    />
  );
};
```