---
name: carbon-component-picklist
description: Carbon Picklist component props and usage examples.
---

# Picklist

## Import
`import { Picklist } from "carbon-sage/lib/components/duelling-picklist";`

## Source
- Export: `./components/duelling-picklist`
- Props interface: `PicklistProps`
- Deprecated: Yes
- Deprecation reason: `Picklist` has been deprecated. See the Carbon documentation for migration details.

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | List of PicklistItem elements |  |
| disabled | boolean \| undefined | No |  | Indicate if component is disabled |  |
| index | number \| undefined | No |  |  |  |
| placeholder | React.ReactNode | No |  | Placeholder to be rendered when list is empty |  |

## Examples
### Default

**Args**

```tsx
{
    children: [],
  }
```

