# Tabs

> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)

Switch between content panes or filtered views of tables.

**Category:** Navigation

## Quick Start

```javascript
import { Tabs, Tab } from "carbon-react/lib/components/tabs";
```

- Navigating the hierarchy of the app? [Try Menu](../?path=/docs/menu--docs)
- Positioning your primary navigation? [Try Navigation Bar](../?path=/docs/navigation-bar--docs)

- Switch between variants of a page or different tables (e.g. separate tables showing unread and read emails).
- There are two `position` options:
  - `top` - shows the tabs in a line, typically above a Table - best for short lists of tabs.
  - `left` - show the tables in a column, typically to the left of a Table - best for longer lists of tabs.
- You can also `align` the tabs `left` or `right`. This configuration:
  - sets the text alignment for `left` tabs.
  - sets `left` or `right` page position for `top` tabs.
- Only use tabs if there’s more than one, and show the content of one tab by default. Avoid multiple rows of tabs,
  nested tabs, or using vertical and horizontal tabs at the same time.
- To use `Tabs` with a routing library see our documentation on this here: [Usage with routing](../?path=/docs/documentation-usage-with-routing--docs).

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

Set `position="left"` on `Tabs` to render the tab bar along the left side of the content area, with tabs stacked vertically.

See: `examples/PositionedLeft.md`

### With specified tab visible

To set a different tab on page load pass a `tabId` to the `selectedTabId` prop as shown in the example below.

See: `examples/WithSpecifiedTabVisible.md`

### Large tabs

The `size` prop can be used to set the `TabTitle` to either "default" or "large".

#### Positioned top

Large tabs positioned above the content (default orientation).

See: `examples/WithLargeTabsPositionedTop.md`

#### Positioned left

Large tabs positioned along the left side.

See: `examples/WithLargeTabsPositionedLeft.md`

### With additional title siblings

It is possible to add additional elements to the a TabTitle by using the `siblings` prop. The `titlePosition` prop
can be used to render the `title` "before" (default) or "after" the additional elements.

See: `examples/WithAdditionalTitleSiblings.md`

#### Large tabs with siblings

Large-sized tabs with additional sibling elements rendered alongside the tab title.

See: `examples/WithAdditionalTitleSiblingsSizeLarge.md`

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

See: `examples/Responsive.md`

#### Vertical

**Note: This story is best viewed in the `canvas` view and by adjusting the size of the window.**

The `Tabs` component is also responsive when oriented vertically. Please note that the navigation buttons described above will not appear
when the `position` prop is set to `left`.

See: `examples/ResponsiveVertical.md`

### Integrating with an external history

It is possible to integrate the `Tabs` component with an external `history` to manipulate the location when a given `Tab`
is selected. In order to achieve this you should use the `onTabChange` prop to pass a callback that calls `push` or `replace`
on the provided `history`. The `selectedTabId` prop can also be used to update which tab is selected. Below is an example
implementation using `createHashHistory` from `history@v5.0.0`.

```jsx
import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "carbon-react/lib/components/tabs";
import { createHashHistory } from "history";

const tabIds = ["tab-1", "tab-2", "tab-3"];

const TabsWithExternalHashHistory = ({ history, children, ...rest }) => {
  const { pathname } = history?.location;
  const initialActiveTab = tabIds.includes(pathname) ? pathname : tabIds[0];
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  useEffect(() => {
    const stopListen = history.listen(({ action, location }) => {
      if (action === "POP" && !tabIds.includes(location?.pathname)) {
        // back pressed and no id available from pathname
        setActiveTab(tabIds[0]);
      } else if (tabIds.includes(location?.pathname)) {
        const index = tabIds.findIndex((id) => location?.pathname === id);
        const tabId = tabIds[index];

        if (tabId && tabId !== activeTab) {
          setActiveTab(tabId);
        }
      }
    });

    return () => stopListen();
  }, [activeTab, history]);

  const handleTabChange = (tabid) => history.push(tabid);

  return (
    <Tabs {...rest} onTabChange={handleTabChange} selectedTabId={activeTab}>
      {children}
    </Tabs>
  );
};

const App = () => {
  const history = createHashHistory();
  return (
    <TabsWithExternalHashHistory history={history} align="left" position="top">
      <Tab tabId="tab-1" title="Tab 1" key="tab-1">
        Content for tab 1
      </Tab>
      <Tab tabId="tab-2" title="Tab 2" key="tab-2">
        Content for tab 2
      </Tab>
      <Tab tabId="tab-3" title="Tab 3" key="tab-3">
        Content for tab 3
      </Tab>
    </TabsWithExternalHashHistory>
  );
};
```

### Validation States

If some input-based Carbon component within a `Tab` is in an error or warning state, the `Tab` will also render with the same state - showing a visual,
coloured outline and icon to signify it contains an invalid input field the user needs to address.
You can also use the `errorMessage` and/or `warningMessage` props on the `Tab` component to set a descriptive message for assistive technology users when the `Tab` is in an error or warning state.

See our [Validations](../../references/docs/validations.md) documentation page for more information about input validation.

See: `examples/WithValidationState.md`

## Props

### Tabs

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | Yes |  |  |  | The child elements of Tabs need to be Tab components. |  |
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
