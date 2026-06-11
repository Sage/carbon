```tsx
export const Default: Story = {
  render: (args) => (
    <CheckboxGroup {...args}>
      {["Apple", "Banana", "Cherry", "Date"].map((label) => (
        <Checkbox
          key={label}
          name="fruits"
          label={label}
          value={label}
          checked={false}
          onChange={() => {}}
        />
      ))}
    </CheckboxGroup>
  ),
  args: {
    legend: "What fruits do you have?",
  },
};
```