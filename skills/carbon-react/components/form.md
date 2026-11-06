---
name: carbon-component-form
description: Carbon Form component props and usage examples.
---

# Form

## Import
`import Form from "carbon-react/lib/components/form";`

## Source
- Export: `./components/form`
- Props interface: `FormProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| buttonAlignment | "left" \| "right" \| undefined | No |  |  |  | Alignment of buttons | "right" |
| children | React.ReactNode | No |  |  |  | Child elements |  |
| footerChildren | React.ReactNode | No |  |  |  | Custom content to render in the form's footer |  |
| footerPadding | PaddingProps | No |  |  |  | Padding to be set on the form footer | {} |
| fullWidthButtons | boolean \| undefined | No |  |  |  | Applies styling for full width buttons. Please note that you will still need to pass the `fullWidth` prop to the button you compose | false |
| height | string \| undefined | No |  |  |  | Height of the form (any valid CSS value) |  |
| id | string \| undefined | No |  |  |  | The id attribute of the underlying form element |  |
| leftSideButtons | React.ReactNode | No |  |  |  | Additional buttons rendered on the left side of the save button |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| noValidate | boolean \| undefined | No |  |  |  | Disable HTML5 validation | true |
| onSubmit | React.FormEventHandler<HTMLFormElement> \| undefined | No |  |  |  | Callback passed to the form element |  |
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top and bottom |  |
| rightSideButtons | React.ReactNode | No |  |  |  | Additional buttons rendered on the right side of the save button |  |
| saveButton | React.ReactNode | No |  |  |  | Save button to be rendered |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| disableStickyOnSmallScreen | boolean \| undefined | No |  | Yes | Sticky Form footer behavior is deprecated; compose actions in the Form content instead. |  | false |
| errorCount | number \| undefined | No |  | Yes | Compose error Message components as the first Form children instead. | The total number of errors present in the form. Do not combine it with a composed error Message summary, or the errors are summarised twice. |  |
| fieldSpacing | 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| undefined | No |  | Yes | Apply spacing through the composed content blocks instead. |  | 3 |
| stickyFooter | boolean \| undefined | No |  | Yes | Compose actions in the Form content instead. |  |  |
| stickyFooterVariant | "light" \| "grey" \| undefined | No |  | Yes | Sticky Form footer behavior is deprecated; compose actions in the Form content instead. |  | "light" |
| warningCount | number \| undefined | No |  | Yes | Compose warning Message components as the first Form children instead. | The total number of warnings present in the form. Do not combine it with a composed warning Message summary, or the warnings are summarised twice. |  |

## Examples
### Composition

**Render**

```tsx
function Render(args) {
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [contactMethod, setContactMethod] = useState("");
    const [newsletter, setNewsletter] = useState(false);

    return (
      <Form {...args}>
        <Typography variant="h1" mb={blockSpacing}>
          Personal details
        </Typography>
        <Typography weight="medium" mb={blockSpacing}>
          Fields marked <RequiredFieldsIndicator as="span" />
          are required
        </Typography>
        <Message
          variant="warning"
          title="Check the information"
          mb={blockSpacing}
        >
          Confirm that the contact details are up to date.
        </Message>
        <Typography variant="h2" mb={blockSpacing}>
          Contact details
        </Typography>
        <Textbox
          label="Email address"
          required
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          mb={fieldGap}
        />
        <Textbox
          label="Telephone number"
          required
          value={telephone}
          onChange={(ev) => setTelephone(ev.target.value)}
          mb={blockSpacing}
        />
        <Divider
          type="horizontal"
          aria-hidden
          mt="var(--global-space-none)"
          mb={blockSpacing}
        />
        <Typography variant="h2" mb={blockSpacing}>
          Preferences
        </Typography>
        <Select
          id="preferred-contact-method"
          label="Preferred contact method"
          value={contactMethod}
          onChange={(ev) => setContactMethod(ev.target.value)}
          mb={fieldGap}
        >
          <Option text="Email" value="email" />
          <Option text="Telephone" value="telephone" />
        </Select>
        <Checkbox
          label="Send me product updates"
          checked={newsletter}
          onChange={(ev) => setNewsletter(ev.target.checked)}
          mb={blockSpacing}
        />
        <Box display="flex" gap={buttonGap}>
          <Button variant="default" variantType="subtle">
            Cancel
          </Button>
          <Button variant="default" variantType="tertiary">
            Save draft
          </Button>
          <Button variant="default" variantType="secondary">
            Preview
          </Button>
          <Button variant="default" variantType="primary" type="submit">
            Save changes
          </Button>
        </Box>
      </Form>
    );
  }
