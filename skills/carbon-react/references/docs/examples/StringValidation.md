```tsx
export const StringValidation: StoryObj = () => {
  return (
    <>
      <Textarea
        label="Textarea"
        value=""
        error="Error Message"
        onChange={() => {}}
      />
      <Textarea
        label="Textarea"
        value=""
        warning="Warning Message"
        onChange={() => {}}
      />
      <Textarea
        label="Textarea"
        value=""
        info="Info Message"
        onChange={() => {}}
      />
    </>
  );
};
```