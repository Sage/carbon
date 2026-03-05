---
name: carbon-component-button-toggle
description: Carbon ButtonToggle component props and usage examples.
---

# ButtonToggle

## Import
`import { ButtonToggle } from "carbon-react/lib/components/button-toggle";`

## Source
- Export: `./components/button-toggle`
- Props interface: `ButtonToggleProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| size | "small" \| "medium" \| "large" | Yes | small \| medium \| large |  |  | ButtonToggle size | "medium" |
| allowDeselect | boolean \| undefined | No |  |  |  | Allow button to be deselected when already selected |  |
| buttonIcon | IconType \| undefined | No |  |  |  | The icon to be rendered inside of the button |  |
| buttonIconSize | ButtonToggleIconSizes \| undefined | No |  |  |  | Sets the size of the buttonIcon (eg. large) | "small" |
| children | React.ReactNode | No |  |  |  | Text to display for the button. |  |
| disabled | boolean \| undefined | No |  |  |  | Disable all user interaction. |  |
| onBlur | ((ev: React.FocusEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback triggered by blur event on the button. |  |
| onClick | ((ev: React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback triggered by click event on the button. |  |
| onFocus | ((ev: React.FocusEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback triggered by focus event on the button. |  |
| value | string \| undefined | No |  |  |  | An optional string by which to identify the button in either an onClick handler, or an onChange handler on the parent ButtonToggleGroup. |  |
| data-component | string \| undefined | No |  |  |  |  |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  |  |  | Prop to specify the aria-label of the component |  |
| aria-labelledby | string \| undefined | No |  |  |  | Prop to specify the aria-labelledby property of the component |  |
| pressed | boolean \| undefined | No |  | Yes | Set the pressed state of the toggle button | Set the pressed state of the toggle button |  |

## Examples
### Default

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Default example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle value="foo">Foo</ButtonToggle>
        <ButtonToggle value="bar">Bar</ButtonToggle>
        <ButtonToggle value="baz">Baz</ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
}
```


### Input Hint

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="inputHint example"
        inputHint="Hint text"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle value="foo">Foo</ButtonToggle>
        <ButtonToggle value="bar">Bar</ButtonToggle>
        <ButtonToggle value="baz">Baz</ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
}
```


### Aria Label

**Render**

```tsx
() => {
  const [value, setValue] = useState("bar");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-ariaLabel-id"
        aria-label="an accessible name"
        onChange={onChangeHandler}
        value={value}
        allowDeselect
      >
        <ButtonToggle value="foo">Foo</ButtonToggle>
        <ButtonToggle value="bar">Bar</ButtonToggle>
        <ButtonToggle value="baz">Baz</ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
}
```


### Full Width

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4}>
      <ButtonToggleGroup
        id="button-toggle-group-fullWidth-id"
        fullWidth
        label="fullWidth example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle value="foo">Foo</ButtonToggle>
        <ButtonToggle value="bar">Bar</ButtonToggle>
        <ButtonToggle value="baz">Baz</ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
}
```


### Allow Deselection

**Render**

```tsx
() => {
  const [value, setValue] = useState("bar");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-allowDeselect-id"
        label="Deselection example"
        onChange={onChangeHandler}
        value={value}
        allowDeselect
        inputHint="Select an option, you can clear a selected option by selecting it again"
      >
        <ButtonToggle value="foo">Foo</ButtonToggle>
        <ButtonToggle value="bar">Bar</ButtonToggle>
        <ButtonToggle value="baz">Baz</ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
}
```


### Small Icon

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="300px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Small icon example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle value="foo" buttonIcon="add">
          Add
        </ButtonToggle>
        <ButtonToggle value="bar" buttonIcon="share">
          Share
        </ButtonToggle>
        <ButtonToggle value="baz" buttonIcon="tick">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
}
```


### Large Icon

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="400px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Large icon example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle value="foo" buttonIcon="add" buttonIconSize="large">
          Add
        </ButtonToggle>
        <ButtonToggle value="bar" buttonIcon="share" buttonIconSize="large">
          Share
        </ButtonToggle>
        <ButtonToggle value="baz" buttonIcon="tick" buttonIconSize="large">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
}
```


