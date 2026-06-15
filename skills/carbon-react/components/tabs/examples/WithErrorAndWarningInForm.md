```tsx
export const WithErrorAndWarningInForm: Story = ({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab
          id="tab-1--validation-form"
          controls="tab-panel-1--validation-form"
          label="Default"
        />
        <Tab
          id="tab-2--validation-form"
          controls="tab-panel-2--validation-form"
          label="Error"
        />
        <Tab
          id="tab-3--validation-form"
          controls="tab-panel-3--validation-form"
          label="Warning"
        />
      </TabList>

      <TabPanel
        id="tab-panel-1--validation-form"
        tabId={"tab-1--validation-form"}
      >
        <Form
          onSubmit={() => {}}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Textbox label="Textbox" onChange={() => {}} value="" />
        </Form>
      </TabPanel>

      <TabPanel
        id="tab-panel-2--validation-form"
        tabId={"tab-2--validation-form"}
      >
        <Form
          onSubmit={() => {}}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Textbox
            label="Textbox"
            onChange={() => {}}
            value=""
            error="Textbox must not be blank"
          />
        </Form>
      </TabPanel>

      <TabPanel
        id="tab-panel-3--validation-form"
        tabId={"tab-3--validation-form"}
      >
        <Form
          onSubmit={() => {}}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Textbox
            label="Textbox"
            onChange={() => {}}
            value=""
            warning="Textbox must not be blank"
          />
        </Form>
      </TabPanel>
    </Tabs>
  );
};
```