```tsx
export const TitleNodeStoryWithScreenReaderOnlyTitle: Story = () => {
  const titleNode = (
    <Box display="flex" alignItems="center">
      <StepFlowTitle
        titleVariant="h2"
        titleString="Step title"
        screenReaderOnlyTitle="Step Title with a pointer image"
      />
      <Image alt="" src={pointSvg} decorative size={50} />
    </Box>
  );

  return <StepFlow title={titleNode} currentStep={1} totalSteps={6} />;
};
```