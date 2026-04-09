---
name: carbon-component-button
description: Carbon Button component props and usage examples.
---

# Button

## Import
`import Button from "carbon-react/lib/components/button";`

## Source
- Export: `./components/button`
- Props interface: `ButtonProps`
- Deprecated: Yes
- Deprecation reason: This version of Button has been deprecated. See the Carbon documentation for migration details.

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  |  |  | The text the button displays |  |
| className | string \| undefined | No |  |  |  |  |  |
| disabled | boolean \| undefined | No |  |  |  | Apply disabled state to the button |  |
| fullWidth | boolean \| undefined | No |  |  |  | Apply fullWidth style to the button |  |
| iconPosition | ButtonIconPosition \| undefined | No |  |  |  | Defines an Icon position related to the children: "before" \| "after" |  |
| iconTooltipMessage | string \| undefined | No |  |  |  | [Legacy] Provides a tooltip message when the icon is hovered. |  |
| iconTooltipPosition | TooltipPositions \| undefined | No |  |  |  | [Legacy] Provides positioning when the tooltip is displayed. |  |
| iconType | IconType \| undefined | No |  |  |  | Defines an Icon type within the button |  |
| id | string \| undefined | No |  |  |  | id attribute |  |
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
| name | string \| undefined | No |  |  |  | Name attribute |  |
| noWrap | boolean \| undefined | No |  |  |  | If provided, the text inside a button will not wrap |  |
| onBlur | ((ev: React.FocusEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on blur |  |
| onChange | ((ev: React.FormEvent<HTMLButtonElement \| HTMLAnchorElement> \| React.ChangeEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on change |  |
| onClick | ((ev: React.MouseEvent<HTMLAnchorElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | onClick handler |  |
| onFocus | ((ev: React.FocusEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on focus |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on keyDown |  |
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
| size | SizeOptions \| undefined | No |  |  |  | Assigns a size to the button: "small" \| "medium" \| "large" |  |
| type | string \| undefined | No |  |  |  | HTML button type property |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-describedby | string \| undefined | No |  |  |  | Identifies the element(s) offering additional information about the button the user might require. |  |
| aria-label | string \| undefined | No |  |  |  | Prop to specify the aria-label attribute of the component Defaults to the iconType, when the component has only an icon |  |
| aria-labelledby | string \| undefined | No |  |  |  | Identifies the element(s) labelling the button. |  |
| buttonType | ButtonTypes \| undefined | No |  | Yes | Color variants for new business themes: "primary" \| "secondary" \| "tertiary" \| "darkBackground" |  |  |
| destructive | boolean \| undefined | No |  | Yes | Apply destructive style to the button |  |  |
| href | string \| undefined | No |  | Yes | Used to transform button into anchor |  |  |
| isWhite | boolean \| undefined | No |  | Yes | Whether to use the white-on-dark colour variant |  |  |
| rel | string \| undefined | No |  | Yes | HTML rel attribute |  |  |
| subtext | string \| undefined | No |  | Yes | Second text child, renders under main text, only when size is "large" |  |  |
| target | string \| undefined | No |  | Yes | HTML target attribute |  |  |

## Examples
### Primary

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} buttonType="primary" size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="primary" ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="primary" size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
}
```


### Primary/Destructive

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} buttonType="primary" destructive size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="primary" destructive ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="primary" destructive size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
}
```


### Primary/Disabled

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} buttonType="primary" disabled size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="primary" disabled ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="primary" disabled size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
}
```


### Primary/Icon

**Render**

```tsx
() => {
  return (
    <Box>
      <Button ml={2} mt={2} buttonType="primary" iconType="print">
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="primary"
        destructive
        iconType="delete"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="primary"
        disabled
        iconType="print"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
    </Box>
  );
}
```


### Primary/Full Width

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} buttonType="primary" fullWidth>
        Full Width
      </Button>
    </Box>
  );
}
```


### Primary/No Wrap

**Render**

```tsx
() => {
  return (
    <Box width="40px">
      <Button ml={2} mt={2} buttonType="primary" noWrap>
        Long button text
      </Button>
    </Box>
  );
}
```


### Secondary

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} ml={2}>
        Medium
      </Button>
      <Button mt={2} size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
}
```


### Secondary/Destructive

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} destructive size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} destructive ml={2}>
        Medium
      </Button>
      <Button mt={2} destructive size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
}
```


### Secondary/Disabled

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} size="small" disabled ml={2}>
        Small
      </Button>
      <Button mt={2} disabled ml={2}>
        Medium
      </Button>
      <Button mt={2} size="large" disabled ml={2}>
        Large
      </Button>
    </Box>
  );
}
```


### Secondary/Icon

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} iconType="print" ml={2}>
        Medium
      </Button>
      <Button mt={2} destructive iconType="delete" iconPosition="after" ml={2}>
        Medium
      </Button>
      <Button mt={2} disabled iconType="print" iconPosition="after" ml={2}>
        Medium
      </Button>
    </Box>
  );
}
```


