---
name: carbon-component-tabs
description: Carbon Tabs component props and usage examples.
---

# Tabs

## Import
`import { Tabs } from "carbon-react/lib/components/tabs";`

## Source
- Export: `./components/tabs`
- Props interface: `TabsProps`

## Props
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
| position | "left" \| "top" \| undefined | No | left \| top |  |  | The position of the tab title. | "top" |
| selectedTabId | string \| undefined | No |  |  |  | Allows manual control over the currently selected tab. |  |
| size | "large" \| "default" \| undefined | No | large \| default |  |  | Sets size of the tab titles. | "default" |
| validationStatusOverride | { [id: string]: { error?: boolean; warning?: boolean; info?: boolean; }; } \| undefined | No |  |  |  | An object to support overriding validation statuses, when the Tabs have custom targets for example. The `id` property should match the `tabId`s for the rendered Tabs. |  |
| data-element | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  |  |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| align | "left" \| "right" \| undefined | No | left \| right | Yes | Support for right-aligned tab content has been removed. | Sets the alignment of the tab titles. Possible values include. |  |
| borders | "off" \| "on" \| "no left side" \| "no right side" \| "no sides" \| undefined | No | off \| on \| no left side \| no right side \| no sides | Yes | Support for configurable borders on tab titles has been removed. | Adds a combination of borders to the tab titles. |  |
| extendedLine | boolean \| undefined | No |  | Yes | Support for extended lines in tab headers has been removed. | Sets the divider of the tab titles header to extend the full width of the parent. |  |
| headerWidth | string \| undefined | No |  | Yes | Support will be removed in a future release. | sets width to the tab headers. Can be any valid CSS string. The headerWidth prop works only for `position="left"` |  |
| renderHiddenTabs | boolean \| undefined | No |  | Yes | Support for this prop will be removed in a future release. All tabs will be rendered by default. | Prevent rendering of hidden tabs, by default this is set to true and therefore all tabs will be rendered | true |
| showValidationsSummary | boolean \| undefined | No |  | Yes | Support for validation summaries has been removed. | When this prop is set any string validation failures in the children of each Tab will be summarised in the Tooltip next to the Tab title |  |
| variant | "default" \| "alternate" \| undefined | No | default \| alternate | Yes | Support for alternate styling variants on tab titles has been removed. | Adds an alternate styling variant to the tab titles. |  |

## Examples
### Playground

**Args**

```tsx
{
    orientation: "horizontal",
    size: "medium",
    selectedTabId: playgroundTabIds[0],
    tabCount: 3,
    tabSubtext: "",
    tabLeftSlot: false,
    tabRightSlot: false,
    tabValidation: "none",
  }
```

**Render**

```tsx
({
    tabCount,
    tabSubtext,
    tabLeftSlot,
    tabRightSlot,
    tabValidation,
    ...tabsArgs
  }) => {
    const tabIds = playgroundTabIds.slice(0, tabCount);

    return (
      <Tabs key={tabsArgs.selectedTabId} {...tabsArgs}>
        <TabList ariaLabel="Playground Tabs">
          {tabIds.map((id, index) => (
            <Tab
              key={id}
              id={id}
              controls={`tab-panel-${index + 1}--playground`}
              label={`Tab ${index + 1}`}
              subtext={tabSubtext || undefined}
              leftSlot={tabLeftSlot ? <Icon type="home" /> : undefined}
              rightSlot={tabRightSlot ? <Pill>Label</Pill> : undefined}
              error={index === 0 && tabValidation === "error"}
              warning={index === 0 && tabValidation === "warning"}
            />
          ))}
        </TabList>
        {tabIds.map((id, index) => (
          <TabPanel
            key={id}
            id={`tab-panel-${index + 1}--playground`}
            tabId={id}
          >
            <Typography m={2}>{`Content ${index + 1}`}</Typography>
          </TabPanel>
        ))}
      </Tabs>
    );
  }
```


### WithErrorAndWarningInForm

**Render**

```tsx
() => (
    <Tabs>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1--form" controls="tab-panel-1--form" label="Default" />
        <Tab id="tab-2--form" controls="tab-panel-2--form" label="Error" />
        <Tab id="tab-3--form" controls="tab-panel-3--form" label="Warning" />
      </TabList>
      <TabPanel id="tab-panel-1--form" tabId="tab-1--form">
        <Form>
          <Textbox label="Textbox" value="" onChange={() => {}} />
        </Form>
      </TabPanel>
      <TabPanel id="tab-panel-2--form" tabId="tab-2--form">
        <Form>
          <Textbox
            label="Textbox"
            value=""
            onChange={() => {}}
            error="Textbox must not be blank"
          />
        </Form>
      </TabPanel>
      <TabPanel id="tab-panel-3--form" tabId="tab-3--form">
        <Form>
          <Textbox
            label="Textbox"
            value=""
            onChange={() => {}}
            warning="Textbox must not be blank"
          />
        </Form>
      </TabPanel>
    </Tabs>
  )
```


