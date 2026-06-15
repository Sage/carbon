```tsx
export const Required: Story = () => {
  return (
    <InlineInputs
      label="Inline Inputs"
      labelId="inline-inputs-required"
      required
    >
      <Textbox
        aria-labelledby="inline-inputs-required"
        value=""
        onChange={() => {}}
      />
      <Textbox
        aria-labelledby="inline-inputs-required"
        value=""
        onChange={() => {}}
      />
    </InlineInputs>
  );
};
```