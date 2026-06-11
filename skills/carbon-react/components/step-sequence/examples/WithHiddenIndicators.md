```tsx
export const WithHiddenIndicators: Story = () => {
  return (
    <StepSequence>
      <StepSequenceItem
        aria-label="Step 1 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="1"
        status="complete"
      >
        Name
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 2 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="2"
        status="complete"
      >
        Delivery Address
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 3 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="3"
        hideIndicator
        status="current"
      >
        Delivery Details
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 4 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="4"
        hideIndicator
        status="incomplete"
      >
        Payment
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 5 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="5"
        hideIndicator
        status="incomplete"
      >
        Confirm
      </StepSequenceItem>
    </StepSequence>
  );
};
```