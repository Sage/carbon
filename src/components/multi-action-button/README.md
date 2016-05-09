## Multi Action Button Widget

### How to use a Multi Action Button in a component:

* In your file

```javascript
import MultiActionButton from 'components/multi-action-button';
```

*  To render a Multi Action Button:

```javascript
<MultiActionButton text="Main Text">
  <Button onClick="buttonClickHandler1">Button name 1</Button>
  <Button onClick="buttonClickHandler2">Button name 2</Button>
</MultiActionButton>
```

| Name          | Required    | Type           | Default       | Description   |
| ------------- | ----------- | ------------- | ------------- | ------------- |
| as            | false       | String        | `secondary`   | Customizes the appearance, can be set to `primary`, `secondary` or `transparent`. |
| align         | false       | String        | null          | Aligns the button's options, can be set to `right`. |
