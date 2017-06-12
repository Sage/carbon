## Configurable Columns.

This component and the `ConfigurableColumnRow` are building blocks for the `ConfigurableColumnsPattern`
component that wires the two together.

### How to use the Configurable Columns component:

* In your file:

```javascript
import { ConfigurableColumns, ConfigurableColumnRow } from 'carbon/lib/components/configurable-columns';
```

* To render the Columns:

```javascript

rows(data) {
  return (
    <ol className='carbon-configurable-columns__columns-wrapper'>
      {
        data.map((column, rowIndex) => {
          return (
            <ConfigurableColumnRow
              enabled={column.get('enabled')}
              key={rowIndex}
              locked={column.get('locked')}
              name={column.get('name')}
              rowIndex={rowIndex}
              onChange={onChange(rowIndex)}
            />
          );
        })
      }
    </ol>
  );
}

onChange(rowIndex) {
  return (event) => {
    Actions.onChange(rowIndex)
  }
}

<ConfigurableColumns
  onCancel={ Actions.onCancel }
  onDrag={ Actions.onDrag }
  onReset={ Actions.onReset }
  onSave={ Actions.onSave }
  title='Configure Columns'
>
  { this.rows(data) }
</ConfigurableColumns>
```
