---
name: carbon-component-message
description: Carbon Message component props and usage examples.
---

# Message

A static inline message that stays on screen and conveys its type through a variant icon, colour and screen-reader text.

## Pitfalls

- Message is not a live region. When showing one dynamically, Carbon recommends moving focus to it through a ref only for error messages, and placing other variants inside an aria-live region that is present in the DOM on page load.
- onDismiss only renders the close button and reports the event; hide the message by setting open to false or unmounting it.
- Do not use variant="neutral"; it is deprecated and will be removed, although its type does not mark it as deprecated.

## Import
`import Message from "carbon-react/lib/components/message";`

## Source
- Export: `./components/message`
- Props interface: `MessageProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  |  |  | Content to be rendered within the Message. |  |
| closeButtonAriaLabel | string \| undefined | No |  |  |  | Set custom aria-label for component's close button. |  |
| id | string \| undefined | No |  |  |  | Set custom id to component root. |  |
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
| onDismiss | ((e: React.KeyboardEvent<HTMLButtonElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Callback triggered on dismiss, will render the close button. |  |
| open | boolean \| undefined | No |  |  |  | Flag to determine if the message is rendered. |  |
| size | "medium" \| "large" \| undefined | No |  |  |  | Set the component's size. |  |
| title | React.ReactNode | No |  |  |  | Set message title. |  |
| variant | MessageVariant \| undefined | No |  |  |  | Set the component's variant. |  |
| width | string \| undefined | No |  |  |  | Set the component's width, accepts any valid css string. Please note the component has a max-width of 720px. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| showCloseIcon | boolean \| undefined | No |  | Yes | Please use the `onDismiss` prop to determine whether the close button is rendered instead. | Flag to determine if the close button is rendered. |  |
| transparent | boolean \| undefined | No |  | Yes | The transparent prop is deprecated and will be removed in a future release, please use the subtle variants instead. | Set transparent styling. |  |

## Examples
Load only the example needed for the current task; playground stories are intentionally omitted.

- [Programmatic Focus](../examples/message/programmatic-focus.md) — Focus a newly shown error message, announce a success message through a persistent aria-live region, and dismiss both by controlling open.