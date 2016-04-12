# A ToolTip widget.

### == How to use a ToolTip in a component:

* In your file:
```javascript
   import ToolTip from 'carbon/lib/components/tooltip'
```

* To render the ToolTip:
```javascript
   <ToolTip>
     My tooltip content
   </ToolTip>
```

* You can pass a prop of 'align' to the component which shifts the position of the pointer.
This defaults to 'center'.

| Name          | Required       | Type           | Default       | Description   |
| ------------- |  ------------- |  ------------- | ------------- | ------------- |
| `align`       | `false`        | `String`       |  'center'     | position of pointer  |
