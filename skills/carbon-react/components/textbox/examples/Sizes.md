```tsx
export const Sizes: Story = () => {
  const [smallState, setSmallState] = useState("");
  const [mediumState, setMediumState] = useState("");
  const [largeState, setLargeState] = useState("");
  const setValue = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    size: string,
  ) => {
    if (size === "small") setSmallState(target.value);
    else if (size === "medium") setMediumState(target.value);
    else if (size === "large") setLargeState(target.value);
  };
  return (
    <Box>
      <Textbox
        key={`Textbox - small`}
        label={`Textbox - small`}
        value={smallState}
        size={"small"}
        mb={2}
        onChange={(e) => setValue(e, "small")}
        placeholder="Textbox"
      />

      <Textbox
        key={`Textbox - medium`}
        label={`Textbox - medium`}
        value={mediumState}
        size={"medium"}
        mb={2}
        onChange={(e) => setValue(e, "medium")}
        placeholder="Textbox"
      />

      <Textbox
        key={`Textbox - large`}
        label={`Textbox - large`}
        value={largeState}
        size={"large"}
        mb={2}
        onChange={(e) => setValue(e, "large")}
        placeholder="Textbox"
      />
    </Box>
  );
};
```