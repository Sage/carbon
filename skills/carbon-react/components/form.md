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
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| buttonAlignment | "left" \| "right" \| undefined | No |  | Alignment of buttons | "right" |
| children | React.ReactNode | No |  | Child elements |  |
| errorCount | number \| undefined | No |  | The total number of errors present in the form |  |
| fieldSpacing | 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| undefined | No |  | Spacing between form fields, given number will be multiplied by base spacing unit (8) | 3 |
| footerChildren | React.ReactNode | No |  | Custom content to render in the form's footer |  |
| footerPadding | PaddingProps | No |  | Padding to be set on the form footer | {} |
| fullWidthButtons | boolean \| undefined | No |  | Applies styling for full width buttons. Please note that you will still need to pass the `fullWidth` prop to the button you compose | false |
| height | string \| undefined | No |  | Height of the form (any valid CSS value) |  |
| leftSideButtons | React.ReactNode | No |  | Additional buttons rendered on the left side of the save button |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| noValidate | boolean \| undefined | No |  | Disable HTML5 validation | true |
| onSubmit | React.FormEventHandler<HTMLFormElement> \| undefined | No |  | Callback passed to the form element |  |
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Padding on top and bottom |  |
| rightSideButtons | React.ReactNode | No |  | Additional buttons rendered on the right side of the save button |  |
| saveButton | React.ReactNode | No |  | Save button to be rendered |  |
| stickyFooter | boolean \| undefined | No |  | Enables the sticky footer. |  |
| stickyFooterVariant | "light" \| "grey" \| undefined | No |  | Background variant for the sticky footer. | "light" |
| warningCount | number \| undefined | No |  | The total number of warnings present in the form |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### With footer node

**Render**

```tsx
(args: FormProps) => {
  const footerNode = (
    <Box>
      <Typography>
        This is the footer text that will be added to provide information about
        the form content.
      </Typography>
      <Link icon="placeholder" href="#">
        This is a link
      </Link>
    </Box>
  );

  return (
    <Form {...args} footerChildren={footerNode}>
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
    </Form>
  );
}
```


### Default with sticky footer

**Render**

```tsx
(args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={<Button>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    stickyFooter
  >
    <Textbox onChange={() => {}} value="" label="Textbox" />
    <Textbox onChange={() => {}} value="" label="Textbox" />
    <Textbox onChange={() => {}} value="" label="Textbox" />
    <Textbox onChange={() => {}} value="" label="Textbox" />
    <Textbox onChange={() => {}} value="" label="Textbox" />
    <Textbox onChange={() => {}} value="" label="Textbox" />
    <Textbox onChange={() => {}} value="" label="Textbox" />
  </Form>
)
```


### Sticky footer with grey variant

**Render**

```tsx
(args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={<Button>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    stickyFooter
    stickyFooterVariant="grey"
  >
    <Textbox onChange={() => {}} value="" label="Textbox" />
    <Textbox onChange={() => {}} value="" label="Textbox" />
    <Textbox onChange={() => {}} value="" label="Textbox" />
    <Textbox onChange={() => {}} value="" label="Textbox" />
    <Textbox onChange={() => {}} value="" label="Textbox" />
    <Textbox onChange={() => {}} value="" label="Textbox" />
    <Textbox onChange={() => {}} value="" label="Textbox" />
  </Form>
)
```


### With Full Width Buttons

**Render**

```tsx
(args: FormProps) => (
  <CarbonProvider validationRedesignOptIn>
    <Form
      {...args}
      fullWidthButtons
      stickyFooter
      leftSideButtons={<Button fullWidth>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit" fullWidth>
          Save
        </Button>
      }
      errorCount={3}
      warningCount={2}
    >
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
    </Form>
  </CarbonProvider>
)
```


### Field Spacing

**Render**

```tsx
(args: FormProps) => {
  const [state, setState] = useState("");

  const setValue = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setState(ev.target.value);
  };

  return (
    <Form
      {...args}
      leftSideButtons={<Button>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      fieldSpacing={5}
    >
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textbox onChange={() => {}} value="" label="Textbox" />
      <Textarea
        label="Textarea with Character Limit"
        characterLimit={50}
        value={state}
        onChange={setValue}
      />
    </Form>
  );
}
```


### Override field spacing

**Render**

```tsx
(args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={<Button>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
  >
    <Textbox onChange={() => {}} value="" label="Textbox" />
    <Textbox onChange={() => {}} value="" label="Textbox" />
    <Textbox onChange={() => {}} value="" label="Textbox" mb={7} />
    <Textbox onChange={() => {}} value="" label="Textbox" />
  </Form>
)
```


### With Errors Summary

**Render**

```tsx
(args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={<Button>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    errorCount={1}
  >
    <Textbox onChange={() => {}} value="" label="Textbox" />
  </Form>
)
```


### With Warnings Summary

**Render**

```tsx
(args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={<Button>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    warningCount={1}
  >
    <Textbox onChange={() => {}} value="" label="Textbox" />
  </Form>
)
```


