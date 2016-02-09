## A Confirm widget.

### How to use a Confirm in a component:

* In your file

```javascript
import Confirm from 'carbon/lib/components/confirm';
```

* To render a Confirm:

```javascript
<Confirm
  title='Are you sure?'
  confirmHandler={ customConfirmHandler }
  onCancel={ customCancelHandler }
  open={ false }
  This is the content message
</Confirm>
```

* The component rendering the Confirm must pass down a prop of 'open={ true }' to open the confirm dialog.

* You need to provide a custom cancel event handler to handle a close event via the 'no' button

* You need to provide a custom confirm event handler to handle a close event via the 'yes' button

| Name          | Required       | Type           | Default       | Description   |
| ------------- |  ------------- |  ------------- | ------------- | ------------- |
| title         | false          | String         |               | Confirm dialog title  |
| confirmHandler | false          | Function           |               | Callback for when the yes button is clicked  |
| onCancel      | false         | Function        |               | Callback for when the no button is clicked |
| open          | false          | Boolean        |               | Pass true if you want the confirm to open |
| children      | false          | String        |               | Confirm dialog content to show to the user |
