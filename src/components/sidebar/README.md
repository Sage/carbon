# A Sidebar widget.

## How to use a Sidebar in a component:

* In your file

```javascript
  import { Sidebar } from 'carbon-react/lib/components/sidebar';
```

* To render the Sidebar:

```javascript
  <Sidebar
    onCancel={ closeSidebar }
    open={ true }
  />
```

Side bar is positioned on the right hand screen of the window by default.
To position the sidebar on the left hand side pass `position='left'` to the component.

The background behind the sidebar is disabled by default. To allow the user to interact
with all the UI pass `enableBackgroundUI={ true }` to the component

## Sidebar Header

A Sidebar header is also provided as a sub component and can be used as the first child
of the sidebar component

To render content within the SidebarHeader pass a children prop

### How to use a Sidebar Header in a component:

* In your file

```javascript
  import { Sidebar, SidebarHeader } from 'carbon-react/lib/components/sidebar';
```

* To render the Sidebar Header:

```javascript
  <Sidebar
    onCancel={ closeSidebar }
    open={ true }
  >
  <SidebarHeader />
</Sidebar>
```

| Name               | Required    | Type           | Default       | Description   |
| -------------      | ----------- | -------------  | ------------- | ------------- |
| onCancel           | false       | Function       |               | Callback for when close icon is clicked |
| open               | true        | Boolean        | `false`       | Sets the open state of the sidebar      |
| enableBackgroundUI | false       | Boolean        | `false`       | Enables background UI behind sidebar so the user can interact    |
| align              | false       | String         | `right`       | 'left' or 'right' position of sidebar   |
