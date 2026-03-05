---
name: carbon-component-flat-table-checkbox
description: Carbon FlatTableCheckbox component props and usage examples.
---

# FlatTableCheckbox

## Import
`import { FlatTableCheckbox } from "carbon-sage/lib/components/flat-table";`

## Source
- Export: `./components/flat-table`
- Props interface: `FlatTableCheckboxProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| checked | boolean | Yes |  | Prop to set checked prop on Checkbox |  |
| onChange | (ev: React.ChangeEvent<HTMLInputElement>) => void | Yes |  | Callback to be called onChange in Checkbox |  |
| ariaLabelledBy | string \| undefined | No |  | The id of the element that labels the input |  |
| as | "td" \| "th" \| undefined | No |  | Prop to polymorphically render either a 'th' or 'td' element | "td" |
| id | string \| undefined | No |  | Sets an id string on the element |  |
| onClick | ((ev: React.MouseEvent<HTMLElement>) => void) \| undefined | No |  | Callback function to be called when click event received |  |
| selectable | boolean \| undefined | No |  | Whether to render the checkbox or not, defaults to true | true |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Default

**Args**

```tsx
{}
```

