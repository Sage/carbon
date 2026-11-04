# Checkbox: Indeterminate State

```tsx
import { useState } from "react";
import { Checkbox, CheckboxGroup } from "carbon-react/lib/components/checkbox";

export const CheckboxIndeterminateStateExample = () => {
  const [items, setItems] = useState([
    { id: "checkbox-1", label: "Checkbox 1", checked: true },
    { id: "checkbox-2", label: "Checkbox 2", checked: false },
    { id: "checkbox-3", label: "Checkbox 3", checked: false },
  ]);

  const checkedCount = items.filter((item) => item.checked).length;
  const allChecked = checkedCount === items.length;
  const someChecked = checkedCount > 0 && checkedCount < items.length;
  const controlledIds = items.map((item) => item.id).join(" ");

  const handleSelectAll = () => {
    const newChecked = !allChecked;
    setItems(items.map((item) => ({ ...item, checked: newChecked })));
  };

  const handleChange = (id: string, checked: boolean) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, checked } : item)),
    );
  };

  return (
    <>
      <Checkbox
        label="Select All"
        indeterminate={someChecked}
        checked={allChecked}
        onChange={handleSelectAll}
        aria-controls={controlledIds}
      />
      <CheckboxGroup m={2}>
        {items.map((item) => (
          <Checkbox
            key={item.id}
            id={item.id}
            label={item.label}
            checked={item.checked}
            onChange={(ev) => handleChange(item.id, ev.target.checked)}
          />
        ))}
      </CheckboxGroup>
    </>
  );
};
```