### ProgrammaticFocus

**Render**

```tsx
() => {
    const tabsHandle = useRef<TabsHandle>(null);
    const tabIds = ["tab-1--focus", "tab-2--focus", "tab-3--focus"];

    return (
      <>
        <Tabs>
          <TabList ariaLabel="Sample Tabs" ref={tabsHandle}>
            {tabIds.map((id, index) => (
              <Tab
                key={id}
                id={id}
                controls={`tab-panel-${index + 1}--focus`}
                label={`Tab ${index + 1}`}
              />
            ))}
          </TabList>
          {tabIds.map((id, index) => (
            <TabPanel key={id} id={`tab-panel-${index + 1}--focus`} tabId={id}>
              <Typography m={2}>{`Content ${index + 1}`}</Typography>
            </TabPanel>
          ))}
        </Tabs>
        <Box mt={2} display="flex" gap={2}>
          {tabIds.map((id, index) => (
            <Button key={id} onClick={() => tabsHandle.current?.focusTab(id)}>
              {`Focus Tab ${index + 1}`}
            </Button>
          ))}
        </Box>
      </>
    );
  }
```


### HandleTabChanges

**Render**

```tsx
() => {
    const [newUrl, setNewUrl] = useState("");

    return (
      <>
        <Tabs>
          <TabList
            ariaLabel="Sample Tabs"
            onTabChange={(tabId) =>
              setNewUrl(`${window.location.href}?tabId=${tabId}`)
            }
          >
            <Tab
              id="tab-1--change"
              controls="tab-panel-1--change"
              label="Tab 1"
            />
            <Tab
              id="tab-2--change"
              controls="tab-panel-2--change"
              label="Tab 2"
            />
            <Tab
              id="tab-3--change"
              controls="tab-panel-3--change"
              label="Tab 3"
            />
          </TabList>
          <TabPanel id="tab-panel-1--change" tabId="tab-1--change">
            <Typography m={2}>Content 1</Typography>
          </TabPanel>
          <TabPanel id="tab-panel-2--change" tabId="tab-2--change">
            <Typography m={2}>Content 2</Typography>
          </TabPanel>
          <TabPanel id="tab-panel-3--change" tabId="tab-3--change">
            <Typography m={2}>Content 3</Typography>
          </TabPanel>
        </Tabs>
        <Typography>
          URL for tab: {newUrl || "No tab change detected"}
        </Typography>
      </>
    );
  }
```


### Default

**Render**

```tsx
() => (
  <Box p="4px">
    <Tabs renderHiddenTabs={false} align="left" position="top">
      <Tab error id="tab-1" title="Tab 1" key="tab-1">
        Content for tab 1
      </Tab>
      <Tab warning tabId="tab-2" title="Tab 2" key="tab-2">
        Content for tab 2
      </Tab>
      <Tab info tabId="tab-3" title="Tab 3" key="tab-3">
        Content for tab 3
      </Tab>
      <Tab tabId="tab-4" title="Tab 4" key="tab-4">
        Content for tab 4
      </Tab>
      <Tab tabId="tab-5" title="Tab 5" key="tab-5">
        Content for tab 5
      </Tab>
    </Tabs>
  </Box>
)
```


### Focusing a Tab Programmatically

**Render**

```tsx
() => {
  const tabsHandle = useRef<TabsHandle>(null);

  return (
    <Box p="4px">
      <Tabs ref={tabsHandle} align="left" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
      <Button mt={5} onClick={() => tabsHandle.current?.focusTab("tab-4")}>
        Focus Tab 4
      </Button>
    </Box>
  );
}
```


### Positioned Left

**Render**

```tsx
() => {
  return (
    <div style={lightGreyBackground}>
      <Tabs align="left" position="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          <div style={whiteBackground}>Content for tab 1</div>
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </div>
  );
}
```


### With Specified Tab Visible

**Render**

```tsx
() => {
  return (
    <Box p="4px">
      <Tabs selectedTabId="tab-2" align="left" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
}
```


### With Large Tabs Positioned Top

**Render**

```tsx
() => {
  return (
    <Box p="4px">
      <Tabs size="large" align="left" position="top">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
}
```


