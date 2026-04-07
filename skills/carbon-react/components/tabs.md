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

## Examples
### Default

**Args**

```tsx
{
  orientation: "horizontal",
  size: "medium",
}
```

**Render**

```tsx
({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab
          id="tab-1--default"
          controls="tab-panel-1--default"
          label="Tab One"
        />
        <Tab
          id="tab-2--default"
          controls="tab-panel-2--default"
          label="Tab Two"
        />
        <Tab
          id="tab-3--default"
          controls="tab-panel-3--default"
          label="Tab Three"
        />
      </TabList>
      <TabPanel id="tab-panel-1--default" tabId="tab-1--default">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2--default" tabId="tab-2--default">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3--default" tabId="tab-3--default">
        <Typography>Content 3</Typography>
      </TabPanel>
    </Tabs>
  );
}
```


### Large Size

**Args**

```tsx
{
  orientation: "horizontal",
  size: "large",
}
```

**Render**

```tsx
({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab
          id="tab-1--large-size"
          controls="tab-panel-1--large-size"
          label="Tab One"
        />
        <Tab
          id="tab-2--large-size"
          controls="tab-panel-2--large-size"
          label="Tab Two"
        />
        <Tab
          id="tab-3--large-size"
          controls="tab-panel-3--large-size"
          label="Tab Three"
        />
      </TabList>
      <TabPanel id="tab-panel-1--large-size" tabId="tab-1--large-size">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2--large-size" tabId="tab-2--large-size">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3--large-size" tabId="tab-3--large-size">
        <Typography>Content 3</Typography>
      </TabPanel>
    </Tabs>
  );
}
```


### Vertical Orientation

**Args**

```tsx
{
  orientation: "vertical",
  size: "medium",
}
```

**Render**

```tsx
({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab
          id="tab-1--vertical"
          controls="tab-panel-1--vertical"
          label="Tab One"
        />
        <Tab
          id="tab-2--vertical"
          controls="tab-panel-2--vertical"
          label="Tab Two"
        />
        <Tab
          id="tab-3--vertical"
          controls="tab-panel-3--vertical"
          label="Tab Three"
        />
      </TabList>
      <TabPanel id="tab-panel-1--vertical" tabId="tab-1--vertical">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2--vertical" tabId="tab-2--vertical">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3--vertical" tabId="tab-3--vertical">
        <Typography>Content 3</Typography>
      </TabPanel>
    </Tabs>
  );
}
```


### Tab Overflow

**Args**

```tsx
{
  orientation: "horizontal",
  size: "medium",
}
```

**Render**

```tsx
({ ...args }) => {
  const tabCount = 20;
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        {Array.from({ length: tabCount }, (_, index) => (
          <Tab
            key={`tab-${index + 1}--overflow`}
            id={`tab-${index + 1}--overflow`}
            controls={`tab-panel-${index + 1}--overflow`}
            label={`Tab ${index + 1}`}
          />
        ))}
      </TabList>
      {Array.from({ length: tabCount }, (_, index) => (
        <TabPanel
          key={`tab-panel-${index + 1}--overflow`}
          id={`tab-panel-${index + 1}--overflow`}
          tabId={`tab-${index + 1}--overflow`}
        >
          <Typography>{`Content ${index + 1}`}</Typography>
        </TabPanel>
      ))}
    </Tabs>
  );
}
```


### Title Slots

**Args**

```tsx
{
  orientation: "horizontal",
  size: "medium",
}
```

**Render**

```tsx
({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab id="tab-1--slots" controls="tab-panel-1--slots" label="No Slots" />
        <Tab
          id="tab-2--slots"
          controls="tab-panel-2--slots"
          label="Left slot"
          leftSlot={<Icon type="home" />}
        />
        <Tab
          id="tab-3--slots"
          controls="tab-panel-3--slots"
          label="Right slot"
          rightSlot={<Pill>Label</Pill>}
        />
        <Tab
          id="tab-4--slots"
          controls="tab-panel-4--slots"
          label="Both slots"
          leftSlot={<Icon type="home" />}
          rightSlot={<Pill>Label</Pill>}
        />
      </TabList>
      <TabPanel id="tab-panel-1--slots" tabId="tab-1--slots">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2--slots" tabId="tab-2--slots">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3--slots" tabId="tab-3--slots">
        <Typography>Content 3</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-4--slots" tabId="tab-4--slots">
        <Typography>Content 4</Typography>
      </TabPanel>
    </Tabs>
  );
}
```


### With Error And Warning

**Args**

```tsx
{
  orientation: "horizontal",
  size: "medium",
}
```

**Render**

```tsx
({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab
          id="tab-1--validation"
          controls="tab-panel-1--validation"
          label="Default"
        />
        <Tab
          id="tab-2--validation"
          controls="tab-panel-2--validation"
          label="Error"
          error
        />
        <Tab
          id="tab-3--validation"
          controls="tab-panel-3--validation"
          label="Warning"
          warning
        />
      </TabList>

      <TabPanel id="tab-panel-1--validation" tabId={"tab-1--validation"}>
        Content 1
      </TabPanel>

      <TabPanel id="tab-panel-2--validation" tabId={"tab-2--validation"}>
        Content 2
      </TabPanel>

      <TabPanel id="tab-panel-3--validation" tabId={"tab-3--validation"}>
        Content 3
      </TabPanel>
    </Tabs>
  );
}
```


### With Error And Warning In Form

**Args**

```tsx
{
  orientation: "horizontal",
  size: "medium",
}
```

**Render**