### With Both Errors and Warnings Summary

**Render**

```tsx
(args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={<Button>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    errorCount={2}
    warningCount={2}
  >
    <Textbox onChange={() => {}} value="" label="Textbox" />
  </Form>
)
```


### With Additional Buttons

**Render**

```tsx
(args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={
      <>
        <Button>Other</Button>
        <Button>Cancel</Button>
      </>
    }
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    rightSideButtons={
      <>
        <Button>Reset</Button>
        <Button>Other</Button>
      </>
    }
  >
    <Textbox onChange={() => {}} value="" label="Textbox" />
  </Form>
)
```


### With Buttons Aligned to the Left

**Render**

```tsx
(args: FormProps) => (
  <Form
    {...args}
    leftSideButtons={
      <>
        <Button>Other</Button>
        <Button>Cancel</Button>
      </>
    }
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    rightSideButtons={
      <>
        <Button>Reset</Button>
        <Button>Other</Button>
      </>
    }
    buttonAlignment="left"
  >
    <Textbox onChange={() => {}} value="" label="Textbox" />
  </Form>
)
```


### WithBothOptionalOrRequired

**Render**

```tsx
(args: FormProps) => (
  <Box m={1}>
    <RequiredFieldsIndicator mb={2}>
      <Typography variant="b">Fill in all fields marked with</Typography>
    </RequiredFieldsIndicator>
    <Form
      {...args}
      leftSideButtons={<Button>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
    >
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
          labelWidth={10}
        />
        <RadioButton
          id="group-1-input-2"
          value="group-1-input-2"
          label="Radio Option 2"
          labelWidth={10}
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
          labelWidth={10}
        />
        <RadioButton
          id="group-2-input-2"
          value="group-2-input-2"
          label="Radio Option 2"
          labelWidth={10}
        />
      </RadioButtonGroup>
      <Checkbox
        name="checkbox"
        label="Checkbox"
        required
        checked={false}
        onChange={() => {}}
      />
    </Form>
  </Box>
)
```


### In Dialog

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Form
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={<Button buttonType="primary">Submit</Button>}
        >
          <Textbox onChange={() => {}} value="" label="Textbox" />
        </Form>
      </Dialog>
    </>
  );
}
```


### In Dialog with Sticky Footer

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [date, setDate] = useState("04/04/2019");
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Form
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={<Button buttonType="primary">Submit</Button>}
          stickyFooter
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <Textbox
              key={`textbox-${index + 1}`}
              label="Textbox"
              value=""
              onChange={() => {}}
            />
          ))}
          <DateInput
            label="Date"
            name="dateinput"
            value={date}
            onChange={(ev: DateChangeEvent) =>
              setDate(ev.target.value.formattedValue)
            }
            disablePortal
          />
          <Select
            name="simple-disabled-portal"
            id="simple-disabled-portal"
            label="Simple Select - disabled portal"
            value="1"
            onChange={() => {}}
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </Select>
          <MultiSelect
            name="multi-disabled-portal"
            id="multi-disabled-portal"
            label="Multi Select - disabled portal"
            value={["1"]}
            onChange={() => {}}
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </MultiSelect>
          <Select
            name="simple"
            id="simple"
            label="Simple Select"
            value="1"
            onChange={() => {}}
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </Select>
          <MultiSelect
            name="multi"
            id="multi"
            label="Multi Select"
            value={["1"]}
            onChange={() => {}}
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </MultiSelect>
          {Array.from({ length: 10 }).map((_, index) => (
            <Textbox
              key={`textbox-${index + 1}`}
              label="Textbox"
              value=""
              onChange={() => {}}
            />
          ))}
        </Form>
      </Dialog>
    </>
  );
}
```


