## Configurable Items.

This component renders a list of items that can be checked/unchecked and re-ordered.

### How to use the Configurable Items component:

* In your file:

```javascript
import { ConfigurableItems, ConfigurableItemRow } from 'carbon-react/lib/components/configurable-items';
```

* To render the Rows:

```javascript

rows(data) {
  return (
    data.map((item, rowIndex) => {
      return (
        <ConfigurableItemRow
          enabled={item.get('enabled')}
          key={rowIndex}
          locked={item.get('locked')}
          name={item.get('name')}
          rowIndex={rowIndex}
          onChange={onChange(rowIndex)}
        />
      );
    })
  );
}

onChange(rowIndex) {
  return (event) => {
    Actions.onChange(rowIndex)
  }
}

<ConfigurableItems
  onCancel={ Actions.onCancel }
  onDrag={ Actions.onDrag }
  onReset={ Actions.onReset }
  onSave={ Actions.onSave }
  title='Configure Items'
>
  { this.rows(data) }
</ConfigurableItems>
```
