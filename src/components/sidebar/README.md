# A Sidebar widget.

## How to use a Sidebar in a component:

* In your file

```javascript
  import Sidebar from 'carbon/lib/components/sidebar';
```

* To render the Sidebar:

```javascript
  <Sidebar
    onClose={ closeSidebar }
    open={ true }
  />
```

Side bar is positioned on the right hand screen of the window by default.
To position the sidebar on the left hand side pass `position='left' to the component.

The background behind the sidebar is disabled by default. To allow the user to interact
with all the UI pass `disableBackground={ false }` to the component

| Name              | Required    | Type           | Default       | Description   |
| -------------     | ----------- | -------------  | ------------- | ------------- |
| onClose           | true        | Function       |               | Callback for when close icon is clicked |
| open              | true        | Boolean        | `false`       | Sets the open state of the sidebar      |
| disableBackground | false       | Boolean        | `true`        | Disables background behind sidebar      |
| onClose           | false       | Boolean        | `right`       | 'left' or 'right' position of sidebar   |
