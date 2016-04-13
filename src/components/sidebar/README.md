# A Sidebar widget.

## How to use a Sidebar in a component:

* In your file

```javascript
  import { Sidebar } from 'carbon/lib/components/sidebar';
```

* To render the Sidebar:

```javascript
  <Sidebar
    onClose={ closeSidebar }
    open={ true }
  />
```

Side bar is positioned on the right hand screen of the window by default.
To position the sidebar on the left hand side pass `position='left'` to the component.

The background behind the sidebar is disabled by default. To allow the user to interact
with all the UI pass `disableBackground={ false }` to the component

## Sidebar Header

A Sidebar header is also provided as a sub component and can be used as the first child
of the sidebar component

To render content within the SidebarHeader pass a children prop

### How to use a Sidebar Header in a component:

* In your file

```javascript
  import { Sidebar, SidebarHeader } from 'carbon/lib/components/sidebar';
```

* To render the Sidebar Header:

```javascript
  <Sidebar
    onClose={ closeSidebar }
    open={ true }
  >
  <SidebarHeader />
</Sidebar>
```

| Name              | Required    | Type           | Default       | Description   |
| -------------     | ----------- | -------------  | ------------- | ------------- |
| onClose           | true        | Function       |               | Callback for when close icon is clicked |
| open              | true        | Boolean        | `false`       | Sets the open state of the sidebar      |
| disableBackground | false       | Boolean        | `true`        | Disables background behind sidebar      |
| onClose           | false       | Boolean        | `right`       | 'left' or 'right' position of sidebar   |
