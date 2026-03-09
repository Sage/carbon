---
name: carbon-component-sort
description: Carbon Sort component props and usage examples.
---

# Sort

## Import
`import { Sort } from "carbon-react/lib/components/flat-table";`

## Source
- Export: `./components/flat-table`
- Props interface: `SortProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | string \| undefined | No |  |  |  | Sets the text content of the component |  |
| onClick | (() => void) \| undefined | No |  |  |  | Callback fired when the component is clicked |  |
| sortType | "ascending" \| "descending" \| undefined | No |  |  |  | if `asc` it will show `sort_up` icon, if `desc` it will show `sort_down` |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-roledescription | string \| undefined | No |  |  |  | Sets the aria-roledescription of the component |  |
| accessibleName | string \| undefined | No |  | Yes | this prop has been deprecated in favour of using `aria-live` regions | Sets the accessible name of the component |  |

## Examples
### Default

**Args**

```tsx
{
    children: "",
  }
```

