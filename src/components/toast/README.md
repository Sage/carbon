## A Toast widget.

### How to use a Toast in a component:

* In your file:

```javascript
import Toast from 'carbon-react/lib/components/toast';
```

* To render the Toast:

```javascript
<Toast>Text</Toast>
```


| Name          | Required       | Type           | Default       | Description   |
| ------------- |  ------------- |  ------------- | ------------- | ------------- |
| `as`          | `false`        | `String`       | `warning`     | The as property defines the toast colour. This can be `info`, `new` or `warning`  |
| `open`        | `false`        | `Boolean`      | `true`        | Determines in the toast is open or closed.  |
| `onDismiss`   | `false`        | `Function`     |               | Callback for when notification is dismissed.  |