```


### With Fieldsets

**Render**

```tsx
(args) => (
    <Form {...args}>
      <RequiredFieldsIndicator mb={blockSpacing}>
        Indicates required information
      </RequiredFieldsIndicator>
      <Fieldset legend="Name" required mb={blockSpacing}>
        <Textbox label="First name" value="" onChange={() => {}} />
        <Textbox label="Last name" value="" onChange={() => {}} />
      </Fieldset>
      <Fieldset
        legend="Address"
        legendHint="Use the address where you receive post"
        mb={blockSpacing}
      >
        <Textbox label="Address line 1" value="" onChange={() => {}} />
        <Textbox label="Town or city" value="" onChange={() => {}} />
        <Textbox label="Postcode" value="" onChange={() => {}} />
      </Fieldset>
      <Box display="flex" gap={buttonGap}>
        <Button variant="default" variantType="primary" type="submit">
          Save
        </Button>
      </Box>
    </Form>
  )
```


### In Dialog

**Render**

```tsx
function Render(args) {
    const [isOpen, setIsOpen] = useState(defaultOpenState);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
        <Dialog
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          title="Contact details"
          footer={
            <Box
              display="flex"
              gap={buttonGap}
              justifyContent="flex-end"
              width="100%"
            >
              <Button
                variant="default"
                variantType="subtle"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                variantType="primary"
                type="submit"
                form="form-in-dialog"
              >
                Save
              </Button>
            </Box>
          }
        >
          <Form {...args} id="form-in-dialog">
            <RequiredFieldsIndicator mb={blockSpacing}>
              Indicates required information
            </RequiredFieldsIndicator>
            <Fieldset legend="Personal details" required mb={blockSpacing}>
              <Textbox label="First name" value="" onChange={() => {}} />
              <Textbox label="Last name" value="" onChange={() => {}} />
            </Fieldset>
            <Fieldset legend="Contact details" required mb={blockSpacing}>
              <Textbox label="Email address" value="" onChange={() => {}} />
              <Textbox label="Telephone number" value="" onChange={() => {}} />
            </Fieldset>
            {/* resets the spacing the deprecated `fieldSpacing` prop still applies by default */}
            <Fieldset
              legend="Address"
              legendHint="Use the address where you receive post"
              mb="var(--global-space-none)"
            >
              <Textbox label="Address line 1" value="" onChange={() => {}} />
              <Textbox label="Town or city" value="" onChange={() => {}} />
              <Textbox label="Postcode" value="" onChange={() => {}} />
            </Fieldset>
          </Form>
        </Dialog>
      </>
    );
  }
```


### In Sidebar

**Render**

```tsx
function Render(args) {
    const [isOpen, setIsOpen] = useState(defaultOpenState);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Sidebar</Button>
        <Sidebar
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          header="Contact details"
          footer={
            <Box
              display="flex"
              gap={buttonGap}
              justifyContent="flex-end"
              width="100%"
            >
              <Button
                variant="default"
                variantType="subtle"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                variantType="primary"
                type="submit"
                form="form-in-sidebar"
              >
                Save
              </Button>
            </Box>
          }
        >
          <Form {...args} id="form-in-sidebar">
            <RequiredFieldsIndicator mb={blockSpacing}>
              Indicates required information
            </RequiredFieldsIndicator>
            {/* resets the spacing the deprecated `fieldSpacing` prop still applies by default */}
            <Fieldset
              legend="Contact details"
              required
              mb="var(--global-space-none)"
            >
              <Textbox label="Email address" value="" onChange={() => {}} />
              <Textbox label="Telephone number" value="" onChange={() => {}} />
            </Fieldset>
          </Form>
        </Sidebar>
      </>
    );
  }
```


### Validation Summary

**Render**

```tsx
function Render(args) {
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitCount, setSubmitCount] = useState(0);
    const firstSummaryLinkRef = useRef<HTMLAnchorElement | HTMLButtonElement>(
      null,
    );

    const errorEntries = Object.entries(errors);

    useEffect(() => {
      if (submitCount && errorEntries.length) {
        firstSummaryLinkRef.current?.focus();
      }
      // focus only after each submit attempt, not while the user edits fields
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitCount]);

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      const nextErrors: Record<string, string> = {};
      if (!email) nextErrors["validation-email"] = "Enter an email address";
      if (!telephone)
        nextErrors["validation-telephone"] = "Enter a telephone number";

      setErrors(nextErrors);
      setSubmitCount((count) => count + 1);

      if (!Object.keys(nextErrors).length) {
        args.onSubmit?.(ev);
      }
    };

    return (
      <Form {...args} onSubmit={handleSubmit}>
        <Typography variant="h1" mb={blockSpacing}>
          Contact details
        </Typography>
        {errorEntries.length > 0 && (
          <Message variant="error" title="There is a problem" mb={blockSpacing}>
            <Typography variant="ul" m={0}>
              {errorEntries.map(([fieldId, message], index) => (
                <Typography as="li" key={fieldId}>
                  <Link
                    ref={index === 0 ? firstSummaryLinkRef : undefined}
                    href={`#${fieldId}`}
                    onClick={(ev) => {
                      ev.preventDefault();
                      document.getElementById(fieldId)?.focus();
                    }}
                  >
                    {message}
                  </Link>
                </Typography>
              ))}
            </Typography>
          </Message>
        )}
        <RequiredFieldsIndicator mb={blockSpacing}>
          Indicates required information
        </RequiredFieldsIndicator>
        <Fieldset legend="Contact details" required mb={blockSpacing}>
          <Textbox
            id="validation-email"
            label="Email address"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            error={errors["validation-email"]}
          />
          <Textbox
            id="validation-telephone"
            label="Telephone number"
            value={telephone}
            onChange={(ev) => setTelephone(ev.target.value)}
            error={errors["validation-telephone"]}
          />
        </Fieldset>
        <Box display="flex" gap={buttonGap}>
          <Button variant="default" variantType="subtle">
            Cancel
          </Button>
          <Button variant="default" variantType="primary" type="submit">
            Save changes
          </Button>
        </Box>
      </Form>
    );
  }
