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


### Open on Focus

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  return (
    <Box height={250}>
      <Select
        name="openOnFocus"
        id="openOnFocus"
        openOnFocus
        label="color"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
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


### Disabled

**Render**

```tsx
() => {
  const [value, setValue] = useState("3");
  return (
    <Select
      aria-label="disabled"
      name="disabled"
      id="disabled"
      disabled
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
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
  );
}
```


### Readonly

**Render**

```tsx
() => {
  const [value, setValue] = useState("4");
  return (
    <Select
      aria-label="readonly"
      name="readonly"
      id="readonly"
      readOnly
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
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
  );
}
```


### Transparent

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  return (
    <Box height={250} width={200}>
      <Select
        name="transparent"
        id="transparent"
        placeholder="Please select a colour"
        transparent
        label="Choose a colour"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
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


### Transparent disabled

**Render**

```tsx
() => {
  const [value, setValue] = useState("4");
  return (
    <Box height={250} width={150}>
      <Select
        name="transparent"
        id="transparent"
        transparent
        label="Choose a colour"
        disabled
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
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


### Custom Option Children

**Render**

```tsx
() => {
  const [value, setValue] = useState("");

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  const options = [
    { value: "1", text: "Orange", iconType: "favourite", iconColor: "orange" },
    { value: "2", text: "Black", iconType: "bin", iconColor: "black" },
    { value: "3", text: "Blue", iconType: "individual", iconColor: "blue" },
    { value: "4", text: "Green", iconType: "tick_circle", iconColor: "green" },
  ];

  const renderLeftChildren = () => {
    const option = options.find((opt) => opt.value === value);
    return (
      option && (
        <Icon type={option.iconType as IconType} color={option.iconColor} />
      )
    );
  };

  return (
    <Box height={250}>
      <Select
        name="customOptionChildren"
        id="customOptionChildren"
        label="Pick your favourite color"
        value={value}
        onChange={onChangeHandler}
        leftChildren={
          value && (
            <Box display="flex" alignItems="center" ml={1}>
              {renderLeftChildren()}
            </Box>
          )
        }
      >
        {options.map((option) => (
          <Option key={option.value} text={option.text} value={option.value}>
            <Icon
              type={option.iconType as IconType}
              color={option.iconColor}
              mr={1}
            />
            {option.text}
          </Option>
        ))}
      </Select>
    </Box>
  );
}
```


### With Multiple Columns

**Render**

```tsx
() => {
  const [value, setValue] = useState("2");
  return (
    <Box height={250}>
      <Select
        name="withMultipleColumns"
        id="withMultipleColumns"
        multiColumn
        tableHeader={
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Occupation</th>
          </tr>
        }
        label="With multiple columns"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      >
        <OptionRow id="1" value="1" text="John Doe">
          <td>John</td>
          <td>Doe</td>
          <td>Welder</td>
        </OptionRow>
        <OptionRow id="2" value="2" text="Joe Vick">
          <td>Joe</td>
          <td>Vick</td>
          <td>Accountant</td>
        </OptionRow>
        <OptionRow id="3" value="3" text="Jane Poe">
          <td>Jane</td>
          <td>Poe</td>
          <td>Accountant</td>
        </OptionRow>
        <OptionRow id="4" value="4" text="Jill Moe">
          <td>Jill</td>
          <td>Moe</td>
          <td>Engineer</td>
        </OptionRow>
        <OptionRow id="5" value="5" text="Bill Zoe">
          <td>Bill</td>
          <td>Zoe</td>
          <td>Astronaut</td>
        </OptionRow>
      </Select>
    </Box>
  );
}
```


### Option Groups

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  return (
    <Box height={250}>
      <Select
        name="optGroups"
        id="optGroups"
        label="color"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      >
        <OptionGroupHeader label="Group one" icon="individual" />
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <OptionGroupHeader label="Group two" icon="shop" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <OptionGroupHeader label="Group three" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </Select>
    </Box>
  );
}
```


### Option Groups with composed children

**Render**

```tsx
() => {
  const [value, setValue] = useState("");
  return (
    <Box height={250}>
      <Select
        name="optGroups"
        id="optGroups"
        label="color"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      >
        <OptionGroupHeader>
          <Icon type="individual" /> <span>Group One Composed</span>
        </OptionGroupHeader>
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <OptionGroupHeader>
          <Icon type="shop" /> <span>Group Two Composed</span>
        </OptionGroupHeader>
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <OptionGroupHeader>
          <span>Group Three Composed</span>
        </OptionGroupHeader>
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </Select>
    </Box>
  );
}
```


### Enabling Adaptive Behaviour

**Render**

```tsx
() => {
  const [value, setValue] = useState("4");
  return (
    <Box height={220}>
      <Select
        name="adaptive"
        id="adaptive"
        label="color"
        adaptiveLabelBreakpoint={960}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
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

