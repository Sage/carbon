# Tabs

Tabs organise content, and let a user easily navigate and switch between content. Use tabs to structure content that does not need to be visible all at the same time. Responsive
sizes should limit the number of tabs used to no more than 5.

**This documentation is for the newer implementation of Tabs. If you are still using the older implementation, please use the Tabs documentation.**

## Import

```javascript
import {
  Tabs,
  Tab,
  TabList,
  TabPanel,
  type TabsHandle,
} from "carbon-react/lib/components/tabs/__next__";
```

## Related Components

- Navigating the hierarchy of the app? Try [Menu](../menu/index.md)
- Positioning your primary navigation? Try [Navigation Bar](../navigation-bar/index.md)

## Accessibility

Users should be able to:

- Navigate to the tabs using assistive technology;
- Identify tabs as a group of related content sections;
- Display one section of content at a time.

### Keyboard Interactions

- Use the <kbd>Tab</kbd> key to move focus from the previous interactive element on the page to the first tab in the tab list.
- Pressing the <kbd>Tab</kbd> key from the tab list moves focus to the next interactive element on the page.
- To move between tabs, use the <kbd>LeftArrow</kbd> and <kbd>RightArrow</kbd> keys. Do not use the <kbd>Tab</kbd> key.
- To display the selected `Tab` content, press <kbd>Enter</kbd> or <kbd>Space</kbd>.

## Examples

### Focusing a Tab Programmatically

The `TabsHandle` type lets you control which tab is focused through code. By attaching a `ref` to your TabList, you can access an imperative method called
`focusTab()`, which takes a tab’s `id` as an argument and sets focus to it when called. To do this, first import the handle as above, and then use React's
`useRef` hook to create a reference,

```javascript
const tabsHandle = useRef < TabsHandle > null;
```

Attach it to the `TabList` component via the `ref` prop:

```javascript
<TabList ariaLabel="Sample Tabs" ref={tabsHandle}>
  <Tab id="tab-1--programmatic" />
  <Tab id="tab-2--programmatic" />
  <Tab id="tab-3--programmatic" />
</TabList>
```

And then use it to call the `focusTab` method when e.g. a `Button` is clicked. Note that the value passed to the method is the value of the `id` prop for
the target tab:

```javascript
<Button
  buttonType="primary"
  onClick={() => tabsHandle.current?.focusTab("tab-3--programmatic")}
>
  Focus Tab 3
</Button>
```

See: `examples/ProgrammaticFocus.md`

## Props

### Tabs

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| children | React.ReactNode | No |  | The tab list to be rendered within this set of tabs |  |
| labelledBy | string \| undefined | No |  | The label associated with this set of tabs, for assistive technologies | "" |
| orientation | "horizontal" \| "vertical" \| undefined | No |  | The orientation of the tabs | "horizontal" |
| selectedTabId | string \| undefined | No |  | The pre-selected tab to show e.g when restoring from URL |  |
| size | "medium" \| "large" \| undefined | No |  | The size of the tabs to use | "medium" |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### Tab List

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| ariaLabel | string | Yes |  | The label read out when the tab list gains focus |  |
| children | React.ReactNode | No |  | The tabs to be shown in the tab list |  |
| headerWidth | string \| undefined | No |  |  |  |
| onTabChange | ((tabId: string) => void) \| undefined | No |  | A callback for when the active tab is changed |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

### Tab

| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |
| --- | --- | --- | --- | --- | --- | --- | --- |
| controls | string | Yes |  |  |  | The tab panel that this tab controls |  |
| id | string | Yes |  |  |  | The ID of the tab |  |
| label | React.ReactNode | Yes |  |  |  | The label shown on the tab |  |
| error | string \| boolean \| undefined | No |  |  |  | The error state of the tab | false |
| hasCustomLayout | boolean \| undefined | No |  |  |  |  |  |
| headerWidth | string \| undefined | No |  |  |  |  |  |
| href | string \| undefined | No |  |  |  |  |  |
| leftSlot | React.ReactNode | No |  |  |  | The item shown to the left of the label |  |
| rightSlot | React.ReactNode | No |  |  |  | The item shown to the right of the label |  |
| warning | string \| boolean \| undefined | No |  |  |  | The warning state of the tab | false |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| info | string \| boolean \| undefined | No |  | Yes | to be removed when legacy `Tabs` and `Tab` are removed | The info state of the tab | false |

### Tab Panel

| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| id | string | Yes |  | The ID of the tab panel |  |
| tabId | string | Yes |  | The ID of the controlling tab |  |
| children | React.ReactNode | No |  | The content to be shown in the tab panel |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Ref methods

`TabList`'s forwarded ref exposes the following imperative methods:

| Method Name              | Description                                       |
| ------------------------ | ------------------------------------------------- |
| `focusTab(id: string)` | Programmatically focuses the specified tab by ID. |