### In Dialog Full Screen

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        fullscreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Box p="0px 40px">
          <Form
            leftSideButtons={
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            }
            saveButton={<Button buttonType="primary">Submit</Button>}
          >
            <Textbox onChange={() => {}} value="" label="Textbox" />
          </Form>
        </Box>
      </Dialog>
    </>
  );
}
```


### In Dialog Full Screen with Sticky Footer

**Render**

```tsx
() => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [date, setDate] = useState("04/04/2019");
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        fullscreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Form
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={<Button buttonType="primary">Submit</Button>}
          stickyFooter
        >
          {Array.from({ length: 15 }).map((_, index) => (
            <Textbox
              key={`textbox-${index + 1}`}
              label="Textbox"
              value=""
              onChange={() => {}}
            />
          ))}
          <DateInput
            label="Date"
            name="dateinput"
            value={date}
            onChange={(ev: DateChangeEvent) =>
              setDate(ev.target.value.formattedValue)
            }
          />
          <Select
            name="simple"
            id="simple"
            label="label"
            value="1"
            onChange={() => {}}
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </Select>
          {Array.from({ length: 15 }).map((_, index) => (
            <Textbox
              key={`textbox-${index + 1}`}
              label="Textbox"
              value=""
              onChange={() => {}}
            />
          ))}
        </Form>
      </Dialog>
    </>
  );
}
```


### Form Alignment Example

**Render**

```tsx
(args: FormProps) => {
  const [date, setDate] = useState("04/04/2019");
  return (
    <Form
      {...args}
      leftSideButtons={<Button>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      fieldSpacing={4}
    >
      <Textbox
        key="input-one"
        label="Field 1"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
        fieldHelp="This is some help text"
        value=""
        onChange={() => {}}
      />
      <Textbox
        key="input-two"
        label="Field 2"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
        labelSpacing={2}
        value=""
        onChange={() => {}}
      />
      <RadioButtonGroup
        name="legend"
        legend="Legend"
        legendInline
        legendWidth={10}
        legendSpacing={2}
        legendAlign="right"
        value="group-1-input-1"
        onChange={() => "RADIO CHANGE"}
      >
        <RadioButton
          id="group-1-input-1"
          value="group-1-input-1"
          label="Radio Option 1"
          labelWidth={10}
        />
        <RadioButton
          id="group-1-input-2"
          value="group-1-input-2"
          label="Radio Option 2"
          labelWidth={10}
        />
      </RadioButtonGroup>
      <DateInput
        name="date"
        label="Date picker"
        labelInline
        labelWidth={10}
        value={date}
        onChange={(ev: DateChangeEvent) =>
          setDate(ev.target.value.formattedValue)
        }
      />
      <RadioButtonGroup
        name="nolegend"
        legend="Legend above"
        ml="10%"
        value={"group-2-input-2"}
        onChange={() => "RADIO CHANGE"}
      >
        <RadioButton
          id="group-2-input-1"
          value="group-2-input-1"
          label="Radio Option 1"
          labelWidth={10}
        />
        <RadioButton
          id="group-2-input-2"
          value="group-2-input-2"
          label="Radio Option 2"
          labelWidth={10}
        />
      </RadioButtonGroup>
      <Textarea
        key="input-three"
        label="Field 3"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
        value=""
        onChange={() => {}}
      />
      <Checkbox
        name="checkbox1"
        label="Checkbox 1"
        ml="10%"
        checked={false}
        onChange={() => {}}
      />
      <Checkbox
        name="checkbox2"
        label="Checkbox 2"
        ml="10%"
        checked={false}
        onChange={() => {}}
      />
      <Box ml="10%" mr="60%">
        <Divider type="horizontal" mb={7} />
      </Box>
      <Button buttonType="tertiary" ml="calc(10% - 24px)">
        Tertiary
      </Button>
      <Textbox
        key="input-four"
        label="Field 4"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
        value=""
        onChange={() => {}}
      />
      <Switch
        name="switch"
        label="Switch"
        labelInline
        labelWidth={10}
        labelSpacing={2}
        mb={4}
        checked
        onChange={() => "SWITCH CHANGE"}
      />
      <Textbox
        key="input-five"
        label="Field 5"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
        value=""
        onChange={() => {}}
      />
    </Form>
  );
}
```


### With Labels Inline

**Render**

```tsx
() => (
  <Form
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
  >
    <Textbox
      onChange={() => {}}
      value=""
      label="Textbox"
      labelInline
      labelWidth={30}
    />
    <InlineInputs
      label="Inline Inputs"
      gutter="none"
      labelWidth={30}
      labelId="inline-inputs"
    >
      <Textbox aria-labelledby="inline-inputs" value="" onChange={() => {}} />
      <Textbox aria-labelledby="inline-inputs" value="" onChange={() => {}} />
      <Select aria-labelledby="inline-inputs" value="" onChange={() => {}}>
        <Option value="1" text="option 1" key="1" />
        <Option value="2" text="option 2" key="2" />
        <Option value="3" text="option 3" key="3" />
      </Select>
    </InlineInputs>
    <InlineInputs
      label="Inline Inputs with a gutter"
      gutter="large"
      labelWidth={30}
      labelId="inline-inputs-second"
    >
      <Textbox
        aria-labelledby="inline-inputs-second"
        value=""
        onChange={() => {}}
      />
      <Textbox
        aria-labelledby="inline-inputs-second"
        value=""
        onChange={() => {}}
      />
      <Select
        aria-labelledby="inline-inputs-second"
        value=""
        onChange={() => {}}
      >
        <Option value="1" text="option 1" key="1" />
        <Option value="2" text="option 2" key="2" />
        <Option value="3" text="option 3" key="3" />
      </Select>
    </InlineInputs>
  </Form>
)
```


### With Custom Footer Padding

**Render**

```tsx
(args: FormProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="With custom footer padding"
      >
        <Form
          {...args}
          leftSideButtons={<Button>Cancel</Button>}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
          stickyFooter
          footerPadding={{ px: 8 }}
        >
          <Textbox onChange={() => {}} value="" label="Textbox" />
        </Form>
      </Dialog>
    </>
  );
}
```

