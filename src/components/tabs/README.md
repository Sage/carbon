# Tabs

## How to use a Tab Component

* In your file

```javascript
import { Tabs, Tab } from 'carbon-react/lib/components/tabs';
```

*  To render Tabs:

```javascript
<Tabs>
  <Tab title='Title 1' tabId='uniqueId1'>

    <Textbox />
    <Textbox />

  </Tab>

  <Tab title='Title 2' tabId='uniqueId2'>

    <Date />
    <Textbox />

  </Tab>
</Tabs>
```

Each nested tab component is required to have a `title` and a `tabId`

Optionally, you can pass `renderHiddenTabs` prop to the Tabs. By default this is
set to true and therefore all tabs will be rendered. The selected tab will have
a class of `selected` and all other tabs will have a class of `hidden` which sets
their display to `none`.

Setting `renderHiddenTabs` to false will add a small performance improvement as
all previously hidden tabs will not be rendered to the page.

If you are using the tab component within a form all tabs should be rendered so that
form validation can work correctly.

The tabs widget also allows you to select a tab on page load. By default this is set
to the first tab. To set a different tab on page load pass a `tabId` to the
`selectedTabId` prop as shown in the example below.

To render a Tabs Widget with Options:

```javascript
  <Tabs renderHiddenTabs={ false } selectedTabId='uniqueId2' >
    <Tab title='Title 1' tabId='uniqueId1'>

      <Textbox />
      <Textbox />

    </Tab>

    <Tab title='Title 2' tabId='uniqueId2'>

      <Date />
      <Textbox />

    </Tab>
  </Tabs>
```

### Tabs Props
| Name                  | Required    | Type           | Default       | Description   |
| -------------------   | ----------- | -------------  | ------------- | ------------- |
| renderHiddenTabs      | false       | Boolean        | true          | Hidden tabs will be rendered (maintain form errors) |
| selectedTabId         | false       | String         | (first tab)   | Currently selected tab (only needed if you want to change tab through props) |
| position              | false       | String         | top           | Position of the tabs relating to content |

### Tab Props
| Name             | Required    | Type           | Default       | Description   |
| ----------       | ----------- | -------------  | ------------- | ------------- |
| title            | true        | String         |               | Title to be shown in tab header |
| tabId            | true        | String         |               | unique id for the tab |
| headerClassname  | false       | String         |               | className for tab header li |


