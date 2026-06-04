# Tabs

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

Switch between content panes or filtered views of tables.

## Import

```javascript
import { Tabs, Tab } from "carbon-react/lib/components/tabs";
```

## Validation States

If some input-based Carbon component within a `Tab` is in an error or warning state, the `Tab` will also render with the same state - showing a visual,
coloured outline and icon to signify it contains an invalid input field the user needs to address.
You can also use the `errorMessage` and/or `warningMessage` props on the `Tab` component to set a descriptive message for assistive technology users when the `Tab` is in an error or warning state.

See our Validations documentation page for more information about input validation.

<Canvas of={TabsStories.WithValidationState} />

## Examples

### Default

The tabs widget also allows you to select a tab on page load. By default this is set to the first tab.

See: `examples/DefaultStory.md`

### Focusing a Tab Programmatically

```javascript
import { TabsHandle } from "carbon-react/lib/components/tabs";
```

The `TabsHandle` type provides an imperative handle for programmatic control over a desired `Tab`.
Using a ref, you can access its `focusTab()` method which accepts a `tabId` parameter.
Pass the same ID that you've assigned to the `tabId` prop on the `Tab` you want to focus.

See: `examples/ProgrammaticFocus.md`

### Positioned left

See: `examples/PositionedLeft.md`

### With specified tab visible

To set a different tab on page load pass a `tabId` to the `selectedTabId` prop as shown in the example below.

See: `examples/WithSpecifiedTabVisible.md`

### Large tabs

The `size` prop can be used to set the `TabTitle` to either "default" or "large".

#### Positioned top

See: `examples/WithLargeTabsPositionedTopAndWithLargeTabsPositionedLeft.md`

### With additional title siblings

It is possible to add additional elements to the a TabTitle by using the `siblings` prop. The `titlePosition` prop
can be used to render the `title` "before" (default) or "after" the additional elements.

See: `examples/WithAdditionalTitleSiblingsAndWithAdditionalTitleSiblingsSizeLarge.md`

### With custom layout

It is possible to override the static layout of the `TabTitle` by passing in your own custom layouts to the `customLayout`
prop to the `Tab` component.

See: `examples/WithCustomLayout.md`

### With headerWidth

The `headerWidth` prop works only if prop `position` is set to `left`.

See: `examples/WithHeaderWidth.md`

### Responsive

#### Horizontal

**Note: This story is best viewed in the `canvas` view and by adjusting the size of the window.**

The `Tabs` component is responsive and will display navigation buttons to the left and right when the following conditions are met:

- The `position` prop is set to `top`;
- There are more tabs than can fit in the available space.

When both conditions are met, the `Tabs` component will display navigation buttons to the left and right of the tabs. Clicking on
these buttons will scroll the tabs in the respective direction. If there are no tabs to scroll to in a given direction, then the
respective navigation button will not appear.

See: `examples/ResponsiveAndResponsiveVertical.md`

## Props

### Tabs

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  |  |  | The child elements of Tabs need to be Tab components. |  |
| m | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| margin | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top, left, bottom and right |  |
| marginBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| marginLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| marginRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| marginTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| marginX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| marginY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| mb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on bottom |  |
| ml | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left |  |
| mr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on right |  |
| mt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top |  |
| mx | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on left and right |  |
| my | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Margin on top and bottom |  |
| onTabChange | ((tabId: string) => void) \| undefined | No |  |  |  | A callback for when a tab is changed. You can use this to manually control tab changing or to fire other events when a tab is changed. |  |
| position | "left" \| "top" \| undefined | No |  |  |  | The position of the tab title. |  |
| selectedTabId | string \| undefined | No |  |  |  | Allows manual control over the currently selected tab. |  |
| size | "large" \| "default" \| undefined | No |  |  |  | Sets size of the tab titles. |  |
| validationStatusOverride | { [id: string]: { error?: boolean; warning?: boolean; info?: boolean; }; } \| undefined | No |  |  |  | An object to support overriding validation statuses, when the Tabs have custom targets for example. The `id` property should match the `tabId`s for the rendered Tabs. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| align | "left" \| "right" \| undefined | No |  | Yes | Support for right-aligned tab content has been removed. | Sets the alignment of the tab titles. Possible values include. |  |
| borders | "off" \| "on" \| "no left side" \| "no right side" \| "no sides" \| undefined | No |  | Yes | Support for configurable borders on tab titles has been removed. | Adds a combination of borders to the tab titles. |  |
| extendedLine | boolean \| undefined | No |  | Yes | Support for extended lines in tab headers has been removed. | Sets the divider of the tab titles header to extend the full width of the parent. |  |
| headerWidth | string \| undefined | No |  | Yes | Support will be removed in a future release. | sets width to the tab headers. Can be any valid CSS string. The headerWidth prop works only for `position="left"` |  |
| renderHiddenTabs | boolean \| undefined | No |  | Yes | Support for this prop will be removed in a future release. All tabs will be rendered by default. | Prevent rendering of hidden tabs, by default this is set to true and therefore all tabs will be rendered |  |
| showValidationsSummary | boolean \| undefined | No |  | Yes | Support for validation summaries has been removed. | When this prop is set any string validation failures in the children of each Tab will be summarised in the Tooltip next to the Tab title |  |
| variant | "default" \| "alternate" \| undefined | No |  | Yes | Support for alternate styling variants on tab titles has been removed. | Adds an alternate styling variant to the tab titles. |  |

