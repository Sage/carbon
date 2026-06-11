# Heading

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

<DeprecationWarning>
Heading has been deprecated, if this pattern is still needed please see our deprecation migration docs for an alternative pattern.
</DeprecationWarning>

## Import

```javascript
import Heading from "carbon-react/lib/components/heading";
```

## Examples

### Default

See: `examples/Default.md`

### Heading with headingType

The `headingType` prop sets the HTML heading element which is rendered on the page. It can take values `"h1"` up to `"h5"`.

See: `examples/WithHeadingType.md`

### Heading without Divider

See: `examples/WithoutDivider.md`

### Heading with Subheader

See: `examples/WithSubheader.md`

### Heading with Pill

See: `examples/WithPill.md`

### Heading with multiple Pills

See: `examples/WithMultiplePills.md`

### Heading with Pill and Subheader

See: `examples/WithPillAndSubheader.md`

### Heading with Subheader and Separator

See: `examples/WithSubheaderSeperator.md`

### Heading with Pill, Subheader and Separator

See: `examples/WithPillSubheaderSeperator.md`

### Heading with Subheader and Children

See: `examples/WithSubheaderChildren.md`

### Heading with Children as a Component

In this example, the Heading component has the Tile component and the Definition List component rendered inside.

See: `examples/WithChildrenComponent.md`

### Heading with Help

See: `examples/WithHelp.md`

### Heading with Help and Pill

See: `examples/WithHelpPill.md`

### Heading with Help and Help Link

See: `examples/WithHelpLink.md`

### Heading with Back Link

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
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  | Margin on top and bottom |  |
| pills | React.ReactNode | No |  | Pills that will be added after the title. |  |
| separator | boolean \| undefined | No |  | Adds a separator between the title and the subheader. | false |
| subheader | React.ReactNode | No |  | Defines the subheader for the heading. |  |
| subtitleId | string \| undefined | No |  | Defines the subtitle id for the heading. |  |
| title | React.ReactNode | No |  | Defines the title for the heading. |  |
| titleId | string \| undefined | No |  | Defines the title id for the heading. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
