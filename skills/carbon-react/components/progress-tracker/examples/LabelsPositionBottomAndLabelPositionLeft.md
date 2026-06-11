```tsx
export const LabelsPositionBottom: Story = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <ProgressTracker
        mt={2}
        labelsPosition="bottom"
        progress={15}
        currentProgressLabel="15%"
      />
      <ProgressTracker
        mt={2}
        labelsPosition="bottom"
        progress={50}
        currentProgressLabel="50%"
      />
      <ProgressTracker
        mt={2}
        labelsPosition="bottom"
        progress={100}
        currentProgressLabel="100%"
      />
      <ProgressTracker
        mt={2}
        labelsPosition="bottom"
        progress={100}
        error
        currentProgressLabel="error"
      />
    </Box>
  );
};

export const LabelPositionLeft: Story = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <ProgressTracker
        mt={2}
        labelsPosition="left"
        progress={15}
        currentProgressLabel="15%"
        labelWidth="40px"
      />
      <ProgressTracker
        mt={2}
        labelsPosition="left"
        progress={50}
        currentProgressLabel="50%"
        labelWidth="40px"
      />
      <ProgressTracker
        mt={2}
        labelsPosition="left"
        progress={100}
        currentProgressLabel="100%"
        labelWidth="40px"
      />
      <ProgressTracker
        mt={2}
        labelsPosition="left"
        progress={100}
        error
        currentProgressLabel="error"
        labelWidth="40px"
      />
    </Box>
  );
};
```