# Action Toolbar

### How to use a ActionToolbar in a component:

* In your file

```javascript
import ActionToolbar from 'carbon/lib/components/action-toolbar';
```

*  To render a Alert:

```javascript
  let actions = [{
    text: "Add Subscriptions",
    icon: "basket",
    onClick: () => {}
  }, {
    text: "Delete",
    icon: "bin"
  }];

  <ActionToolbar actions={ actions } />
```

| Name          | Required    | Type           | Default       | Description   |
| ------------- | ----------- | ------------- | ------------- | -------------  |
| actions       | false       | Array         |               | Defines the icons, text and onClick action for toolbar |
