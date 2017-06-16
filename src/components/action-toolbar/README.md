# Action Toolbar

### How to use a ActionToolbar in a component:

* In your file

```javascript
import ActionToolbar from 'carbon/lib/components/action-toolbar';
```

*  To render a Alert:

```javascript
  let actions = {
    subscription: {
      text: 'Add Subscriptions',
      icon: 'basket',
      onClick: (selected, event) => { }
    },
    delete: {
      text: 'Delete',
      icon: 'bin',
      onClick: (selected, event) => { }
    }
  };

  <ActionToolbar actions={ actions } />
```

* Props for the link children can also be passed to the action-toolbar;

| Name          | Required    | Type           | Default       | Description   |
| ------------- | ----------- | ------------- | ------------- | -------------  |
| actions       | true       | Array         |               | Defines the icons, text and onClick action for toolbar. Also accepts props for Link children |
