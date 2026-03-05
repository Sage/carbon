---
name: carbon-component-tile-select
description: Carbon TileSelect component props and usage examples.
---

# TileSelect

## Import
`import { TileSelect } from "carbon-react/lib/components/tile-select";`

## Source
- Export: `./components/tile-select`
- Props interface: `TileSelectProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| accordionContent | React.ReactNode | No |  | Components to render in the TileSelect Accordion |  |
| accordionControl | ((controlId: string, contentId: string) => JSX.Element) \| undefined | No |  | Callback to toggle expanded state of TileSelect Accordion |  |
| accordionExpanded | boolean \| undefined | No |  | Flag to control the open state of TileSelect Accordion |  |
| actionButtonAdornment | React.ReactNode | No |  | An additional help info icon rendered next to the action button |  |
| additionalInformation | React.ReactNode | No |  | Component to render additional information row between title and description |  |
| checked | boolean \| undefined | No |  | determines if this tile is selected or unselected |  |
| customActionButton | ((onClick: () => void) => JSX.Element) \| undefined | No |  | Render prop that allows overriding the default action button. |  |
| description | React.ReactNode | No |  | description of the TileSelect |  |
| disabled | boolean \| undefined | No |  | disables the TileSelect input |  |
| footer | React.ReactNode | No |  | footer of the TileSelect |  |
| id | string \| undefined | No |  | input id |  |
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
| name | string \| undefined | No |  | input name |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | Callback triggered when the user blurs this tile |  |
| onChange | ((ev: React.ChangeEvent<HTMLInputElement> \| TileSelectDeselectEvent) => void) \| undefined | No |  | Callback triggered when user selects or deselects this tile |  |
| onFocus | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | Callback triggered when the user focus this tile |  |
| prefixAdornment | React.ReactNode | No |  | Component to render in the top left corner of TileSelect |  |
| subtitle | React.ReactNode | No |  | subtitle of the TileSelect |  |
| title | React.ReactNode | No |  | title of the TileSelect |  |
| titleAdornment | React.ReactNode | No |  | adornment to be rendered next to the title |  |
| type | "checkbox" \| "radio" \| undefined | No |  | Type of the TileSelect input |  |
| value | string \| undefined | No |  | the value that is represented by this TileSelect |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Render**

```tsx
() => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <TileSelectGroup
      name="Tile Select"
      value={value}
      legend="Tile Select"
      description="Pick one of the available options"
      onChange={(e) => setValue(e.target.value)}
    >
      <TileSelect
        value="1"
        id="1"
        aria-label="1"
        title="Title"
        subtitle="Subtitle"
        description="Short and descriptive description"
      />
      <TileSelect
        value="2"
        id="2"
        aria-label="2"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={<Pill>Message</Pill>}
        description="Short and descriptive description"
      />
      <TileSelect
        value="3"
        id="3"
        aria-label="3"
        disabled
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
            tooltipVisible={false}
            disabled
          />
        }
        description="Short and descriptive description"
      />
      <TileSelect
        value="4"
        id="4"
        aria-label="4"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
          />
        }
        description="Short and descriptive description"
      />
    </TileSelectGroup>
  );
}
```


### With Custom Action Button

**Render**

```tsx
() => {
  const [value, setValue] = useState<string | null>(null);
  const [activated, setActivated] = useState(false);
  const [removed, setRemoved] = useState(false);
  return (
    <TileSelectGroup
      name="Tile Select"
      value={value}
      legend="Tile Select"
      description="Pick one of the available options"
      onChange={(e) => setValue(e.target.value)}
    >
      <TileSelect
        value="1"
        id="1"
        aria-label="1"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Pill pillRole="status" colorVariant="neutral">
            {activated ? "Active" : "Inactive"}
          </Pill>
        }
        description="Short and descriptive description"
        customActionButton={
          activated
            ? undefined
            : () => (
                <Button
                  onClick={() => {
                    setValue("1");
                    setActivated(true);
                  }}
                  buttonType="tertiary"
                  type="button"
                  size="small"
                >
                  Reactivate
                </Button>
              )
        }
      />
      <TileSelect
        value="2"
        id="2"
        aria-label="2"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          removed ? undefined : (
            <Pill pillRole="status" colorVariant="neutral">
              Active
            </Pill>
          )
        }
        description="Short and descriptive description"
        customActionButton={(onClick) => (
          <Button
            onClick={() => {
              setRemoved(true);
              onClick();
            }}
            buttonType="tertiary"
            type="button"
            size="small"
            destructive
            disabled={removed}
          >
            Remove
          </Button>
        )}
      />
    </TileSelectGroup>
  );
}
```


### With Action Button Adornment

**Render**

```tsx
() => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <TileSelectGroup
      name="Tile Select"
      value={value}
      legend="Tile Select"
      description="Pick one of the available options"
      onChange={(e) => setValue(e.target.value)}
    >
      <TileSelect
        value="1"
        id="1"
        aria-label="1"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Pill pillRole="status" colorVariant="neutral">
            Inactive
          </Pill>
        }
        description="Short and descriptive description"
        customActionButton={() => (
          <Button
            onClick={() => setValue("1")}
            buttonType="tertiary"
            type="button"
            px={1}
            size="small"
            disabled
          >
            Reactivate
          </Button>
        )}
        actionButtonAdornment={
          <Icon
            type="info"
            tooltipMessage="This tile cannot be reactivated at this time"
          />
        }
      />
      <TileSelect
        value="2"
        id="2"
        aria-label="2"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
          />
        }
        description="Short and descriptive description"
        customActionButton={(onClick) => (
          <Button
            onClick={onClick}
            buttonType="tertiary"
            type="button"
            px={1}
            size="small"
            destructive
            disabled
          >
            Remove
          </Button>
        )}
        actionButtonAdornment={
          <Icon
            type="info"
            tooltipMessage="This tile cannot be removed at this time"
          />
        }
      />
    </TileSelectGroup>
  );
}
```


### Multi Select

**Render**

```tsx
() => {
  const [value1, setValue1] = useState(false);
  const [value2, setValue2] = useState(false);
  const [value3, setValue3] = useState(false);
  const [value4, setValue4] = useState(false);

  return (
    <TileSelectGroup
      legend="Tile Select"
      description="Pick any number of available options"
      multiSelect
      name="Tile Select"
    >
      <TileSelect
        value="1"
        name="multi-1"
        id="multi-1"
        aria-label="multi-1"
        title="Title"
        subtitle="Subtitle"
        description="Short and descriptive description"
        checked={value1}
        onChange={(e) => setValue1(e.target.checked)}
      />
      <TileSelect
        value="2"
        name="multi-2"
        id="multi-2"
        aria-label="multi-2"
        subtitle="Subtitle"
        titleAdornment={<Pill>Message</Pill>}
        description="Short and descriptive description"
        checked={value2}
        onChange={(e) => setValue2(e.target.checked)}
      />
      <TileSelect
        value="3"
        name="multi-3"
        id="multi-3"
        aria-label="multi-3"
        disabled
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
            tooltipVisible={false}
            disabled
          />
        }
        description="Short and descriptive description"
        checked={value3}
        onChange={(e) => setValue3(e.target.checked)}
      />
      <TileSelect
        value="4"
        name="multi-4"
        id="multi-4"
        aria-label="multi-4"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
          />
        }
        description="Short and descriptive description"
        checked={value4}
        onChange={(e) => setValue4(e.target.checked)}
      />
    </TileSelectGroup>
  );
}
```


### Single Tile

**Render**

```tsx
() => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
  ) => {
    const { value } = e.target;
    setIsChecked(value !== null);
  };

  return (
    <TileSelect
      value="1"
      id="single-1"
      aria-label="single-1"
      name="single"
      title="Title"
      subtitle="Subtitle"
      description="Short and descriptive description"
      checked={isChecked}
      onChange={handleChange}
    />
  );
}
```


### With a Footer

**Render**

```tsx
() => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
  ) => {
    const { value } = e.target;
    setIsChecked(value !== null);
  };
  return (
    <TileSelect
      value="1"
      id="single-1"
      aria-label="single-1"
      name="single"
      title="Title Short and descriptive description"
      subtitle="Subtitle Short and descriptive description"
      checked={isChecked}
      onChange={handleChange}
      description="Short and descriptive description"
      footer={
        <Box pt={1} display="flex" alignItems="baseline">
          Here is some &nbsp;
          <Typography variant="strong">footer text</Typography>
          <Button
            ml={1}
            buttonType="tertiary"
            iconPosition="after"
            iconType="home"
          >
            Footer Button
          </Button>
        </Box>
      }
    />
  );
}
```


### With a Prefix Adornment

**Render**

```tsx
() => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
  ) => {
    const { value } = e.target;
    setIsChecked(value !== null);
  };

  return (
    <TileSelect
      value="1"
      id="single-1"
      aria-label="single-1"
      name="single"
      title="Title"
      subtitle="Subtitle"
      checked={isChecked}
      prefixAdornment={
        <Image
          height="40px"
          width="40px"
          backgroundImage={`url("${flexibleSvg}")`}
        />
      }
      titleAdornment={<Pill>Message</Pill>}
      onChange={handleChange}
      description="Short and descriptive description"
    />
  );
}
```


### With Additional Information

**Render**

```tsx
() => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
  ) => {
    const { value } = e.target;
    setIsChecked(value !== null);
  };
  return (
    <TileSelect
      value="1"
      id="single-1"
      aria-label="single-1"
      name="single"
      title="Title"
      subtitle="Subtitle"
      titleAdornment={<Pill>Message</Pill>}
      description="Short and descriptive description"
      additionalInformation={
        <>
          <Pill fill mr={1} mb="4px">
            Further information
          </Pill>
          <Pill fill mr={1} mb="4px">
            Further information
          </Pill>
          <Pill fill mb={1}>
            Further information
          </Pill>
        </>
      }
      checked={isChecked}
      onChange={handleChange}
    />
  );
}
```


### With Accordion Footer

**Render**

```tsx
() => {
  const [isChecked, setIsChecked] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
  ) => {
    const { value } = e.target;
    setIsChecked(value !== null);
  };
  return (
    <TileSelect
      value="1"
      id="single-1"
      aria-label="single-1"
      name="single"
      title="Title"
      subtitle="Subtitle"
      description="Short and descriptive description"
      checked={isChecked}
      onChange={handleChange}
      prefixAdornment={
        <Image
          height="40px"
          width="40px"
          backgroundImage={`url("${flexibleSvg}")`}
        />
      }
      accordionContent={
        <Box display="flex" flexWrap="wrap">
          <Box flexGrow={1} pr={1}>
            <Box
              width="100%"
              height="100px"
              bg="primary"
              display="inline-block"
            />
          </Box>
          <Box flexGrow={1} pl={1}>
            <Box
              width="100%"
              height="100px"
              bg="primary"
              display="inline-block"
            />
          </Box>
        </Box>
      }
      accordionControl={(controlId, contentId) => (
        <Button
          buttonType="tertiary"
          iconPosition="before"
          iconType="chevron_down"
          data-element="accordion-button"
          onClick={() => setExpanded((expandedState) => !expandedState)}
          px={1}
          mt={2}
          aria-controls={contentId}
          aria-expanded={expanded}
          id={controlId}
        >
          {expanded ? "Close" : "Open"} accordion
        </Button>
      )}
      accordionExpanded={expanded}
    />
  );
}
```


### With Custom Spacing

**Render**

```tsx
() => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <TileSelectGroup
      name="Tile Select"
      value={value}
      legend="Tile Select"
      description="Pick one of the available options"
      onChange={(e) => setValue(e.target.value)}
      m={6}
    >
      <TileSelect
        value="1"
        id="1"
        aria-label="1"
        title="Title"
        subtitle="Subtitle"
        description="Short and descriptive description"
      />
      <TileSelect
        value="2"
        id="2"
        aria-label="2"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={<Pill>Message</Pill>}
        description="Short and descriptive description"
        mt={1}
      />
      <TileSelect
        value="3"
        id="3"
        aria-label="3"
        disabled
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
            tooltipVisible={false}
            disabled
          />
        }
        description="Short and descriptive description"
        mt={1}
      />
      <TileSelect
        value="4"
        id="4"
        aria-label="4"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
          />
        }
        description="Short and descriptive description"
        mt={1}
      />
    </TileSelectGroup>
  );
}
```