### Secondary/Full Width

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} buttonType="secondary" fullWidth>
        Full Width
      </Button>
    </Box>
  );
}
```


### Secondary/No Wrap

**Render**

```tsx
() => {
  return (
    <Box width="40px">
      <Button ml={2} mt={2} buttonType="secondary" noWrap>
        Long button text
      </Button>
    </Box>
  );
}
```


### Secondary/White

**Render**

```tsx
() => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      backgroundColor="var(--colorsUtilityYin100)"
    >
      <Box
        height="80px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Button size="small" isWhite>
          Small White
        </Button>
        <Button isWhite>Medium White</Button>
        <Button size="large" isWhite>
          Large White
        </Button>
      </Box>
      <Box
        height="80px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Button size="small" iconType="placeholder" isWhite>
          Small White & Icon
        </Button>
        <Button iconType="placeholder" isWhite>
          Medium White & Icon
        </Button>
        <Button iconType="placeholder" size="large" isWhite>
          Large White & Icon
        </Button>
      </Box>
      <Box
        height="80px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Button disabled isWhite>
          Disabled & White
        </Button>
        <Button destructive isWhite>
          Destructive & White
        </Button>
        <Button disabled destructive isWhite>
          Disabled, Destructive & White
        </Button>
      </Box>
      <Box
        height="80px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Button disabled isWhite iconType="placeholder">
          Disabled & White
        </Button>
        <Button destructive isWhite iconType="placeholder">
          Destructive & White
        </Button>
        <Button disabled destructive isWhite iconType="placeholder">
          Disabled, Destructive & White
        </Button>
      </Box>
    </Box>
  );
}
```


### Tertiary

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} buttonType="tertiary" size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="tertiary" ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="tertiary" size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
}
```


### Tertiary/Destructive

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} buttonType="tertiary" destructive size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="tertiary" destructive ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="tertiary" destructive size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
}
```


### Tertiary/Disabled

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} buttonType="tertiary" disabled size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="tertiary" disabled ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="tertiary" disabled size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
}
```


### Tertiary/Icon

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} buttonType="tertiary" iconType="print" ml={2}>
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="tertiary"
        destructive
        iconType="delete"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="tertiary"
        disabled
        iconType="print"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
    </Box>
  );
}
```


### Tertiary/Full Width

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} buttonType="tertiary" fullWidth>
        Full Width
      </Button>
    </Box>
  );
}
```


### Tertiary/No Wrap

**Render**

```tsx
() => {
  return (
    <Box width="40px">
      <Button ml={2} mt={2} buttonType="tertiary" noWrap>
        Long button text
      </Button>
    </Box>
  );
}
```


### Dark Background

**Render**

```tsx
() => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      backgroundColor="var(--colorsUtilityYin100)"
    >
      <Box
        height="80px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Button my={2} buttonType="darkBackground" size="small">
          Small
        </Button>
        <Button my={2} buttonType="darkBackground">
          Medium
        </Button>
        <Button my={2} buttonType="darkBackground" size="large">
          Large
        </Button>
      </Box>
    </Box>
  );
}
```


### Dark Background/Disabled

**Render**

```tsx
() => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      backgroundColor="var(--colorsUtilityYin100)"
    >
      <Box
        height="80px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Button my={2} buttonType="darkBackground" disabled size="small">
          Small
        </Button>
        <Button my={2} buttonType="darkBackground" disabled>
          Medium
        </Button>
        <Button my={2} buttonType="darkBackground" disabled size="large">
          Large
        </Button>
      </Box>
    </Box>
  );
}
```


### Dark Background/Icon

**Render**

```tsx
() => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      backgroundColor="var(--colorsUtilityYin100)"
    >
      <Box
        height="80px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Button my={2} buttonType="darkBackground" iconType="add" size="small">
          Small
        </Button>
        <Button
          my={2}
          buttonType="darkBackground"
          iconType="add"
          iconPosition="after"
        >
          Medium
        </Button>
        <Button
          my={2}
          buttonType="darkBackground"
          disabled
          iconType="add"
          size="small"
        >
          Small
        </Button>
        <Button
          my={2}
          buttonType="darkBackground"
          disabled
          iconType="add"
          iconPosition="after"
        >
          Medium
        </Button>
      </Box>
    </Box>
  );
}
```


### Dark Background/Full Width

**Render**

```tsx
() => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      backgroundColor="var(--colorsUtilityYin100)"
    >
      <Box
        height="80px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Button my={2} buttonType="darkBackground" fullWidth>
          Full Width
        </Button>
      </Box>
    </Box>
  );
}
```


