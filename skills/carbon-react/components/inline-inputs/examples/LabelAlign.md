```tsx
export const LabelAlign: Story = () => {
  return (
    <Box>
      {(["right", "left"] as const).map((alignment) => (
        <InlineInputs
          label="My Inline Inputs"
          labelAlign={alignment}
          labelId="inline-inputs-align"
          labelWidth={30}
        >
          <Textbox
            aria-labelledby="inline-inputs-align"
            value=""
            onChange={() => {}}
          />
          <Textbox
            aria-labelledby="inline-inputs-align"
            value=""
            onChange={() => {}}
          />
        </InlineInputs>
      ))}
    </Box>
  );
};
```