```


### Required Fields Indicator

**Render**

```tsx
() => (
  <RequiredFieldsIndicator>
    Indicates required information
  </RequiredFieldsIndicator>
)
```


### Custom Required Fields Indicator

**Render**

```tsx
() => (
  <Box display="flex" flexDirection="column" gap={5}>
    <Box>
      <Typography variant="small" as="div" tint="alt" mb={1}>
        At the start
      </Typography>
      <RequiredFieldsIndicator>
        Indicates required information
      </RequiredFieldsIndicator>
    </Box>
    <Box>
      <Typography variant="small" as="div" tint="alt" mb={1}>
        In the middle of a sentence
      </Typography>
      <Typography weight="medium" mb={0}>
        Fields marked <RequiredFieldsIndicator as="span" />
        are required
      </Typography>
    </Box>
    <Box>
      <Typography variant="small" as="div" tint="alt" mb={1}>
        In another language
      </Typography>
      <Typography weight="medium" mb={0}>
        Los campos marcados con <RequiredFieldsIndicator as="span" />
        son obligatorios
      </Typography>
    </Box>
    <Box>
      <Typography variant="small" as="div" tint="alt" mb={1}>
        At the end of a sentence
      </Typography>
      <Typography weight="medium" mb={0}>
        Required fields are marked with <RequiredFieldsIndicator as="span" />
      </Typography>
    </Box>
    <Box maxWidth="280px">
      <Typography variant="small" as="div" tint="alt" mb={1}>
        At the start, wrapping onto several lines
      </Typography>
      <RequiredFieldsIndicator>
        Indicates information we need before we can process your application and
        contact you about it
      </RequiredFieldsIndicator>
    </Box>
    <Box maxWidth="280px">
      <Typography variant="small" as="div" tint="alt" mb={1}>
        In the middle, wrapping onto several lines
      </Typography>
      <Typography weight="medium" mb={0}>
        Fields marked <RequiredFieldsIndicator as="span" />
        must be completed before we can process your application
      </Typography>
    </Box>
    <Box maxWidth="280px">
      <Typography variant="small" as="div" tint="alt" mb={1}>
        At the end, wrapping onto several lines
      </Typography>
      <Typography weight="medium" mb={0}>
        Information we need before we can process your application is marked
        with <RequiredFieldsIndicator as="span" />
      </Typography>
    </Box>
  </Box>
)
```


### With Optional and Required Fields

**Render**

```tsx
(args: FormProps) => (
  <Form {...args}>
    <RequiredFieldsIndicator mb={blockSpacing}>
      Indicates required information
    </RequiredFieldsIndicator>
    <Fieldset legend="Your details" mb={blockSpacing}>
      <Textbox onChange={() => {}} value="" label="Textbox" required />
      <Select
        name="simple-required"
        id="simple-required"
        label="Simple Select"
        required
        value=""
        onChange={() => {}}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
      <MultiSelect
        name="multi-optional"
        id="multi-optional"
        label="Multi Select"
        value={[]}
        onChange={() => {}}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </MultiSelect>
      <MultiSelect
        name="multi-required"
        id="multi-required"
        label="Multi Select"
        required
        value={[]}
        onChange={() => {}}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </MultiSelect>
      <RadioButtonGroup
        name="radio group optional"
        legend="RadioGroup"
        value="group-1-input-1"
        onChange={() => "RADIO CHANGE"}
      >
        <RadioButton
          id="group-1-input-1"
          value="group-1-input-1"
          label="Radio Option 1"
        />
        <RadioButton
          id="group-1-input-2"
          value="group-1-input-2"
          label="Radio Option 2"
        />
      </RadioButtonGroup>
      <RadioButtonGroup
        name="radio group required"
        legend="RadioGroup"
        value="group-2-input-2"
        onChange={() => "RADIO CHANGE"}
        required
      >
        <RadioButton
          id="group-2-input-1"
          value="group-2-input-1"
          label="Radio Option 1"
        />
        <RadioButton
          id="group-2-input-2"
          value="group-2-input-2"
          label="Radio Option 2"
        />
      </RadioButtonGroup>
      <Checkbox
        name="checkbox"
        label="Checkbox"
        required
        checked={false}
        onChange={() => {}}
      />
    </Fieldset>
    <Box display="flex" gap={buttonGap}>
      <Button variant="default" variantType="subtle">
        Cancel
      </Button>
      <Button variant="default" variantType="primary" type="submit">
        Save
      </Button>
    </Box>
  </Form>
)
```