### Dark Background/No Wrap

**Render**

```tsx
() => {
  return (
    <Box backgroundColor="var(--colorsUtilityYin100)" width="80px">
      <Button my={2} buttonType="darkBackground" noWrap>
        Long button text
      </Button>
    </Box>
  );
}
```


### As a Link

**Render**

```tsx
() => {
  return (
    <Box>
      <Button ml={2} mt={2} buttonType="primary" href="/">
        I&#39;m a link
      </Button>
      <Button
        mt={2}
        buttonType="primary"
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        ml={4}
      >
        Open in new tab
      </Button>
    </Box>
  );
}
```


### Icon Only Button

**Render**

```tsx
() => {
  return (
    <Box>
      <Button
        mt={2}
        ml={2}
        buttonType="primary"
        size="small"
        iconType="bin"
        aria-label="Delete"
      />
      <Button mt={2} destructive ml={2} iconType="bin" aria-label="Delete" />
      <Button
        mt={2}
        disabled
        size="large"
        ml={2}
        iconType="bin"
        aria-label="Delete"
      />
    </Box>
  );
}
```


### Icon Only Button with Tooltip

**Render**

```tsx
() => {
  return (
    <Box>
      <Button
        mt={2}
        ml={2}
        buttonType="primary"
        size="small"
        iconType="bin"
        iconTooltipMessage="This is a tooltip"
        aria-label="Delete"
      />
      <Button
        destructive
        ml={2}
        mt={2}
        iconType="bin"
        iconTooltipMessage="This is a tooltip"
        aria-label="Delete"
      />
      <Button
        mt={2}
        ml={2}
        disabled
        size="large"
        iconType="bin"
        iconTooltipMessage="This is a tooltip"
        aria-label="Delete"
      />
    </Box>
  );
}
```


### Gradient/White

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-white" size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="gradient-white" ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="gradient-white" size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
}
```


### Gradient/White/Disabled

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-white" size="small" ml={2} disabled>
        Small
      </Button>
      <Button mt={2} buttonType="gradient-white" ml={2} disabled>
        Medium
      </Button>
      <Button mt={2} buttonType="gradient-white" size="large" ml={2} disabled>
        Large
      </Button>
    </Box>
  );
}
```


### Gradient/White/Icon

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-white" iconType="print" ml={2}>
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="gradient-white"
        iconType="delete"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="gradient-white"
        disabled
        iconType="print"
        ml={2}
      >
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="gradient-white"
        disabled
        iconType="print"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
    </Box>
  );
}
```


### Gradient/White/Full Width

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-white" fullWidth>
        Full Width
      </Button>
    </Box>
  );
}
```


### Gradient/White/No Wrap

**Render**

```tsx
() => {
  return (
    <Box width="40px">
      <Button ml={2} mt={2} buttonType="gradient-white" noWrap>
        Long button text
      </Button>
    </Box>
  );
}
```


### Gradient/Grey

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-grey" size="small" ml={2}>
        Small
      </Button>
      <Button mt={2} buttonType="gradient-grey" ml={2}>
        Medium
      </Button>
      <Button mt={2} buttonType="gradient-grey" size="large" ml={2}>
        Large
      </Button>
    </Box>
  );
}
```


### Gradient/Grey/Disabled

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-grey" size="small" ml={2} disabled>
        Small
      </Button>
      <Button mt={2} buttonType="gradient-grey" ml={2} disabled>
        Medium
      </Button>
      <Button mt={2} buttonType="gradient-grey" size="large" ml={2} disabled>
        Large
      </Button>
    </Box>
  );
}
```


