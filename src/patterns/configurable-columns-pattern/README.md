## Configurable Columns Pattern.

Designed to be used in tandem with the onConfigure prop in the Table component. This component uses
the ConfigurableColumns and ConfigurableColumnRow components to create a ui to allow the user to
configure the table by showing/hiding columns and dragging and dropping items to re-order table
columns.

It makes an assumption about the format of the data provided. See an example below.

### How to use the Configurable Columns Pattern:

* In your file:

```javascript
import { ConfigurableColumnsPattern } from 'carbon/lib/components/configurable-columns-pattern';
```

* The data format:

```javascript
const data = ImmutableHelper.parseJSON(
  [
    { id: 1, name: 'Foo', locked: true, enabled: true },
    { id: 2, name: 'Bar', locked: false, enabled: true },
    { id: 3, name: 'Baz', locked: false, enabled: false }
  ]
);
```

* To render the Columns:

```javascript
<ConfigurableColumnsPattern
  data={ this.data }
  onCancel={ Actions.onCancel }
  onChange={ Actions.onChange(rowIndex) }
  onDrag={ Actions.onDrag }
  onReset={ Actions.onReset }
  onSave={ Actions.onSave }
  title='Configure Columns'
/>
```
