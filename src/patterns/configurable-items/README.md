## Configurable Items Pattern.

This component uses the ConfigurableItems and ConfigurableItemRow components to create a dialog
that allows the user to enabling/disable items and re-order a list of items.

It makes an assumption about the format of the data provided. See an example below.

### How to use the Configurable Items Pattern:

* In your file:

```javascript
import ConfigurableItemsPattern from 'carbon-react/lib/components/configurable-items-pattern';
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

* To render the Pattern:

```javascript
<ConfigurableItemsPattern
  itemsData={ this.data }
  onSave={ Actions.onSave }
  title='Configure Items'
/>
```

The `onSave` callback will be called after the user submits the form.