### Gradient/Grey/Icon

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-grey" iconType="print" ml={2}>
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="gradient-grey"
        iconType="delete"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="gradient-grey"
        disabled
        iconType="print"
        ml={2}
      >
        Medium
      </Button>
      <Button
        mt={2}
        buttonType="gradient-grey"
        disabled
        iconType="print"
        iconPosition="after"
        ml={2}
      >
        Medium
      </Button>
    </Box>
  );
}
```


### Gradient/Grey/Full Width

**Render**

```tsx
() => {
  return (
    <Box>
      <Button mt={2} buttonType="gradient-grey" fullWidth>
        Full Width
      </Button>
    </Box>
  );
}
```


### Gradient/Grey/No Wrap

**Render**

```tsx
() => {
  return (
    <Box width="40px">
      <Button ml={2} mt={2} buttonType="gradient-grey" noWrap>
        Long button text
      </Button>
    </Box>
  );
}
```


### Default

**Render**

```tsx
() => {
  return <Button>Button</Button>;
}
```


### Button Content

**Render**

```tsx
() => {
  return (
    <Box display={"flex"} gap={2}>
      <Button aria-label="Return to the home page">
        <Icon type="home" />
      </Button>
      <Button>
        <>
          <Icon type="home" />
          Return to the home page
        </>
      </Button>
      <Button>
        <>
          Return to the home page
          <Icon type="home" />
        </>
      </Button>
    </Box>
  );
}
```


### Click Handler

**Render**

```tsx
() => {
  const [value, setValue] = useState(0);
  return (
    <Button onClick={() => setValue((p) => p + 1)}>
      Button Clicked {value} Times
    </Button>
  );
}
```


### Variations

**Render**

```tsx
(args: ButtonProps) => {
  return (
    <Box display="flex" flexDirection="row" gap="24px" alignItems="flex-start">
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <h1>Default</h1>
        <h2>Primary</h2>
        <>
          <Button {...args} variant="default" variantType="primary" />
        </>
        <h2>Secondary</h2>
        <>
          <Button {...args} variant="default" variantType="secondary" />
        </>
        <h2>Tertiary</h2>
        <>
          <Button {...args} variant="default" variantType="tertiary" />
        </>
        <h2>Subtle</h2>
        <>
          <Button {...args} variant="default" variantType="subtle" />
        </>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <h1>Destructive</h1>
        <h2>Primary</h2>
        <>
          <Button {...args} variant="destructive" variantType="primary" />
        </>
        <h2>Secondary</h2>
        <>
          <Button {...args} variant="destructive" variantType="secondary" />
        </>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <h1>Gradient</h1>
        <h2>Secondary</h2>
        <>
          <Button {...args} variant="gradient" variantType="secondary" />
        </>
      </Box>
    </Box>
  );
}
```


### Sizes

**Render**

```tsx
() => {
  return (
    <Box display="flex" gap={3} flexDirection="row" alignItems={"flex-start"}>
      <Button size="xs">XS</Button>
      <Button size="small">Small</Button>
      <Button>Medium</Button>
      <Button size="large">Large</Button>
    </Box>
  );
}
```


### Disabled

**Render**

```tsx
() => {
  return <Button disabled>Button</Button>;
}
```


### Full-Width

**Render**

```tsx
() => {
  return (
    <Box width="500px" display={"flex"} flexDirection={"column"} gap={1}>
      <Button fullWidth>Full-Width Button</Button>
      <br />
      <br />
      <Button>Normal Button</Button>
    </Box>
  );
}
```


### Inverse

**Render**

```tsx
() => {
  return (
    <Box
      backgroundColor="#333"
      p={2}
      display="flex"
      flexDirection="row"
      gap={1}
    >
      <Button variant="default" variantType="primary" size="medium" inverse>
        Primary Medium
      </Button>
      <Button variant="default" variantType="secondary" size="medium" inverse>
        Secondary Medium
      </Button>
      <Button variant="default" variantType="tertiary" size="medium" inverse>
        Tertiary Medium
      </Button>
      <Button variant="default" variantType="subtle" size="medium" inverse>
        Subtle Medium
      </Button>
    </Box>
  );
}
```


### Loading

**Render**

```tsx
() => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      <Button>
        <Loader variant="inline" loaderType="ring" size="extra-small" />
      </Button>
      <Button>
        <Loader
          variant="inline"
          loaderType="ring"
          loaderLabel="Chargement..."
          size="extra-small"
        />
      </Button>
    </Box>
  );
}
```


### Wrapping Text

**Render**

```tsx
() => {
  return (
    <Box width="80px" display={"flex"} gap={2}>
      <Button noWrap>No Wrapping</Button>
      <Button noWrap={false}>With Wrapping</Button>
    </Box>
  );
}
```


### HTML Button Types

**Render**

```tsx
() => {
  return (
    <Box width="80px" display={"flex"} gap={2}>
      <Button type="button">Button</Button>
      <Button type="reset">Reset</Button>
      <Button type="submit">Submit</Button>
    </Box>
  );
}
```


### As a Link

**Render**

```tsx
() => {
  return (
    <Box>
      <Button ml={2} mt={2} variantType="primary" href="/">
        I&#39;m a link
      </Button>
      <Button
        mt={2}
        variantType="primary"
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        ml={4}
      >
        I&#39;m a link that opens in a new tab
      </Button>
    </Box>
  );
}
```


### Programmatic Focus

**Render**

```tsx
() => {
  const buttonRef = useRef<ButtonHandle>(null);

  return (
    <Box display="flex" gap={2}>
      <Button ref={buttonRef} variantType="primary">
        Button to Focus
      </Button>
      <Button
        variantType="secondary"
        onClick={() => buttonRef.current?.focusButton()}
      >
        Focus other button
      </Button>
    </Box>
  );
}
```

