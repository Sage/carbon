## A Button widget.

### How to use a Button in a component:

* In your file:

```javascript
import Button from 'carbon-react/lib/components/button';
```

* To render the Button:

```javascript
<Button>Save</Button>
```

For additional properties specific to this component, see propTypes and defaultProps.


| Name          | Required       | Type           | Default       | Description   |
| ------------- |  ------------- |  ------------- | ------------- | ------------- |
| as            | false          | String         | `secondary`   | The as property defines the button style. This can be `primary` or `secondary`  |
| children      | true           | Node           |               | What will be displayed within the button. Could be text, icons etc...  |
| disabled      | false          | Boolean        | `false`       | Gives the button a disabled state |
| href          | false          | String         |               | If supplied, the button will render an anchor tag instead of a button tag. |  
| theme         | false          | String         | `blue`        | Defines a theme modifier class on the button. Presets: `Blue`, `Magenta`, `Red`, `White`, `Grey` |  
| size          | false          | String         | `medium`      | Applies a size modifier class. Presets include `small`, `medium`, `large` |
