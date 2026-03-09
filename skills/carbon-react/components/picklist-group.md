---
name: carbon-component-picklist-group
description: Carbon PicklistGroup component props and usage examples.
---

# PicklistGroup

## Import
`import { PicklistGroup } from "carbon-react/lib/components/duelling-picklist";`

## Source
- Export: `./components/duelling-picklist`
- Props interface: `PicklistGroupProps`
- Deprecated: Yes
- Deprecation reason: `PicklistGroup` has been deprecated. See the Carbon documentation for migration details.

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | Item content |  |
| onChange | () => void | Yes |  | Handler invoked when add/remove button is clicked or when space/enter is pressed on the whole item |  |
| title | React.ReactNode | Yes |  | Group title |  |
| type | "add" \| "remove" | Yes | add \| remove | Define if item is of type add or remove |  |
| index | number \| undefined | No |  |  |  |
| isLastGroup | boolean \| undefined | No |  |  |  |
| listIndex | number \| undefined | No |  |  |  |

## Examples
No Storybook examples found.