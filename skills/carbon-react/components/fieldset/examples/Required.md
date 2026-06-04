```tsx
export const Required: Story = () => (
  <CarbonProvider validationRedesignOptIn>
    <Form>
      <Fieldset legend="Fieldset" required>
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