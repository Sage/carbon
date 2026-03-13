---
name: carbon-component-simple-color
description: Carbon SimpleColor component props and usage examples.
---

# SimpleColor

## Import
`import { SimpleColor } from "carbon-react/lib/components/simple-color-picker";`

## Source
- Export: `./components/simple-color-picker`
- Props interface: `SimpleColorProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| value | string | Yes |  | the value of the color that is represented by this SimpleColor |  |
| checked | boolean \| undefined | No |  | determines if this color option is selected or unselected |  |
| className | string \| undefined | No |  |  |  |
| defaultChecked | boolean \| undefined | No |  | determines if this color option is selected or unselected when component is used as uncontrolled |  |
| disabled | boolean \| undefined | No |  | if true, input will be disabled |  |
| id | string \| undefined | No |  | the input id |  |
| name | string \| undefined | No |  | the input name |  |
| onBlur | ((ev: React.FocusEvent<HTMLInputElement>) => void) \| undefined | No |  | Prop for `onBlur` events |  |
| onChange | ((ev: React.ChangeEvent<HTMLInputElement>) => void) \| undefined | No |  | called when the user selects or deselects this color option |  |
| onMouseDown | ((ev: React.MouseEvent<HTMLInputElement>) => void) \| undefined | No |  | Prop for `onMouseDown` events |  |
| aria-label | string \| undefined | No |  | the value of the label to pass to screen reader software |  |

## Examples
### Default

**Args**

```tsx
{}
```

