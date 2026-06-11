# Note

The `Note` was created using the `lexical` framework which allows rich text content to be rendered. For further documentation on this component, please read our documentation regarding Lexical

## Import

```javascript
import Note from "carbon-react/lib/components/note";
```

## Examples

### Default

In its default form, the component can render plain text content by passing the value via the `noteContent` prop.

See: `examples/Default.md`

### With rich text content

It is possible to render rich text content: below is an example of how the component supports rendering `html` content.
Pass the value via the `noteContent` prop.

See: `examples/WithRichText.md`

### With title

An optional title can be provided using the `title` prop, the `title` prop can be any valid React node.
However we recommend consumers use a `Typography` component to ensure consistency.

See: `examples/WithTitle.md`

### With inline controls

Optional inline controls can be provided using the `inlineControl` prop. This should be an `ActionPopover`.

See: `examples/WithInlineControls.md`

### With status

An optional status can be provided using the `status` prop.

See: `examples/WithStatus.md`

### With previews

It is possible to supply link previews to the `Note` component by passing them in via the `previews` prop. Previews are
rendered as anchor elements and will behave as links, opening the page in a new tab when they are clicked or when focused
and the enter key is pressed.

See: `examples/WithPreviews.md`

### With margin

Margins can be applied to the `note` component using styled-system. To see a full list of available margin props, please visit
the props table at the bottom of this page.

[Visit Props Table](#props)

See: `examples/WithMargin.md`

### Plain-text Links

If you provide a plain-text string that contains a URL, the `Note` component will automatically convert it into a link.

See: `examples/PlainTextWithLinks.md`

## Props

### Note

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| createdDate | string | Yes |  | Adds a created on date to the Note footer |  |
| noteContent | string | Yes |  | The rich text content to display in the Note |  |
| inlineControl | React.ReactNode | No |  | renders a control for the Note |  |
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
| name | string \| undefined | No |  | Adds a name to the Note footer |  |
| onLinkAdded | ((url: string) => void) \| undefined | No |  | Callback to report a url when a link is added |  |
| previews | React.ReactNode | No |  | The previews to display of any links added to the Editor |  |
| status | { text: string; timeStamp: string; } \| undefined | No |  | Adds a status and tooltip to the Note footer |  |
| title | React.ReactNode | No |  | Adds a Title to the Note |  |
| width | number \| undefined | No |  | Set a percentage-based width for the whole Note component, relative to its parent. | 100 |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-label | string \| undefined | No |  | The aria-label to be used when no title is present |  |
