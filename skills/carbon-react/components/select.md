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
    enableVirtualScroll: false,
    virtualScrollOverscan: 5,
    disableNavigationLoop: false,
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
  const [value, setValue] = useState("select");
  const [isLoading, setIsLoading] = useState(true);
  const [optionList, setOptionList] = useState<React.ReactElement[]>([]);

  function loadList() {
    if (preventLoading.current) {
      return;
    }

    preventLoading.current = true;
    setIsLoading(true);
    setTimeout(() => {
      setOptionList([
        <Option text="Select an option" value="select" key="Select" />,
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
    setOptionList([]);
    setValue("select");
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
  const preventLoading = useRef(false);
  const preventLazyLoading = useRef(false);
  const lazyLoadingCounter = useRef(0);
  const [value, setValue] = useState("select");
  const [isLoading, setIsLoading] = useState(true);
  const asyncList = [
    <Option text="Select an option" value="select" key="Select" />,
    <Option text="Amber" value="amber" key="Amber" />,
    <Option text="Black" value="black" key="Black" />,
    <Option text="Blue" value="blue" key="Blue" />,
    <Option text="Brown" value="brown" key="Brown" />,
    <Option text="Green" value="green" key="Green" />,
  ];
  const getLazyLoaded = () => {
    const counter = lazyLoadingCounter.current;
    return [
      <Option
        text={`Lazy Loaded A${counter}`}
        value={`lazyA${counter}`}
        key={`lazyA${counter}`}
      />,
      <Option
        text={`Lazy Loaded B${counter}`}
        value={`lazyB${counter}`}
        key={`lazyB${counter}`}
      />,
      <Option
        text={`Lazy Loaded C${counter}`}
        value={`lazyC${counter}`}
        key={`lazyC${counter}`}
      />,
    ];
  };
  const [optionList, setOptionList] = useState<React.ReactElement[]>([
    <Option text="Select an option" value="select" key="Select" />,
  ]);
  function loadList() {
    if (preventLoading.current) {
      return;
    }
    preventLoading.current = true;
    setIsLoading(true);
    setTimeout(() => {
      setOptionList(asyncList);
      setIsLoading(false);
    }, 2000);
  }
  function onLazyLoading() {
    if (preventLazyLoading.current) {
      return;
    }
    preventLazyLoading.current = true;
    setIsLoading(true);
    setTimeout(() => {
      preventLazyLoading.current = false;
      lazyLoadingCounter.current += 1;
      setOptionList((prevList) => [...prevList, ...getLazyLoaded()]);
      setIsLoading(false);
    }, 2000);
  }
  function clearData() {
    setOptionList([]);
    setValue("select");
    preventLoading.current = false;
  }
  return (
    <Box height={300}>
      <Button onClick={clearData} mb={2}>
        reset
      </Button>
      <Select
        name="infiniteScroll"
        id="infiniteScroll"
        label="color"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onOpen={() => loadList()}
        isLoading={isLoading}
        onListScrollBottom={onLazyLoading}
      >
        {optionList}
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
    <Box height={220}>
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
              text={index === 0 ? "Select an option" : `Option ${index + 1}`}
            />
          ))}
      </Select>
    </Box>
  );
}
```


### With List Action Button

**Render**

```tsx
() => {
  const [value, setValue] = useState("select");
  const [optionList, setOptionList] = useState([
    <Option text="Select an option" value="select" key="Select" />,
    <Option text="Amber" value="1" key="Amber" />,
    <Option text="Black" value="2" key="Black" />,
    <Option text="Blue" value="3" key="Blue" />,
    <Option text="Brown" value="4" key="Brown" />,
    <Option text="Green" value="5" key="Green" />,
    <Option text="Orange" value="6" key="Orange" />,
  ]);
  function addNewOption() {
    setOptionList((list) => [
      ...list,
      <Option
        text={`New Option ${list.length + 1}`}
        value={`${list.length + 1}`}
        key={`New Option ${list.length + 1}`}
      />,
    ]);
  }
  return (
    <Box height={350}>
      <Select
        name="listActionButton"
        id="listActionButton"
        label="color"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
        listActionButton={
          <Button iconType="add" iconPosition="after">
            Add a New Element
          </Button>
        }
        onListAction={addNewOption}
      >
        {optionList}
      </Select>
      <input style={{marginTop: "1000px"}} value="Brian Brobbey" />
    </Box>
  );
}
```


### Selection Confirmed

**Render**

```tsx
() => {
  const [selectionConfirmed, setSelectionConfirmed] = useState(false);
  const [value, setValue] = useState("select");
  return (
    <Box height={280}>
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
        <Option text="Select an option" value="select" />
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
  const [currentOption, setCurrentOption] = useState<string | null>(
    "Select an option",
  );
  useEffect(() => {
    if (currentOption && currentOption !== "Select an option") {
      setOptionsList([...allOptions, ...options]);
    }
  }, [currentOption]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentOption(e.target.value);
  };
  return (
    <Box height={200}>
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


### Complex Compositions

**Render**

```tsx
() => {
  const [value, setValue] = useState("select");
  return (
    <Box height={350}>
      <Select
        name="complexCompositions"
        id="complexCompositions"
        label="Option compositions"
        listMaxHeight={400}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      >
        <Option text="Select an option" value="select" />
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

