```tsx
export const ValidationRedesign: StoryObj = () => {
  const [textarea1Value, setTextarea1Value] = React.useState("");
  const [textarea2Value, setTextarea2Value] = React.useState("");

  return (
    <CarbonProvider validationRedesignOptIn>
      <Form>
        <RequiredFieldsIndicator mb={2}>
          Indicates required information
        </RequiredFieldsIndicator>
        <Textarea
          label="Textarea"
          onChange={(e) => setTextarea1Value(e.target.value)}
          value={textarea1Value}
          error="Error Message (Fix is required)"
        />
        <Textarea
          label="Textarea"
          onChange={(e) => setTextarea2Value(e.target.value)}
          value={textarea2Value}
          warning="Warning Message (Fix is optional)"
        />
      </Form>
    </CarbonProvider>
  );
};
```