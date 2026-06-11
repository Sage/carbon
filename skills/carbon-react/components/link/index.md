# Link

Navigates the user to another location.

## Import

```javascript
import Link from "carbon-react/lib/components/link";
```

## Examples

### Default

By default an anchor element will be rendered.

`target` and `rel` props will be passed down to the anchor element when provided.

See: `examples/Default.md`

### Underline

By default, the `Link` component will always render with an underline.

Setting the `underline` prop to `"hover"` will only show the underline when the user hovers over the link.

See: `examples/WithUnderlineOnlyOnHoverAndWithNoUnderline.md`

### Icon

You can render an icon alongside the `Link` text by passing a valid icon to the `icon` prop.
To see the list of available icons, please refer to the [Icon documentation](../icon/index.md).

You can control the position of the icon using the `iconAlign` prop.

See: `examples/WithIcon.md`

### Skip Link

A skip link allows users to bypass repetitive content and navigate directly to the main content of the page.

To render a skip link, set the `isSkipLink` prop to true. The `href` prop should point to the ID of part of the page the user will be skipping to.
Once the user Tabs into the page, the skip link will become visible. When the user activates the link, they will be taken to the target location.

You can use the `link.skipLinkLabel` translation key to override the default label for the skip link.

See: `examples/AsSkipLink.md`

### Sizes

Setting the `linkSize` prop to either `medium` or `large` will change the font size accordingly.

See: `examples/LinkSize.md`

### Bold

Setting the `bold` prop to true will render the `Link` text in bold.

See: `examples/Bold.md`

### Variants

You can use the `variant` prop to change the visual style of the Link. Available variants are `typical`, `negative` and `subtle`.

See: `examples/Variants.md`

### Inverse

You can use the `inverse` prop to render the `Link` with the inverse color scheme.

See: `examples/Inverse.md`

### onClick

A custom `onClick` function can be passed to the Link component to render it as a button instead of an anchor.

**Please note**: using the `onClick` prop with no `href` is bad for accessibility, as the output looks like a link but behaves like an HTML button.
If the `onClick` performs an on-page action, so you want a genuine button, please consider using the [Button component](../button/index.md) instead so that the styles match the semantics. 
If the `onClick` function performs navigation, an `href` prop is necessary either instead or in addition, so that an HTML `<a>` tag is used instead. 
See for example our React Router docs, where we use `Link` with `onClick` to
perform client-side routing, but still provide the `href` to render an HTML link rather than a button.

See: `examples/WithOnClick.md`

## Props

