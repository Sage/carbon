```tsx
export const InFormFieldSpacing: Story = () => (
  <CarbonProvider validationRedesignOptIn>
    <Form fieldSpacing={1}>
      <Fieldset legend="Fieldset">
        <Textbox label="Address Line 1" value={""} onChange={() => {}} />
        <Textbox label="Address Line 2" value={""} onChange={() => {}} />
        <Textbox label="City" value={""} onChange={() => {}} />
        <Select label="Country" value={""} onChange={() => {}}>
          <Option text="United Kingdom" value="uk" />
          <Option text="Spain" value="sp" />
          <Option text="France" value="fr" />
          <Option text="Germany" value="ge" />
        </Select>
        <Textbox
          label="Postcode"
          maxWidth="100px"
          value={""}
          onChange={() => {}}
        />
      </Fieldset>
    </Form>
  </CarbonProvider>
);
```