### Tab

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| controls | string | Yes |  |  |  | The tab panel that this tab controls |  |
| id | string | Yes |  |  |  | The ID of the tab |  |
| label | React.ReactNode | Yes |  |  |  | The label shown on the tab |  |
| ariaLabelledby | string \| undefined | No |  |  |  |  |  |
| children | React.ReactNode | No |  |  |  | The child elements of Tab component. |  |
| error | string \| boolean \| undefined | No |  |  |  | The error state of the tab |  |
| hasCustomLayout | boolean \| undefined | No |  |  |  |  |  |
| headerWidth | string \| undefined | No |  |  |  |  |  |
| isTabSelected | boolean \| undefined | No |  |  |  |  |  |
| leftSlot | React.ReactNode | No |  |  |  | The item shown to the left of the label |  |
| p | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top, left, bottom and right |  |
| padding | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top, left, bottom and right |  |
| paddingBottom | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on bottom |  |
| paddingLeft | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left |  |
| paddingRight | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on right |  |
| paddingTop | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top |  |
| paddingX | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left and right |  |
| paddingY | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top and bottom |  |
| pb | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on bottom |  |
| pl | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left |  |
| pr | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on right |  |
| pt | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top |  |
| px | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on left and right |  |
| py | ResponsiveValue<TVal, ThemeType> \| undefined | No |  |  |  | Padding on top and bottom |  |
| rightSlot | React.ReactNode | No |  |  |  | The item shown to the right of the label |  |
| role | string \| undefined | No |  |  |  |  |  |
| titleProps | { "data-role"?: string; } \| undefined | No |  |  |  | Additional props to be passed to the Tab's corresponding title. |  |
| validationStatusOverride | { error?: boolean; warning?: boolean; info?: boolean; } \| undefined | No |  |  |  |  |  |
| warning | string \| boolean \| undefined | No |  |  |  | The warning state of the tab |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| customLayout | React.ReactNode | No |  | Yes | Support for customLayout will be removed in a future release, it is recommended to use the `label` prop instead. | Overrides default layout with a one defined in this prop |  |
| errorMessage | string \| undefined | No |  | Yes | Message displayed when Tab has error The legacy validation pattern is being removed in a future release. |  |  |
| href | string \| undefined | No |  | Yes | Using tabs as links is inaccessible; this prop will be deprecated in a future release. | Allows Tab to be a link |  |
| info | string \| boolean \| undefined | No |  | Yes | to be removed when legacy `Tabs` and `Tab` are removed | The info state of the tab |  |
| infoMessage | string \| undefined | No |  | Yes | Message displayed when Tab has info The legacy validation pattern is being removed in a future release. |  |  |
| position | "left" \| "top" \| undefined | No |  | Yes | Support will be removed in a future release. | The position of the Tab. |  |
| siblings | React.ReactNode | No |  | Yes | Support for siblings will be removed in a future release. It is recommended to use `label` prop to compose what you want. | Additional content to display with title |  |
| tabId | string \| undefined | No |  | Yes | Support will be removed in a future release, it is recommended to use `id` instead. | A unique ID to identify this specific tab. |  |
| title | string \| undefined | No |  | Yes | Support will be removed in a future release, it is recommended to use `label` prop instead. | The title of the Tab. |  |
| titlePosition | "before" \| "after" \| undefined | No |  | Yes | Support for titlePosition will be removed in a future release. It is recommended to use `label` prop to compose what you want. | Position title before or after siblings |  |
| warningMessage | string \| undefined | No |  | Yes | Message displayed when Tab has warning The legacy validation pattern is being removed in a future release. |  |  |
