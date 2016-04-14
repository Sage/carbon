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

* You can pass a prop of 'align' to the component which shifts the alignment of the pointer. This defaults to 'center'.
* You can also pass a prop of 'position' to the component which shifts the position of the pointer. This defaults to 'bottom'.

| Name          | Required       | Type           | Default       | Description   |
| ------------- |  ------------- |  ------------- | ------------- | ------------- |
| `align`       | `false`        | `String`       |  'center'     | alignment of pointer  |
| `position`    | `false`        | `String`       |  'bottom'     | position of pointer   |
