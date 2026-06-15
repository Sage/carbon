# Pages

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

A deprecated multi-page wizard container that renders child `Page` components with animated slide transitions between them. Use `Dialog` with step-based navigation in new implementations.

**Category:** Navigation

## Quick Start

```javascript
import Pages, { Page } from "carbon-react/lib/components/pages";
```

## Examples

### Default

A `Pages` container wrapping multiple `Page` children. Navigation between pages uses internal back/forward controls.

See: `examples/Default.md`

### Pages with Initial Page Index

Use the `initialpageIndex` prop to start on a specific page rather than the first.

See: `examples/WithInitialPageIndex.md`

### Inside Dialog

`Pages` rendered inside a full-screen `Dialog`, creating a multi-step modal wizard.

See: `examples/InsideDialogFullScreen.md`

### Overriding content padding

Use the `contentPadding` prop on `Page` to override the default padding applied to the page content area.

See: `examples/OverridingContentPadding.md`

## Props

### Props for Pages

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | Individual Page components |  |
| initialpageIndex | string \| number \| undefined | No |  | The selected tab on page load | 0 |
| pageIndex | string \| number \| undefined | No |  | The current page's index |  |
| theme | Partial<ThemeObject> \| undefined | No |  |  |  |
| transition | string \| undefined | No |  | Controls which transition to use (fade or slide). | "slide" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### Props for Page

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  | This component supports children. |  |
| role | string \| undefined | No |  | The ARIA role to be applied to the component |  |
| title | React.ReactNode | No |  | The title for the page, normally a Heading component. |  |
| transitionName | (() => string) \| undefined | No |  |  |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
