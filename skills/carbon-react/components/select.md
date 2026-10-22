---
name: carbon-component-select
description: Carbon Select component props and usage examples.
---

# Select

## Import
`import { Select } from "carbon-react/lib/components/select";`

## Source
- Export: `./components/select`
- Props interface: not found

## Props
No props metadata found.

## Examples
### Playground

**Args**

```tsx
{
    label: "Color",
    size: "medium",
    variant: "typical",
    disabled: false,
    readOnly: false,
    required: false,
    isLoading: false,
    openOnFocus: false,
    labelInline: false,
    flipEnabled: true,
    enableVirtualScroll: false,
    virtualScrollOverscan: 5,
    typeaheadTimeout: 1500,
    value: "select",
  }
```

**Render**

```tsx
(args) => <PlaygroundStory {...args} />
```


### Lazy Loading

**Render**

```tsx
() => {
  const preventLoading = useRef(false);
  const [value, setValue] = useState("amber");
  const [isLoading, setIsLoading] = useState(true);
  const initialOptions = [<Option text="Amber" value="amber" key="Amber" />];
  const [optionList, setOptionList] =
    useState<React.ReactElement[]>(initialOptions);

  function loadList() {
    if (preventLoading.current) {
      return;
    }

    preventLoading.current = true;
    setIsLoading(true);
    setTimeout(() => {
      setOptionList([
        <Option text="Amber" value="amber" key="Amber" />,
        <Option text="Black" value="black" key="Black" />,
        <Option text="Blue" value="blue" key="Blue" />,
        <Option text="Brown" value="brown" key="Brown" />,
        <Option text="Green" value="green" key="Green" />,
      ]);
      setIsLoading(false);
    }, 2000);
  }

  function reset() {
    setOptionList(initialOptions);
    setValue("amber");
    setIsLoading(true);
    preventLoading.current = false;
  }

  return (
    <Box height={300}>
      <Button onClick={reset} mb={2}>
        Reset
      </Button>
      <Select
        name="lazyLoading"
        id="lazyLoading"
        label="Color"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onOpen={loadList}
        isLoading={isLoading}
      >
        {optionList}
      </Select>
    </Box>
  );
}
```


### With infinite scroll

**Render**

```tsx
() => {
  const loadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [value, setValue] = useState("1");
  const [optionCount, setOptionCount] = useState(INFINITE_SCROLL_BATCH_SIZE);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => () => {
      if (loadTimer.current !== null) clearTimeout(loadTimer.current);
    },
    [],
  );

  function loadMoreOptions() {
    if (loadTimer.current !== null) return;

    setIsLoading(true);
    loadTimer.current = setTimeout(() => {
      setOptionCount((count) => count + INFINITE_SCROLL_BATCH_SIZE);
      setIsLoading(false);
      loadTimer.current = null;
    }, 1000);
  }

  function reset() {
    if (loadTimer.current !== null) {
      clearTimeout(loadTimer.current);
      loadTimer.current = null;
    }
    setOptionCount(INFINITE_SCROLL_BATCH_SIZE);
    setValue("1");
    setIsLoading(false);
  }

  return (
    <Box height={400}>
      <Typography mb={2}>
        Scroll to the bottom to load {INFINITE_SCROLL_BATCH_SIZE} more options.
        Currently {optionCount} options loaded.
      </Typography>
      <Button onClick={reset} mb={2}>
        Reset
      </Button>
      <Select
        name="infiniteScroll"
        id="infiniteScroll"
        label="Options"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        enableVirtualScroll={false}
        isLoading={isLoading}
        onListScrollBottom={loadMoreOptions}
      >
        {Array.from({ length: optionCount }, (_, index) => {
          const optionNumber = index + 1;
          return (
            <Option
              key={optionNumber}
              text={`Option ${optionNumber}`}
              value={String(optionNumber)}
            />
          );
        })}
      </Select>
    </Box>
  );
}
```


### Virtualised

**Render**

```tsx
() => {
  const [value, setValue] = useState("0");
  return (
    <Box height={320}>
      <Select
        name="virtualised"
        id="virtualised"
        label="choose an option"
        labelInline
        enableVirtualScroll
        virtualScrollOverscan={20}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      >
        {Array(10000)
          .fill(undefined)
          .map((_, index) => (
            <Option
              key={`option-${index + 1}`}
              value={`${index}`}
              text={`Option ${index + 1}`}
            />
          ))}
      </Select>
    </Box>
  );
}
```


### Selection Confirmed

**Render**

