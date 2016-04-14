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

* You can pass a prop of 'pointerAlign' to the component which shifts the alignment of the pointer. This defaults to 'center'.
* You can also pass a prop of 'pointerPosition' to the component which shifts the position of the pointer. This defaults to 'up'.
* The 'showTooltip' boolean prop determines whether or not to render the tooltip. If you want to implement the tooltip you must add handlers to toggle this prop.

| Name              | Required       | Type           | Default       | Description           |
| ----------------- |  ------------- |  ------------- | ------------- | --------------------- |
| `pointerAlign`    | `false`        | `String`       |  'center'     | alignment of pointer  |
| `pointerPosition` | `false`        | `String`       |  'up'         | position of pointer   |
| `showTooltip`     | `false`        | `Boolean       |  'false'      | toggle tooltip hide/show  |
