# LoaderBar

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

Use the LoaderBar component to let users know a task or loading data is still in progress.
Showing a LoaderBar helps the user to understand that they should wait, rather than reload the page or abandon a process.
In general, place a LoaderBar in the centre and middle of the page or container it relates to.

**Category:** Feedback

## Quick Start

Import `LoaderBar` into the project.

```javascript
import LoaderBar from "carbon-react/lib/components/loader-bar";
```

## Examples

### Default bar

This example of the LoaderBar component demonstrates how it will appear as default.

See: `examples/DefaultStory.md`

### Small bar

This is an example of a small LoaderBar component.

See: `examples/SmallStoryLoaderbar.md`

### Large bar

This is an example of a large LoaderBar component.

See: `examples/LargeStoryLoaderbar.md`

## Props

### LoaderBar

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| size | "small" \| "medium" \| "large" \| undefined | No |  | Size of the LoaderBar. | "medium" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
