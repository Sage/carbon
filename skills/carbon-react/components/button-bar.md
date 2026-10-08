---
name: carbon-component-button-bar
description: Carbon ButtonBar component props and usage examples.
---

# ButtonBar

## Import
`import ButtonBar from "carbon-react/lib/components/button-bar";`

## Source
- Export: `./components/button-bar`
- Props interface: `ButtonBarProps`
- Deprecated: Yes
- Deprecation reason: `ButtonBar` has been deprecated. See the Carbon documentation for migration details.

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Button or IconButton Elements, to be rendered inside the component |  |
| buttonType | "primary" \| "secondary" \| undefined | No |  | Color variants for new business themes: "primary" \| "secondary" \| "tertiary" \| "darkBackground" |  |
| fullWidth | boolean \| undefined | No |  | Apply fullWidth style to the button bar | false |
| iconPosition | "before" \| "after" \| undefined | No |  | Defines an Icon position for buttons: "before" \| "after" | "before" |
| m | SpacingProperty | No |  |  |  |
| margin | SpacingProperty | No |  |  |  |
| marginBottom | SpacingProperty | No |  |  |  |
| marginLeft | SpacingProperty | No |  |  |  |
| marginRight | SpacingProperty | No |  |  |  |
| marginTop | SpacingProperty | No |  |  |  |
| marginX | SpacingProperty | No |  |  |  |
| marginY | SpacingProperty | No |  |  |  |
| mb | SpacingProperty | No |  |  |  |
| ml | SpacingProperty | No |  |  |  |
| mr | SpacingProperty | No |  |  |  |
| mt | SpacingProperty | No |  |  |  |
| mx | SpacingProperty | No |  |  |  |
| my | SpacingProperty | No |  |  |  |
| p | SpacingProperty | No |  |  |  |
| padding | SpacingProperty | No |  |  |  |
| paddingBottom | SpacingProperty | No |  |  |  |
| paddingLeft | SpacingProperty | No |  |  |  |
| paddingRight | SpacingProperty | No |  |  |  |
| paddingTop | SpacingProperty | No |  |  |  |
| paddingX | SpacingProperty | No |  |  |  |
| paddingY | SpacingProperty | No |  |  |  |
| pb | SpacingProperty | No |  |  |  |
| pl | SpacingProperty | No |  |  |  |
| pr | SpacingProperty | No |  |  |  |
| pt | SpacingProperty | No |  |  |  |
| px | SpacingProperty | No |  |  |  |
| py | SpacingProperty | No |  |  |  |
| size | "small" \| "medium" \| "large" \| undefined | No |  | Assigns a size to the buttons: "small" \| "medium" \| "large" | "medium" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Sizes

**Render**

```tsx
() => {
  return (
    <>
      <ButtonBar size="small" ml={2} mt={2} buttonType="primary">
        <Button>Small</Button>
        <Button>Small</Button>
        <Button>Small</Button>
      </ButtonBar>
      <ButtonBar ml={2} mt={2}>
        <Button>Medium</Button>
        <Button>Medium</Button>
        <Button>Medium</Button>
      </ButtonBar>
      <ButtonBar size="large" ml={2} mt={2}>
        <Button>Large</Button>
        <Button>Large</Button>
        <Button>Large</Button>
      </ButtonBar>
      <ButtonBar size="large" ml={2} mt={2}>
        <Button subtext="subtext 1">Large</Button>
        <Button subtext="subtext 2">Large</Button>
        <Button subtext="subtext 3">Large</Button>
      </ButtonBar>
    </>
  );
}
```


### Minor Sizes

**Render**

```tsx
() => {
  return (
    <>
      <ButtonBar size="small" ml={2} mt={2} buttonType="primary">
        <ButtonMinor>Small</ButtonMinor>
        <ButtonMinor>Small</ButtonMinor>
        <ButtonMinor>Small</ButtonMinor>
      </ButtonBar>

      <ButtonBar ml={2} mt={2}>
        <ButtonMinor>Medium</ButtonMinor>
        <ButtonMinor>Medium</ButtonMinor>
        <ButtonMinor>Medium</ButtonMinor>
      </ButtonBar>

      <ButtonBar size="large" ml={2} mt={2}>
        <ButtonMinor>Large</ButtonMinor>
        <ButtonMinor>Large</ButtonMinor>
        <ButtonMinor>Large</ButtonMinor>
      </ButtonBar>

      <ButtonBar size="large" ml={2} mt={2}>
        <ButtonMinor subtext="subtext 1">Large</ButtonMinor>
        <ButtonMinor subtext="subtext 2">Large</ButtonMinor>
        <ButtonMinor subtext="subtext 3">Large</ButtonMinor>
      </ButtonBar>
    </>
  );
}
```


