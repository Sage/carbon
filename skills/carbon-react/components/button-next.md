---
name: carbon-component-button-next
description: Carbon ButtonNext component props and usage examples.
---

# ButtonNext

## Import
`import Button from "carbon-react/lib/components/button/__next__";`

## Source
- Export: `./components/button/__next__`
- Props interface: `ButtonProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  |  |  | The content that the button displays. |  |
| className | string \| undefined | No |  |  |  |  |  |
| disabled | boolean \| undefined | No |  |  |  | Flag to indicate that the button is disabled. |  |
| fullWidth | boolean \| undefined | No |  |  |  | Flag to indicate that the button can be full-width. |  |
| iconPosition | ButtonIconPosition \| undefined | No |  |  |  | Defines an Icon position related to the children: "before" \| "after" |  |
| iconType | IconType \| undefined | No |  |  |  | Defines an Icon type within the button |  |
| id | string \| undefined | No |  |  |  | The ID of the button. |  |
| inverse | boolean \| undefined | No |  |  |  | Set the button to use a dark-mode appearance. |  |
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
| name | string \| undefined | No |  |  |  | The name of the button. |  |
| noWrap | boolean \| undefined | No |  |  |  | Flag to indicate whether the button text can wrap over multiple lines. |  |
| onBlur | ((ev: React.FocusEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Handler to fire when the button is blurred. |  |
| onChange | ((ev: React.FormEvent<HTMLButtonElement \| HTMLAnchorElement> \| React.ChangeEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on change |  |
| onClick | ((ev: React.MouseEvent<HTMLAnchorElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Handler to fire when the button is clicked. |  |
| onFocus | ((ev: React.FocusEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Handler to fire when the button is focused. |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Handler to fire when the button is activated via the Enter or Space keys. |  |
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
| size | Size \| undefined | No |  |  |  | The size of the button. |  |
| type | "button" \| "reset" \| "submit" \| undefined | No |  |  |  | The HTML type that this button should use. |  |
| variant | Variant \| undefined | No |  |  |  | The variant of the button. |  |
| variantType | VariantType \| undefined | No |  |  |  | The variant type of the button. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-describedby | string \| undefined | No |  |  |  | Identifies the element(s) offering additional information about the button that the user might require. |  |
| aria-label | string \| undefined | No |  |  |  | The aria-label attribute of the button. |  |
| aria-labelledby | string \| undefined | No |  |  |  | Identifies the element(s) labelling the button. |  |
| buttonType | LegacyButtonProps["buttonType"] | No |  | Yes | Please use `variantType` prop instead. |  |  |
| destructive | boolean \| undefined | No |  | Yes | Please use `variant="destructive"` instead. |  |  |
| href | string \| undefined | No |  | Yes | Used to transform button into anchor |  |  |
| isWhite | boolean \| undefined | No |  | Yes | Please use `inverse` instead. |  |  |
| rel | string \| undefined | No |  | Yes | HTML rel attribute |  |  |
| subtext | string \| undefined | No |  | Yes | Second text child, renders under main text, only when size is "large" |  |  |
| target | string \| undefined | No |  | Yes | HTML target attribute |  |  |

## Examples
No Storybook examples found.