```tsx
export const WithValidationState = () => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <Tabs position="left">
        <Tab tabId="tab-1" title="Tab 1" key="tab-1">
          <Textbox
            label="Textbox"
            error="Error Message"
            m={2}
            onChange={() => {}}
            value=""
          />
        </Tab>
        <Tab tabId="tab-2" title="Tab 2" key="tab-2">
          <Textbox
            label="Textbox"
            warning="Warning Message"
            m={2}
            onChange={() => {}}
            value=""
          />
        </Tab>
      </Tabs>
    </CarbonProvider>
  );
};
```