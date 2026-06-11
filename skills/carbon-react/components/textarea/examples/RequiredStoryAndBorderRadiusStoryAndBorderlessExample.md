```tsx
export const RequiredStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      required
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};

export const BorderRadiusStory: Story = () => {
  const [stateOne, setStateOne] = useState("");
  const [stateTwo, setStateTwo] = useState("");
  const [stateThree, setStateThree] = useState("");
  const [stateFour, setStateFour] = useState("");
  const setValueOne = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setStateOne(target.value);
  };
  const setValueTwo = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setStateTwo(target.value);
  };
  const setValueThree = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setStateThree(target.value);
  };
  const setValueFour = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setStateFour(target.value);
  };
  return (
    <>
      <Textarea
        label="Textarea with borderRadius100"
        value={stateOne}
        onChange={setValueOne}
        borderRadius="borderRadius100"
      />

      <Textarea
        mt={4}
        label="Textarea with an array of two values"
        value={stateTwo}
        onChange={setValueTwo}
        borderRadius={["borderRadius400", "borderRadius025"]}
      />

      <Textarea
        mt={4}
        label="Textarea with an array of three values"
        value={stateThree}
        onChange={setValueThree}
        borderRadius={["borderRadius400", "borderRadius025", "borderRadius100"]}
      />

      <Textarea
        mt={4}
        label="Textarea with an array of four values"
        value={stateFour}
        onChange={setValueFour}
        borderRadius={[
          "borderRadius400",
          "borderRadius025",
          "borderRadius100",
          "borderRadius400",
        ]}
      />
    </>
  );
};

export const BorderlessExample: Story = () => {
  const [state, setState] = useState("");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Box
      bg="var(--colorsUtilityMajor040)"
      height={200}
      width={800}
      borderRadius="borderRadius200"
    >
      <Textarea
        label="Borderless Textarea"
        value={state}
        onChange={setValue}
        rows={7}
        hideBorders
        m={2}
      />
    </Box>
  );
};
```