### Icons

**Render**

```tsx
() => {
  const BUTTON_BAR_SIZES = ["small", "medium", "large"] as const;
  const BUTTON_BAR_ICON_POSITIONS = ["before", "after"] as const;

  return (
    <>
      {BUTTON_BAR_ICON_POSITIONS.map((iconPosition) =>
        BUTTON_BAR_SIZES.map((size) => (
          <ButtonBar
            iconPosition={iconPosition}
            size={size}
            key={size + iconPosition}
            ml={2}
            mt={2}
          >
            <Button iconType="csv">{iconPosition}</Button>
            <Button iconType="pdf">{iconPosition}</Button>
            <Button iconType="delete">{iconPosition}</Button>
          </ButtonBar>
        )),
      )}
    </>
  );
}
```


### Minor Icons

**Render**

```tsx
() => {
  const BUTTON_BAR_SIZES = ["small", "medium", "large"] as const;
  const BUTTON_BAR_ICON_POSITIONS = ["before", "after"] as const;

  return (
    <>
      {BUTTON_BAR_ICON_POSITIONS.map((iconPosition) =>
        BUTTON_BAR_SIZES.map((size) => (
          <ButtonBar
            iconPosition={iconPosition}
            size={size}
            key={size + iconPosition}
            ml={2}
            mt={2}
          >
            <ButtonMinor iconType="csv">{iconPosition}</ButtonMinor>
            <ButtonMinor iconType="pdf">{iconPosition}</ButtonMinor>
            <ButtonMinor iconType="delete">{iconPosition}</ButtonMinor>
          </ButtonBar>
        )),
      )}
    </>
  );
}
```


### Icons Only

**Render**

```tsx
() => {
  const BUTTON_BAR_SIZES = ["small", "medium", "large"] as const;

  return (
    <>
      {BUTTON_BAR_SIZES.map((size) => (
        <ButtonBar size={size} key={size} ml={2} mt={2}>
          <Button iconType="pdf" />
          <Button iconType="csv" />
          <Button iconType="delete" />
        </ButtonBar>
      ))}
    </>
  );
}
```


### Minor Icons Only

**Render**

```tsx
() => {
  const BUTTON_BAR_SIZES = ["small", "medium", "large"] as const;

  return (
    <>
      {BUTTON_BAR_SIZES.map((size) => (
        <ButtonBar size={size} key={size} ml={2} mt={2}>
          <ButtonMinor iconType="pdf" />
          <ButtonMinor iconType="csv" />
          <ButtonMinor iconType="delete" />
        </ButtonBar>
      ))}
    </>
  );
}
```


### Icon Buttons

**Render**

```tsx
() => {
  return (
    <ButtonBar ml={2} mt={2}>
      <IconButton onClick={() => {}}>
        <Icon type="csv" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="pdf" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="bin" />
      </IconButton>
    </ButtonBar>
  );
}
```


### Full Width

**Render**

```tsx
() => {
  return (
    <>
      <ButtonBar fullWidth size="small" ml={2} mt={2}>
        <Button fullWidth>Small full width</Button>
        <Button>Small full width</Button>
        <Button>Small full width</Button>
      </ButtonBar>
      <ButtonBar fullWidth ml={2} mt={2}>
        <Button buttonType="primary">Medium full width</Button>
        <Button>Medium full width</Button>
        <Button>Medium full width</Button>
      </ButtonBar>
      <ButtonBar fullWidth size="large" ml={2} mt={2}>
        <Button>Large full width</Button>
        <Button>Large full width</Button>
        <Button>Large full width</Button>
      </ButtonBar>
    </>
  );
}
```


### Minor Full Width

**Render**

```tsx
() => {
  return (
    <>
      <ButtonBar fullWidth size="small" ml={2} mt={2}>
        <ButtonMinor fullWidth>Small full width</ButtonMinor>
        <ButtonMinor>Small full width</ButtonMinor>
        <ButtonMinor>Small full width</ButtonMinor>
      </ButtonBar>
      <ButtonBar fullWidth ml={2} mt={2}>
        <ButtonMinor buttonType="primary">Medium full width</ButtonMinor>
        <ButtonMinor>Medium full width</ButtonMinor>
        <ButtonMinor>Medium full width</ButtonMinor>
      </ButtonBar>
      <ButtonBar fullWidth size="large" ml={2} mt={2}>
        <ButtonMinor>Large full width</ButtonMinor>
        <ButtonMinor>Large full width</ButtonMinor>
        <ButtonMinor>Large full width</ButtonMinor>
      </ButtonBar>
    </>
  );
}
```

