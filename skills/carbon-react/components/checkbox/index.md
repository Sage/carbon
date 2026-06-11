# Checkbox

Checkbox provides a way to check an individual option are selected, or check multiple options from a list.

## Import

```javascript
import { Checkbox } from "carbon-react/lib/components/checkbox";
```

## Designer Notes

- Disabled or read-only checkboxes might be difficult for a user to distinguish visually, so try to avoid this.
- Consider ‘smart default’ selections, based on what your user is likely to choose. But, users may well leave the defaults in place, so make sure any consequences are easy to undo, and not harmful.
- Rather than a checkbox to accept legal terms, consider labelling a button ‘Accept Terms and Continue’ instead.

## Related Components

- Choosing one option from a longer list? [Try Radio Button](../radio-button/index.md).
- Choosing one option from a very long list? Try Select.
- Choosing one option from a highly visible range? [Try Button Toggle](../button-toggle/index.md).

## Examples

### Sizes

See: `examples/Sizes.md`

### Disabled

See: `examples/Disabled.md`

### Reversed

Place input box to the right of the label.

See: `examples/Reversed.md`

### Required

See: `examples/Required.md`

### With fieldHelp

See: `examples/WithFieldHelp.md`

### Custom label width

See: `examples/CustomLabelWidth.md`

### With labelHelp (legacy)

**Note:** This is a legacy feature and will only render if the `validationRedesignOptIn` feature flag on an ancestor [CarbonProvider](../carbon-provider/index.md) is *false*.

See: `examples/LegacyLabelHelp.md`

## Props

### Checkbox

No props metadata found.