### With Large Tabs Positioned Left

**Render**

```tsx
() => {
  return (
    <Box p="4px">
      <Tabs size="large" align="left" position="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
        >
          Content for tab 2
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
        >
          Content for tab 3
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-4"
          title="Tab 4"
          key="tab-4"
        >
          Content for tab 4
        </Tab>
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-5"
          title="Tab 5"
          key="tab-5"
        >
          Content for tab 5
        </Tab>
      </Tabs>
    </Box>
  );
}
```


### With Additional Title Siblings

**Render**

```tsx
() => {
  return (
    <Box p="4px">
      <Tabs align="left" position="top">
        <Tab
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
          siblings={[
            <Pill size="S" pillRole="status" fill key="pill">
              12
            </Pill>,
            <Icon type="home" key="icon" />,
          ]}
          titlePosition="before"
        >
          Content for tab 1
        </Tab>
        <Tab tabId="tab-2" title="Tab 2" key="tab-2" titlePosition="after">
          Content for tab 2
        </Tab>
        <Tab
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
          siblings={[
            <Pill size="S" pillRole="status" fill key="pill">
              12
            </Pill>,
            <Icon type="home" key="icon" />,
          ]}
          titlePosition="after"
        >
          Content for tab 3
        </Tab>
      </Tabs>
    </Box>
  );
}
```


### With Additional Title Siblings Size Large

**Render**

```tsx
() => {
  return (
    <Box p="4px">
      <Tabs size="large" align="left" position="top">
        <Tab
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
          siblings={[
            <Pill size="S" pillRole="status" fill key="pill">
              12
            </Pill>,
            <Icon type="home" key="icon" />,
          ]}
          titlePosition="before"
        >
          Content for tab 1
        </Tab>
        <Tab tabId="tab-2" title="Tab 2" key="tab-2" titlePosition="after">
          Content for tab 2
        </Tab>
        <Tab
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
          siblings={[
            <Pill size="S" pillRole="status" fill key="pill">
              12
            </Pill>,
            <Icon type="settings" key="icon" />,
          ]}
          titlePosition="after"
        >
          Content for tab 3
        </Tab>
      </Tabs>
    </Box>
  );
}
```


### With Custom Layout

**Render**

```tsx
() => {
  return (
    <Box p="4px">
      <Tabs align="left" position="left">
        <Tab
          tabId="tab-1"
          key="tab-1"
          customLayout={
            <Box
              px={3}
              py={1}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              Tab 1
              <Box>
                <Icon type="settings" color="primary" />
                <Icon type="home" />
              </Box>
            </Box>
          }
        >
          Content for tab 1
        </Tab>
        <Tab
          tabId="tab-2"
          key="tab-2"
          customLayout={
            <Box
              px={3}
              py={1}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              Tab 2
              <Box>
                <Icon type="settings" color="primary" />
                <Icon type="home" />
              </Box>
            </Box>
          }
        >
          Content for tab 2
        </Tab>
        <Tab
          tabId="tab-3"
          key="tab-3"
          customLayout={
            <Box
              px={3}
              py={1}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              Tab 3
              <Box>
                <Icon type="settings" color="primary" />
                <Icon type="home" />
              </Box>
            </Box>
          }
        >
          Content for tab 3
        </Tab>
      </Tabs>
    </Box>
  );
}
```


### With Header Width

**Render**

```tsx
() => {
  return (
    <Box p="4px">
      <Tabs headerWidth="400px" align="left" position="left">
        <Tab
          tabId="tabs-1-tab-1"
          title="Very long title for Tab 1 without headerWidth prop it would be not well aligned with the second Tabs group"
          key="tabs-1-tab-1"
        >
          Content for tab 1
        </Tab>
        <Tab tabId="tabs-1-tab-2" title="Tab 2" key="tabs-1-tab-2">
          Content for tab 2
        </Tab>
      </Tabs>
      <Tabs headerWidth="400px" align="left" position="left">
        <Tab tabId="tabs-2-tab-1" title="Tab 1" key="tabs-2-tab-1">
          Content for tab 1
        </Tab>
        <Tab tabId="tabs-2-tab-2" title="Tab 2" key="tabs-2-tab-2">
          Content for tab 2
        </Tab>
      </Tabs>
    </Box>
  );
}
```


### Responsive - Horizontal

**Render**

