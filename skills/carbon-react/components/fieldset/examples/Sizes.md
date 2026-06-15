```tsx
export const Sizes: Story = {
  render: (args) => (
    <>
      <Fieldset legend="Small Fieldset" size="small" {...args}>
        <Textbox label="Input 1" value="Input Text" onChange={() => {}} />
        <Textbox label="Input 2" value="Input Text" onChange={() => {}} />
        <Textbox label="Input 3" value="Input Text" onChange={() => {}} />
      </Fieldset>
      <Fieldset legend="Medium Fieldset" size="medium" {...args}>
        <Textbox label="Input 1" value="Input Text" onChange={() => {}} />
        <Textbox label="Input 2" value="Input Text" onChange={() => {}} />
        <Textbox label="Input 3" value="Input Text" onChange={() => {}} />
      </Fieldset>
      <Fieldset legend="Large Fieldset" size="large" {...args}>
        <Textbox label="Input 1" value="Input Text" onChange={() => {}} />
        <Textbox label="Input 2" value="Input Text" onChange={() => {}} />
        <Textbox label="Input 3" value="Input Text" onChange={() => {}} />
      </Fieldset>
    </>
  ),
  args: {
    mb: 4,
  },
};
```