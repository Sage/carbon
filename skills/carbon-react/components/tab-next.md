---
name: carbon-component-tab-next
description: Carbon TabNext component props and usage examples.
---

# TabNext

## Import
`import { Tab } from "carbon-react/lib/components/tabs/__next__";`

## Source
- Export: `./components/tabs/__next__`
- Props interface: `TabProps`

## Props
| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| controls | string | Yes |  |  |  | The tab panel that this tab controls |  |
| id | string | Yes |  |  |  | The ID of the tab |  |
| label | React.ReactNode | Yes |  |  |  | The label content. If rendered as a node, `leftSlot`, `rightSlot` and `subtext` will be ignored. |  |
| error | string \| boolean \| undefined | No |  |  |  | The error state of the tab | false |
| leftSlot | React.ReactNode | No |  |  |  | The item shown to the left of the label |  |
| rightSlot | React.ReactNode | No |  |  |  | The item shown to the right of the label |  |
| subtext | string \| undefined | No |  |  |  | The subtext shown on the tab |  |
| warning | string \| boolean \| undefined | No |  |  |  | The warning state of the tab | false |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| info | string \| boolean \| undefined | No |  | Yes | to be removed when legacy `Tabs` and `Tab` are removed | The info state of the tab | false |

## Examples
No Storybook examples found.