```tsx
() => {
  const tabsData = Array(20)
    .fill(0)
    .map((_, index) => ({
      tabId: `tab-${index + 1}`,
      title: `Tab ${index + 1}`,
      key: `tab-${index + 1}`,
      content: `Content for tab ${index + 1}`,
    }));

  return (
    <Box p="4px">
      <Tabs align="left" position="top">
        {tabsData.map((tabData) => (
          <Tab role="tab" {...tabData} key={tabData.key}>
            {tabData.content}
          </Tab>
        ))}
      </Tabs>
    </Box>
  );
}
```


### Responsive - Vertical

**Render**

```tsx
() => {
  const tabsData = Array(20)
    .fill(0)
    .map((_, index) => ({
      tabId: `tab-${index + 1}`,
      title: `Tab ${index + 1}`,
      key: `tab-${index + 1}`,
      content: `Content for tab ${index + 1}`,
    }));

  return (
    <Box p="4px">
      <Tabs align="left" position="left">
        {tabsData.map((tabData) => (
          <Tab role="tab" {...tabData} key={tabData.key}>
            {tabData.content}
          </Tab>
        ))}
      </Tabs>
    </Box>
  );
}
```


### With Validation State

**Render**

```tsx
() => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <Tabs position="left">
        <Tab tabId="tab-1" title="Tab 1" key="tab-1">
          <Textbox
            label="Textbox"
            error="Error Message"
            m={2}
            onChange={() => {}}
            value=""
          />
        </Tab>
        <Tab tabId="tab-2" title="Tab 2" key="tab-2">
          <Textbox
            label="Textbox"
            warning="Warning Message"
            m={2}
            onChange={() => {}}
            value=""
          />
        </Tab>
      </Tabs>
    </CarbonProvider>
  );
}
```


### MDX Example 1

**Args**

```tsx
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

<Canvas of={TabsStories.DefaultStory} />

### Focusing a Tab Programmatically
```


### MDX Example 2

**Args**

```tsx
The `TabsHandle` type provides an imperative handle for programmatic control over a desired `Tab`.
Using a ref, you can access its `focusTab()` method which accepts a `tabId` parameter.
Pass the same ID that you've assigned to the `tabId` prop on the `Tab` you want to focus.

<Canvas of={TabsStories.ProgrammaticFocus} />

### Positioned left

<Canvas of={TabsStories.PositionedLeft} />

### With specified tab visible

To set a different tab on page load pass a `tabId` to the `selectedTabId` prop as shown in the example below.

<Canvas of={TabsStories.WithSpecifiedTabVisible} />

### Large tabs

The `size` prop can be used to set the `TabTitle` to either "default" or "large".

#### Positioned top

<Canvas of={TabsStories.WithLargeTabsPositionedTop} />

#### Positioned left

<Canvas of={TabsStories.WithLargeTabsPositionedLeft} />

### With additional title siblings

It is possible to add additional elements to the a TabTitle by using the `siblings` prop. The `titlePosition` prop
can be used to render the `title` "before" (default) or "after" the additional elements.

<Canvas of={TabsStories.WithAdditionalTitleSiblings} />

#### Large tabs with siblings

<Canvas of={TabsStories.WithAdditionalTitleSiblingsSizeLarge} />

### With custom layout

It is possible to override the static layout of the `TabTitle` by passing in your own custom layouts to the `customLayout`
prop to the `Tab` component.

<Canvas of={TabsStories.WithCustomLayout} />

### With headerWidth

The `headerWidth` prop works only if prop `position` is set to `left`.

<Canvas of={TabsStories.WithHeaderWidth} />

### Responsive

#### Horizontal

**Note: This story is best viewed in the `canvas` view and by adjusting the size of the window.**

The `Tabs` component is responsive and will display navigation buttons to the left and right when the following conditions are met:

- The `position` prop is set to `top`;
- There are more tabs than can fit in the available space.

When both conditions are met, the `Tabs` component will display navigation buttons to the left and right of the tabs. Clicking on
these buttons will scroll the tabs in the respective direction. If there are no tabs to scroll to in a given direction, then the
respective navigation button will not appear.

<Canvas of={TabsStories.Responsive} />

#### Vertical

**Note: This story is best viewed in the `canvas` view and by adjusting the size of the window.**

The `Tabs` component is also responsive when oriented vertically. Please note that the navigation buttons described above will not appear
when the `position` prop is set to `left`.

<Canvas of={TabsStories.ResponsiveVertical} />

### Integrating with an external history

It is possible to integrate the `Tabs` component with an external `history` to manipulate the location when a given `Tab`
is selected. In order to achieve this you should use the `onTabChange` prop to pass a callback that calls `push` or `replace`
on the provided `history`. The `selectedTabId` prop can also be used to update which tab is selected. Below is an example
implementation using `createHashHistory` from `history@v5.0.0`.
```

