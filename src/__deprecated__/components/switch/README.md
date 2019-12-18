## A Switch widget.

### How to use a Switch in a component:

 * In your file:

```javascript
import Switch from 'carbon-react/lib/components/switch';
```

To render the Switch:

```javascript
<Switch label="mySwitch" />
```

| Name          | Required       | Type           | Default       | Description   |
| ------------- |  ------------- |  ------------- | ------------- | ------------- |
| checked | false          | Boolean         | `false`   | Sets the switch state of the checkbox. |
| label |  false |  String | n/a | The text to display alongside the switch. |
| labelHelp |  false |  String | n/a | Displays the help icon with the text provided as a tooltip. |
| loading |  false |  Boolean | `false` | Displays a spinner in place of the cross/tick in place of the icon. |
| onClick | false | Function | n/a | The function to execute when the switch is selected. |
| reverse      | false           | Boolean         |  `true`     | Reverses label and switch display. |
