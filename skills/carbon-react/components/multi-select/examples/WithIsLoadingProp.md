```tsx
export const WithIsLoadingProp: Story = () => {
  const preventLoading = useRef(false);
  const [value, setValue] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const asyncList = [
    <Option text="Amber" value="amber" key="Amber" />,
    <Option text="Black" value="black" key="Black" />,
    <Option text="Blue" value="blue" key="Blue" />,
    <Option text="Brown" value="brown" key="Brown" />,
    <Option text="Green" value="green" key="Green" />,
  ];
  const [optionList, setOptionList] = useState<React.ReactElement[]>([]);
  function loadList() {
    if (preventLoading.current) {
      return;
    }
    preventLoading.current = true;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOptionList(asyncList);
    }, 2000);
  }
  function clearData() {
    setOptionList([]);
    setValue([]);
    preventLoading.current = false;
  }
  return (
    <Box height={300}>
      <Button onClick={clearData} mb={2}>
        reset
      </Button>
      <MultiSelect
        name="isLoading"
        id="isLoading"
        label="color"
        value={value}
        onChange={(event) =>
          setValue(event.target.value as unknown as string[])
        }
        onOpen={() => loadList()}
        isLoading={isLoading}
      >
        {optionList}
      </MultiSelect>
    </Box>
  );
};
```