```tsx
export const ValidationOnLabel: StoryObj = () => {
  return (
    <Textarea
      label="Textarea"
      value=""
      error="Error Message"
      validationOnLabel
      onChange={() => {}}
    />
  );
};
```