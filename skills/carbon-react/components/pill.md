---
name: carbon-component-pill
description: Carbon Pill component props and usage examples.
---

# Pill

## Import
`import Pill from "carbon-react/lib/components/pill";`

## Source
- Export: `./components/pill`
- Props interface: `PillProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | string | Yes |  |  |  | The content to display inside of the pill. |  |
| ariaLabelOfRemoveButton | string \| undefined | No |  |  |  | Sets custom aria-label attribute on the remove button |  |
| borderColor | string \| undefined | No |  |  |  | Override color variant, provide any color from palette or any valid css color value. |  |
| fill | boolean \| undefined | No |  |  |  | Fills the pill background with colour. When fill is false only the border is coloured. | false |
| icon | React.ReactNode | No |  |  |  | A React node displayed to the left of the pill content. Recommended for use with `size="L"` pills. |  |
| inverse | boolean \| undefined | No |  |  |  | Set to allow for inverse styling to be used on dark backgrounds. | false |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| maxWidth | string \| undefined | No |  |  |  | Sets the max-width of the pill. |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| onClick | ((ev: React.MouseEvent<HTMLSpanElement>) => void) \| undefined | No |  |  |  | Callback function for when the pill is clicked. |  |
| onDelete | ((ev?: React.KeyboardEvent<HTMLButtonElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback fired when the remove button is activated. Receives the click event. |  |
| theme | Partial<ThemeObject> \| undefined | No |  |  |  |  |  |
| title | string \| undefined | No |  |  |  |  |  |
| variant | "grey" \| "green" \| "red" \| "orange" \| "blue" \| "purple" \| "teal" \| "lime" \| "pink" \| "slate" \| undefined | No |  |  |  | Sets the colour variant of a status pill. |  |
| wrapText | boolean \| undefined | No |  |  |  | Allow the text within pill to wrap. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| colorVariant | "warning" \| "negative" \| "neutral" \| "positive" \| "information" \| "neutralWhite" \| undefined | No |  | Yes | Use `variant` prop instead. | Determines the colour variant of the pill. |  |
| isDarkBackground | boolean \| undefined | No |  | Yes | Use `inverse` prop instead. | Apply inverse styling for use on dark backgrounds. | false |
| pillRole | "tag" \| "status" \| undefined | No |  | Yes | The pillRole prop is no longer used. Pill styling is determined by the `variant`, `fill`, and `inverse` props. | Sets the type of pill in use. |  |
| size | "S" \| "M" \| "L" \| "XL" \| undefined | No |  | Yes | The `XL` size is deprecated and will be removed in a future release. Use `L` instead. | Sets the size of the pill. | "M" |

## Examples
### Playground

**Args**

```tsx
{
    children: "Label",
    variant: "grey",
    size: "M",
    fill: true,
    inverse: false,
    onDelete: undefined,
    icon: undefined,
  }
```

**Render**

```tsx
(args) => {
    return (
      <Box mb={1}>
        <Pill {...args}>{args.children}</Pill>
      </Box>
    );
  }
```


### Wrapped

**Render**

```tsx
() => {
  return (
    <Box mb={1}>
      <Pill maxWidth="65px" wrapText>
        Wrapped pill
      </Pill>
      <Pill ml={1} maxWidth="55px" wrapText>
        Hyphe&shy;nated&shy;pill
      </Pill>
    </Box>
  );
}
```


### With Remove Button

**Render**

```tsx
() => {
  const [isPillVisible, setIsPillVisible] = useState(true);
  const hidePill = () => setIsPillVisible(false);
  const showPill = () => setIsPillVisible(true);
  return (
    <>
      <Button onClick={showPill}>Reset example</Button>
      <Box m={1}>{isPillVisible && <Pill onDelete={hidePill}>Pill</Pill>}</Box>
    </>
  );
}
```


### Inverse on Dark Background

**Args**

```tsx
{
    children: "Label",
    variant: "blue",
    size: "M",
    onDelete: undefined,
    icon: undefined,
  }
```

**Render**

```tsx
(args) => {
    return (
      <Box backgroundColor="#262626" p={2} display="flex" gap={1}>
        <Pill {...args} inverse>
          {args.children}
        </Pill>
        <Pill {...args} inverse fill>
          {args.children}
        </Pill>
      </Box>
    );
  }
```

