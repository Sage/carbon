---
name: carbon-component-help
description: Carbon Help component props and usage examples.
---

# Help

## Import
`import Help from "carbon-react/lib/components/help";`

## Source
- Export: `./components/help`
- Props interface: `HelpProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| ariaLabel | string \| undefined | No |  | Aria label | "help" |
| as | keyof JSX.IntrinsicElements \| undefined | No |  | Overrides the default 'as' attribute of the Help component |  |
| children | React.ReactNode | No |  | The message to be displayed within the tooltip |  |
| helpId | string \| undefined | No |  | The unique id of the component (used with aria-describedby for accessibility) |  |
| href | string \| undefined | No |  | A path for the anchor |  |
| isFocused | boolean \| undefined | No |  | A boolean received from IconWrapper |  |
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
| tabIndex | number \| undefined | No |  | Overrides the default tabindex of the component | 0 |
| tooltipBgColor | string \| undefined | No |  | Override background color of the Tooltip, provide any color from palette or any valid css color value. |  |
| tooltipFlipOverrides | TooltipPositions[] \| undefined | No |  | Overrides the default flip behaviour of the Tooltip, must be an array containing some or all of ["top", "bottom", "left", "right"] (see https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements) |  |
| tooltipFontColor | string \| undefined | No |  | Override font color of the Tooltip, provide any color from palette or any valid css color value. |  |
| tooltipId | string \| undefined | No |  | Id passed to the tooltip container, used for accessibility purposes |  |
| tooltipPosition | TooltipPositions \| undefined | No |  | Position of tooltip relative to target | "top" |
| type | IconType \| undefined | No |  | Help Icon type | "help" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Render**

```tsx
() => {
  return (
    <Box m={64}>
      <Help>Some helpful text goes here</Help>
    </Box>
  );
}
```


### With Href

**Render**

```tsx
() => {
  return (
    <Box m={64}>
      <Help href="https://carbon.sage.com">
        This is the Help component with a href.
      </Help>
    </Box>
  );
}
```


### With Icons and Focused

**Render**

```tsx
() => {
  return (
    <>
      {(["error", "add", "minus", "settings"] as const).map((icon) => (
        <Box m={65} key={icon}>
          <Help type={`${icon}`} data-role="target">
            {`This is the Help component with the ${icon} icon`}
          </Help>
        </Box>
      ))}
    </>
  );
}
```


### With Tooltip Color Overrides

**Render**

```tsx
() => (
  <Box my={64} mx={300}>
    <Help tooltipBgColor="lightblue" tooltipFontColor="black" isFocused>
      The background and font color are overridden
    </Help>
  </Box>
)
```


### With Tooltip Custom Message

**Render**

```tsx
() => {
  return (
    <Box m={64}>
      <Help>
        <Icon type="add" color="red" />
        <Icon type="add" color="green" />
        <Icon type="add" color="blue" /> Some <em>helpful</em> text goes here
      </Help>
    </Box>
  );
}
```


### With Tooltip Position

**Render**

```tsx
() => {
  return (
    <>
      {(["right", "left", "top", "bottom"] as const).map((position) => (
        <Box my={64} mx={300} key={position}>
          <Help tooltipPosition={position} isFocused>
            {`This tooltip is positioned ${position}`}
          </Help>
        </Box>
      ))}
    </>
  );
}
```