### Link

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ariaLabel | string \| undefined | No |  |  |  | Aria label for accessibility purposes |  |
| bold | boolean \| undefined | No |  |  |  | Sets the link style to bold |  |
| children | React.ReactNode | No |  |  |  | Child content to render in the link. |  |
| className | string \| undefined | No |  |  |  |  |  |
| download | any | No |  |  |  |  |  |
| hasFocus | boolean \| undefined | No |  |  |  |  |  |
| href | string \| undefined | No |  |  |  | An href for an anchor tag. |  |
| icon | IconType \| undefined | No |  |  |  | An icon to display next to the link. |  |
| iconAlign | "left" \| "right" \| undefined | No |  |  |  | Which side of the link to the render the link. |  |
| inverse | boolean \| undefined | No |  |  |  | Sets the colour styling when component is rendered on a dark background |  |
| isSkipLink | boolean \| undefined | No |  |  |  | Allows to create skip link |  |
| linkSize | "medium" \| "large" \| undefined | No |  |  |  | Sets the correct link size |  |
| onClick | ((ev: React.MouseEvent<HTMLAnchorElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Function called when the mouse is clicked. |  |
| onKeyDown | ((ev: React.KeyboardEvent<HTMLAnchorElement> \| React.KeyboardEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Function called when a key is pressed. |  |
| onMouseDown | ((ev: React.MouseEvent<HTMLAnchorElement> \| React.MouseEvent<HTMLButtonElement>) => void) \| undefined | No |  |  |  | Function called when a mouse down event triggers. |  |
| rel | string \| undefined | No |  |  |  | allows to set rel property in <a> tag |  |
| removeAriaLabelOnIcon | boolean \| undefined | No |  |  |  |  |  |
| target | string \| undefined | No |  |  |  | Target property in which link should open ie: _blank, _self, _parent, _top |  |
| underline | "always" \| "hover" \| "never" \| undefined | No |  |  |  | Specifies when the link underline should be displayed. |  |
| variant | Variants \| undefined | No |  |  |  | Allows link styling to be updated for light or dark backgrounds |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| aria-activedescendant | string \| undefined | No |  |  |  | Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. |  |
| aria-atomic | Booleanish \| undefined | No |  |  |  | Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. |  |
| aria-autocomplete | "none" \| "inline" \| "list" \| "both" \| undefined | No |  |  |  | Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they are made. |  |
| aria-braillelabel | string \| undefined | No |  |  |  | Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. Defines a string value that labels the current element, which is intended to be converted into Braille. |  |
| aria-brailleroledescription | string \| undefined | No |  |  |  | Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille. |  |
| aria-busy | Booleanish \| undefined | No |  |  |  |  |  |
| aria-checked | boolean \| "true" \| "false" \| "mixed" \| undefined | No |  |  |  | Indicates the current "checked" state of checkboxes, radio buttons, and other widgets. |  |
| aria-colcount | number \| undefined | No |  |  |  | Defines the total number of columns in a table, grid, or treegrid. |  |
| aria-colindex | number \| undefined | No |  |  |  | Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid. |  |
| aria-colindextext | string \| undefined | No |  |  |  | Defines a human readable text alternative of aria-colindex. |  |
| aria-colspan | number \| undefined | No |  |  |  | Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid. |  |
| aria-controls | string \| undefined | No |  |  |  | Identifies the element (or elements) whose contents or presence are controlled by the current element. |  |
| aria-current | boolean \| "location" \| "page" \| "time" \| "true" \| "false" \| "step" \| "date" \| undefined | No |  |  |  | Indicates the element that represents the current item within a container or set of related elements. |  |
| aria-describedby | string \| undefined | No |  |  |  | Identifies the element (or elements) that describes the object. |  |
| aria-description | string \| undefined | No |  |  |  | Defines a string value that describes or annotates the current element. |  |
| aria-details | string \| undefined | No |  |  |  | Identifies the element that provides a detailed, extended description for the object. |  |
| aria-disabled | Booleanish \| undefined | No |  |  |  | Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable. |  |
| aria-errormessage | string \| undefined | No |  |  |  | Identifies the element that provides an error message for the object. |  |
| aria-expanded | Booleanish \| undefined | No |  |  |  | Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. |  |
| aria-flowto | string \| undefined | No |  |  |  | Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order. |  |
| aria-haspopup | boolean \| "grid" \| "dialog" \| "menu" \| "true" \| "false" \| "listbox" \| "tree" \| undefined | No |  |  |  | Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. |  |
| aria-hidden | Booleanish \| undefined | No |  |  |  | Indicates whether the element is exposed to an accessibility API. |  |
| aria-invalid | boolean \| "true" \| "false" \| "grammar" \| "spelling" \| undefined | No |  |  |  | Indicates the entered value does not conform to the format expected by the application. |  |
| aria-keyshortcuts | string \| undefined | No |  |  |  | Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. |  |
| aria-label | string \| undefined | No |  |  |  | Defines a string value that labels the current element. |  |
| aria-labelledby | string \| undefined | No |  |  |  | Identifies the element (or elements) that labels the current element. |  |
| aria-level | number \| undefined | No |  |  |  | Defines the hierarchical level of an element within a structure. |  |
| aria-live | "off" \| "assertive" \| "polite" \| undefined | No |  |  |  | Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. |  |
| aria-modal | Booleanish \| undefined | No |  |  |  | Indicates whether an element is modal when displayed. |  |
| aria-multiline | Booleanish \| undefined | No |  |  |  | Indicates whether a text box accepts multiple lines of input or only a single line. |  |
| aria-multiselectable | Booleanish \| undefined | No |  |  |  | Indicates that the user may select more than one item from the current selectable descendants. |  |
| aria-orientation | "horizontal" \| "vertical" \| undefined | No |  |  |  | Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. |  |
| aria-owns | string \| undefined | No |  |  |  | Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship between DOM elements where the DOM hierarchy cannot be used to represent the relationship. |  |
| aria-placeholder | string \| undefined | No |  |  |  | Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format. |  |
| aria-posinset | number \| undefined | No |  |  |  | Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. |  |
| aria-pressed | boolean \| "true" \| "false" \| "mixed" \| undefined | No |  |  |  | Indicates the current "pressed" state of toggle buttons. |  |
| aria-readonly | Booleanish \| undefined | No |  |  |  | Indicates that the element is not editable, but is otherwise operable. |  |
| aria-relevant | "text" \| "additions" \| "additions removals" \| "additions text" \| "all" \| "removals" \| "removals additions" \| "removals text" \| "text additions" \| "text removals" \| undefined | No |  |  |  | Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. |  |
| aria-required | Booleanish \| undefined | No |  |  |  | Indicates that user input is required on the element before a form may be submitted. |  |
| aria-roledescription | string \| undefined | No |  |  |  | Defines a human-readable, author-localized description for the role of an element. |  |
| aria-rowcount | number \| undefined | No |  |  |  | Defines the total number of rows in a table, grid, or treegrid. |  |
| aria-rowindex | number \| undefined | No |  |  |  | Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid. |  |
| aria-rowindextext | string \| undefined | No |  |  |  | Defines a human readable text alternative of aria-rowindex. |  |
| aria-rowspan | number \| undefined | No |  |  |  | Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid. |  |
| aria-selected | Booleanish \| undefined | No |  |  |  | Indicates the current "selected" state of various widgets. |  |
| aria-setsize | number \| undefined | No |  |  |  | Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. |  |
| aria-sort | "none" \| "ascending" \| "descending" \| "other" \| undefined | No |  |  |  | Indicates if items in a table or grid are sorted in ascending or descending order. |  |
| aria-valuemax | number \| undefined | No |  |  |  | Defines the maximum allowed value for a range widget. |  |
| aria-valuemin | number \| undefined | No |  |  |  | Defines the minimum allowed value for a range widget. |  |
| aria-valuenow | number \| undefined | No |  |  |  | Defines the current value for a range widget. |  |
| aria-valuetext | string \| undefined | No |  |  |  | Defines the human readable text alternative of aria-valuenow for a range widget. |  |
| disabled | boolean \| undefined | No |  | Yes | The disabled state of the link. This prop is deprecated and will soon be removed. |  |  |
| isDarkBackground | boolean \| undefined | No |  | Yes | The 'isDarkBackground' prop in Link is deprecated and will soon be removed. Please use 'inverse' prop instead. |  |  |
| tooltipMessage | string \| undefined | No |  | Yes | The tooltipMessage prop in Link is deprecated and will soon be removed. | [Legacy] A message to display as a tooltip to the link. |  |
| tooltipPosition | "left" \| "right" \| "bottom" \| "top" \| undefined | No |  | Yes | The tooltipPosition prop in Link is deprecated and will soon be removed. | [Legacy] Positions the tooltip with the link. |  |
| aria-dropeffect | "none" \| "copy" \| "link" \| "execute" \| "move" \| "popup" \| undefined | No |  | Yes | in ARIA 1.1 | Indicates what functions can be performed when a dragged object is released on the drop target. |  |
| aria-grabbed | Booleanish \| undefined | No |  | Yes | in ARIA 1.1 | Indicates an element's "grabbed" state in a drag-and-drop operation. |  |
