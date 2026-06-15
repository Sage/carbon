```tsx
export const Default: Story = {
  render: (args) => (
    <Fieldset {...args}>
      <Textbox label="Input 1" value="Input Text" onChange={() => {}} />
      <Textbox label="Input 2" value="Input Text" onChange={() => {}} />
      <Textbox label="Input 3" value="Input Text" onChange={() => {}} />
    </Fieldset>
  ),
  args: {
    legend: "Fieldset Legend",
  },
};
```