```tsx
({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab
          id="tab-1--validation-form"
          controls="tab-panel-1--validation-form"
          label="Default"
        />
        <Tab
          id="tab-2--validation-form"
          controls="tab-panel-2--validation-form"
          label="Error"
        />
        <Tab
          id="tab-3--validation-form"
          controls="tab-panel-3--validation-form"
          label="Warning"
        />
      </TabList>

      <TabPanel
        id="tab-panel-1--validation-form"
        tabId={"tab-1--validation-form"}
      >
        <Form
          onSubmit={() => {}}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Textbox label="Textbox" onChange={() => {}} value="" />
        </Form>
      </TabPanel>

      <TabPanel
        id="tab-panel-2--validation-form"
        tabId={"tab-2--validation-form"}
      >
        <Form
          onSubmit={() => {}}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Textbox
            label="Textbox"
            onChange={() => {}}
            value=""
            error="Textbox must not be blank"
          />
        </Form>
      </TabPanel>

      <TabPanel
        id="tab-panel-3--validation-form"
        tabId={"tab-3--validation-form"}
      >
        <Form
          onSubmit={() => {}}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Textbox
            label="Textbox"
            onChange={() => {}}
            value=""
            warning="Textbox must not be blank"
          />
        </Form>
      </TabPanel>
    </Tabs>
  );
}
```


### Pre-Selected Tab

**Args**

```tsx
{
  orientation: "horizontal",
  size: "medium",
  selectedTabId: "tab-3--pre-selected",
}
```

**Render**

```tsx
({ ...args }) => {
  return (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        <Tab
          id="tab-1--pre-selected"
          controls="tab-panel-1--pre-selected"
          label="Tab One"
        />
        <Tab
          id="tab-2--pre-selected"
          controls="tab-panel-2--pre-selected"
          label="Tab Two"
        />
        <Tab
          id="tab-3--pre-selected"
          controls="tab-panel-3--pre-selected"
          label="Tab Three"
        />
      </TabList>
      <TabPanel id="tab-panel-1--pre-selected" tabId="tab-1--pre-selected">
        <Typography>Content 1</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-2--pre-selected" tabId="tab-2--pre-selected">
        <Typography>Content 2</Typography>
      </TabPanel>
      <TabPanel id="tab-panel-3--pre-selected" tabId="tab-3--pre-selected">
        <Typography>Content 3</Typography>
      </TabPanel>
    </Tabs>
  );
}
```


### Focusing a Tab Programmatically

**Render**

```tsx
({ ...args }) => {
  const tabsHandle = useRef<TabsHandle>(null);

  return (
    <>
      <Tabs {...args}>
        <TabList ariaLabel="Sample Tabs" ref={tabsHandle}>
          <Tab
            id="tab-1--programmatic"
            controls="tab-panel-1--programmatic"
            label="Tab One"
          />
          <Tab
            id="tab-2--programmatic"
            controls="tab-panel-2--programmatic"
            label="Tab Two"
          />
          <Tab
            id="tab-3--programmatic"
            controls="tab-panel-3--programmatic"
            label="Tab Three"
          />
        </TabList>
        <TabPanel id="tab-panel-1--programmatic" tabId="tab-1--programmatic">
          <Typography>Content 1</Typography>
        </TabPanel>
        <TabPanel id="tab-panel-2--programmatic" tabId="tab-2--programmatic">
          <Typography>Content 2</Typography>
        </TabPanel>
        <TabPanel id="tab-panel-3--programmatic" tabId="tab-3--programmatic">
          <Typography>Content 3</Typography>
        </TabPanel>
      </Tabs>
      <Box mt={2} display={"flex"} gap={2}>
        <Button
          buttonType="primary"
          onClick={() => tabsHandle.current?.focusTab("tab-1--programmatic")}
        >
          Focus Tab 1
        </Button>
        <Button
          buttonType="primary"
          onClick={() => tabsHandle.current?.focusTab("tab-2--programmatic")}
        >
          Focus Tab 2
        </Button>
        <Button
          buttonType="primary"
          onClick={() => tabsHandle.current?.focusTab("tab-3--programmatic")}
        >
          Focus Tab 3
        </Button>
      </Box>
    </>
  );
}
```


### Handle Tab Changes

**Args**

```tsx
{
  orientation: "horizontal",
  size: "medium",
}
```

**Render**

```tsx
({ ...args }) => {
  const [newUrl, setNewUrl] = useState("");
  const handleTabChange = useCallback((tabId: string) => {
    setNewUrl(`${window.location}?tabId=${tabId}`);
  }, []);

  return (
    <>
      <Tabs {...args}>
        <TabList ariaLabel="Sample Tabs" onTabChange={handleTabChange}>
          <Tab
            id="tab-1--default"
            controls="tab-panel-1--default"
            label="Tab One"
          />
          <Tab
            id="tab-2--default"
            controls="tab-panel-2--default"
            label="Tab Two"
          />
          <Tab
            id="tab-3--default"
            controls="tab-panel-3--default"
            label="Tab Three"
          />
        </TabList>
        <TabPanel id="tab-panel-1--default" tabId="tab-1--default">
          <Typography>Content 1</Typography>
        </TabPanel>
        <TabPanel id="tab-panel-2--default" tabId="tab-2--default">
          <Typography>Content 2</Typography>
        </TabPanel>
        <TabPanel id="tab-panel-3--default" tabId="tab-3--default">
          <Typography>Content 3</Typography>
        </TabPanel>
      </Tabs>

      <p>URL for tab: {newUrl || "No tab change detected"}</p>
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
    <Box p="32px" bg="#f2f5f6">
      <Tabs align="left" position="left">
        <Tab
          errorMessage="error"
          warningMessage="warning"
          infoMessage="info"
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
        >
          <Box bg="white" p="32px" height="calc(100% - 64px)">
            Content for tab 1
          </Box>
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

