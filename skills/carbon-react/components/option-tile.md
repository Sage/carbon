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
      <OptionTileGroup
        selectionType="single"
        legend="Option 1"
        aria-label="Option 1"
      >
        <OptionTile
          variant="single"
          number={1}
          title="Option 1"
          onClick={() => setSelected("option-1")}
          data-element={selected === "option-1" ? "selected" : undefined}
        />
        <OptionTile
          variant="single"
          number={2}
          title="Option 2"
          onClick={() => setSelected("option-2")}
          data-element={selected === "option-2" ? "selected" : undefined}
        />
        <OptionTile
          variant="single"
          number={3}
          title="Option 3"
          onClick={() => setSelected("option-3")}
          data-element={selected === "option-3" ? "selected" : undefined}
        />
        <OptionTile
          variant="single"
          number={4}
          title="Option 4"
          onClick={() => setSelected("option-4")}
          data-element={selected === "option-4" ? "selected" : undefined}
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
      <OptionTileGroup
        selectionType="multiple"
        legend="Option 1"
        aria-label="Option 1"
      >
        <OptionTile
          variant="multiple"
          label="Option 1"
          checked={selected.includes("option-1")}
          onChange={toggle("option-1")}
        />
        <OptionTile
          variant="multiple"
          label="Option 2"
          checked={selected.includes("option-2")}
          onChange={toggle("option-2")}
        />
        <OptionTile
          variant="multiple"
          label="Option 3"
          checked={selected.includes("option-3")}
          onChange={toggle("option-3")}
        />
      </OptionTileGroup>
    );
  }
```

