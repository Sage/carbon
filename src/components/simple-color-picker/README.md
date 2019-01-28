## A SimpleColorPicker widget.

A component that displays squares with color samples that you can choose from.

### How to use a SimpleColorPicker in a component:

 * In your file:

```javascript
import SimpleColorPicker from 'carbon-react/lib/components/simple-color-picker';
```

To render the SimpleColorPicker:

```javascript
  <SimpleColorPicker
    availableColors={ ['transparent', '#ff0102', '#34ff01'] }
    selectedColor="#34ff01"
    name="settings[color_of_something]"
    onChange={ customEventHandler }
  />
```

| Name            | Required    | Type          | Default         | Description                                             |
| --------------- | ----------- | ------------- | --------------- | ------------------------------------------------------- |
| availableColors | true        | Array         |                 | An array with colors available to pick                  |
| selectedColor   | true        | String        |                 | the value of the currently selected color in the picker |
| name            | true        | String        |                 | the name of the input element                           |
| onChange        | false       | Function      | empty function  | called when the user changes the selected color         |

