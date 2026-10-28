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
| disabled | boolean \| undefined | No |  |  |  | Flag to indicate that the button is disabled. |  |
| form | string \| undefined | No |  |  |  | Associates the button with a form element; value should be the id of the form. |  |
| fullWidth | boolean \| undefined | No |  |  |  | Flag to indicate that the button can be full-width. |  |
| href | string \| undefined | No |  |  |  | Used to transform button into anchor |  |
| iconPosition | ButtonIconPosition \| undefined | No |  |  |  | Defines an Icon position related to the children: "before" \| "after" |  |
| iconType | IconType \| undefined | No |  |  |  | Defines an Icon type within the button |  |
| id | string \| undefined | No |  |  |  | The ID of the button. |  |
| inverse | boolean \| undefined | No |  |  |  | Set the button to use a dark-mode appearance. |  |
| m | SpacingProperty | No |  |  |  |  |  |
| margin | SpacingProperty | No |  |  |  |  |  |
| marginBottom | SpacingProperty | No |  |  |  |  |  |
| marginLeft | SpacingProperty | No |  |  |  |  |  |
| marginRight | SpacingProperty | No |  |  |  |  |  |
| marginTop | SpacingProperty | No |  |  |  |  |  |
| marginX | SpacingProperty | No |  |  |  |  |  |
| marginY | SpacingProperty | No |  |  |  |  |  |
| mb | SpacingProperty | No |  |  |  |  |  |
| ml | SpacingProperty | No |  |  |  |  |  |
| mr | SpacingProperty | No |  |  |  |  |  |
| mt | SpacingProperty | No |  |  |  |  |  |
| mx | SpacingProperty | No |  |  |  |  |  |
| my | SpacingProperty | No |  |  |  |  |  |
| name | string \| undefined | No |  |  |  | The name of the button. |  |
| noWrap | boolean \| undefined | No |  |  |  | Flag to indicate whether the button text can wrap over multiple lines. |  |
| onBlur | ((ev: React.FocusEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Handler to fire when the button is blurred. |  |
| onChange | ((ev: React.FormEvent<HTMLButtonElement \| HTMLAnchorElement> \| React.ChangeEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Specify a callback triggered on change |  |
| onClick | ((ev: React.MouseEvent<HTMLAnchorElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Handler to fire when the button is clicked. |  |
| onFocus | ((ev: React.FocusEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Handler to fire when the button is focused. |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLButtonElement \| HTMLAnchorElement>) => void) \| undefined | No |  |  |  | Handler to fire when the button is activated via the Enter or Space keys. |  |
| p | SpacingProperty | No |  |  |  |  |  |
| padding | SpacingProperty | No |  |  |  |  |  |
| paddingBottom | SpacingProperty | No |  |  |  |  |  |
| paddingLeft | SpacingProperty | No |  |  |  |  |  |
| paddingRight | SpacingProperty | No |  |  |  |  |  |
| paddingTop | SpacingProperty | No |  |  |  |  |  |
| paddingX | SpacingProperty | No |  |  |  |  |  |
| paddingY | SpacingProperty | No |  |  |  |  |  |
| pb | SpacingProperty | No |  |  |  |  |  |
| pl | SpacingProperty | No |  |  |  |  |  |
| pr | SpacingProperty | No |  |  |  |  |  |
| pt | SpacingProperty | No |  |  |  |  |  |
| px | SpacingProperty | No |  |  |  |  |  |
| py | SpacingProperty | No |  |  |  |  |  |
| rel | string \| undefined | No |  |  |  | HTML rel attribute |  |
| size | Size \| undefined | No |  |  |  | The size of the button. |  |
| target | string \| undefined | No |  |  |  | HTML target attribute |  |
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
| isWhite | boolean \| undefined | No |  | Yes | Please use `inverse` instead. |  |  |
| subtext | string \| undefined | No |  | Yes | Second text child, renders under main text, only when size is "large" |  |  |

## Examples
No Storybook examples found.