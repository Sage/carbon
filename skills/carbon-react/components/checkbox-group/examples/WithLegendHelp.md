```tsx
export const WithLegendHelp: Story = {
  render: (args) => (
    <CarbonProvider validationRedesignOptIn>
      <ControlledCheckboxGroup {...args} />
    </CarbonProvider>
  ),
  args: {
    legend: "What fruits do you have?",
    legendHelp: "Legend Help",
  },
};
```