### Icon Only

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Icon only example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle value="foo" buttonIcon="add" aria-label="add" />
        <ButtonToggle value="bar" buttonIcon="share" aria-label="share" />
        <ButtonToggle value="baz" buttonIcon="tick" aria-label="tick" />
      </ButtonToggleGroup>
    </Box>
  );
}
```


### Small

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Small example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle size="small" value="foo">
          Add
        </ButtonToggle>
        <ButtonToggle size="small" value="bar">
          Share
        </ButtonToggle>
        <ButtonToggle size="small" value="baz">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
}
```


### Small with Small Icon

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="300px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Small with small icon example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle size="small" value="foo" buttonIcon="add">
          Add
        </ButtonToggle>
        <ButtonToggle size="small" value="bar" buttonIcon="share">
          Share
        </ButtonToggle>
        <ButtonToggle size="small" value="baz" buttonIcon="tick">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
}
```


### Small with Large Icon

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="300px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Small with large icon example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle
          size="small"
          value="foo"
          buttonIcon="add"
          buttonIconSize="large"
        >
          Add
        </ButtonToggle>
        <ButtonToggle
          size="small"
          value="bar"
          buttonIcon="share"
          buttonIconSize="large"
        >
          Share
        </ButtonToggle>
        <ButtonToggle
          size="small"
          value="baz"
          buttonIcon="tick"
          buttonIconSize="large"
        >
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
}
```


### Large

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Large example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle size="large" value="foo">
          Add
        </ButtonToggle>
        <ButtonToggle size="large" value="bar">
          Share
        </ButtonToggle>
        <ButtonToggle size="large" value="baz">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
}
```


### Large with Small Icon

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="300px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Large with small icon example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle size="large" value="foo" buttonIcon="add">
          Add
        </ButtonToggle>
        <ButtonToggle size="large" value="bar" buttonIcon="share">
          Share
        </ButtonToggle>
        <ButtonToggle size="large" value="baz" buttonIcon="tick">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
}
```


### Large Large Icon

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="450px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Large with large icon example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle
          size="large"
          value="foo"
          buttonIcon="add"
          buttonIconSize="large"
        >
          Add
        </ButtonToggle>
        <ButtonToggle
          size="large"
          value="bar"
          buttonIcon="share"
          buttonIconSize="large"
        >
          Share
        </ButtonToggle>
        <ButtonToggle
          size="large"
          value="baz"
          buttonIcon="tick"
          buttonIconSize="large"
        >
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
}
```


### Disabled Button

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Disabled Button"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle value="foo" disabled>
          Foo
        </ButtonToggle>
        <ButtonToggle value="bar">Bar</ButtonToggle>
        <ButtonToggle value="baz">Baz</ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
}
```


### Disabled Group

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-disabled-id"
        label="Disabled Group"
        inputHint="Hint text"
        disabled
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle value="foo">Foo</ButtonToggle>
        <ButtonToggle value="bar">Bar</ButtonToggle>
        <ButtonToggle value="baz">Baz</ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
}
```


### Wrapped Buttons

**Render**

```tsx
() => {
  const [value, setValue] = useState("bar");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box width={"375px"} display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        m={4}
        id="button-toggle-group-wrapped-id"
        label="Wrapped Group"
        fullWidth
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle value="add" buttonIcon="add">
          Add
        </ButtonToggle>
        <ButtonToggle value="share" buttonIcon="share">
          Share
        </ButtonToggle>
        <ButtonToggle value="tick" buttonIcon="tick">
          Tick
        </ButtonToggle>
        <ButtonToggle value="email" buttonIcon="email">
          Email
        </ButtonToggle>
        <ButtonToggle value="alert" buttonIcon="alert">
          Alert
        </ButtonToggle>
        <ButtonToggle value="calendar" buttonIcon="calendar">
          Calendar
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
}
```

