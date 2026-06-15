# Heading

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

A deprecated page or section heading component that combines a title, optional subheader, pills, help icon, back link and a horizontal divider. Use `Typography` in new implementations.

**Category:** UI presentation

## Quick Start

```javascript
import Heading from "carbon-react/lib/components/heading";
```

## Examples

### Default

A heading with a title and a horizontal divider below it.

See: `examples/Default.md`

### Heading with headingType

The `headingType` prop sets the HTML heading element which is rendered on the page. It can take values `"h1"` up to `"h5"`.

See: `examples/WithHeadingType.md`

### Heading without Divider

Use `divider={false}` to remove the horizontal line below the heading.

See: `examples/WithoutDivider.md`

### Heading with Subheader

Use the `subheader` prop to display secondary text below the title.

See: `examples/WithSubheader.md`

### Heading with Pill

Pass a `Pill` component via the `pills` prop to display a status badge next to the title.

See: `examples/WithPill.md`

### Heading with multiple Pills

Pass an array of `Pill` components via the `pills` prop to display multiple status badges.

See: `examples/WithMultiplePills.md`

### Heading with Pill and Subheader

Combines a `Pill` badge next to the title and a `subheader` below it.

See: `examples/WithPillAndSubheader.md`

### Heading with Subheader and Separator

A subheader displayed alongside a vertical separator using the `separator` prop.

See: `examples/WithSubheaderSeperator.md`

### Heading with Pill, Subheader and Separator

All three: pill badge, subheader text and a vertical separator combined.

See: `examples/WithPillSubheaderSeperator.md`

### Heading with Subheader and Children

Arbitrary React nodes can be passed as `children` to render additional content below the heading row.

See: `examples/WithSubheaderChildren.md`

### Heading with Children as a Component

In this example, the Heading component has the Tile component and the Definition List component rendered inside.

See: `examples/WithChildrenComponent.md`

### Heading with Help

Pass `help` text to display a help icon (?). Hovering the icon shows a tooltip with the help message.

See: `examples/WithHelp.md`

### Heading with Help and Pill

Combines a help icon tooltip with a `Pill` badge next to the title.

See: `examples/WithHelpPill.md`

### Heading with Help and Help Link

Combines a `help` tooltip with a `helpLink` that links to more documentation.

See: `examples/WithHelpLink.md`

### Heading with Back Link

Use the `backLink` prop to render a navigational back arrow link above the heading.

See: `examples/WithBackLink.md`

## Props

### Heading

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| backLink | string \| ((ev: React.MouseEvent<HTMLAnchorElement> \| React.MouseEvent<HTMLButtonElement> \| React.KeyboardEvent<HTMLAnchorElement> \| React.KeyboardEvent<HTMLButtonElement>) => void) \| undefined | No |  | Defines the a href for the back link. |  |
| children | React.ReactNode | No |  | Child elements |  |
| divider | boolean \| undefined | No |  | Adds a divider below the heading and the content. | true |
| headingType | HeadingType \| undefined | No |  | Defines the HTML heading element of the title. | "h1" |
| help | string \| undefined | No |  | Defines the help text for the heading. |  |
| helpAriaLabel | string \| undefined | No |  | Aria label for rendered help component |  |
| helpLink | string \| undefined | No |  | Defines the help link for the heading. |  |
| pills | React.ReactNode | No |  | Pills that will be added after the title. |  |
| separator | boolean \| undefined | No |  | Adds a separator between the title and the subheader. | false |
| subheader | React.ReactNode | No |  | Defines the subheader for the heading. |  |
| subtitleId | string \| undefined | No |  | Defines the subtitle id for the heading. |  |
| title | React.ReactNode | No |  | Defines the title for the heading. |  |
| titleId | string \| undefined | No |  | Defines the title id for the heading. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
