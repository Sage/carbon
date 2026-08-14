---
name: carbon-component-option-tile
description: Carbon OptionTile component props and usage examples.
---

# OptionTile

## Import
`import { OptionTile } from "carbon-react/lib/components/option-tile";`

## Source
- Export: `./components/option-tile`
- Props interface: `OptionTileProps`

## Props
| Name | Type | Required | Literals | Description | Default |
| --- | --- | --- | --- | --- | --- |
| variant | "single" | Yes |  | The single-select visual variant. |  |
| disabled | boolean \| undefined | No |  | Applies a disabled state to the tile. |  |
| data-element | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |
| data-role | string \| undefined | No |  | Identifier used for testing purposes, applied to the root element of the component. |  |

## Examples
### Single

**Render**

```tsx
() => (
    <OptionTile
      variant="single"
      number={1}
      title="Continue with existing plan"
    />
  )
```


### Custom

**Render**

```tsx
() => {
    const [customValue, setCustomValue] = useState("");

    return (
      <OptionTile
        variant="custom"
        title="Something else"
        inputAriaLabel="Custom option value"
        inputPlaceholder="Type a custom value"
        customValue={customValue}
        onCustomValueChange={setCustomValue}
      />
    );
  }
```


### Multiple

**Render**

```tsx
() => {
    const [selected, setSelected] = useState(false);

    return (
      <OptionTile
        variant="multiple"
        label="Enable recurring billing"
        checked={selected}
        onChange={setSelected}
      />
    );
  }
```


### SingleSelectGroup

**Render**

```tsx
() => {
    const [selected, setSelected] = useState<string | null>(null);
    const [customValue, setCustomValue] = useState("");

    return (
      <OptionTileGroup selectionType="single" aria-label="Payment options">
        <OptionTile
          variant="single"
          number={1}
          title="Pay now"
          onClick={() => setSelected("pay-now")}
          data-element={selected === "pay-now" ? "selected" : undefined}
        />
        <OptionTile
          variant="single"
          number={2}
          title="Pay later"
          onClick={() => setSelected("pay-later")}
          data-element={selected === "pay-later" ? "selected" : undefined}
        />
        <OptionTile
          variant="custom"
          title="Something else"
          inputAriaLabel="Custom amount"
          inputPlaceholder="Type amount"
          customValue={customValue}
          onCustomValueChange={setCustomValue}
        />
      </OptionTileGroup>
    );
  }
```


### MultiSelectGroup

**Render**

```tsx
() => {
    const [selected, setSelected] = useState<string[]>([]);

    const toggle = (option: string) => (checked: boolean) =>
      setSelected((previous) =>
        checked
          ? [...previous, option]
          : previous.filter((item) => item !== option),
      );

    return (
      <OptionTileGroup selectionType="multiple" aria-label="Delivery options">
        <OptionTile
          variant="multiple"
          label="Email receipt"
          checked={selected.includes("email")}
          onChange={toggle("email")}
        />
        <OptionTile
          variant="multiple"
          label="SMS updates"
          checked={selected.includes("sms")}
          onChange={toggle("sms")}
        />
        <OptionTile
          variant="multiple"
          label="Printed statement"
          checked={selected.includes("print")}
          onChange={toggle("print")}
        />
      </OptionTileGroup>
    );
  }
```