```tsx
() => {
  const [selectionConfirmed, setSelectionConfirmed] = useState(false);
  const [value, setValue] = useState("1");
  return (
    <Box height={380}>
      <Typography variant="strong">
        Selection Confirmed:{" "}
        {selectionConfirmed ? (
          <Icon type="tick" bg="primary" color="white" />
        ) : (
          <Icon type="cross" bg="red" color="white" />
        )}
      </Typography>
      <Select
        value={value}
        onChange={(ev: CustomSelectChangeEvent) => {
          setSelectionConfirmed(!!ev.selectionConfirmed);
          setValue(ev.target.value);
        }}
        name="selection confirmed"
        id="selection confirmed"
        label="color"
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </Select>
    </Box>
  );
}
```


### Dynamically Adding Options

**Render**

```tsx
() => {
  const [optionsList, setOptionsList] = useState(options);
  const [currentOption, setCurrentOption] = useState<string | null>("A");
  useEffect(() => {
    if (currentOption && currentOption !== "A") {
      setOptionsList([...allOptions, ...options]);
    }
  }, [currentOption]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentOption(e.target.value);
  };
  return (
    <Box height={320}>
      <Select
        label="Choose your option"
        data-role="selector"
        onChange={handleChange}
        value={currentOption || ""}
      >
        {optionsList.map((opt) => (
          <Option
            data-role={`option-${opt}`}
            text={opt}
            value={opt}
            key={opt}
          />
        ))}
      </Select>
    </Box>
  );
}
```


### Add Option From Dialog

**Render**

```tsx
() => {
  const selectRef = useRef<HTMLInputElement>(null);
  const nextOptionId = useRef(4);
  const shouldRestoreSelectFocus = useRef(false);
  const [value, setValue] = useState("option-1");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newOptionLabel, setNewOptionLabel] = useState("");
  const [optionLabelError, setOptionLabelError] = useState("");
  const [optionList, setOptionList] = useState([
    { value: "option-1", text: "Dropdown item 1" },
    { value: "option-2", text: "Dropdown item 2" },
    { value: "option-3", text: "Dropdown item 3" },
  ]);

  useEffect(() => {
    if (dialogOpen || !shouldRestoreSelectFocus.current) return;

    shouldRestoreSelectFocus.current = false;
    const focusTimer = window.setTimeout(
      () => selectRef.current?.focus(),
      DIALOG_CLOSE_FOCUS_DELAY,
    );

    return () => window.clearTimeout(focusTimer);
  }, [dialogOpen]);

  const closeDialogAndFocusSelect = () => {
    setOptionLabelError("");
    shouldRestoreSelectFocus.current = true;
    setDialogOpen(false);
  };

  const addOption = () => {
    const text = newOptionLabel.trim();
    if (!text) {
      setOptionLabelError("Enter an option label.");
      return;
    }

    const optionValue = `option-${nextOptionId.current}`;
    nextOptionId.current += 1;
    setOptionList((currentOptions) => [
      ...currentOptions,
      { value: optionValue, text },
    ]);
    setNewOptionLabel("");
    closeDialogAndFocusSelect();
  };

  return (
    <Box height={300}>
      <Select
        ref={selectRef}
        name="addOption"
        id="addOption"
        label="Object"
        required
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        <ActionOption
          value="add-option"
          text="Add an option"
          leading={<Icon type="add" />}
          onClick={() => setDialogOpen(true)}
        />
        {optionList.map((option) => (
          <Option key={option.value} {...option} />
        ))}
      </Select>

      <Dialog
        open={dialogOpen}
        onCancel={closeDialogAndFocusSelect}
        restoreFocusOnClose={false}
        title="Add an option"
        footer={
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button variantType="subtle" onClick={closeDialogAndFocusSelect}>
              Cancel
            </Button>
            <Button onClick={addOption}>Add</Button>
          </Box>
        }
      >
        <Textbox
          autoFocus
          label="Option label"
          value={newOptionLabel}
          error={optionLabelError || undefined}
          onChange={(event) => {
            setNewOptionLabel(event.target.value);
            setOptionLabelError("");
          }}
        />
      </Dialog>
    </Box>
  );
}
```


### Complex Compositions

**Render**

```tsx
() => {
  const [value, setValue] = useState("1");
  return (
    <Box height={500}>
      <Select
        name="complexCompositions"
        id="complexCompositions"
        label="Option compositions"
        listMaxHeight={400}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      >
        <Option
          text="Option with an icon"
          value="1"
          leading={<Icon type="favourite" />}
        />
        <Option text="Option with a divider" value="2" divider />
        <OptionGroupHeader label="Option heading" />
        <Option text="Option with a prefix" value="3" prefix="New " />
        <Option
          text="Option with subtext"
          value="4"
          subtext="Some helpful subtext"
        />
        <Option
          text="Option with an icon and portrait"
          value="5"
          leading={
            <>
              <Icon type="individual" />
              <Portrait initials="JD" size="XS" />
            </>
          }
        />
      </Select>
    </Box>
  );
}
```

