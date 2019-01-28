## Alert widget

### How to use a Alert in a component:

* In your file

```javascript
import Alert from 'carbon-react/lib/components/alert';
```

*  To render a Alert:

```javascript
   <Alert onCancel={ customEventHandler } open={ false }/>
```

 The component rendering the Alert must pass down a prop of 'open' in order to open the alert.

 You need to provide a custom cancel event handler to handle a close event.

| Name          | Required    | Type           | Default       | Description   |
| ------------- | ----------- | ------------- | ------------- | ------------- |
| open          | false       | Boolean        |               | `open={ true }` must be passed to open the alert |

For more props see `Dialog` and `Modal`
