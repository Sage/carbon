```tsx
export const Inline: Story = {
  render: (args) => (
    <CarbonProvider validationRedesignOptIn>
      <ControlledCheckboxGroup {...args} />
    </CarbonProvider>
  ),
  args: {
    inline: true,
    required: true,
    legend: "What fruits do you have?",
  },
};
```